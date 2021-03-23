const blogModel = require('../blog/blogModel')
const fileUploadHelper = require('../../helpers/fileUploader/fileUploader')
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
    let blogDetails = JSON.parse(req.body.blogDetails);
    fileUploadHelper.uploadImageToCloudinary(req.file.buffer.toString('base64'))
        .then(uploadResult => {
            blogDetails.headerImageURL = uploadResult.url
            return blogModel.insertBlogDetailsInDB(req.body)
        })
        .then(success => {
            res.send({ status: true, created: true, newDocId: success._id })
        })
        .catch(error => {
            console.log("Error, ", error);
            res.send({ status: false, created: false })
        })
}

module.exports.findRequestedBlog = (req, res) => {

    blogModel.findAllMatchingBlogs({ _id: req.params.id })
        .then(foundDocumentsList => {
            res.send({ status: true, found: true, requestedBlog: foundDocumentsList[0] })
        })
        .catch(error => {
            res.send({ status: false, found: false, err: error })
        })

}