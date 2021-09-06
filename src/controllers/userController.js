const User = require('../model/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.userGetRegister = (req, res) => {
    res.render('pages/register', {
        title: 'create an account',
        errors: {}
    })
}

exports.userGetLogin = (req, res) => {
    res.render('pages/login', {
        title: 'Log in page',
        errors: {}
    })
}

exports.userPostRegister = async (req, res, next) => {
    const errors = validationResult(req).formatWith((error) => error.msg);

    if (!errors.isEmpty()) {
        return res.render('pages/register', {
            title: 'create an account',
            errors: errors.mapped()
        })
    }

    let { username, email, password, confirmPassword } = req.body;
    try {
        if (password === confirmPassword) {
            let newPassword = await bcrypt.hash(password, 10);
            let user = new User({ username, email, newPassword })
            let token = User.generateToken();
            const result = await user.save();
            console.log(token, result)
            res.redirect('/login')
        } else {
            next('password is not matching')
        }
    } catch (error) {
        next(error)
    }
}

exports.userPostLogin = async (req, res, next) => {
    const errors = validationResult(req).formatWith((error) => error.msg);

    if (!errors.isEmpty()) {
        return res.render('pages/login', {
            title: 'Log in page',
            errors: errors.mapped()
        })
    }
    try {

    } catch (error) {
        next(error)
    }
}