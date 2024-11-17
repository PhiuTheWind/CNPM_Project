const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.db_host || 'localhost',
    user: process.env.db_user || 'user',
    password: process.env.db_password || '',
    database: process.env.db_name || 'CNPM',
});

module.exports = pool;