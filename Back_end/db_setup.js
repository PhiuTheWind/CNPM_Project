const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config({ path: './.env' });

const connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    multipleStatements: true
});

const sql = fs.readFileSync('./db.sql', 'utf8');

const cleanedSql = sql.replace(/[\r\n\t]/g, " ").trim();

const queries = cleanedSql.split(';').map(query => query.trim()).filter(query => query !== '');

function setupDatabase() {
    if (queries[0].toLowerCase().startsWith('create database')) {
        connection.query(queries[0], (err, results) => {
            if (err) {
                console.error("Error creating database:", err);
            }
            executeCreateTables();
        });
    } else {
        executeCreateTables();
    }
}

function executeCreateTables() {
    queries.slice(1).forEach(query => {
        connection.query(query, (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                process.exit(1);
            }
        });
    });
    connection.end();
    console.log("Database setup successfully!\n");
    console.log("Default SPSO account: spso1 password1\n");
    console.log("Default Student account: student1 password1");
}

module.exports = {
    setupDatabase,
    executeCreateTables,
    connection
};
