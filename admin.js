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

const adminObject = {
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD
}

async function main() {
  try {
    db_conn = await pool.getConnection()
    console.log("Database connection established")
  } catch (err) {
    console.error("Error connecting to database: ", err)
    process.exit(1)
  }

  try {
    // 
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