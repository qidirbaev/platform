const dotenv = require('dotenv')
const Database = require('./database/database.js')
const DatabaseService = require('./services/all-services.js')
const DatabaseController = require('./controllers/all-controllers.js')
const { StatisticModel, ReviewModel } = require('./models/models.js')

dotenv.config()

const db = new Database(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME)
const dbService = new DatabaseService(db)
const dbController = new DatabaseController(dbService)

async function main() {
  await db.connect()

  await dbController.delteAllReviews()

  await Promise.all(reviews.map(async (review) => {
    await ReviewModel.validateAsync(review)
    await dbController.createReview(review)
  })).catch(console.error)

  const result = await dbController.getAllReviews()
  console.log('The result:', { result }, result instanceof Array)

  await db.disconnect()
}

main().catch(console.error)

/** Insert stats Array into the database
const stats = [
  {
    "name": "Satıp alıwshılar",
    "statistics": "37"
  },
  {
    "name": "Platformadan paydalanıwshılar",
    "statistics": "19"
  },
  {
    "name": "Tarmaqlardaǵı paydalanıwshılar",
    "statistics": "248"
  },
  {
    "name": "Tarqatılǵan kitaplar",
    "statistics": "45"
  }
]
  await dbController.deleteAllStatistics()

  await Promise.all(stats.map(async (stat) => {
    await StatisticModel.validateAsync(stat)
    await dbController.createStatistic(stat)
  })).catch(console.error)

  const result = await dbController.getAllStatistics()
  console.log('The result:', { result }, result instanceof Array)
*/

/** Insert 'reviews' Array to the database
const reviews = [
  {
    "name": "John Doe",
    "profession": "Software Engineer",
    "rating": "5",
    "comment": "This is the best book I've ever read!"
  },
  {
    "name": "Jane Smith",
    "profession": "Graphic Designer",
    "rating": "4",
    "comment": "I really enjoyed reading this book. It was informative and engaging."
  },
  {
    "name": "Bob Johnson",
    "profession": "Marketing Specialist",
    "rating": "3",
    "comment": "This book was okay, but I didn't find it as interesting as some others."
  },
  {
    "name": "Alice Brown",
    "profession": "Product Manager",
    "rating": "5",
    "comment": "This book changed my perspective on life. I highly recommend it to everyone."
  },
  {
    "name": "Mike Davis",
    "profession": "Sales Manager",
    "rating": "4",
    "comment": "I found this book to be a great resource for my profession. It provided valuable insights."
  },
  {
    "name": "Emily Wilson",
    "profession": "HR Manager",
    "rating": "5",
    "comment": "This book was a game-changer for me. It helped me improve my leadership skills."
  },
  {
    "name": "David Taylor",
    "profession": "Project Manager",
    "rating": "3",
    "comment": "I didn't find this book to be as helpful as I had hoped. It could have been more detailed."
  },
  {
    "name": "Sarah Thompson",
    "profession": "Customer Service Representative",
    "rating": "4",
    "comment": "áńǵı book was a great read. It provided some interesting insights into customer behavior."
  }
]
await dbController.delteAllReviews()

await Promise.all(reviews.map(async (review) => {
  await ReviewModel.validateAsync(review)
  await dbController.createReview(review)
})).catch(console.error)

const result = await dbController.getAllReviews()
console.log('The result:', { result }, result instanceof Array)
*/