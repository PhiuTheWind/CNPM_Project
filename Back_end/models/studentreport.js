const database = require('../database/database');


const papersize_sum = async (username, start, end) => {
    try {

        let timeCondition = '';
        let queryParams = [];
        
        if (start && end) {
            timeCondition = 'start_date BETWEEN ? AND ?';
            queryParams.push(start, end);
        } else if (start) {
            timeCondition = 'start_date >= ?';
            queryParams.push(start);
        } else if (end) {
            timeCondition = 'start_date <= ?';
            queryParams.push(end);
        } else {
            timeCondition = '1=1'; 
        }
        queryParams.push(username);

        const [resultA4] = await database.query(
            `SELECT COUNT(*) AS total_A4
             FROM Request 
             WHERE paper_size = 'A4' 
               AND ${timeCondition}
               AND student_send = ?`,
            queryParams
        );

        const [resultA3] = await database.query(
            `SELECT COUNT(*) AS total_A3
             FROM Request 
             WHERE paper_size = 'A3' 
               AND ${timeCondition}
               AND student_send = ?`,
            queryParams
        );

        return [resultA4[0].total_A4, resultA3[0].total_A3];
    } catch (err) {
        throw err;
    }
};

const fileextentionsum = async (username, start, end) => {
 try {
 
        let timeCondition = '';
        let queryParams = [];

        if (start && end) {
            timeCondition = 'start_date BETWEEN ? AND ?';
            queryParams.push(start, end);
        } else if (start) {
            timeCondition = 'start_date >= ?';
            queryParams.push(start);
        } else if (end) {
            timeCondition = 'start_date <= ?';
            queryParams.push(end);
        } else {
            timeCondition = '1=1'; 
        }

        queryParams.push(username);

        const [resultPDF] = await database.query(
            `SELECT COUNT(*) AS total_pdf
             FROM Request 
             WHERE file_name LIKE '%.pdf' 
               AND ${timeCondition}
               AND student_send = ?`,
            queryParams
        );

        const [resultDOC] = await database.query(
            `SELECT COUNT(*) AS total_doc
             FROM Request 
             WHERE file_name LIKE '%.doc' 
               AND ${timeCondition}
               AND student_send = ?`,
            queryParams
        );

        const [resultJPG] = await database.query(
            `SELECT COUNT(*) AS total_jpg
             FROM Request 
             WHERE file_name LIKE '%.jpg' 
               AND ${timeCondition}
               AND student_send = ?`,
            queryParams
        );

        const [resultPNG] = await database.query(
            `SELECT COUNT(*) AS total_png
             FROM Request 
             WHERE file_name LIKE '%.png' 
               AND ${timeCondition}
               AND student_send = ?`,
            queryParams
        );
        return [resultPDF[0].total_pdf, resultDOC[0].total_doc, resultJPG[0].total_jpg, resultPNG[0].total_png];
    } catch (err) {
        throw err;
    }
}

const frequencysum = async (username, year) => {
    try {

        console.log("year", year);


        if (!year) {
            const currentDate = new Date();
            year = currentDate.getFullYear(); 
        } else {

            const parsedYear = new Date(year);
            year = parsedYear.getFullYear();
        }

        const result = new Array(12).fill(0);

        for (let month = 1; month <= 12; month++) {
            const monthStart = `${year}-${String(month).padStart(2, '0')}-01`;
            const monthEnd = `${year}-${String(month).padStart(2, '0')}-31`;

            const queryParams = [monthStart, monthEnd, username];

            const [resultMonth] = await database.query(
                `SELECT COUNT(*) AS total_requests
                 FROM Request 
                 WHERE start_date BETWEEN ? AND ? 
                   AND student_send = ?`,
                queryParams
            );
            result[month - 1] = resultMonth[0].total_requests;
        }

        return result;
    } catch (err) {
        throw err;
    }
}


module.exports = {
    papersize_sum,
    fileextentionsum,
    frequencysum
};