const { Menu } = require('@grammyjs/menu')
require('dotenv').config()

const order_menu = new Menu("order-menu", { autoAnswer: true })
  .webApp('Buyırtpa beriw', `https://${process.env.SERVER_URL}/order-form`)

module.exports = {
  order_menu
}