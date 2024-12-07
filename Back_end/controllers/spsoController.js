const database = require('../database/database');
require('dotenv').config({ path: './.env' });
const envconf = require('../models/envconfig');
const { getInfo_Printer} = require('../models/spso');
// Add a new printer to the database
const add_printer = async (req, res) => {
    const {num_paper, location, status, printer_name, ip} = req.body;

    try {
        // Validate inputs
        if (!num_paper || !location || !status) {
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

module.exports = {
    add_printer,
    get_printer_list,
    refill_paper,
    modify_status,
    get_config,
    patch_config,
};
