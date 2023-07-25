const { Pool } = require('pg')

module.exports = new Pool({
  user: 'ghostraccoon',
  host: 'localhost',
  database: 'alwaysmusic',
  password: 'admin123',
  min: 3,
  max: 6
})