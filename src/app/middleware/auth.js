let express = require('express');
let cookieParser = require('cookie-parser');
let app = express()
app.use(cookieParser());

const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next){
    let token= ''
    if(req.headers.cookie != undefined){
        token = req.headers.cookie.split('=')[1]
    }
    if(!token) 
    {
        return res.status(401).send('Access denied. No token provided')
    }
    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        next()
    }
    catch(ex){
        res.status(400).send('Invalid token')
    }
}
