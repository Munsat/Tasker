const { Pool } = require('pg')

const db = new Pool({
  // database: 'tasker',
  // password: 'password',
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = db
