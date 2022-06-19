const auth = require('../app/middleware/auth')
const express = require('express')
const router = express.Router()

const categoryController = require('../app/controllers/CategoryController')
var multer = require('multer')

// image is stored in local folder, then convert to binary stored in mongodb
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src\\public\\category_img')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
    }
});
var upload = multer({ storage: storage });
var type = upload.single('avatar');
router.post('/create', [type, auth], categoryController.create)

module.exports = router