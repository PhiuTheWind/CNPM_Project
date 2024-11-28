const database = require('../database/database');

const getSPSOByUsername = async (username) => {
    try {
        const [result] = await database.query('SELECT * FROM spso WHERE username = ?', [username]);
        return result;
    } catch (err) {
        throw err;
    }
}

const getInfo_Printer = async () => {
    try {
        const [result] = await database.query('SELECT * FROM printer');
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getSPSOByUsername,
    getInfo_Printer
};