const blogModel = require('../blog/blogModel')

module.exports.getListOfAllBlogs = (req, res) => {
    blogModel.findAllMatchingBlogs({})
        .then(foundDocumentsList => {
            res.send({ status: true, found: true, list: foundDocumentsList })
        })
        .catch(error => {
            res.send({ status: false, found: false, err: error })
        })
}

module.exports.createNewBlog = (req, res) => {
    // console.log('req.session.loggedInUser');
    // console.log(req.session.loggedInUser);
    blogModel.insertBlogDetailsInDB(req.body)
        .then(success => {
            res.send({ status: true, created: true, newDocId: success._id })
        })
        .catch(error => {
            res.send({ status: false, created: false })
        })

}

module.exports.findRequestedBlog = (req, res) => {

    blogModel.findAllMatchingBlogs({_id: req.params.id})
        .then(foundDocumentsList => {
            res.send({ status: true, found: true, requestedBlog: foundDocumentsList[0] })
        })
        .catch(error => {
            res.send({ status: false, found: false, err: error })
        })

}