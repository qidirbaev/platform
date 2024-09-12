const dotenv = require('dotenv')
const { conversation_support_hello_text, support_text_for_admin, conversation_support_text } = require('../../views/all-views')

dotenv.config()

async function CONVERSATION_SUPPORT(conversation, ctx) {
  await ctx.reply(conversation_support_hello_text, { parse_mode: 'HTML' })
  ctx = await conversation.waitFor('message:text')

  if (ctx.message.text.startsWith('/')) {
    await conversation.skip()
    return
  }

  let messageId = ctx.message.message_id

  await global.bot.api.sendMessage(
    process.env.TG_BOT_ADMIN_ID,
    support_text_for_admin(ctx, messageId),
    {
      parse_mode: 'HTML',
    }
  )

  await ctx.reply(conversation_support_text(ctx, messageId), {
    parse_mode: 'HTML',
    reply_parameters: {
      message_id: ctx.message.message_id,
    }
  })

  return
}

module.exports = {
  CONVERSATION_SUPPORT,
}