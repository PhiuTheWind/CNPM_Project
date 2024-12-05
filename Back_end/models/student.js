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
        const [result] = await database.query(`SELECT E.file_name, E.request_id, E.paper_size, E.num_copies, E.side_option, E.selected_pages, E.status, E.start_date, E.end_date, E.received_date, E.student_send, E.printer_id, F.location
                                        FROM request E
                                        JOIN printer F ON F.printer_id = E.printer_id
                                        WHERE E.student_send = ?
                                        ORDER BY E.end_date DESC`, [username]);
        
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
    getInfo_Printer
};