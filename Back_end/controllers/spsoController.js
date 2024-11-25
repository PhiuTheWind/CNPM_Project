const database = require('../database/database');

// Add a new printer to the database
const add_printer = async (req, res) => {
    const { name, ipAddress, status, settings } = req.body;

    try {
        // Validate inputs
        if (!name || !ipAddress || !status) {
            return res.status(400).json({
                success: false,
                message: 'Name, IP address, and status are required.',
            });
        }

        const query = `
            INSERT INTO printers (name, ip_address, status, settings)
            VALUES (?, ?, ?, ?)
        `;
        const values = [name, ipAddress, status, JSON.stringify(settings)];

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
            UPDATE printers
            SET settings = ?
            WHERE id = ?
        `;
        const values = [JSON.stringify(newSettings), printerId];

        const result = await database.query(query, values);

        // Check if a row was updated
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Printer not found or no changes applied.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Printer settings updated successfully.',
        });
    } catch (error) {
        console.error('Error updating printer settings:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update printer settings.',
        });
    }
};

module.exports = {
    addNewPrinter,
    change_PrinterSetting,
};
