const { addRequest } = require('../models/request');

const savePrintRequest = async (req, res) => {
    const result = await addRequest(req.body);
    if (result) {
        res.status(200).json({ message: 'Request saved successfully' });
    } else {
        res.status(400).json({ message: 'Failed to save request' });
    }
};

module.exports = {
    savePrintRequest,
};