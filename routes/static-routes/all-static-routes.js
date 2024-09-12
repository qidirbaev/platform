const { join } = require('path')

async function STATIC_UNKNOWN_PERSON(req, res) {
  res.setHeader('Content-Type', 'image/png')
  res.sendFile(join(__dirname, '..', '..', 'public', 'img', 'unknown-person.png'))
}

async function STATIC_BOOK(req, res) {
  res.setHeader('Content-Type', 'application/pdf')
  res.sendFile(join(__dirname, '..', '..', 'public', 'book', 'sample.pdf'))
}

async function STATIC_GOOGLE_LOGO(req, res) {
  res.setHeader('Content-Type', 'image/png')
  res.sendFile(join(__dirname, '..', '..', 'public', 'img', 'google.png'))
}

async function STATIC_TELEGRAM_WIDGET(req, res) {
  res.setHeader('Content-Type', 'application/javascript')
  res.sendFile(join(__dirname, '..', '..', 'public', 'js', 'tg-widget.js'))
}

module.exports = {
  STATIC_UNKNOWN_PERSON,
  STATIC_BOOK,
  STATIC_GOOGLE_LOGO,
  STATIC_TELEGRAM_WIDGET,
}
