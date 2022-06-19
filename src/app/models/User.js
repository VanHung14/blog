const config = require('config')
const jwt = require('jsonwebtoken')
// const Joi = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true,
        immutable: true,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    userName:{
        type: String,
        minlength: 5, 
        maxlength: 50,
        required: true,
    },
    age: String,
    gender: Boolean,
    post_ids: { type: Array},
    isAdmin: { type:Boolean, default:false},
})

// enclapsulation method token into User
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, email: this.email, userName: this.userName, age: this.age, gender: this.gender, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
    return token
}

module.exports = mongoose.model('User', userSchema)
