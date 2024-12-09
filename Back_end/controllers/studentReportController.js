const {papersize_sum} = require('../models/studentreport');
const {fileextentionsum} = require('../models/studentreport');
const {frequencysum} = require('../models/studentreport');


const get_papersizesummary = async(req, res, next) => {
    try {
        const username = req.userInfo.username
        
        const start = req.body.start
        const end = req.body.end
        
        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username are required.',
            });
        }
        result = await papersize_sum(username, start, end);
        
        if (!result) {
            return res.status(400).send('User không tồn tại');
        }
        res.json(result);
    }
    catch (err) {
        next(err)
    }
}

const get_fileextensionsummary = async(req, res, next) => {
    try {
        const username = req.userInfo.username

        const start = req.body.start
        const end = req.body.end

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username are required.',
            });
        }
        result = await fileextentionsum(username, start, end);
        
        if (!result) {
            return res.status(400).send('User không tồn tại');
        }
        res.json(result);
    }
    catch (err) {
        next(err)
    }
}

const get_frequencysummary = async(req, res, next) => {
    try {
        const username = req.userInfo.username

        const year = req.body.year
        
        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username are required.',
            });
        }
        result = await frequencysum(username, year);
        
        if (!result) {
            return res.status(400).send('User không tồn tại');
        }
        res.json(result);
    }
    catch (err) {
        next(err)
    }
}



module.exports = {
    get_papersizesummary,
    get_fileextensionsummary,
    get_frequencysummary
};