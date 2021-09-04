const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'user name must be minimum 2 chars']
    },
    email: {
        type: String,
        unique: [true, 'email must be unique'],
        required: true
    },
    password: {
        type: String,
        minlength: [8, 'password must be above 8 chars'],
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    todos: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Todo'
        }
    ]
})

const User = mongoose.model('User', userSchema);

module.exports = User;