const libraryHandle = require('../Models/exam.handle');
const express = require('express');
const router = express.Router();
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

router.get('/:ExamID', middleware.verifyToken, middleware.checkRole_Review, (req, res) => {
    const ExamID = req.params.ExamID;
    console.log(`api/exams/${ExamID} called!!!!`);
    examHandle.getExamByID(ExamID).then((exam) => {
        var data = exam.recordset[0];
        examHandle.getQuestionsOfExam(ExamID).then((questions) => {
            var listQuestions = []
            if (questions.recordset.length > 0) {
                var id = questions.recordset[0].QuestionID;
                var question = {
                    QuestionID: questions.recordset[0].QuestionID, 
                    Question: questions.recordset[0].Question, 
                    Type: questions.recordset[0].Type,
                    Level: questions.recordset[0].Level, 
                    LibraryFolderID: questions.recordset[0].LibraryFolderID,
                }
                var Solution = [{
                    SolutionID: questions.recordset[0].SolutionID, 
                    Solution: questions.recordset[0].Solution, 
                    Correct: questions.recordset[0].Correct
                }]
                for (let i = 1; i < questions.recordset.length; i++) {
                    if (questions.recordset[i].QuestionID === id) {
                        Solution.push({
                            SolutionID: questions.recordset[i].SolutionID, 
                            Solution: questions.recordset[i].Solution, 
                            Correct: questions.recordset[i].Correct
                        })
                    }
                    else {
                        question.Solution = Solution;
                        listQuestions.push(question);
                        id = questions.recordset[i].QuestionID;
                        Solution = []
                        Solution.push({
                            SolutionID: questions.recordset[i].SolutionID, 
                            Solution: questions.recordset[i].Solution, 
                            Correct: questions.recordset[i].Correct
                        })
                        question = {
                            QuestionID: questions.recordset[i].QuestionID, 
                            Question: questions.recordset[i].Question, 
                            Type: questions.recordset[i].Type,
                            Level: questions.recordset[i].Level, 
                            LibraryFolderID: questions.recordset[i].LibraryFolderID,
                        }
                    }
                }
                question.Solution = Solution;
                listQuestions.push(question);
            }
            data.Questions = listQuestions;
            res.json({status: status.Access, data: data});
        });
    });
});

module.exports = router;