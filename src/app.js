//?external imports
const express = require('express');
const path = require('path');

//?internal imports

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
//?mongoose
require('./db/conn');

//?route
app.get('/', (req, res) => {
    res.render('pages/user', {
        title: 'user profile'
    })
})

app.get('/register', (req, res) => {
    res.render('pages/register', {
        title: 'Create Account'
    })
})

app.get('/login', (req, res) => {
    res.render('pages/login', {
        title: 'Log in page'
    })
})

//?server listening

app.listen(PORT, () => {
    console.log('connected')
})