const router = require('express').Router();
const { body } = require('express-validator');
const User = require('../model/User');


const { userGetRegister, userGetLogin, userPostRegister, userPostLogin } = require('../controllers/userController');

const registerValidator = [
    body('username')
        .isLength({ min: 2, max: 15 })
        .withMessage('User name must be between 2 to 15 chars'),
    body('email')
        .isEmail()
        .withMessage('Invalid email syntax')
        .not()
        .isEmpty()
        .withMessage('Enter a valid email')
        .custom(async (email) => {
            let user = await User.findOne({ email: email })
            if (user) {
                return Promise.reject('user already in use')
            }
        })
        .normalizeEmail(),
    body('password')
        .isLength({ min: 5 })
        .withMessage('password must be above 5 chars'),
    body('confirmPassword')
        .isLength({ min: 5 })
        .withMessage('password must be above 5 chars')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                return Promise.reject('password must match')
            }
        })
]

const loginValidator = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('enter valid password')
        .isEmail()
        .withMessage('Invalid email syntax')
        .custom(async (email) => {
            let user = await User.findOne({ email: email })
            if (!user) {
                return Promise.reject('Incorrect information')
            }
        }),
    body('password')
        .not()
        .isEmpty()
        .withMessage('enter password')
        .custom(async (password, { req }) => {
            console.log(password)
            let user = await User.findOne({ email: req.email })
            if (!user) {
                return Promise.reject('Incorrect information')
            }
            if (password !== user.password) {
                return Promise.reject('Incorrect information')
            }
        })
]



router.get('/register', userGetRegister)
router.get('/login', userGetLogin)

router.post('/register', registerValidator, userPostRegister)
router.post('/login', loginValidator, userPostLogin)




module.exports = router;