const mongoose = require('mongoose');

async function connect(){

    try {
        await mongoose.connect('mongodb://localhost:27017/blog_dev',
        {
            
        });
        console.log('Connecting successful')
    }
    catch{
        console.log('Connect failed')

    }
}

module.exports = { connect }