
let express = require('express');
let cookieParser = require('cookie-parser');
let app = express()
app.use(cookieParser());
const bcrypt = require('bcrypt')
const User = require('../models/User')

class UserController{

    // [PUT] /users/:id
    // admin can update info to everyone
    async update(req, res, next) {
        console.log(req.user.isAdmin)
        if(req.user.isAdmin){
            try{
                await User.updateOne({ _id: req.params.id}, req.body)
                const user = await User.findById(req.params.id)
                const salt = await bcrypt.genSalt(10)
                if(req.body.password){
                    user.password = await bcrypt.hash(req.body.password, salt)
                }
                await user.save()
                console.log( req.user._id)
                res.send(user)
            }
            catch(ex){
                res.status(404).send(ex)
            }
        }
        else{
            res.status(403).send('No permission.')
        }
    }
    
    // [PUT] /users/edit
    // user only update to myself
    async personalUpdate(req, res, next){
        try{
            await User.updateOne({ _id: req.user._id}, req.body)
            const user = await User.findById(req.user._id)
            const salt = await bcrypt.genSalt(10)
            if(req.body.password)
            {
                user.password = await bcrypt.hash(req.body.password, salt)
            }
            await user.save()
            res.send(user)
        }
        catch(ex){
            res.status(404).send(ex)
        }
    }
}

module.exports = new UserController;