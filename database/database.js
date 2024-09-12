const { MongoClient, ServerApiVersion } = require('mongodb')

module.exports = class Database {
  constructor(MONGO_DB_URI, MONGO_DB_NAME) {
    this.client = new MongoClient(MONGO_DB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })
    this.useDatabase(MONGO_DB_NAME)
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.close()
  }

  async ping() {
    const result = await this.db.command({ ping: 1 })
    return result
  }

  useDatabase(databaseName) {
    this.db = this.client.db(databaseName)
  }

  collection(name) {
    return this.db.collection(name)
  }

  async createCollection(collectionName) {
    const result = await this.db.createCollection(collectionName)
    return result
  }

  async deleteCollection(collectionName) {
    const result = await this.db.dropCollection(collectionName)
    return result
  }

  async getAllCollections(options) {
    const result = await this.db.listCollections(options).toArray()
    return result
  }
}