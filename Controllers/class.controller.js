const classHandle = require('../Models/class.handle');
const express = require('express');
const router = express.Router();
const status = require('../Config/status.json');
const middleware = require('../_Middleware/class.middleware');


//Get All Classes
router.get('/',  middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    console.log('api/classes called!!!!');
    classHandle.getAllClasses().then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

//
//Create New Class
router.put('/', middleware.verifyToken, middleware.checkRole_Create, (req, res) => {
    const ClassName = req.body.ClassName;
    console.log(`api/classes/ create new class called!!!!`);
    classHandle.createClass(req.UserID, ClassName).then(function(user) {
        res.json({status: status.Access});
    });
})

//Get Class By Classname
router.get('/class/:classID', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    var classID = req.params.classID;
    console.log(`api/classes/${classID} called!!!!`);
    classHandle.getClassByID(classID).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

//
//Change Classname
router.put('/:classID', middleware.verifyToken, middleware.checkRole_Create, (req, res) => {
    const classID = req.params.classID;
    const ClassName = req.body.ClassName;
    console.log(`api/classes/${classID} change name ${ClassName} called!!!!`);
    classHandle.changeName(classID, ClassName).then(function(user) {
        res.json({status: status.Access});
    });
})

//
//Delete Class
router.delete('/:classID', middleware.verifyToken, middleware.checkRole_Create, (req, res) => {
    const classID = req.params.classID;
    console.log(`api/classes/${classID} deleteClass called!!!!`);
    classHandle.deleteClass(classID).then(function(user) {
        res.json({status: status.Access});
    });
})

//Get Class by Teacher
router.get('/teacher/', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    console.log(`api/classes/teacher called!!!!`);
    classHandle.getClassesByTeacher(req.UserID).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

//Get Class by Teacher
router.get('/teacher/:ClassID', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    console.log(`api/classes/teacher/${req.params.ClassID} called!!!!`);
    classHandle.getClassByTeacher(req.UserID, req.params.ClassID).then(function(user) {
        res.json({status: status.Access, data: user.recordset[0]});
    });
})

//Get Class by Student
router.get('/student/', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    console.log(`api/classes/student called!!!!`);
    classHandle.getClassByStudent(req.UserID).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

//Get Member of a class
router.get('/member/:ClassID', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    var ClassID = req.params.ClassID;
    console.log(`api/classes/member/${ClassID} called!!!!`);
    classHandle.getMember(ClassID).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

//
//Add a member to a class
router.put('/member/:ClassID', middleware.verifyToken, middleware.checkRole_AddRemove, (req, res) => {
    const ClassID = req.params.ClassID;
    const UserID = req.body.UserID;
    console.log(`api/classes/member/${ClassID}- add member ${UserID} called!!!!`);
    classHandle.addMember(ClassID, UserID).then(function(user) {
        res.json({status: status.Access});
    });
})

//
//Remove a member from a class
router.delete('/member/:ClassID', middleware.verifyToken, middleware.checkRole_AddRemove, (req, res) => {
    const ClassID = req.params.ClassID;
    const UserID = req.body.UserID;
    console.log(`api/classes/member/${ClassID}- remove member ${UserID} called!!!!`);
    classHandle.deleteMember(ClassID, UserID).then(function(user) {
        res.json({status: status.Access});
    });
})



module.exports = router;
