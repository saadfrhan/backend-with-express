const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    class: String,
    subjects: [String]
})

const StudentsModel = new mongoose.model('students', StudentSchema);

module.exports.saveNewStudentInDB = (studentData) => {

    let model = new StudentsModel(studentData)

    return new Promise((resolve, reject) => {
        model.save((err, doc) => {
            if (err) {
                console.log("Unable to save new Student ", err)
                return reject(err);
            }
            return resolve(doc);
        })
    })
}

module.exports.getMatchingStudentsFromDB = (query) => {

    return new Promise((resolve, reject) => {

        StudentsModel.find(query, (err, docs) => {
            if (err) {
                console.log("Unable to save new Student ", err)
                return reject(err);
            }
            return resolve(docs);
        })
    })
}
