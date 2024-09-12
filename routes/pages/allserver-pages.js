const { join } = require('path')

async function PAGES_INDEX(req, res) {
  const fileName = join(__dirname, '..', '..', 'public', 'index.html')
  res.sendFile(fileName)
}

async function PAGES_ABOUT(req, res) {
  const fileName = join(__dirname, '..', '..', 'public', 'about.html')
  res.sendFile(fileName)
}

async function PAGES_BUY(req, res) {
  const fileName = join(__dirname, '..', '..', 'public', 'buy.html')
  res.sendFile(fileName)
}

async function PAGES_PLATFORM(req, res) {
  const fileName = join(__dirname, '..', '..', 'public', 'platform.html')
  res.sendFile(fileName)
}

async function PAGES_ORDER_FORM(req, res) {
  const fileName = join(__dirname, '..', '..', 'public', 'order-form.html')
  res.sendFile(fileName)
}

module.exports = {
  PAGES_INDEX,
  PAGES_ABOUT,
  PAGES_BUY,
  PAGES_PLATFORM,
  PAGES_ORDER_FORM
}
