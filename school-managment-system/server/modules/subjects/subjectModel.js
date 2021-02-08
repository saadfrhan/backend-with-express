const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    name: String,
    class: String,
    createdOn: Date
})

const SubjectModel = new mongoose.model('subjects', SubjectSchema);

module.exports.saveNewSubject = (data) => {

    let newSubject = new SubjectModel(data)

    return new Promise((resolve, reject) => {
        newSubject.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}

module.exports.getMatchingSubject = (query = {}) => {
    
    return new Promise((resolve, reject) => {
        SubjectModel.find(query, (err, matchingDocs) => {
            if (err) {
                reject(err);
            } else {
                resolve(matchingDocs)
            }
        })
    })
}