const database = require('../database/database');
require('dotenv').config({ path: './.env' });
const envconf = require('../models/envconfig');
const { getInfo_Printer} = require('../models/spso');
// Add a new printer to the database
const add_printer = async (req, res) => {
    const {num_paper, location, status, printer_name, ip} = req.body;

    try {
        // Validate inputs
        if (!location || !status) {
            return res.status(400).json({
                success: false,
                message: 'Missing are required.',
            });
        }

        const query = `
            INSERT INTO printer (num_paper, location, status, printer_name, ip)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [num_paper, location, status, printer_name, ip];

        await database.query(query, values);
        return res.status(201).json({
            success: true,
            message: 'Printer added successfully.',
        });
    } catch (error) {
        console.error('Error adding new printer:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to add new printer.',
        });
    }
};

const refill_paper = async (req, res) => {
    const { printer_id } = req.body;

    try {
        // Validate inputs
        if (!printer_id) {
            return res.status(400).json({
                success: false,
                message: 'Printer ID is required.',
            });
        }

        if (isNaN(printer_id)) {
            return res.status(400).json({
                success: false,
                message: 'Printer ID must be a numeric value.',
            });
        }

        // Update the printer's paper count
        const updateQuery = `
            UPDATE printer
            SET num_paper = 500
            WHERE printer_id = ?
        `;
        const updateResult = await database.query(updateQuery, [printer_id]);

        // Check if a row was updated
        if (updateResult.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Printer with ID ${printer_id} not found or already has 500 papers.`,
            });
        }

        // Fetch the updated printer details
        const [updatedPrinter] = await database.query(
            'SELECT * FROM printer WHERE printer_id = ?',
            [printer_id]
        );

        return res.status(200).json({
            success: true,
            message: `Printer with ID ${printer_id} refilled successfully.`,
            data: updatedPrinter,
        });
    } catch (error) {
        console.error('Error refilling printer paper:', error);

        // Handle database-specific errors (e.g., syntax or connection issues)
        return res.status(500).json({
            success: false,
            message: 'Failed to refill printer paper. Please try again later.',
        });
    }
};


// Update settings of an existing printer
const modify_status = async (req, res) => {
    const { printerId, newSettings } = req.body;

    try {
        // Validate inputs
        if (!printerId || !newSettings) {
            return res.status(400).json({
                success: false,
                message: 'Printer ID and new settings are required.',
            });
        }

        const query = `
            UPDATE printer
            SET status = ?
            WHERE printer_id = ?
        `;
        const values = [newSettings, printerId];

        const result = await database.query(query, values);

        // Check if a row was updated
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Printer not found or no changes applied.',
            });
        }

        const [updatedPrinter] = await database.query('SELECT * FROM printer WHERE printer_id = ?', [printerId]);
        return res.status(200).json({
            success: true,
            message: 'Printer settings updated successfully.',
            data: updatedPrinter,
        });
    } catch (error) {
        console.error('Error updating printer settings:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update printer settings.',
        });
    }
};


const get_printer_list = async (req, res, next) => {
    try {
        const result = await getInfo_Printer();
        const format_printer_ID = result.map(printer => ({
            ...printer,
            //printer_id: `PRINTER#${printer.printer_id}`
            printer_id: printer.printer_id
        }));
        //console.log(format_printer_ID)
        res.status(200).json({
            success: true,
            message: "Printer list fetched successfully",
            data: format_printer_ID
        });
    } catch (error) {
        console.error('Error get printer list:', error);
        return res.status(501).json({
            success: false,
            message: 'Failed to get printer list.',
        });
    }
};


const get_config = async (req, res) => {
    if (!process.env.defaultdate || !process.env.defaultpage || !process.env.defaulttype) {
        return res.status(404).json({
            success: false,
            message: "No configuration on server exists !",
        });
    }
    return res.status(200).json({
        success: true,
        page: process.env.defaultpage,
        date: process.env.defaultdate,
        type: process.env.defaulttype,
    });
};

const patch_config = async (req, res) => {
    const { page, date, type } = req.body;
    if (page) {
        envconf.update('defaultpage', page);
    }
    if (date) {
        envconf.update('defaultdate', date);
    }
    if (type) {
        envconf.update('defaulttype', type);
    }
    return res.status(200).json({
        success: true,
        message: 'Configuration updated successfully.',
    });

};

