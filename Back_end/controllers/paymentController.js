const { addPage } = require('../models/page');

const buyPage = async (req, res) => {
    const username = req.userInfo.username;
    const result = await addPage(username, req.body.page);
    if (result) {
        res.status(200).json({ message: 'Successfully adding pages.' });
    } else {
        res.status(400).json({ message: 'Failed adding pages.' });
    }
};

module.exports = {
    buyPage
};