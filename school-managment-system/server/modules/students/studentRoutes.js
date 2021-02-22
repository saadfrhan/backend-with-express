const express = require('express');
const studentDBHelper = require('./studentDBHelper');
const router = express.Router();

router.post('/add-new', createNewStudent)
router.get('/list-all', getListOfAllStudents)
router.delete('/delete/:id', deleteRequestedStudent)
router.get('/list/:studentId', getSelectedStudent)
router.put('/update', updateStudentDetailsInDB)
module.exports = router;

function createNewStudent(req, res) {
    let newStudentDataFromClient = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        class: req.body.studentClass,
        subjects: req.body.subjects
    }
    studentDBHelper.saveNewStudentInDB(newStudentDataFromClient)
        .then(success => {
            res.send({ status: true })
        })
        .catch(err => {
            res.send({ status: false })
        })
}

function getListOfAllStudents(req, res) {
    studentDBHelper.getMatchingStudentsfromDB({})
        .then(success => {
            res.send({ status: true, data: success })
        })
        .catch(err => {
            res.send({ status: false, data: [] })
        })
}

function deleteRequestedStudent(req, res) {
    const id = req.params.id
    studentDBHelper.deleteStudentsById(id)
        .then(success => {
            res.send({ status: true, deleted: true })
        })
        .catch(err => {
            res.send({ status: false, deleted: false })
        })
}

function getSelectedStudent(req, res) {
    const id = req.params.studentId;
    studentDBHelper.getMatchingStudent({ _id: id })
        .then(success => {
            res.send({ status: true, data: success })
        })
        .catch(err => {
            res.send({ status: false, data: null })
        })

}

function updateStudentDetailsInDB(req, res) {

    let studentDetails = req.body.data;

    studentDBHelper.updateOneStudent({ _id: req.body._id }, studentDetails)
        .then(success => {
            res.send({ status: true, updated: true })
        })
        .catch(err => {
            res.send({ status: false, updated: false })
        })
}