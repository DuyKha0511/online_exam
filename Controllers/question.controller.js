const questionHandle = require('../Models/question.handle');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const status = require('../Config/status.json');
const middleware = require('../_Middleware/question.middleware');


router.get('/',  middleware.verifyToken,  middleware.checkRole_View, (req, res) => {
    console.log('api/questions called!!!!');
    questionHandle.getAllQuestions().then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.get('/:questionID/solution', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    var questionID = req.params.questionID;
    console.log(`api/questions/${questionID}/solution called!!!!`);
    questionHandle.getSolution(questionID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.get('/:questionID', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    var questionID = req.params.questionID;
    console.log(`api/questions/${questionID} called!!!!`);
    questionHandle.getQuestionByID(questionID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})


router.get('/user/:userID', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    var userID = req.params.userID;
    console.log(`api/questions/user/${userID} called!!!!`);
    questionHandle.getQuestionsByUser(userID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.get('/lib/:LibraryFolderID', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    var LibraryFolderID = req.params.LibraryFolderID;
    console.log(`api/questions/lib/${LibraryFolderID} called!!!!`);
    questionHandle.getQuestionsByLibraryFolder(LibraryFolderID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

module.exports = router;
