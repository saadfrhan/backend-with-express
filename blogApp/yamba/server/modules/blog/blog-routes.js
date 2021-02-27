const express = require('express')
const router = express.Router();
const blogController = require('./blogController')

router.post('/', blogController.createNewBlog)

module.exports = router;