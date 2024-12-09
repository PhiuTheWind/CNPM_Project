const { addRequest } = require('../models/request');

const savePrintRequest = async (req, res) => {

    const username = req.userInfo.username

    const result = await addRequest(username, req.body);
    if (result) {
        res.status(200).json({ message: 'Request saved successfully' });
    } else {
        res.status(400).json({ message: 'Failed to save request' });
    }
};

module.exports = {
    savePrintRequest,
};