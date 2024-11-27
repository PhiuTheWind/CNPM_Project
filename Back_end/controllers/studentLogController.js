const getStudentLogInfo = require('../models/student');


const GetStudentLog = async(req, res, next) => {
    try {
        const username = req.userInfo.username, isSPSO = req.userInfo.isSPSO;

        if (username === undefined || isSPSO === undefined) {
            return res.status(404).send("Không có dữ liệu người dùng!");
        }
        if (!isSPSO) {
            result = await getStudentLogInfo(username);
        }
        if (!result) {
            return res.status(400).send('User không tồn tại');
        }
        delete result.password;
        res.json(result);
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    GetStudentLog
};