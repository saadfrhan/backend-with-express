const { query } = require('express');
const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
    category: String,
    title: String,
    tagline: String,
    body: String,
    createdAt: { type: Date, default: Date.now }
})

const BlogModel = new mongoose.model('blogs', BlogSchema);

module.exports.insertBlogDetailsInDB = (blogDetails) => {

    return new Promise((resolve, reject) => {
        let blogInstance = new BlogModel(blogDetails);
        blogInstance.save((err, doc) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            resolve(doc)
        })
    })

}

module.exports.findAllMatchingBlogs = (query) => {
    return new Promise((resolve, reject) => {
        BlogModel.find(query, (err, docs) => {
            if (err) {
                console.log("error", err);
                return reject(err)
            }
            resolve(docs)
        })
    })
}