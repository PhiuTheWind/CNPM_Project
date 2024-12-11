const database = require('../database/database');
const { decreasePage } = require('./page');

async function addRequest(username, body) {
    const file_name = body.file_name;
    const paper_size = body.paper_size;
    const num_copies = body.num_copies;
    var side_option = body.side_option;
    if (body.side_option === "one_side") {
        side_option = 0;
    } else {
        side_option = 1;
    }
    const selected_pages = body.selected_pages;
    const i_status = body.status;
    let start_date = body.start_date;
    let end_date = body.end_date;
    let received_date = body.received_date;
    const student_send = username;
    const printer_id = body.printer_id;
    const num_page = body.num_page
    if (i_status === "Đang in") {
        end_date = null;
        received_date = null;
      } else if (i_status === "Chưa nhận") {
        received_date = null;
      }
    try {
        const query = `
            INSERT IGNORE INTO Request (file_name, paper_size, num_copies, side_option, selected_pages, status, start_date, end_date, received_date, student_send, printer_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [file_name, paper_size, num_copies, side_option, JSON.stringify(selected_pages), i_status, start_date, received_date, end_date, student_send, printer_id];
        var page_consume = 0;
        await database.query(query, values);
        if (selected_pages === "all") {
            if (paper_size === "A4") {
                page_consume = num_page * num_copies / (side_option + 1);
            }
            else {
                page_consume = 2 * num_page * num_copies / (side_option + 1);
            }
        }
        await decreasePage(username, page_consume);
        return true;
    }
    catch (error) {
        console.log(error);
        console.error('Error when storing request.');
        return false;
    }
}

module.exports = {
    addRequest,
};