const util = require('util')
const mysql = require('mysql')
const { uuid } = require('uuidv4')
const fakeDb = require('./fakeDb.json')

async function seedDatabase (pool) {
  try {
    await pool.query('DELETE FROM products')
    for (const x in fakeDb) {
      await pool.query(`INSERT INTO products (id,name,price,type,stock,enabled,url)
      VALUES(?,?,?,?,?,?,?)`, [uuid(), fakeDb[x].name, fakeDb[x].price, fakeDb[x].type, fakeDb[x].stock,
        fakeDb[x].enabled, fakeDb[x].url])
    }
    console.log('Seeding Database')
  } catch (err) {
    console.log('Error Seed Database', err)
  }
}

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DB
})

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }
  if (connection) {
    console.log('DATABASE CONNECTION ==> OK')
    connection.release()
  }
})
pool.query = util.promisify(pool.query)
seedDatabase(pool)
module.exports = pool
