const blogModel = require('../blog/blogModel')

module.exports.createNewBlog = (req, res) => {

    blogModel.insertBlogDetailsInDB(req.body)
        .then(success => {
            res.send({ status: true, created: true, newDocId: success._id })
        })
        .catch(error => {
            res.send({ status: false, created: false })
        })
        
}