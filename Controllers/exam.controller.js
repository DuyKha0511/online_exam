const libraryHandle = require('../Models/exam.handle');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const status = require('../Config/status.json');
const middleware = require('../_Middleware/exam.middleware');

router.get('/class/:ClassID', middleware.verifyToken, middleware.checkRole_ViewInfo,  (req, res) => {
    const ClassID = req.params.ClassID;
    console.log(`api/exams/class/${ClassID} called!!!!`);
    libraryHandle.getExamsOnClass(ClassID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.get('/teacher/', middleware.verifyToken, middleware.checkRole_ViewInfo,  (req, res) => {
    console.log(`api/exams/teacher/ called!!!!`);
    libraryHandle.getExamsOfATeacher(req.UserID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.get('/student/', middleware.verifyToken, middleware.checkRole_ViewInfo,  (req, res) => {
    console.log(`api/exams/student/ called!!!!`);
    libraryHandle.getExamsOfAStudent(req.UserID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

module.exports = router;