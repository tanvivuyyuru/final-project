const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const Students = require("../models/studentsSchema")

router.get('/getStudents', (req, res) => {
    Students.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json({ error: err }))
})

router.get('/getStudentByID/:id', (req, res) => {
    Students.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json({ error: err }))
})

router.get('/getMultipleStudentsByID/:id', (req, res) => {
    Students.find({_id: { $in: req.params.id.split(",") } })
        .then(students => res.json(students))
        .catch(err => res.status(400).json({ error: err }))
})

router.get('/getStudentByUserID/:userID', (req, res) => {
    Students.findOne({ UserID: req.params.userID })
        .then(student => res.json(student))
        .catch(err => res.status(400).json({ error: err }))
})

router.post('/addStudent', upload.single("ImageSelected"), (req, res) => {
    const {
        UserID,
        Name,
        Program,
        Semester,
        Email,
        Phone,
        PresentAddress,
        PermanentAddress,
        DOB,
        Gender,
        CNIC,
        FatherName,
        FatherCNIC,
        FatherPhone,
        FatherOccupation,
        City,
        PostalCode,
        Department
    } = req.body;
    Students.find()
        .then((students) => {
            const id = students.length === 0 ? "000000000001" : ("000000000000" + String(parseInt(students[students.length - 1]._id) + 1)).slice(-12);
            const newStudent = new Students({
                _id: id,
                UserID: UserID,
                Name: Name,
                Program: Program,
                Semester: Semester,
                Email: Email,
                Phone: Phone,
                PresentAddress: PresentAddress,
                PermanentAddress: PermanentAddress,
                DOB: DOB,
                Gender: Gender,
                CNIC: CNIC,
                FatherName: FatherName,
                FatherCNIC: FatherCNIC,
                FatherPhone: FatherPhone,
                GuardianOccupation: FatherOccupation,
                City: City,
                PostalCode: PostalCode,
                Image: req.file.filename,
                Department: Department
            })

            newStudent.save()
                .then(() => res.json({ id: id, addStatus: "Student Added" }))

        }).catch((err) => { res.status(500).json({ error: err }) })

})

router.post('/addStudentWithoutImage', (req, res) => {
    const {
        UserID,
        Name,
        Program,
        Semester,
        Email,
        Phone,
        PresentAddress,
        PermanentAddress,
        DOB,
        Gender,
        CNIC,
        FatherName,
        FatherCNIC,
        FatherPhone,
        FatherOccupation,
        City,
        PostalCode,
        Department
    } = req.body;
    Students.find()
        .then((students) => {
            const id = students.length === 0 ? "000000000001" : ("000000000000" + String(parseInt(students[students.length - 1]._id) + 1)).slice(-12);
            const newStudent = new Students({
                _id: id,
                UserID: UserID,
                Name: Name,
                Program: Program,
                Semester: Semester,
                Email: Email,
                Phone: Phone,
                PresentAddress: PresentAddress,
                PermanentAddress: PermanentAddress,
                DOB: DOB,
                Gender: Gender,
                CNIC: CNIC,
                FatherName: FatherName,
                FatherCNIC: FatherCNIC,
                FatherPhone: FatherPhone,
                GuardianOccupation: FatherOccupation,
                City: City,
                PostalCode: PostalCode,
                Image: '',
                Department: Department
            })

            try {
                newStudent.save()
                    .then(() => res.json({ id: id, addStatus: "Student Added" }))
                    
            }catch(err) {
                res.status(500).json({ error: err })
            }
            

        }).catch((err) => { res.status(500).json({ error: err }) })

})

router.post('/addStudents', (req, res) => {
    Students.insertMany(req.body)
        .then(() => res.json({}))
        .catch((err) => { res.status(500).json({ error: err }) })

})

router.post('/updateStudent/:id', upload.single("ImageSelected"), (req, res) => {
    Students.findById(req.params.id)
        .then(student => {
            const previousImage = student.Image;
            Object.entries(req.body || {}).map(([key, value]) => {
                student[key] = value;
            })
            student.Image = req.file?.filename || previousImage

            student.save()
                .then(() => res.json({ PreviousImage: previousImage }))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => console.log(err))

})

router.post('/updateStudentWithoutImage/:id', (req, res) => {
    Students.findById(req.params.id)
        .then(student => {

            student.Name = req.body.Name
            student.Institution = req.body.Institution
            student.Career = req.body.Career
            student.Program = req.body.Program
            student.Semester = req.body.Semester
            student.Email = req.body.Email
            student.Phone = req.body.Phone
            student.EmergencyContact = req.body.EmergencyContact
            student.PresentAddress = req.body.PresentAddress
            student.PermanentAddress = req.body.PermanentAddress
            student.DOB = req.body.DOB
            student.Gender = req.body.Gender
            student.CNIC = req.body.CNIC
            student.Domicile = req.body.Domicile
            student.Nationality = req.body.Nationality
            student.Religion = req.body.Religion
            student.BloodGroup = req.body.BloodGroup
            student.FatherName = req.body.FatherName
            student.FatherCNIC = req.body.FatherCNIC
            student.FatherPhone = req.body.FatherPhone
            student.GuardianName = req.body.GuardianName
            student.GuardianRelation = req.body.GuardianRelation
            student.GuardianCNIC = req.body.GuardianCNIC
            student.GuardianPhone = req.body.GuardianPhone
            student.GuardianOccupation = req.body.GuardianOccupation
            student.GuardianAddress = req.body.GuardianAddress
            student.City = req.body.City
            student.PostalCode = req.body.PostalCode
            student.Image = req.body.Image
            student.Department = req.body.Department


            student.save()
                .then(() => res.json("Student Updated"))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => console.log(err))

})

router.delete('/deleteStudent/:id', (req, res) => {
    Students.findByIdAndDelete(req.params.id)
        .then(() => res.status(201).json("Student Deleted"))
        .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router