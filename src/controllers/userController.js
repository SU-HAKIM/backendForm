const User = require('../model/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.userGetRegister = (req, res, next) => {
    if (req.isLoggedIn) {
        res.redirect('/')
    }
    if (res.headersSent) {
        return next('headers all ready sent')
    }

    res.render('pages/register', {
        title: 'create an account',
        errors: {},
        isLoggedIn: req.isLoggedIn ? req.isLoggedIn : false
    })
}

exports.userGetLogin = (req, res, next) => {
    if (req.isLoggedIn) {
        res.redirect('/')
    }
    if (res.headersSent) {
        return next('headers all ready sent')
    }
    res.render('pages/login', {
        title: 'Log in page',
        errors: {},
        isLoggedIn: req.isLoggedIn ? req.isLoggedIn : false
    })
}

exports.userPostRegister = async (req, res, next) => {
    const errors = validationResult(req).formatWith((error) => error.msg);

    if (!errors.isEmpty()) {
        return res.render('pages/register', {
            title: 'create an account',
            errors: errors.mapped(),
            isLoggedIn: req.isLoggedIn ? req.isLoggedIn : false
        })
    }

    let { username, email, password, confirmPassword } = req.body;
    try {
        if (password === confirmPassword) {
            //bcrypt
            let newPassword = await bcrypt.hash(password, 10);
            //creating user
            let user = new User({ username, email, password: newPassword })
            //generating tokens
            let token = await user.generateToken();
            user.tokens = user.tokens.concat({ token: token })
            //adding user
            const result = await user.save();
            //responses
            res.render('pages/login', {
                title: 'log in page',
                errors: {},
                isLoggedIn: false
            })
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
            errors: errors.mapped(),
            isLoggedIn: req.isLoggedIn ? req.isLoggedIn : false
        })
    }
    let { email } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            res.cookie('jwt', user.tokens[0].token, { httpOnly: true })
            res.redirect('/')
        } else {
            res.cookie('jwt', '')
            res.redirect('/user/register')
        }
    } catch (error) {
        next(error)
    }
}

exports.userGetLogout = async (req, res, next) => {
    try {
        res.clearCookie('jwt');
        res.redirect('/user/login')
    } catch (error) {
        next(error)
    }
}