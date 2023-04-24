

const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload')

const Notification = require("../models/notificationsSchema")

router.get('/getNotifications', (req, res) => {
    Notification.find()
        .then(notifications => res.json(notifications))
        .catch(err => res.status(400).json({ error: err }))
})

router.get('/getNotificationByID/:id', (req, res) => {
    Notification.findById(req.params.id)
        .then(notifications => res.json(notifications))
        .catch(err => res.status(400).json({ error: err }))
})

router.post('/addNotification',upload.single("ImageSelected"), (req, res) => {
    const { NotificationHeader, NotificationBody, Date } = req.body;
    Notification.find()
        .then((notifications) => {
            const id = notifications.length === 0 ? "0001" : ("000" + String(parseInt(notifications[notifications.length - 1]._id) + 1)).slice(-4);
            
            const newNotification = new Notification({
                _id: id, 
                NotificationHeader: NotificationHeader, 
                NotificationBody: NotificationBody,
                Date: Date,
                Image: req.file.filename
            })

            newNotification.save()
                .then(() => res.json(newNotification))

        }).catch((err) => { res.status(500).json({ error: err }) })

})


router.post('/addNotifications', (req, res) => {
    Notification.insertMany(req.body)
        .then(() => res.json({}))
        .catch((err) => { res.status(500).json({ error: err }) })

})

router.post('/updateNotification/:id', upload.single("ImageSelected"), (req, res) => {
    Notification.findById(req.params.id)
        .then(notification => {
            let previousImage = "";
            const {NotificationHeader, NotificationBody, Date} = req.body;
            notification.NotificationHeader = NotificationHeader;
            notification.NotificationBody = NotificationBody;
            notification.Date = Date;
            if (req.file) {
                previousImage = notification.Image;
                notification.Image = req.file.filename;
            }
            notification.save()
                .then(() => res.json({_id: req.params.id, NotificationHeader: NotificationHeader, NotificationBody: NotificationBody, Image: req.file.filename, PreviousImage: previousImage}))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))

})

router.post('/updateNotificationWithoutImage/:id', (req, res) => {
    Notification.findById(req.params.id)
        .then(notification => {
            const {NotificationHeader, NotificationBody, Image, Date} = req.body;
            notification.NotificationHeader = NotificationHeader;
            notification.NotificationBody = NotificationBody;
            notification.Image = Image;
            notification.Date = Date;
            
            notification.save()
                .then(() => res.json(notification))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))

})

router.delete('/deleteNotification/:id', (req, res) => {
    Notification.findByIdAndDelete(req.params.id)
        .then(notification => res.status(201).json({DeletedImage: notification.Image}))
        .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router