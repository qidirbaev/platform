const { Bot, session } = require("grammy")
const { createConversation, conversations } = require("@grammyjs/conversations")
const dotenv = require('dotenv')
const colors = require('colors')
const { Menu } = require('@grammyjs/menu')

colors.enable()
dotenv.config()

const order_text = `
<b>Fundamental NodeJs</b>

<code>Qısqasha:</code>
<blockquote expandable>
<b>Baǵdarlamalawdı NodeJs texnologiyası járdeminde úyretiwshi kitap. Kitap keń auditoriyaǵa mólsherlengen bolıp baǵdarlamalawdı endi baslaǵanlarǵa kúshli fundament wazıypasın atqaradı al tájriybeli baǵdarlamalawshılarǵa texnologiyanı tolıq túsiniw imkánin beredi.</b>
</blockquote>
<code>Tolıq:</code> <b><a href="https://codinger.uz/book/about">codinger.uz/book/about</a></b>
<code>Demo: </code> <b><a href="https://codinger.uz/book/demo">codinger.uz/book/demo</a></b>
<code>Baha: </code> <b><tg-spoiler>51 000 $UZS</tg-spoiler> <s>60 000 $UZS</s></b> (<b>15%</b> shegirme menen)

<blockquote><code>
Avtor:   <b>Begzat Kidirbaev</b>
Jıl:     2024
Til:     Qaraqalpaq
Alfavit: Latin
Bet:     260
Format:  A5
</code></blockquote>
#fundamental #nodejs #js
`
const order_info_text = (full_name, phone_number, shipment_address) => `
Buyırtpa maǵlıwmatları:

👤 <b>Atı:</b> <code>${full_name}</code>
📞 <b>Telefon:</b> <code>${phone_number}</code>
📍  <b>Mánzil:</b> <code>${shipment_address}</code>
`
const help_text = `
<b>@books_nukus_bot</b> botı <a href="https://xemis.uz"><b>Xemis Group</b></a> tárepinen, <a href="https://codinger.uz/"><b>codinger.uz</b></a> platforması hámde <a href="https://codinger.uz/about"><b>Fundamental NodeJs</b></a> kitabı ushın arnawlı jaratılǵan.

Bot járdeminde tómendegishe ámellerdi qılsańıs boladı:
/start\b\b\b\b\b\b\b\b\b\b\b\b- Bottı qaytadan baslaw
/help\b\b\b\b\b\b\b\b\b\b\b\b\b- Bot haqqındaǵı maǵlıwmatlar hám bottı basqarıw ushın komandalar
/order\b\b\b\b\b\b\b\b\b\b\b- "Fundamental NodeJs" kitabına buyırtpa beriw
/subscribe\b\b\b- <a href="https://codinger.uz/">codinger.uz</a> platformasına aǵza bolıw
/support\b\b\b\b\b\b- Qollap-quwwatlawǵa xabar qaldırıw
/contact\b\b\b\b\b\b- Baylanıs ushın maǵlıwmatlar

<tg-spoiler>"<b>Fundamental NodeJs</b>" kitabı ushın <b>12/09/2024</b> sánesinen baslapqı buyırtpalarǵa <b>15%</b> shegirme qılınadı.
</tg-spoiler>
`
const contact_text = `<b>Baylanıs ushın maǵlıwmatlar</b>

📞 +998889321507
👩‍🚀 @gulinaz_hr
📧 <a href="https://codinger.uz/send_mail_to_team?from=telegram">qidirbaevbegzat@gmail.com</a>
🌐 <a href="https://codinger.uz/">https://codinger.uz/</a>
`
const subscribe_text = `
⚡ <a href="https://codinger.uz/"><b>Platformaǵa</b></a> jańa aǵzalardı qabıllaw <b>11/09/2024</b> sánesinen baslanadı.
`
const conversation_support_text = (ctx, id = 5454) => `Sizdiń

<blockquote>${ctx.message.text}</blockquote>

bolǵan xabarıńıs #<code>${id}</code> IDsı menen qabıllandı. Tez arada juwap beremis.
`
const conversation_support_hello_text = `Sizdi qızıqtırǵan másele boyınsha usı jerge xabar qaldırsańıs boladı 👇🏻:

(<i>Iltimas xabardı, tolıq bir xabar qılıp jiberiń</i>)
`

const bot = new Bot(process.env.TG_BOT_TOKEN)

async function main() {
  // Start the bot
  try {
    bot.start()
    console.log('Bot started... 🚀'.green)
  } catch (e) {
    console.error('Error while starting bot:', e)
    process.exit(1)
  }

  // Run the BOT LOBIC
  try {
    async function CONVERSATION_SUPPORT(conversation, ctx) {
      await ctx.reply(conversation_support_hello_text, { parse_mode: 'HTML' })
      ctx = await conversation.waitFor('message:text')

      if (ctx.message.text.startsWith('/')) {
        await conversation.skip()
        return
      }

      await bot.api.sendMessage(process.env.TG_BOT_ADMIN_ID, ctx.message.text)
      await ctx.reply(conversation_support_text(ctx), { parse_mode: 'HTML' })

      return
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

    const order_menu = new Menu("order-menu", { autoAnswer: true })
      .webApp('Buyırtpa beriw', process.argv[2] + 'order-form')

    bot.use(order_menu)

    bot.command("start", async function BOT_COMMAND_START(ctx) {
      await ctx.conversation.exit()

      await ctx.react("😍")

      await ctx.reply('👋🏻 CodingerUz botına xosh keldińiz', {
        reply_markup: {
          remove_keyboard: true
        }
      })
    })

    bot.command("help", async function BOT_COMMAND_HELP(ctx) {
      await ctx.conversation.exit()
      await ctx.reply(help_text, { parse_mode: 'HTML' })
    })

    bot.command("subscribe", async function BOT_COMMAND_SUBSCRIBE(ctx) {
      await ctx.conversation.exit()
      await ctx.reply(subscribe_text, { parse_mode: 'HTML' })
    })

    bot.command("support", async function BOT_COMMAND_SUPPORT(ctx) {
      await ctx.conversation.exit()
      await ctx.conversation.enter("CONVERSATION_SUPPORT")
    })

    bot.command('order', async function BOT_COMMAND_ORDER(ctx) {
      await ctx.conversation.exit()
      await ctx.replyWithPhoto('https://i.ibb.co/8gpNTfN/fundamental-nodejs-cover.png', {
        caption: order_text,
        reply_markup: order_menu,
        parse_mode: 'HTML'
      })
    })

    bot.command("contact", async function BOT_COMMAND_CONTACT(ctx) {
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
    })

    async function onlyAdmin(ctx, next) {
      await ctx.conversation.exit()
      await ctx.reply('Hi from onlyAdmin middleware')
      await next()
      await ctx.reply('Bye from onlyAdmin middleware')
    }

    bot.command("admin", onlyAdmin, async function BOT_COMMAND_ADMIN(ctx) {
      ctx.reply('👋🏻 Admin paneli')
    })

    bot.catch(async (err, ctx) => {
      console.error('Error on BOT:'.bold.bgRed, err.message.red)
    })
  } catch (err) {
    console.error('Error on BOT LOBIC:', err)
  }
}

process.on('SIGINT', async function BOT_SHUTDOWN() {
  try {
    await bot.stop()
    console.log('Bot stopped! 💤'.gray)
  } catch (e) {
    console.error('Error while stopping bot AND aborting the process anyway:', e)
  } finally {
    process.exit(0)
  }
})

main()