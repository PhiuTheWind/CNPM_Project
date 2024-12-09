const {getStudentLogInfo} = require('../models/student');


const GetStudentLog = async(req, res, next) => {
    try {
        const username = req.userInfo.username
      

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username are required.',
            });
        }
        result = await getStudentLogInfo(username);
        
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
    GetStudentLog,
};