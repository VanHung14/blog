const mongoose = require('mongoose');   
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Post = new Schema({
    title: {type: String, maxlength: 255 },
    description: {type: String, maxlength: 600 }, 
    content: {type: String, maxlength: 3000 }, 
    status: {type: String, default: "public"},
    avatar: {
            data: Buffer,
            contentType: String},
    slug: { type: String, slug: 'title', unique: true },
    idcategory: {type: Object}
  },  
   {
    timestamps: true
  }
  );

module.exports = mongoose.model('Post', Post);