const { Pool } = require('pg');

const SQL_URI = 'postgres://pvmwexss:ZXwHc0j_bTVGao_gZwqV65rPwI-ORix-@isilo.db.elephantsql.com/pvmwexss';

const pool = new Pool({
    connectionString: SQL_URI
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
};