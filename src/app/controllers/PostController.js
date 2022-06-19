const User = require('../models/User')
const Post = require('../models/Post')
const Category = require('../models/Category');
var fs = require('fs');
var path = require('path');
const mongoose = require('mongoose')

class PostController{

    // [GET] /posts/all
    // get all post of everyone
    async all(req, res, next){
        let post
        try{
            post = await Post.find({})
            res.send(post)
        }
        catch(ex){
            res.send(ex)
        }
    }

    // [GET] /posts/categories/:category
    // get posts divide category
    async category(req, res, next){
        const category = await Category.findById(req.params.idcategory)
        let post
        try{
            post = await Post.find({"_id": category.post_ids})
            res.send(post)
        }
        catch(ex){
            res.send(ex)
        }
    }

    // [GET] /posts/all/:status
    // get all post everyone divide status
    async allWithStatus(req, res, next){
        let posts;
        if(req.params.status){
            posts = await Post.find({"status": req.params.status})
        }
        else{
            posts = await Post.find()
        }
        res.send(posts)
    }
    
    // [GET] /posts/me
    // get all post myself
    async me(req, res, next){
        const user = await User.findById(req.user._id)
        let posts = await Post.find({"_id": user.post_ids})
        res.send(posts)
    }

    // [GET] /posts/me/:status
    // get all post myself divide status
    async meWithstatus(req, res, next){
        const user = await User.findById(req.user._id)
        let posts;
        if(req.params.status){
            posts = await Post.find({"_id": user.post_ids, "status": req.params.status})
        }
        else{
            posts = await Post.find({"_id": user.post_ids})
        }
        res.send(posts)
    }

    // [POST] /posts/create
    // create new post to current user
    // image read from local storage and convert to binary to store in MongoDB
    // default "status": "public", 
    // if request not include idcategory -> post is stored with Category: "Tu do"
    async create(req, res, next){
        const user = await User.findById(req.user._id)
        var category = await Category.findById(req.body.idcategory)
        if(category == null) {
            category = await Category.findOne({"name": "Tự do"})
        }

        let reqPath = path.join(__dirname, '../../');
        var postObj = new Post({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            status: req.body.status,
            avatar: {
                data: fs.readFileSync(path.join(reqPath + 'public/post_img/' + req.file.filename )),
                contentType: 'image/png'
            },
            slug: req.body.slug,
            idcategory: category._id,
        })
       
        try{
            await postObj.save()
            res.send(postObj)
            user.post_ids.push(postObj._id)
            await user.save()
            category.post_ids.push(postObj._id)
            await category.save()
        }
        catch(ex){
            res.send(ex)
        }
        
    }

    // [PUT] /posts/:id
    // update only post of current user
    // update posts req has all fields
    async update(req, res, next) {
        const user = await User.findById(req.user._id)
        
        try{
            let avalablePost = await Post.findById(req.params.id)
            if(avalablePost != null){
                // kiem tra bai post co thuoc user hay ko
                let post = await Post.findOneAndUpdate({$and: [{"_id": user.post_ids}, {"_id": req.params.id} ] }, {$set: req.body}) 
                if(post != null){
                    res.status(200).send('Update successfull')
                }
                else{
                    res.status(403).send('No permission.')
                }
            }
        }
        catch(ex){
            res.status(404).send(ex)
        }
    }

    // [PATCH] /posts/:id
    // update only posts of current user
    // update posts a few fields such as status field 
    async update(req, res, next) {
        const user = await User.findById(req.user._id)
        
        try{
            let avalablePost = await Post.findById(req.params.id)
            if(avalablePost != null){
                // kiem tra bai post co thuoc user hay ko
                let post = await Post.findOneAndUpdate({$and: [{"_id": user.post_ids}, {"_id": req.params.id} ] }, {$set: req.body}) 
                if(post != null){
                    res.status(200).send('Update successfull')
                }
                else{
                    res.status(403).send('No permission.')  
                }
            }
        }
        catch(ex){
            res.status(404).send(ex)
        }
    }

    // [DELETE] /posts/:id
    // delete post of current user
    async delete(req, res, next){
        const user = await User.findById(req.user._id)
        try{
            let avalablePost = await Post.findById(req.params.id)
            if(avalablePost != null){
            let post = await Post.findOneAndDelete({$and: [{"_id": user.post_ids}, {"_id": req.params.id}]})
                if(post != null){
                    
                    var indexpostUser = user.post_ids.indexOf(post._id)
                    user.post_ids.pop(indexpostUser)
                    await user.save()

                    const category = await Category.findById(avalablePost.idcategory)
                    var indexpostCategory = category.post_ids.indexOf(post._id)
                    category.post_ids.pop(indexpostCategory)
                    await category.save()

                    res.status(200).send('Delete successful')
                }
                else {
                    res.status(403).send('No permission.')
                }
            }
        }
        catch(ex){
            res.status(404).send(ex)
        }
    }
}

module.exports = new PostController;
