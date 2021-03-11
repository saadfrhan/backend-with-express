const blogModel = require('../blog/blogModel')

module.exports.getListOfAllBlogs = (req, res) => {
    blogModel.findAllMatchingBlogs({})
        .then(foundDocumentsList => {
            res.send({ status: true, found: true, list: foundDocumentsList._id })
        })
        .catch(error => {
            res.send({ status: false, found: false, err: error })
        })
}

module.exports.createNewBlog = (req, res) => {

    blogModel.insertBlogDetailsInDB(req.body)
        .then(success => {
            res.send({ status: true, created: true, newDocId: success._id })
        })
        .catch(error => {
            res.send({ status: false, created: false })
        })

}