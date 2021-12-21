const examHandle = require('../Models/exam.handle');
const express = require('express');
const router = express.Router();
const status = require('../Config/status.json');
const middleware = require('../_Middleware/exam.middleware');

router.get('/class/:ClassID', middleware.verifyToken, middleware.checkRole_ViewInfo,  (req, res) => {
    const ClassID = req.params.ClassID;
    console.log(`api/exams/class/${ClassID} called!!!!`);
    examHandle.getExamsOnClass(ClassID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.get('/teacher/', middleware.verifyToken, middleware.checkRole_ViewInfo,  (req, res) => {
    console.log(`api/exams/teacher/ called!!!!`);
    examHandle.getExamsOfATeacher(req.UserID).then(function(value) {
        res.json({status: status.Access, data: value.recordsets[0]});
    });
})

router.get('/student/', middleware.verifyToken, middleware.checkRole_ViewInfo,  (req, res) => {
    console.log(`api/exams/student/ called!!!!`);
    examHandle.getExamsOfAStudent(req.UserID).then(function(value) {
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

router.put('/', middleware.verifyToken, middleware.checkRole_Create, (req, res) => {
    console.log(`api/exams/ create exam called!!!`);
    examHandle.createExam(req.body).then((results) => {
        res.json({status: status.Access, data: results.recordset[0]})
    });
});

router.delete('/:ExamID', middleware.verifyToken, middleware.checkRole_Update, (req, res) => {
    console.log(`api/exams/${req.params.ExamID} delete exam called!!!`);
    const ClassID = req.body.ClassID;
    examHandle.getExamByID(req.params.ExamID).then((results) => {
        tspBegin = new Date(results.recordset[0].TimeBegin).getTime();
        tspEnd = new Date(results.recordset[0].TimeEnd).getTime();
        tspNow = new Date().getTime() + 7*3600000;
        if (tspNow < tspBegin) {
            examHandle.deleteExamInClass(req.params.ExamID, ClassID).then(() => {
                res.json({status: status.Access});
            });
        }
        else if (tspNow >= tspBegin && tspNow <= tspEnd)
            res.json({status: status.Error, message: "The exam is in progress!"})
        else if (tspNow > tspEnd)
            res.json({status: status.Error, message: "The exam had been done!"})
    });
});

router.post('/:ExamID', middleware.verifyToken, middleware.checkRole_Update, (req, res) => {
    console.log(`api/exams/${req.params.ExamID} update exam called!!!`);
    examHandle.getExamByID(req.params.ExamID).then((results) => {
        tspBegin = new Date(results.recordset[0].TimeBegin).getTime();
        tspEnd = new Date(results.recordset[0].TimeEnd).getTime();
        tspNow = new Date().getTime() + 7*3600000;
        if (tspNow < tspBegin) {
            examHandle.updateExam(req.params.ExamID, req.body).then(() => {
                res.json({status: status.Access});
            })
        }        
        else if (tspNow >= tspBegin && tspNow <= tspEnd)
            res.json({status: status.Error, message: "The exam is in progress!"})
        else if (tspNow > tspEnd)
            res.json({status: status.Error, message: "The exam had been done!"})
    });
});

router.get('/do-exam/:ExamID', middleware.verifyToken, middleware.checkRole_ViewInfo, (req, res) => {
    const ExamID = req.params.ExamID;
    console.log(`api/exams/${ExamID} do-exam  called!!!!`);
    examHandle.getExamByID(ExamID).then((exam) => {
        var data = exam.recordset[0];
        examHandle.getClassByExamAndUser(ExamID, req.UserID).then((classResults) => {
            data.ClassID = classResults.recordset[0].ClassID;
            data.ClassName = classResults.recordset[0].ClassName;
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
                        Correct: null
                    }]
                    for (let i = 1; i < questions.recordset.length; i++) {
                        if (questions.recordset[i].QuestionID === id) {
                            Solution.push({
                                SolutionID: questions.recordset[i].SolutionID, 
                                Solution: questions.recordset[i].Solution, 
                                Correct: null
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
                                Correct: null
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
});

router.post('/do-exam/submit/', middleware.verifyToken, middleware.checkRole_ViewInfo, (req, res) => {
    console.log(`api/exams/do-exam/submit exam called!!!!`);
    const submit_exam = {};
    submit_exam.ExamID = req.body.ExamID;
    submit_exam.ClassID = req.body.ClassID;
    submit_exam.UserID = req.UserID;
    submit_exam.DoingTime = req.body.DoingTime ? req.body.DoingTime : null;
    var solutions = [];
    var questionIDs = [];
    var essayID = 0;
    req.body.Questions.map((question) => {
        var choice_flag = false;
        question.Solution.map((solution) => {
            if (solution.Correct) {
                choice_flag = true;
                solutions.push({QuestionID: question.QuestionID, Answer: solution.Solution})
            }
        })
        if (!choice_flag) {
            solutions.push({QuestionID: question.QuestionID, Answer: ''})
        }
        if (question.Type !== 'Essay') questionIDs.push(question.QuestionID);
        else essayID = question.QuestionID;
    });
    submit_exam.Solutions = solutions;
    examHandle.getSolutions(questionIDs).then((sols) => {
        var total_nums = 0;
        questionIDs.map((id) => {
            var correctNums = 0;
            var correctSolution = [];
            var type = '';
            sols.recordset.filter(s => s.QuestionID === id && s.Correct === true).map((value) => {
                type = value.Type;
                correctSolution.push(value.Solution);
            });
            solutions.filter(s => s.QuestionID === id).map((value) => {
                if (type === 'Multiple Choices') {
                    if (correctSolution.includes(value.Answer)) {
                        correctNums++;
                    }
                    else {
                        correctNums--;
                        correctNums = correctNums < 0 ? 0 : correctNums;
                    }
                }
                else {
                    if (correctSolution.includes(value.Answer)) {
                        correctNums++;
                    }
                }
            });
            total_nums += correctNums/correctSolution.length;
        });
        examHandle.getEssayMark(req.body.ExamID, essayID).then((essay) => {
            var mark = 0;
            try {
                mark = (10 - essay.recordset[0].MaxEssay)*total_nums/questionIDs.length;
            }
            catch {
                mark = 10*total_nums/questionIDs.length;
            }
            submit_exam.Mark = mark;
            submit_exam.CorrectNumber = total_nums;
            //console.log(submit_exam);
            examHandle.submitExam(submit_exam).then(() => {
                delete submit_exam.Solutions;
                submit_exam.TimeSubmit = new Date(new Date().getTime() + 7*3600000).toUTCString();
                res.json({status: status.Access, data: submit_exam});
            })
        })
    });
});

router.post('/e/dashboard/', middleware.verifyToken, middleware.checkRole_ViewInfo, (req, res) => {
    console.log(`api/exams/e/dashboard called!!!`);
    examHandle.getNewestExam(req.UserID, req.body.RoleID).then((exams) => {
        res.json({status: status.Access, data: exams.recordset});
    })
});

router.post('/t/dashboard/', middleware.verifyToken, middleware.checkRole_ViewInfo, (req, res) => {
    console.log(`api/exams/t/dashboard called!!!`);
    if (req.body.RoleID === 3) {
        examHandle.getExamsOfAStudent(req.UserID).then((exams) => {
            var notdone = 0;
            try {
                notdone = exams.recordset.filter(e => e.DoingFlag === 'NotDone').length;
                res.json({status: status.Access, data: {DoneNumber: exams.recordset.length - notdone, NotDoneNumber: notdone}})
            }
            catch {
                res.json({status: status.Access, data: {DoneNumber: 0, NotDoneNumber: 0}})
            }
        });
    }
    else {
        examHandle.getTotalByTeacher(req.UserID).then((totals) => {
            try {
                res.json({status: status.Access, data: totals.recordset[0]})
            }
            catch {
                res.json({status: status.Access, data: {TotalClasses: 0, TotalAssignments: 0, TotalStudents: 0}})
            }
        })
    }
});

module.exports = router;
