const express = require("express");
const router = express.Router();

const Result = require("../models/resultsSchema")

router.get('/getResult', (req, res) => {
    Result.find()
        .then(result => res.json(result))
        .catch(err => res.status(400).json({ error: err }))
})

router.get('/getResultByID/:id', (req, res) => {
    Result.findById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(400).json({ error: err }))
})

router.post('/addResult', (req, res) => {
    const { Assessment, ObtainedMarks, TotalMarks, EnrollmentID } = req.body;
    Result.find()
        .then((result) => {
            const id = result.length === 0 ? "000001" : ("000000" + String(parseInt(result[result.length - 1]._id) + 1)).slice(-6);
            const newResult = new Result({ _id: id, Assessment: Assessment, ObtainedMarks: ObtainedMarks, TotalMarks: TotalMarks, EnrollmentID: EnrollmentID })

            newResult.save()
                .then(() => res.json({ id: id, addStatus: "Result Marked" }))

        }).catch((err) => { res.status(500).json({ error: err }) })

})

router.get('/getResultByEnrollmentID/:enrollment', (req, res) => {
    Result.find({ EnrollmentID: req.params.enrollment })
        .then(result => res.json(result))
        .catch(err => res.status(400).json({ error: err }))
})

router.post('/addResult', (req, res) => {
    Result.insertMany(req.body)
        .then(() => res.json({}))
        .catch((err) => { res.status(500).json({ error: err }) })

})

router.post('/updateResult/:id', (req, res) => {
    Result.findById(req.params.id)
        .then(result => {

            result.Assessment = req.body.Assessment
            result.ObtainedMarks = req.body.ObtainedMarks
            result.TotalMarks = req.body.TotalMarks
            result.EnrollmentID = req.body.EnrollmentID

            result.save()
                .then(() => res.json("Result Updated"))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))

})

router.delete('/deleteResult/:id', (req, res) => {
    Result.findByIdAndDelete(req.params.id)
        .then(() => res.status(201).json("Result Deleted"))
        .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router