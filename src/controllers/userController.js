const User = require('../model/User');
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