const get_history = async (req, res) => {
    const { printer_id } = req.body;
    //const {printer_id } = query;
    if (!printer_id) {
        return res.status(400).json({
            success: false,
            message: 'Printer ID is required.',
        });
    }
    
    try {
        // SQL query to join 'request' and 'printer' tables
        const query = `
            SELECT 
                r.file_name,
                r.request_id,
                r.paper_size,
                r.num_copies,
                r.side_option,
                r.selected_pages,
                r.status AS request_status,
                r.start_date,
                r.end_date,
                r.received_date,
                r.student_send,
                p.location,
                s.stu_id,
                s.stu_name
            FROM 
                request r
            JOIN 
                printer p ON r.printer_id = p.printer_id
            JOIN
                student s ON r.student_send = s.username
            WHERE 
                r.printer_id = ?;
        `;

        // 
        const [result] = await database.query(query, [printer_id]);

        // Check if the query returns any results
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: 'History fetched successfully.',
                data: result,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: `No history found for printer with ID ${printer_id}.`,
            });
        }
    } catch (error) {
        console.error('Error fetching history:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch history. Please try again later.',
        });
    }

};

const get_history_all = async (req, res) => {
    try {
        const query = `
            SELECT 
                r.printer_id,
                r.file_name,
                r.request_id,
                r.paper_size,
                r.num_copies,
                r.side_option,
                r.selected_pages,
                r.status AS request_status,
                r.start_date,
                r.end_date,
                r.received_date,
                r.student_send,

                p.location,
                s.stu_id,
                s.stu_name
            FROM 
                request r
            JOIN 
                printer p ON r.printer_id = p.printer_id
            JOIN 
                student s ON r.student_send = s.username;
        `;

        const [result] = await database.query(query);
        
        return res.status(200).json({
            success: true,
            message: 'History retrieved successfully.',
            data: result
        });
    } catch (error) {
        console.error('Error retrieving history:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve history.',
        });
    }
};

const get_yearly_statistics = async (req, res) => {
    const year = req.body.year;  // Retrieve the year from the body
    
    if (!year) {
        return res.status(400).json({ success: false, message: 'Year is required.' });
    }

    try {
        // Fetch data for the specified year
        const query = `
            SELECT 
                printer_id,
                file_name, 
                paper_size, 
                end_date
            FROM request 
            WHERE YEAR(end_date) = ?
        `;
        const [results] = await database.query(query, [year]);

        // Initialize counts
        const paperSizeCount = [0, 0]; // [Count_A4, Count_A3]
        const fileExtensionsCount = {};
        const monthFrequency = Array(12).fill(0); // Array for 12 months
        const printerFrequency ={};

        results.forEach(row => {
            // Count paper sizes
            //paperSizeCount[0] += 1;
            if (row.paper_size == 'A4') {
                paperSizeCount[0] += 1;
            } else if (row.paper_size == 'A3') {
                paperSizeCount[1] += 1;
            }

            // Count file extensions
            const fileName = row.file_name;
            if(fileName){
                const extension = fileName.split('.').pop();
                fileExtensionsCount[extension] = (fileExtensionsCount[extension] || 0) + 1;
            }
            

            //Count months, format yyyy/mm/dd
            const endDate = row.end_date;
            if(endDate)
            {
                const dateObj = new Date(endDate);
                const month = dateObj.getMonth(); // Extract month (0-11)
                if (month >= 0 && month <= 11) {
                    monthFrequency[month] += 1;
            }   
            }

            const ID = row.printer_id;
            if (ID) {
                const printerKey = `Printer#${ID}`;
                //printerFrequency[printerKey] = (printerFrequency[printerKey] || 0) + 1;
                printerFrequency[printerKey] = {
                    id: ID,
                    count: (printerFrequency[printerKey]?.count || 0) + 1
                };
            }
            
        });

        // const printerFrequencyArray = Object.entries(printerFrequency).map(([key, value]) => ({
        //     [key]: value
        // }));

        // Prepare the response
        const statistics = {
            paper_size: paperSizeCount,
            file_extension: fileExtensionsCount,
            printer_frequency: printerFrequency,
            month_frequency: monthFrequency
        };

        // Return the response
        return res.status(200).json({
            success: true,
            message: `Statistics for the year ${year} retrieved successfully.`,
            data: statistics
        });

    } catch (error) {
        console.error('Error retrieving yearly statistics:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve yearly statistics.',
        });
    }
};





module.exports = {
    add_printer,
    get_printer_list,
    refill_paper,
    modify_status,
    get_config,
    patch_config,
    get_history,
    get_history_all,
    get_yearly_statistics
};
