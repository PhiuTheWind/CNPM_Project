const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getStudentByUsername, setStudentLastUsed } = require('../models/student');
const { getSPSOByUsername, setSPSOLastUsed } = require('../models/spso');

const loginStudent = async (req, res, next) => {
    try {
        // if (req.body.requestedName === '' &&  req.body.password === ''){
        //     return res.status(400).send('Vui lòng nhập tài khoản và mật khẩu');
        // }
        // if (req.body.requestedName === ''){
        //     return res.status(400).send('Vui lòng nhập tài khoản');
        // }
        // if (req.body.password === ''){
        //     return res.status(400).send('Vui lòng nhập mật khẩu');
        // }
        const result = await getStudentByUsername(req.body.requestedName);
        
        if (!result || result.length === 0) {
          return res.status(400).send('Sai tên đăng nhập');
        }
        if (req.body.requestedName !== result[0].username) {
            return res.status(401).send('Sai tên đăng nhập');
        }
        if (req.body.password !== result[0].password) {
            return res.status(401).send('Sai mật khẩu');
        }

        const token = jwt.sign(
        {
            username: result[0].username,
            isSPSO: false,
        }, 
            'group3cnpmcc01', 
            { expiresIn: '1h' }
        );
          
        delete result.password;
        res
            .cookie('auth', token, { maxAge: 3600 * 1000, path: '/' }) 
            .json({ message: 'Đăng nhập thành công!', userInfo: result, token: token });
    }
    catch (err) {
        next(err);
    }
};

const loginSPSO = async (req, res, next) => {
    try {
        const result = await getSPSOByUsername(req.body.requestedName);
        
        if (!result || result.length === 0) {
          return res.status(400).send('Sai tên đăng nhập');
        }
        if (req.body.requestedName !== result[0].username) {
            return res.status(401).send('Sai tên đăng nhập');
        }
        if (req.body.password !== result[0].password) {
            return res.status(401).send('Sai mật khẩu');
        }
        
        const token = jwt.sign(
            {
                username: result[0].username,
                isSPSO: false,
            }, 
                'group3cnpmcc01', 
                { expiresIn: '1h' }
            );
              
        delete result.password;
        res
            .cookie('auth', token, { maxAge: 3600 * 1000, path: '/' }) 
            .json({ message: 'Đăng nhập thành công!', userInfo: result, token: token });
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
        
        if (!result) {
            return res.status(400).send('User không tồn tại');
        }
        
        delete result.password;
        result.last_used = new Date(result.last_used);

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