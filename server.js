const jwt = require('jwt-simple')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')

const {
  MIDDLEWARE_ERROR_HANDLER_LAST,
  MIDDLEWARE_STATIC,
  MIDDLEWARE_CHECK_ACCESS,
  MIDDLEWARE_VERIFY_TOKEN } = require('./middlewares/all-server-middlewares.js')
const {
  PAGES_INDEX,
  PAGES_ABOUT,
  PAGES_BUY,
  PAGES_PLATFORM,
  PAGES_ORDER_FORM
} = require('./routes/pages/allserver-pages.js')
const {
  STATIC_UNKNOWN_PERSON,
  STATIC_BOOK,
  STATIC_GOOGLE_LOGO,
  STATIC_TELEGRAM_WIDGET,
} = require('./routes/static-routes/all-static-routes.js')
const dotenv = require('dotenv')

dotenv.config()

class ServerApplication {
  constructor(app, api) {
    this.app = app
    this.server = null
    this.api = api
  }

  start() {
    try {
      this.server = this.app.listen(process.env.PORT_NUMBER, () => {
        console.log(`Server started on port ${process.env.PORT_NUMBER}`.green)
      })
    } catch (err) {
      console.error('Error while starting server'.red, err)
    }
  }

  async close() {
    try {
      await this.server.close(() => {
        console.log('Server stopped! 💤'.gray)
      })
    } catch (err) {
      console.error('Error while stopping server'.red, err)
    }
  }

  generateAdminToken() {
    try {
      global.ADMIN_TOKEN = jwt.encode({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
      }, process.env.JWT_SECRET)
      console.log("ADMIN_TOKEN is generated: ", ADMIN_TOKEN)
    } catch (err) {
      console.error("Error while generating ADMIN_TOKEN: ", err)
      process.exit(1)
    }
  }

  initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(morgan('common', {
      skip: (req, res) => /\.(js|css|png|jpg|svg|json|map|vendor)$/.test(req.url)
    }))
    this.app.disable('x-powered-by')
    this.app.use(helmet({
      // allow bootstrap scripts from cdn
      contentSecurityPolicy: {
        directives: {
          scriptSrc: ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"]
        }
      }
    }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(express.static('public', {
      setHeaders: MIDDLEWARE_STATIC
    }))
    // this.app.use(MIDDLEWARE_ERROR_HANDLER_LAST)
  }

  setPageRoutes() {
    this.app.get('/', PAGES_INDEX)
    this.app.get('/about', PAGES_ABOUT)
    this.app.get('/buy', PAGES_BUY)
    this.app.get('/platform', PAGES_PLATFORM)
    this.app.get('/order-form', PAGES_ORDER_FORM)
  }

  setStaticFilesRoutes() {
    this.app.get('/unknown-person', STATIC_UNKNOWN_PERSON)
    this.app.get('/book/demo', STATIC_BOOK)
    this.app.get('/google', STATIC_GOOGLE_LOGO)
    // this.app.get('/tg-widget', STATIC_TELEGRAM_WIDGET)
  }

  setAPIRoutes() {
    this.app.get('/api', this.api.API)
    this.app.get('/reviews', this.api.API_GET_ALL_REVIEWS)
    // this.app.post('/create_review', MIDDLEWARE_CHECK_ACCESS, this.api.API_CREATE_REVIEW)
    // this.app.put('/review/:id', MIDDLEWARE_CHECK_ACCESS, this.api.API_UPDATE_REVIEW)
    this.app.get('/stats', this.api.API_GET_ALL_STATS)
    this.app.get('/order', this.api.API_GET_CREATE_ORDER)
    this.app.post('/platform', this.api.API_PLATFORM)
    // this.app.post('/login', this.api.API_LOGIN)
    // this.app.get('/profile', MIDDLEWARE_VERIFY_TOKEN, this.api.API_PROFILE)
    // this.app.get('/get_token', this.api.API_GET_TOKEN)
    this.app.get('/send_mail_to_team', this.api.API_SEND_MAIL)
    this.app.post('/direct-order', this.api.API_DIRECT_ORDER)
  }
}

module.exports = ServerApplication