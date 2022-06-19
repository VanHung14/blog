const auth = require('../app/middleware/auth')
const express = require('express')
const router = express.Router()
const postController = require('../app/controllers/PostController')
var multer = require('multer')

// image is stored in local folder, then convert to binary stored in mongodb

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src\\public\\post_img')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
    }
});
var upload = multer({ storage: storage });
var type = upload.single('avatar');

router.get('/all', auth, postController.all)
router.get('/all/:status', auth, postController.allWithStatus)
router.get('/categories/:idcategory', auth, postController.category)
router.get('/me/', auth, postController.me)
router.get('/me/:status', auth, postController.meWithstatus)

router.post('/create', [type, auth], postController.create)
router.patch('/:id/', auth, postController.update)
router.delete('/:id/', auth, postController.delete)

module.exports = router