module.exports = class DatabaseController {
  constructor(dbService) {
    this.service = dbService
  }

  async getReview(id) {
    const result = await this.service.get('reviews', id)
    return result
  }

  async createReview(review) {
    const result = await this.service.create('reviews', review)
    return result
  }

  async updateReview(id, review) {
    const result = await this.service.update('reviews', id, review)
    return result
  }

  async deleteReview(id) {
    const result = await this.service.delete('reviews', id)
    return result
  }

  async getAllReviews() {
    const result = await this.service.getAll('reviews')
    return result
  }

  async delteAllReviews() {
    const result = await this.service.deleteAll('reviews')
    return result
  }

  async getStatistic(id) {
    const result = await this.service.get('statistics', id)
    return result
  }

  async createStatistic(statistic) {
    const result = await this.service.create('statistics', statistic)
    return result
  }

  async updateStatistic(id, statistic) {
    const result = await this.service.update('statistics', id, statistic)
    return result
  }

  async deleteStatistic(id) {
    const result = await this.service.delete('statistics', id)
    return result
  }

  async getAllStatistics() {
    const result = await this.service.getAll('statistics')
    return result
  }

  async deleteAllStatistics() {
    const result = await this.service.deleteAll('statistics')
    return result
  }

  async getUser(userFilter) {
    const result = await this.service.findOne('users', userFilter)
    return result
  }

  async createUser(user) {
    const result = await this.service.create('users', user)
    return result
  }

  async updateUser(id, user) {
    const result = await this.service.update('users', id, user)
    return result
  }

  async deleteUser(id) {
    const result = await this.service.delete('users', id)
    return result
  }

  async getAllUsers() {
    const result = await this.service.getAll('users')
    return result
  }

  async deleteAllUsers() {
    const result = await this.service.deleteAll('users')
    return result
  }

  async getOrder(id) {
    const result = await this.service.get('orders', id)
    return result
  }

  async createOrder(order) {
    const result = await this.service.create('orders', order)
    return result
  }

  async updateOrder(id, order) {
    const result = await this.service.update('orders', id, order)
    return result
  }

  async deleteOrder(id) {
    const result = await this.service.delete('orders', id)
    return result
  }

  async getAllOrders() {
    const result = await this.service.getAll('orders')
    return result
  }

  async deleteAllOrders() {
    const result = await this.service.deleteAll('orders')
    return result
  }

  async getAdmin(id) {
    const result = await this.service.get('admins', id)
    return result
  }

  async createAdmin(admin) {
    const result = await this.service.create('admins', admin)
    return result
  }

  async updateAdmin(id, admin) {
    const result = await this.service.update('admins', id, admin)
    return result
  }

  async deleteAdmin(id) {
    const result = await this.service.delete('admins', id)
    return result
  }

  async getAllAdmins() {
    const result = await this.service.getAll('admins')
    return result
  }

  async deleteAllAdmins() {
    const result = await this.service.deleteAll('admins')
    return result
  }

  async isAdmin(adminOject) {
    const result = await this.service.getMany('admins', adminOject)
    return result.length > 0
  }
}