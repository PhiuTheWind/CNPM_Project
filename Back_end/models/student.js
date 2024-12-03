const database = require('../database/database');

const getStudentByUsername = async (username) => {

    try {
        const [result] = await database.query('SELECT * FROM student WHERE username = ?', [username]);

        return result;

    } catch (err) {
        throw err;
    }
}

async function getPageBalance(username) {
    try {
        const [result] = await database.query(`SELECT page FROM student WHERE username = ?`, [username]);
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

const getInfo_Printer = async () => {
    try {
        const [result] = await database.query('SELECT printer_id, location, status FROM printer');
        return result;
    } catch (err) {
        throw err;
    }
}

async function getStudentLogInfo(username) {
    try {
        const [result] = await database.query(`SELECT E.request_id, E.start_date, E.file_name, F.location, E.status  
                                        FROM request E
                                        JOIN printer F ON F.printer_id = E.printer_id
                                        WHERE E.student_send = ?`, [username]);
        
        return result;
    } catch (err) {
        throw err;
    }
}

async function getStudentLogDetail(username, request_id) {
    try {
        const [result] = await database.query(`SELECT E.file_name, E.start_date, E.received_date, F.location, F.printer_id, E.paper_size, E.page_range, E.side_option, E.num_copies 
                                        FROM request E
                                        JOIN printer F ON F.printer_id = E.printer_id
                                        WHERE E.student_send = ? AND E.request_id = ?`, [username, request_id]);
        
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getStudentByUsername,
    getPageBalance,
    updatePageBalance,
    getStudentLogInfo,
    getStudentLogDetail,
    getInfo_Printer
};