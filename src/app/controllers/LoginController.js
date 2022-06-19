const User = require('../models/User')
const bcrypt = require('bcrypt')


class LoginController{

    // [POST] /login
    async login(req, res) {
        let user = await User.findOne({ email: req.body.email})
        if(!user) return res.status(400).send('Invalid email or password')
    
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send('Invalid email or password')

        const token = user.generateAuthToken()
        res.cookie("token", token)
        // res.header('x-auth-token', token).send(user, ['_id','email','userName'])
        res.header('x-auth-token', token).send(user)
    }
    // [POST] /register
    async register(req, res) {
    
        let user = await User.findOne({ email: req.body.email})
        if(user) return res.status(400).send('User already registered')
    
        user = new User({
            email: req.body.email,
            password: req.body.password,
            userName: req.body.userName,
            age: req.body.age,
            gender: req.body.gender,
            post_ids: Array,
            isAdmin: req.body.isAdmin,
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save() 

        const token = user.generateAuthToken()
        res.header('x-auth-token', token).send(user)
    }

    // [GET] /logout
    async logout(req, res, next){
        return res.clearCookie('token').send('Logout successful')
    }
}

module.exports = new LoginController;
