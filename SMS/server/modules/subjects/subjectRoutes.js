const express = require('express');
const router = express.Router();
const subjectsDbModel = require('./subjectModel')


router.get("/", (req, res) => {
    console.log("Received request for Subjects default route..!");
    res.send({ status: true })
})

router.get('/list-all', listAllSubjectsFromDB)
router.post("/add-new", addNewSubjectInDB)




module.exports = router;



function addNewSubjectInDB(req, res) {

    subjectsDbModel.saveNewSubject({
        "name": req.body.name,
        "class": req.body.sClass
    })
        .then(success => {
            console.log("subject saved ", success)
            res.send({ saved: true })
        })
        .catch(err => {
            console.log("Error in saving subject ", err)
            res.send({ saved: false })
        })
}

function listAllSubjectsFromDB(req, res) {

    subjectsDbModel.getMatchingSubjects({})
        .then(data => {
            res.send({ found: true, data })
        })
        .catch(err => {
            console.log("Error in finding data from DB");
            res.send({ found: false, err })
        })
}