const { createPool } = require('mysql2')
const { decode, encode } = require('punycode')
const dotenv = require('dotenv')

dotenv.config()

const _poll = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})
const pool = _poll.promise()
let db_conn

const reviews = [
  {
    "name": "John Doe",
    "job": "Software Engineer",
    "stars": "5",
    "msg": "Bul haqıyqatındada júda zor kitap eken"
  },
  {
    "name": "Jane Smith",
    "job": "Graphic Designer",
    "stars": "4",
    "msg": "I really enjoyed reading this book. It was informative and engaging."
  },
  {
    "name": "Bob Johnson",
    "job": "Marketing Specialist",
    "stars": "3",
    "msg": "This book was okay, but I didn't find it as interesting as some others."
  },
  {
    "name": "Alice Brown",
    "job": "Product Manager",
    "stars": "5",
    "msg": "This book changed my perspective on life. I highly recommend it to everyone."
  },
  {
    "name": "Mike Davis",
    "job": "Sales Manager",
    "stars": "4",
    "msg": "I found this book to be a great resource for my job. It provided valuable insights."
  },
  {
    "name": "Emily Wilson",
    "job": "HR Manager",
    "stars": "5",
    "msg": "This book was a game-changer for me. It helped me improve my leadership skills."
  },
  {
    "name": "David Taylor",
    "job": "Project Manager",
    "stars": "3",
    "msg": "I didn't find this book to be as helpful as I had hoped. It could have been more detailed."
  },
  {
    "name": "Sarah Thompson",
    "job": "Customer Service Representative",
    "stars": "4",
    "msg": "Bul haqıyqatındada júda zor kitap eken"
  }
]

reviews.map(review => {
  review['name'] = encode(review.name)
  review['job'] = encode(review.job)
  review['msg'] = encode(review.msg)
})

async function main() {
  try {
    db_conn = await pool.getConnection()
    console.log("Database connection established")
  } catch (err) {
    console.error("Error connecting to database: ", err)
    process.exit(1)
  }

  try {
    // delete all reviews
    await db_conn.query(`DELETE FROM reviews`)

    // insert reviews
    await Promise.all(reviews.map(async review =>
      await db_conn.query(
        `INSERT INTO reviews (name, job, stars, msg) VALUES (?, ?, ?, ?)`,
        [review.name, review.job, review.stars, review.msg]
      )
    ))

    // get all reviews
    const [result] = await db_conn.query(`SELECT * FROM reviews`)

    // decode reviews
    result.map(review => {
      review['name'] = decode(review.name)
      review['job'] = decode(review.job)
      review['msg'] = decode(review.msg)
    })

    // display reviews
    console.log(result)
  } catch (err) {
    console.log("Error while processing query: ", err)
  }

  try {
    pool.releaseConnection(db_conn)
    db_conn.release()
    console.log("Database connection closed")
    process.exit(0)
  } catch (error) {
    console.error("Error disconnecting from database: ", error)
  }
}

main()