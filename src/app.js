//?external imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

//?internal imports
const { verifyUser } = require('./middlewares/verify')

//?router
const userRouter = require('./routes/userRoute');

//?mongoose
require('./db/conn');



//?app
const app = express();

//?paths
const static_path = path.join(__dirname, '../public')

//?templates engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//?constants
const PORT = process.env.PORT || 5000

//?middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(static_path));
app.use(cookieParser())

//?route
app.get('/', verifyUser, (req, res) => {
    if (req.isLoggedIn) {
        res.render('pages/user', {
            title: 'user profile',
            isLoggedIn: req.isLoggedIn || false
        })
    } else {
        res.redirect('/user/login')
    }
})

app.use('/user', verifyUser, userRouter);

//?server listening

app.listen(PORT, () => {
    console.log('connected')
})