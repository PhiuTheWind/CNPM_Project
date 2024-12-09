const database = require('../database/database');

async function addPage(username, page) {
    try {
        await database.query(`
            UPDATE Student SET page_num = page_num + ? WHERE username = ?    
        `, [page, username]);
        return true;
    }
    catch (error) {
        console.log('Change page error.');
        return false;
    }
}

async function decreasePage(username, page) {
    try {
        await database.query(`
            UPDATE Student SET page_num = page_num - ? WHERE username = ?    
        `, [page, username]);
        return true;
    }
    catch (error) {
        console.log('Change page error.');
        return false;
    }
}

module.exports = {
    addPage,
    decreasePage,
};
