const mongoose = require('mongoose');   
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {type: String, maxlength: 255 },
    avatar: {
            data: Buffer,
            contentType: String},
    post_ids:{ type: Array},
  },  
   {
    timestamps: true
  }
  );

module.exports = mongoose.model('Category', Category);