require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')

class Database {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_DB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })
  }

  async getAll(collectionName) {
    const db = this.client.db(process.env.MONGO_DB_NAME)
    const collection = db.collection(collectionName)
    const result = await collection.find({}).toArray()
    return result
  }
}

class DatabaseService {
  constructor() {
    this.db = new Database()
  }

  async getAllReviewsService() {
    return await this.db.getAll('reviews')
  }
}

class DatabaseController {
  constructor() {
    this.dbService = new DatabaseService()
  }

  async getAllReviews() {
    const reviews = await this.dbService.getAllReviewsService()
    return reviews
  }
}

const dbController = new DatabaseController()

async function main() {
  const reviews = await dbController.getAllReviews()
  console.log(reviews)
}

main().catch(console.error)