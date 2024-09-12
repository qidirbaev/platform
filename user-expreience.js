const dotenv = require('dotenv')
const Database = require('./database/database.js')
const DatabaseService = require('./services/all-services.js')
const DatabaseController = require('./controllers/all-controllers.js')

dotenv.config()

const db = new Database(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME)
const dbService = new DatabaseService(db)
const dbController = new DatabaseController(dbService)

async function main() {
  // connect database
  await db.connect()

  // const before = await db.getReview('66e02b0aa5034eb8f13787eb')
  // console.log('Before:', before)

  // const result_all = await db.getAllReviews()
  // console.log('The result:', { result_all }, result_all instanceof Array)

  // const result = await db.createReview({
  //   name: 'Begzat Doe',
  //   profession: 'áńǵ-»-««asdfklmkmılıá Engineer',
  //   comment: 'This is a test review',
  //   rating: 5
  // })

  // console.log('The result:', { result }, result instanceof Array)

  const after = await dbController.getReview('66e03d9fbd07331db850322c')
  console.log('After:', after, after instanceof Array)

  // const result_all = await db.getAllReviews()
  // console.log('The result:', { result_all }, result_all instanceof Array)

  // disconnect database
  await db.disconnect()
}

main().catch(console.error)

/**
1. The data comes from the user
2. The data would be validated
3. If the data is not valid, the user would be notified
4. If the data is valid, then certain controller would be called
5. The controller would call the service
6. The service would call the database
7. The database would return the data
8. The data would be returned to the controller
9. The controller would return the data to the user
 */