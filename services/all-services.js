const { ObjectId } = require('mongodb')
const { toUnicode, toASCII } = require('punycode')

module.exports = class DatabaseService {
  constructor(db) {
    this.db = db
  }

  async deleteAll(collectionName) {
    await this.db.collection(collectionName).deleteMany({})
  }

  async getAll(collectionName) {
    const result = await this.db.collection(collectionName).find({}).toArray()

    for (const doc of result) {
      for (const key in doc) {
        if (typeof doc[key] === 'string') {
          doc[key] = toUnicode(doc[key])
        }
      }
    }

    return result
  }

  async create(collectionName, data) {
    for (const key in data) {
      if (typeof data[key] === 'string') {
        data[key] = toASCII(data[key])
      }
    }
    const result = await this.db.collection(collectionName).insertOne(data)
    return result
  }

  async createMany(collectionName, data) {
    const result = await this.db.collection(collectionName).insertMany(data)
    return result
  }

  async update(collectionName, _id, data) {
    if (typeof _id === 'string')
      _id = ObjectId.createFromHexString(_id)

    // check all fields and if they have non-ASCII characters encode them
    for (const key in data) {
      if (typeof data[key] === 'string') {
        data[key] = toASCII(data[key])
      }
    }

    const result = await this.db.collection(collectionName).updateOne({ _id }, { $set: data })
    return result
  }

  async updateMany(collectionName, filter, data) {
    const result = await this.db.collection(collectionName).updateMany(filter, { $set: data })
    return result
  }

  async delete(collectionName, _id) {
    if (typeof _id === 'string')
      _id = ObjectId.createFromHexString(_id)
    const result = await this.db.collection(collectionName).deleteOne({ _id })
    return result
  }

  async deleteMany(collectionName, filter) {
    const result = await this.db.collection(collectionName).deleteMany(filter)
    return result
  }

  async get(collectionName, _id) {
    if (typeof _id === 'string')
      _id = ObjectId.createFromHexString(_id)
    const result = await this.db.collection(collectionName).findOne({ _id })

    // check all fields and if they are encoded decode them
    for (const key in result) {
      if (typeof result[key] === 'string') {
        result[key] = toUnicode(result[key])
      }
    }

    return result
  }

  async getMany(collectionName, filter) {
    const result = await this.db.collection(collectionName).find(filter).toArray()

    for (const doc of result) {
      for (const key in doc) {
        if (typeof doc[key] === 'string')
          doc[key] = toUnicode(doc[key])
      }
    }

    return result
  }

  async findOne(collectionName, filter) {
    const result = await this.db.collection(collectionName).findOne(filter)
    return result
  }
}
