require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true }).then(() => console.log('connected')).catch((err) => console.log(err))