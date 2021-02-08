const mongoose = require('mongoose')
const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    class: String,
    subjects: [String]
})

const StudentModel = new mongoose.model('students', StudentSchema);

module.exports.saveNewStudentInDB = (studentData) => {
    let model = new StudentModel(studentData)

    return new Promise((resolve, reject) => {
        model.save((err, doc) => {
            if(err) {
                console.log('ERROR', err)
                return reject(err)
            }
            return resolve(doc)
        })
    })
}

module.exports.getMatchingStudentsfromDB = (query) => {

    return new Promise((resolve, reject) => {
        StudentModel.find(query, (err, doc) => {
            if(err) {
                console.log('ERROR', err)
                return reject(err)
            }
            return resolve(doc)
        })
    })
}