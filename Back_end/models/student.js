const database = require('../database/database');

const getStudentByUsername = async (username) => {
    try {
        //const [result] = await database.query('SELECT * FROM student WHERE username = ?', [username]);
        //return result[0];
        const [result]=[{ name: 'Nguyen Van A', pagebalance: 3 }]

        return result;
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

async function updatePageBalance(username, addedPage) {
    try {
        const cur_balance = await getPageBalance(username);
        
        const updatedBalance = cur_balance + Number(addedPage);
        
        const [result, ] = await db.query(
            "UPDATE student SET page = ? WHERE username = ?",
            [updatedBalance, username]
        );
        return result;
    } catch (err) {
        throw err;
    }
  }

module.exports = {
    getStudentByUsername,
    getPageBalance,
    updatePageBalance,
};