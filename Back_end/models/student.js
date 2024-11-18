const database = require('../database/database');

const getStudentByUsername = async (username) => {
    try {
        const [result] = await database.query('SELECT * FROM student WHERE username = ?', [username]);
        return result[0];
    } catch (err) {
        throw err;
    }
}

async function getPageBalance(username) {
    try {
        const [result] = await db.query(`SELECT page FROM student WHERE username = ?`, [username]);
        return result[0].page;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getStudentByUsername,
    getPageBalance
};