const User = require('../models/User')
const Post = require('../models/Post')
const Category = require('../models/Category')
var fs = require('fs');
var path = require('path');


class CategoryController{

    // [POST] /categories/create
    // create category
    // image read from local storage and convert to binary to store in MongoDB

    async create(req, res, next){

        let reqPath = path.join(__dirname, '../../');
        var category = new Category({
            name: req.body.name,
            avatar: {
                data: fs.readFileSync(path.join(reqPath + 'public/category_img/' + req.file.filename )),
                contentType: 'image/png'
            },
            post_ids: Array,
        })
        try{
            await category.save()
            res.status(200).send(category)
        }
        catch(ex){
            res.send(ex)
        }
    }
}

module.exports = new CategoryController;
