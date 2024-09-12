const { contact_text, order_text, subscribe_text, help_text } = require("../../views/all-views")
const dotenv = require("dotenv")
const { order_menu } = require("../menus/all-menus")

dotenv.config()

async function BOT_COMMAND_CONTACT(ctx) {
  await ctx.conversation.exit()
  await ctx.reply(contact_text, {
    reply_markup: {
      remove_keyboard: true
    },
    parse_mode: 'HTML',
    link_preview_options: {
      disable_web_page_preview: true,
      is_disabled: true
    }
  })
}

async function BOT_COMMAND_ORDER(ctx) {
  await ctx.conversation.exit()
  await ctx.replyWithPhoto(process.env.ORDER_IMAGE_URL, {
    caption: order_text,
    reply_markup: order_menu,
    parse_mode: 'HTML'
  })
}

async function BOT_COMMAND_SUPPORT(ctx) {
  await ctx.conversation.exit()
  await ctx.conversation.enter("CONVERSATION_SUPPORT")
}

async function BOT_COMMAND_SUBSCRIBE(ctx) {
  await ctx.conversation.exit()
  await ctx.reply(subscribe_text, { parse_mode: 'HTML' })
}

async function BOT_COMMAND_HELP(ctx) {
  await ctx.conversation.exit()
  await ctx.reply(help_text, { parse_mode: 'HTML' })
}

async function BOT_COMMAND_START(ctx) {
  await ctx.conversation.exit()
  await ctx.react("😍")
  await ctx.reply('👋🏻 CodingerUz botına xosh keldińiz', {
    reply_markup: {
      remove_keyboard: true
    }
  })
}

async function BOT_COMMAND_ADMIN(ctx) {
  await ctx.conversation.exit()

  console.log(ctx.from.id, process.env.TG_BOT_ADMIN_ID)

  if (ctx.from.id != process.env.TG_BOT_ADMIN_ID) return false

  await ctx.reply('👋🏻 CodingerUz botına xosh keldińiz', {
    reply_markup: {
      remove_keyboard: true
    }
  })
}

async function BOT_COMMAND_SEND(ctx) {
  await ctx.conversation.exit()

  console.log(ctx.from.id, process.env.TG_BOT_ADMIN_ID)

  if (ctx.from.id != process.env.TG_BOT_ADMIN_ID) return await ctx.reply("Sizde bul komanda ushın ruxsat joq")

  let text = ctx.match

  // extract userId from the text
  let userId = text.match(/(\d+)/)[0] + ""

  let actual_message = text.replace(userId, '').trim()

  await global.bot.api.sendMessage(userId, actual_message, {
    parse_mode: 'HTML'
  })
}

module.exports = {
  BOT_COMMAND_CONTACT,
  BOT_COMMAND_ORDER,
  BOT_COMMAND_SUPPORT,
  BOT_COMMAND_SUBSCRIBE,
  BOT_COMMAND_HELP,
  BOT_COMMAND_START,
  BOT_COMMAND_ADMIN,
  BOT_COMMAND_SEND
}