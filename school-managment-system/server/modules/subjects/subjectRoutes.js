const express = require('express');
const { saveNewSubject, getMatchingSubject } = require('./subjectModel');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('Received!');
    res.send({ status: true })
})

router.get('/list-all', listAllSubjectsFromDB)

router.post('/add-new', addNewSubjectInDB)

module.exports = router;

function addNewSubjectInDB(req, res) {
    console.log('Will try to add new subject details')
    console.log(req.body)

    saveNewSubject({
        'name': req.body.name,
        'class': req.body.sClass
    })
        .then(success => {
            console.log('Saved', success)
            res.send({ saved: true })
        })
        .catch(err => {
            console.log('ERROR', err)
            res.send({ saved: false })
        })
}



function listAllSubjectsFromDB(req, res) {
    getMatchingSubject({})
        .then(data => {
            res.send({ found: true, data })
        })
        .catch(err => {
            console.log('ERROR')
            res.send({ found: false, err })
        })
}