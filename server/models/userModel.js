// require and load in dotenv so we have access to .env file contents
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.SQL_URI
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
};