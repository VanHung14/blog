
const auth = require('../app/middleware/auth')
const userController = require('../app/controllers/UserController')
const express = require('express')
const router = express.Router()

router.put('/edit', auth, userController.personalUpdate)
router.put('/:id/', auth, userController.update)

module.exports = router