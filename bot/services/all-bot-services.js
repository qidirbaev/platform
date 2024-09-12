const { new_order_notification_text } = require("../../views/all-views")

async function new_order_notification(order) {
  await global.bot.api.sendMessage(
    process.env.TG_ORDERS_CHANNEL_ID,
    new_order_notification_text(order),
    {
      parse_mode: 'HTML'
    }
  )
}

async function send_message(chat_id, text) {
  await global.bot.api.sendMessage(chat_id, text, {
    parse_mode: 'HTML'
  })
}

module.exports = {
  new_order_notification,
  send_message
}