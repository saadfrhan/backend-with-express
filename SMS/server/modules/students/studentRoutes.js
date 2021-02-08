const express = require('express');
const router = express.Router();
const studentsDBHelper = require('./studentDBHelper')

router.post('/add-new', createNewStudent)
router.get('/list-all', getListOfAllStudents)


module.exports = router;

function createNewStudent(req, res) {

    let newStudentDataFromClient = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        class: req.body.studentClass,
        subjects: req.body.subjects
    }

    studentsDBHelper.saveNewStudentInDB(newStudentDataFromClient)
        .then(success => {
            res.send({ status: true })
        })
        .catch(err => {
            res.send({ status: false })
        })
}

function getListOfAllStudents(req, res) {

    studentsDBHelper.getMatchingStudentsFromDB({})
        .then(success => {
            res.send({ status: true, data: success })
        })
        .catch(err => {
            res.send({ status: false, data: [] })
        })
}