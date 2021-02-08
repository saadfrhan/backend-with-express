const express = require('express');
const { saveNewStudentInDB, getMatchingStudentsfromDB } = require('./studentDBHelper');
const router = express.Router();

router.post('/add-new', createNewStudent)
router.get('/list-all', getListOfAllStudents)
router.delete('/delete/:id', deleteRequestedStudent)

module.exports = router;

function createNewStudent(req, res) {
    let newStudentDataFromClient = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        class: req.body.studentClass,
        subjects: req.body.subjects
    }
    saveNewStudentInDB(newStudentDataFromClient)
        .then(success => {
            res.send({ status: true })
        })
        .catch(err => {
            res.send({ status: false })
        })
}

function getListOfAllStudents(req, res) {
    getMatchingStudentsfromDB({})
        .then(success => {
            res.send({ status: true, data: success })
        })
        .catch(err => {
            res.send({ status: false, data: [] })
        })
}

function deleteRequestedStudent(req, res){
    
}