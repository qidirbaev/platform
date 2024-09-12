const Joi = require('joi')

const StatisticModel = Joi.object({
  name: Joi.string().required(),
  statistics: Joi.string().required()
})

const ReviewModel = Joi.object({
  name: Joi.string().required(),
  profession: Joi.string().required(),
  rating: Joi.string().required(),
  comment: Joi.string().required()
})

const OrderModel = Joi.object({
  name: Joi.string().default('No-Name'),
  phone: Joi.string().required(),
  address: Joi.string().default('No-Address'),
  comment: Joi.string().default('No-Comment'),
  payment_option: Joi.string().default('No-Payment-Option'),
})

const UserModel = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string(),
  role: Joi.string()
})

const AdminModel = Joi.object({
  username: Joi.string().required(),
  email: Joi.string(),
  password: Joi.string().required(),
  role: Joi.string().default('admin')
})

module.exports = {
  StatisticModel,
  ReviewModel,
  OrderModel,
  UserModel,
  AdminModel
}