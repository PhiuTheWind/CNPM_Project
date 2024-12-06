const database = require('../database/database');

async function addRequest(username, body) {
    const file_name = body.file_name;
    const paper_size = body.paper_size;
    const num_copies = body.num_copies;
    const side_option = body.side_option;
    const selected_pages = body.selected_pages;
    const i_status = body.status;
    const start_date = body.start_date;
    const end_date = body.end_date;
    const received_date = body.received_date;
    const student_send = username;
    const printer_id = body.printer_id;
    try {
        const query = `
            INSERT IGNORE INTO Request (file_name, paper_size, num_copies, side_option, selected_pages, status, start_date, end_date, received_date, student_send, printer_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [file_name, paper_size, num_copies, side_option, JSON.stringify(selected_pages), i_status, start_date, received_date, end_date, student_send, printer_id];

        await database.query(query, values);
        return true;
    }
    catch (error) {
        console.error('Error when storing request.');
        return false;
    }
}

module.exports = {
    addRequest,
};