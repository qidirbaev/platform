const express = require('express')
const { join } = require('path')
const app = express()
const dotenv = require('dotenv')
const { Bot, session } = require("grammy")
const { createConversation, conversations } = require("@grammyjs/conversations")
const colors = require('colors')
const { check_if_env_variables_are_set } = require('./validations/env-validator.js')
const Database = require('./database/database.js')
const DatabaseService = require('./services/all-services.js')
const DatabaseController = require('./controllers/all-controllers.js')
const ServerApi = require('./routes/api-routes/all-api-routes.js')
const { MongoServerSelectionError } = require('mongodb')
const {
  BOT_COMMAND_CONTACT,
  BOT_COMMAND_ORDER,
  BOT_COMMAND_SUPPORT,
  BOT_COMMAND_SUBSCRIBE,
  BOT_COMMAND_HELP,
  BOT_COMMAND_START,
  BOT_COMMAND_ADMIN,
  BOT_COMMAND_SEND
} = require('./bot/commands/all-commands.js')
const { BOT_ERROR_CATCHER } = require('./bot/functions.js')
const { CONVERSATION_SUPPORT } = require('./bot/conversations/all-conversations.js')
const { order_menu } = require('./bot/menus/all-menus.js')
const ServerApplication = require('./server.js')

colors.enable()
dotenv.config({
  path: join(__dirname, '.env')
})

/** Check ENV variables */
try {
  check_if_env_variables_are_set()
} catch (error) {
  console.error(error)
  process.exit(1)
}

process.on('SIGINT', async function GLOBAL_PROCESS_SIGINT_HANDLER() {
  try {
    console.error('Server shutdown process started')

    // End the database connection
    await db.disconnect()
    console.log("Database is disconnected! 💤".gray)

    // Close the server
    await server.close()

    // Stop the bot
    await bot.stop()
    console.log('Bot is stopped! 💤'.gray)
  } catch (err) {
    console.error('Error during shutdown:', err)
  } finally {
    process.exit(0)
  }
})

//  Error handler
// process.on('uncaughtException', (err) => {
//   console.error('Server error:'.bgRed.bold, err)
// })

/** Global variable */
global.ADMIN_TOKEN = null
globalThis.SERVER_URL = process.env.SERVER_URL

const db = new Database(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME)
const dbService = new DatabaseService(db)
const dbController = new DatabaseController(dbService)
const serverApi = new ServerApi(app)

global.dbController = dbController

const server = new ServerApplication(app, serverApi)
const bot = new Bot(process.env.TG_BOT_TOKEN)

global.bot = bot

async function main() {
  // Start server
  try {
    server.start()
    server.initializeMiddlewares()
    server.setPageRoutes()
    server.setStaticFilesRoutes()
    server.setAPIRoutes()
  } catch (err) {
    console.error('Error while initializing server'.red, err)
    process.exit(1)
  }

  // Start database
  try {
    await db.connect()
    console.log("Database connection established".green)
  } catch (err) {
    console.error("Error while connecting to database: ".red, err)
    if (err instanceof MongoServerSelectionError)
      console.error("It seems the IP address has no access to the database: ".red, err)

    process.exit(1)
  }
}

main().catch(error => console.error('GlobalServer Error'.bgRed.bold, error))

// Run bot
try {
  // Start bot
  try {
    bot.start()
    console.log('Bot started... 🚀'.green)
  } catch (e) {
    console.log('Error while starting bot:'.bold.red, e)
    process.exit(1)
  }

  bot.use(session({
    initial: () => ({
      conversation: null,
      phone_number: null,
      full_name: null,
      order: null
    })
  }))
  bot.use(conversations())
  bot.use(createConversation(CONVERSATION_SUPPORT))
  bot.use(order_menu)

  bot.command("start", BOT_COMMAND_START)
  bot.command("help", BOT_COMMAND_HELP)
  bot.command("subscribe", BOT_COMMAND_SUBSCRIBE)
  bot.command("support", BOT_COMMAND_SUPPORT)
  bot.command('order', BOT_COMMAND_ORDER)
  bot.command("contact", BOT_COMMAND_CONTACT)
  bot.command("admin", BOT_COMMAND_ADMIN)
  bot.command("send", BOT_COMMAND_SEND)

  bot.catch(BOT_ERROR_CATCHER)
} catch (err) {
  console.log('Error on BOT LOBIC:'.red.bold, err)
}