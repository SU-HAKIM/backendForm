require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

userSchema.statics.generateToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()

        return token
    } catch (error) {
        console.log(error)
    }
}


const User = mongoose.model('User', userSchema);

module.exports = User;