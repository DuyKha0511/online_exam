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

//Get Class By Classname
router.get('/class/:classname', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    var classname = req.params.classname;
    console.log(`api/classes/class/${classname} called!!!!`);
    classHandle.getClassByName(classname).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

//Change Classname
router.post('/class/:classname', middleware.verifyToken, middleware.checkRole_Create, (req, res) => {
    const classname = req.params.classname;
    const newName = req.body.newName;
    console.log(`api/classes/class/${classname}-post ${newName} called!!!!`);
    classHandle.changeName(classname, newName).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

//Get Class by Teacher
router.get('/teacher/', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    console.log(`api/classes/teacher/${req.UserID} called!!!!`);
    classHandle.getClassByTeacher(req.UserID).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
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

//Add a member to a class
router.put('/member/:classname', middleware.verifyToken, middleware.checkRole_AddRemove, (req, res) => {
    const classname = req.params.classname;
    const userID = req.body.userID;
    console.log(`api/classes/member/${classname}-put ${userID} called!!!!`);
    classHandle.addMember(classname, userID).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

//Remove a member from a class
router.delete('/member/:classname', middleware.verifyToken, middleware.checkRole_AddRemove, (req, res) => {
    const classname = req.params.classname;
    const userID = req.body.userID;
    console.log(`api/classes/member/${classname}-delete ${userID} called!!!!`);
    classHandle.deleteMember(classname, userID).then(function(user) {
        res.json({status: status.Access, data: user.recordsets[0]});
    });
})

module.exports = router;
