const express = require('express')
const router = express.Router();
const blogController = require('./blogController')

router.get('/', blogController.getListOfAllBlogs)
router.post('/', blogController.createNewBlog)
router.get('/:id', blogController.findRequestedBlog)

module.exports = router;