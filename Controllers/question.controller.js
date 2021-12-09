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
        var question = {
            QuestionID: value.recordset[0].QuestionID, 
            Question: value.recordset[0].Question, 
            Type: value.recordset[0].Type,
            Level: value.recordset[0].Level, 
            LibraryFolderID: value.recordset[0].LibraryFolderID,
        }
        var Solution = []
        for (let i = 0; i < value.recordset.length; i++) {
            Solution.push({
                SolutionID: value.recordset[i].SolutionID, 
                Solution: value.recordset[i].Solution, 
                Correct: value.recordset[i].Correct
            })
        };
        question.Solution = Solution;
        res.json({status: status.Access, data: question});
    });
})


router.get('/user/:userID', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    var userID = req.params.userID;
    console.log(`api/questions/user/${userID} called!!!!`);
    questionHandle.getQuestionsByUser(userID).then(function(value) {
        var question = {
            QuestionID: value.recordset[0].QuestionID, 
            Question: value.recordset[0].Question, 
            Type: value.recordset[0].Type,
            Level: value.recordset[0].Level, 
            LibraryFolderID: value.recordset[0].LibraryFolderID,
        }
        var Solution = []
        for (let i = 0; i < value.recordset.length; i++) {
            Solution.push({
                SolutionID: value.recordset[i].SolutionID, 
                Solution: value.recordset[i].Solution, 
                Correct: value.recordset[i].Correct
            })
        };
        question.Solution = Solution;
        res.json({status: status.Access, data: question});
    });
})

router.get('/lib/:LibraryFolderID', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    var LibraryFolderID = req.params.LibraryFolderID;
    console.log(`api/questions/lib/${LibraryFolderID} called!!!!`);
    questionHandle.getQuestionsByLibraryFolder(LibraryFolderID).then(function(value) {
        var id = value.recordset[0].QuestionID;
        var data = []
        var question = {
            QuestionID: value.recordset[0].QuestionID, 
            Question: value.recordset[0].Question, 
            Type: value.recordset[0].Type,
            Level: value.recordset[0].Level, 
            LibraryFolderID: value.recordset[0].LibraryFolderID,
        }
        var Solution = [{
            SolutionID: value.recordset[0].SolutionID, 
            Solution: value.recordset[0].Solution, 
            Correct: value.recordset[0].Correct
        }]
        for (let i = 1; i < value.recordset.length; i++) {
            if (value.recordset[i].QuestionID === id) {
                Solution.push({
                    SolutionID: value.recordset[i].SolutionID, 
                    Solution: value.recordset[i].Solution, 
                    Correct: value.recordset[i].Correct
                })
            }
            else {
                question.Solution = Solution;
                data.push(question);
                id = value.recordset[i].QuestionID;
                Solution = []
                Solution.push({
                    SolutionID: value.recordset[i].SolutionID, 
                    Solution: value.recordset[i].Solution, 
                    Correct: value.recordset[i].Correct
                })
                question = {
                    QuestionID: value.recordset[i].QuestionID, 
                    Question: value.recordset[i].Question, 
                    Type: value.recordset[i].Type,
                    Level: value.recordset[i].Level, 
                    LibraryFolderID: value.recordset[i].LibraryFolderID,
                }
            }
        }
        question.Solution = Solution;
        data.push(question);
        res.json({status: status.Access, data: data});
    });
})

module.exports = router;
