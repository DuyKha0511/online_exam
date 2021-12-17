const resultsHandle = require('../Models/results.handle');
const express = require('express');
const router = express.Router();
const status = require('../Config/status.json');
const middleware = require('../_Middleware/results.middleware');

router.get('/student/', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    console.log(`api/results/student/ view mark called!!!`);
    resultsHandle.getResultsOfStudent(req.UserID).then((results) => {
        res.json({status: status.Access, data: results.recordsets[0]});
    });
});

router.get('/student/:ExamID', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    const ExamID = req.params.ExamID;
    console.log(`api/results/student/${ExamID} view exam has been done called!!!`);
    resultsHandle.viewDoneExamByStudent(req.UserID, ExamID).then((results) => {
        try {
            var data = {};
            data.ExamID = results.recordset[0].ExamID;
            data.ExamName = results.recordset[0].ExamName;
            data.Duration = results.recordset[0].Duration;
            data.TakeExamID = results.recordset[0].TakeExamID;
            data.Mark = results.recordset[0].Mark;
            data.Accept = results.recordset[0].Accept;
            var listQuestions = [];
            if (results.recordset.length > 0) {
                var id = results.recordset[0].QuestionID;
                var question = {
                    QuestionID: results.recordset[0].QuestionID, 
                    Question: results.recordset[0].Question, 
                    Type: results.recordset[0].Type,
                    Level: results.recordset[0].Level,
                    MaxEssay: results.recordset[0].MaxEssay,
                    Answer: data.Accept ? results.recordset[0].Answer : null
                }
                var Solution = [{
                    SolutionID: results.recordset[0].SolutionID, 
                    Solution: results.recordset[0].Solution, 
                    Correct: data.Accept ? results.recordset[0].Correct : null
                }]
                for (let i = 1; i < results.recordset.length; i++) {
                    if (results.recordset[i].QuestionID === id) {
                        Solution.push({
                            SolutionID: results.recordset[i].SolutionID, 
                            Solution: results.recordset[i].Solution, 
                            Correct: data.Accept ? results.recordset[i].Correct : null
                        })
                    }
                    else {
                        question.Solution = Solution;
                        listQuestions.push(question);
                        id = results.recordset[i].QuestionID;
                        Solution = []
                        Solution.push({
                            SolutionID: results.recordset[i].SolutionID, 
                            Solution: results.recordset[i].Solution, 
                            Correct: data.Accept ? results.recordset[i].Correct : null
                        })
                        question = {
                            QuestionID: results.recordset[i].QuestionID, 
                            Question: results.recordset[i].Question, 
                            Type: results.recordset[i].Type,
                            Level: results.recordset[i].Level,
                            MaxEssay: results.recordset[i].MaxEssay,
                            Answer: data.Accept ? results.recordset[i].Answer : null
                        }
                    }
                }
                question.Solution = Solution;
                listQuestions.push(question);
            };
            data.Questions = listQuestions;
            res.json({status: status.Access, data: data});
        }
        catch (error) {
            console.log(error);
            res.json({status: status.Error, message: "Not submitted"});
        }
    });
});

router.post('/teacher/', middleware.verifyToken, middleware.checkRole_View, (req, res) => {
    const ClassID = req.body.ClassID;
    const ExamID = req.body.ExamID;
    console.log(`api/results/teacher/ view class ${ClassID} results exam ${ExamID} called!!!`);
    resultsHandle.getResultsOfExamInClassByTeacher(req.UserID, ClassID, ExamID).then((results) => {
        var data = {};
        data.ClassID = results.recordset[0].ClassID;
        data.ClassName = results.recordset[0].ClassName;
        data.ExamID = results.recordset[0].ExamID;
        data.ExamName = results.recordset[0].ExamName;
        data.TotalSubmissions = results.recordset[0].TotalSubmissions;
        results.recordset.map((recordset) => {
            delete recordset.ClassID;
            delete recordset.ClassName;
            delete recordset.ExamID;
            delete recordset.ExamName;
            delete recordset.TotalSubmissions;
        })
        data.Students = results.recordset;
        res.json({status: status.Access, data: data});
    });
});

module.exports = router;
