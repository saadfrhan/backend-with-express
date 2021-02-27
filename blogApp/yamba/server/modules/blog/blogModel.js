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