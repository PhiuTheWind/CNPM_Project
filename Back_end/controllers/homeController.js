const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getStudentByUsername, setStudentLastUsed } = require('../models/student');
const { getSPSOByUsername, setSPSOLastUsed } = require('../models/spso');
// const database = require('../database/database');
// const { get } = require('../routes/get_home_info');

const loginStudent = async (req, res, next) => {
    try {
        const result = await getStudentByUsername(req.body.username);
        
        if (!result) {
          return res.status(400).send('Sai mật khẩu hoặc tên đăng nhập');
        }
        
        bcrypt.compare(req.body.password, result.password, async (bErr, bResult) => {
            if (bErr) {
                return next(bErr);
            }
          
            if (!bResult) {
                return res.status(401).send('Sai mật khẩu hoặc tên đăng nhập');
            }
          
            const token = jwt.sign(
            {
                username: result.username,
                isSPSO: false,
                //type: result.type
            }, 
                'group3cnpmcc01', 
                { expiresIn: '1h' }
            );
          
            // change time of last used (which is now)
            //await setStudentLastUsed(result.username);
          
            delete result.password;
            res
                .cookie('auth', token, { maxAge: 3600 * 1000, path: '/' }) // Cookies valid for 1 hour
                .json({ message: 'Đăng nhập thành công!', userInfo: result, token: token });
        });
    }
    catch (err) {
        next(err);
    }
};

const loginSPSO = async (req, res, next) => {
    try {
        const result = await getSPSOByUsername(req.body.username);
        
        if (!result) {
          return res.status(400).send('Sai mật khẩu hoặc tên đăng nhập');
        }
        
        bcrypt.compare(req.body.password, result.password, async (bErr, bResult) => {
            if (bErr) {
                return next(bErr);
            }
          
            if (!bResult) {
                return res.status(401).send('Sai mật khẩu hoặc tên đăng nhập');
            }
          
            const token = jwt.sign(
                {
                    username: result.username,
                    isSPSO: true,
                }, 
                'group3cnpmcc01', 
                { expiresIn: '1h' }
            );
          
            // change time of last used (which is now)
            //await setSPSOLastUsed(result.username);
          
            delete result.password;
            res
                .cookie('auth', token, { maxAge: 3600 * 1000, path: '/' }) // Cookies valid for 1 hour
                .json({ message: 'Đăng nhập thành công!', userInfo: result, token: token });
        });
    }
    catch (err) {
        next(err);
    }
};

const getUserByUsername = async(req, res, next) => {
    try {
        const username = req.userInfo.username, isSPSO = req.userInfo.isSPSO;
        if (username === undefined || isSPSO === undefined) {
            return res.status(404).send("Không có dữ liệu người dùng!");
        }
        let result;

        if (isSPSO) {
            result = await getSPSOByUsername(username);
        }
        else {
            result = await getStudentByUsername(username);
        }
        
        // user does not exists, which should never occur after authentication 
        if (!result) {
            return res.status(400).send('User không tồn tại');
        }
        
        // Modify data before sending
        delete result.password;
        result.last_used = new Date(result.last_used);
        
        // Send data
        res.json(result);
    }
    catch (err) {
        next(err);
    }
  }


module.exports = {
    loginStudent,
    loginSPSO,
    getUserByUsername
};