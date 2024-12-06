const infoController = require('../models/pageInformation');
const { getInfo_Printer, getPageBalance } = require('../models/student');

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

const get_printer_list_for_student = async (req, res, next) => {
    try {
        const result = await getInfo_Printer();
        const format_printer_ID = result.map(printer => ({
            ...printer,
            printer_id: `PRINTER#${printer.printer_id}`
        }));

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

const get_pagebalance = async (req, res, next) => {
    try {
        const username = req.userInfo.username;
        const result = await getPageBalance(username);

        res.status(200).json({
            success: true,
            message: "page balance fetched successfully",
            data: result
        });
    } catch (error) {
        console.error('Error get page balance:', error);
        return res.status(501).json({
            success: false,
            message: 'Failed to get page balance',
        });
    }
};

module.exports = {
    maintenance,
    guideline,
    contact,
    get_printer_list_for_student,
    get_pagebalance
};