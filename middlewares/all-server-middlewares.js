const { errorHTML } = require('../views/all-views.js')
const { validate_token } = require('../validations/validations.js')
const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

function MIDDLEWARE_ERROR_HANDLER_LAST(req, res, next) {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end(errorHTML(404))
}

function MIDDLEWARE_STATIC(res, path) {
  if (path.endsWith('.js'))
    res.setHeader('Content-Type', 'application/javascript')
  if (path.endsWith('.css'))
    res.setHeader('Content-Type', 'text/css')
  if (path.endsWith('.png'))
    res.setHeader('Content-Type', 'image/png')
  if (path.endsWith('.jpg'))
    res.setHeader('Content-Type', 'image/jpeg')
  if (path.endsWith('.svg'))
    res.setHeader('Content-Type', 'image/svg+xml')
  if (path.endsWith('.json'))
    res.setHeader('Content-Type', 'application/json')
}

function MIDDLEWARE_CHECK_ACCESS(req, res, next) {
  const token = req.headers['token']
  if (token && !validate_token(token)) return res.end(JSON.stringify({ status: 'error', message: 'Token haqıyqıy emes' }))
  next()
}

function MIDDLEWARE_VERIFY_TOKEN(req, res, next) {
  const token = req.headers['Authorization']

  console.log({ reqHeaders: req.headers, resHeaders: res.headers })

  if (!token) return res.end(JSON.stringify({ status: 'error', message: 'Token joq' }))

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    next()
  } catch (err) {
    return res.end(JSON.stringify({ status: 'error', message: 'Token haqıyqıy emes' }))
  }
}

module.exports = {
  MIDDLEWARE_ERROR_HANDLER_LAST,
  MIDDLEWARE_STATIC,
  MIDDLEWARE_CHECK_ACCESS,
  MIDDLEWARE_VERIFY_TOKEN,
}