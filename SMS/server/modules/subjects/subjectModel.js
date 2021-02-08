const mongoose = require('mongoose');

const SubjectsSchema = new mongoose.Schema({
    name: String,
    class: String,
    createdOn: Date
})


const SubjectsModel = new mongoose.model('subjects', SubjectsSchema);


module.exports.saveNewSubject = (data) => {

    let newSubject = new SubjectsModel(data)

    return new Promise((resolve, reject) => {
        newSubject.save((err, doc) => {

            if (err) {
                reject(err);
            } else {
                resolve(doc);
            }
        })
    })

}

module.exports.getMatchingSubjects = (query = {}) => {

    return new Promise((resolve, reject) => {
        SubjectsModel.find(query, (err, matchingDocs) => {
            if (err) {
                reject(err);
            } else {
                resolve(matchingDocs);
            }

        })
    })
}