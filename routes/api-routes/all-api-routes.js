const { ReviewModel, OrderModel, AdminModel, StatisticModel, UserModel } = require('../../models/models')
const { new_order_notification } = require('../../bot/services/all-bot-services.js')
const { setTimeout } = require('node:timers/promises')
const jwt = require('jwt-simple')
const jsonwebtoken = require('jsonwebtoken');

module.exports = class ServerApi {
  constructor(app) {
    this.app = app
  }

  async API(req, res) {
    res.send('API')
  }

  async API_GET_ALL_REVIEWS(req, res) {
    try {
      const reviews = await global.dbController.getAllReviews()

      res.end(JSON.stringify({ status: 'success', reviews }))
    } catch (err) {
      console.error(err)
      res.end(JSON.stringify({ status: 'error', message: 'Baza menen qátelik júz berdi' }))
    }
  }

  async API_CREATE_REVIEW(req, res) {
    const { name, profession, rating, comment } = req.body

    const { error, value } = ReviewModel.validate({ name, profession, rating, comment })

    if (error) return res.end(JSON.stringify({ status: 'error', message: 'Maǵlıwmatlarda qátelik bar' }))

    try {
      const result = await global.dbController.createReview({ name, profession, rating, comment })
      res.end(JSON.stringify({ status: 'success', result }))
    } catch (err) {
      console.error(err)
      res.end(JSON.stringify({ status: 'error', message: 'Baza menen qátelik júz berdi' }))
    }
  }

  async API_UPDATE_REVIEW(req, res) {
    const { name, profession, rating, comment } = req.query

    const { error, value } = ReviewModel.validate({ name, profession, rating, comment })

    if (error) return res.end(JSON.stringify({ status: 'error', message: 'Maǵlıwmatlarda qátelik bar' }))

    try {
      const result = await global.dbController.updateReview(id, { name, profession, rating, comment })
      res.end(JSON.stringify({ status: 'success', result }))
    } catch (err) {
      console.error('Error while updating review:', err)
      res.end(JSON.stringify({ status: 'error', message: 'Baza menen qátelik júz berdi' }))
    }
  }

  async API_GET_ALL_STATS(req, res) {
    try {
      const result = await global.dbController.getAllStatistics()
      res.end(JSON.stringify({ status: 'success', result }))
    } catch (err) {
      console.error(err)
      res.end(JSON.stringify({ status: 'error', message: 'Baza menen qátelik júz berdi' }))
    }
  }

  async API_GET_ALL_ORDERS(req, res) {
    const { name, phone, comment } = req.query

    try {
      await OrderModel.validateAsync({ name, phone, comment })
      const new_order = await global.dbController.createOrder({ name, phone, comment })

      await new_order_notification({ name, phone, comment, id: new_order.insertedId.toString() })

      res.end(JSON.stringify({ status: 'success', message: 'Buyırtpa qabıllandı' }))
    } catch (err) {
      console.error(err)
      res.end(JSON.stringify({ status: 'error', message: 'Qátelik júz berdi. Iltimas keyinrek urınıp kóriń' }))
    }
  }

  async API_PLATFORM(req, res) {
    await setTimeout(Math.random() * 10000)

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: 'Bunday maǵlıwmatlarǵa iye paydalanıwshı tabılmadı' }))
  }

  async API_GET_TOKEN(req, res) {
    const { username, password } = req.query

    // check is there is an admin with these credentials
    const { error, value } = AdminModel.validate({ username, password })
    if (error) return res.end(JSON.stringify({ status: 'error', message: 'Maǵlıwmatlarda qátelik bar' }))

    const isAdmin = await global.dbController.isAdmin({ username, password })

    if (!isAdmin) return res.end(JSON.stringify({ status: 'error', message: 'Bunday maǵlıwmatlarǵa iye admin tabılmadı' }))

    const token = jwt.encode({ username, password }, process.env.JWT_SECRET)

    res.end(JSON.stringify({ status: 'success', result: token }))
  }

  async API_SEND_MAIL(req, res) {
    res.redirect(`mailto:qidirbaevbegzat@gmail.com?cc=begzat.work@gmail.com&?subject=%23CodingerUz%20%23FundamentalNodeJs%20%23Kitap%20%23books_nukus_bot`)
  }

  async API_DIRECT_ORDER(req, res) {
    const { name, address, payment_option, phone } = await req.body
    const response_object = {
      status: 'error',
      message: 'Qandaydur qátelik júz berdi 😢. <br> Iltimas barlıq maǵlıwmatlardı durıs kiritkenligińisti tekserip qaytadan urınıp kóriń'
    }

    console.log({ name, address, payment_option, phone })

    await setTimeout(3_000)

    res.setHeader('Content-Type', 'application/json')

    if (!name || !address || !payment_option || !phone)
      return res.end(JSON.stringify(response_object))

    try {
      await global.dbController.createOrder({ name, phone, comment: address })
      await new_order_notification({ name, address, payment_option, phone })

      response_object.status = 'success'
      response_object.message = '🎉🎉🎉 <br> Jaqın arada siz benen baylanısamıs.'

      res.end(JSON.stringify(response_object))
    } catch (err) {
      console.error('Error while creating new order', err.stack)
      res.end(JSON.stringify(response_object))
    }
  }

  async API_LOGIN(req, res) {
    try {
      const { phone, password } = req.body

      const user = await global.dbController.getUser({ phone, password })

      if (user) {
        const token = jsonwebtoken.sign({ userId: user._id.toString() }, process.env.JWT_SECRET)

        // set req.userId
        req.userId = user._id.toString()
        req.headers['Authorization'] = token

        console.log({ phone, password, userId: user._id.toString(), reqHeaders: req.headers })

        // redirect to profile

        return res.redirect('/profile')

        // res.end(JSON.stringify({ status: 'success', result: token }))
      }

      res.status(400).json({ status: 'error', message: 'Bunday maǵlıwmatlarǵa iye paydalanıwshı tabılmadı' })
    } catch (err) {
      console.error('Error while trying to login', err.stack)
      res.end(JSON.stringify({ status: 'error', message: 'Qatilik júz berdi 😢' }))
    }
  }

  async API_PROFILE(req, res) {
    res.status(2001).json({ status: 'success', result: 'profile' })
  }
}
