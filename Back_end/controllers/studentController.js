const infoController = require('../models/pageInformation');

const maintenance = async (req, res) => {
    try {
        const [maintenanceData] = await infoController.maintenance();
        if ([maintenanceData].length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No maintenance data.',
            });
        }
        return res.status(200).json({
            success: true,
            data: maintenanceData[0].content,
        });
    } catch (error) {
        console.error('Maintenance data fetching error !', error);
        res.status(500).json({
            success: false,
            message: 'Maintenance data fetching error !',
        });
    }
};

const guideline = async (req, res) => {
    try {
        const [guidelineData] = await infoController.guideline();
        if ([guidelineData].length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No guideline data.',
            });
        }
        return res.status(200).json({
            success: true,
            data: guidelineData[0].content,
        });
    } catch (error) {
        console.error('Guideline data fetching error !', error);
        res.status(500).json({
            success: false,
            message: 'Guideline data fetching error !',
        });
    }
};

const contact = async (req, res) => {
    try {
        const [contactData] = await infoController.contact();
        if (contactData.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No contact data.',
            });
        }
        return res.status(200).json({
            success: true,
            data: contactData[0].content,
        });
    } catch (error) {
        console.error('Contact data fetching error !', error);
        res.status(500).json({
            success: false,
            message: 'Contact data fetching error !',
        });
    }
};

const savePrintRequest = async (req, res) => {
    const { username, fileName, fileFormat, properties } = req.body;
    try {
        const query = `
            INSERT INTO print_requests (student_id, file_name, file_format, properties)
            VALUES (?, ?, ?, ?)
        `;
        const values = [username, fileName, fileFormat, JSON.stringify(properties)];
        await database.query(query, values);
        res.status(201).json({ success: true, message: 'Request successfully stored.' });
    } catch (error) {
        console.error('Error when storing request.', error);
        res.status(500).json({ success: false, message: 'Request stored failed' });
    }
};

module.exports = {
    maintenance,
    guideline,
    contact,
    savePrintRequest,
};