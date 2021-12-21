const sql = require('./_database.connect').sql;
const db_config = require('./_database.connect').mssql_config;

function ExcuteSQL(query) {
    return sql.connect(db_config)
        .then(function() {
            return new sql.Request()
                .query(query)
                .catch(function(err) {
                    console.log("Error!!!", err);
                });
        })
        .catch(function(err) {
            console.log("Error!!!", err);
        });
}

module.exports = {
    getResultsOfStudent: function (UserID) {
        return ExcuteSQL(`
            SELECT DISTINCT TE.TakeExamID, C.ClassID, C.ClassName, U.UserID AS TeacherID, CONCAT(U.Firstname, ' ', U.Lastname) AS TeacherFullname,
            E.ExamID, E.ExamName, E.TimeBegin, E.TimeEnd, E.Duration, TE.CorrectNumber, Q.TotalQuestions, TE.TimeSubmit, TE.DoingTime, TE.Mark, TE.Accept
            FROM tb_ClassMember AS CM
            JOIN tb_Class AS C ON CM.ClassID = C.ClassID
            JOIN tb_User AS U ON U.UserID = C.UserID
            JOIN tb_ExamOfClass AS EC ON EC.ClassID = C.ClassID
            JOIN tb_Exam AS E ON E.ExamID = EC.ExamID
            JOIN tb_TakeExam AS TE ON TE.ExamID = E.ExamID AND TE.UserID = CM.UserID
            JOIN 
            (SELECT ExamID, COUNT(*) AS TotalQuestions FROM tb_QuestionOfExam
            GROUP BY ExamID) AS Q
            ON E.ExamID = Q.ExamID
            WHERE CM.UserID = ${UserID}
            ORDER BY E.ExamID ASC
        `);
    },
    viewDoneExamByStudent: function(UserID, ExamID) {
        return ExcuteSQL(`
            SELECT A.*, TE.Mark, TE.Accept, QE.ExamID, E.ExamName, E.Duration,
            QE.QuestionID, Q.Question, Q.Type, Q.Level, QE.MaxEssay, S.SolutionID, S.Solution, S.Correct
            FROM tb_Answersheet AS A
            JOIN tb_QuestionOfExam AS QE ON A.QuestionOfExamID = QE.QuestionOfExamID
            JOIN tb_TakeExam AS TE ON TE.TakeExamID = A.TakeExamID
            JOIN tb_Exam AS E ON QE.ExamID = E.ExamID
            JOIN tb_Question AS Q ON Q.QuestionID = QE.QuestionID
            JOIN tb_Solution AS S ON S.QuestionID = Q.QuestionID
            WHERE A.TakeExamID = (SELECT TakeExamID FROM tb_TakeExam WHERE UserID = ${UserID} AND ExamID = ${ExamID})
        `)
    },
    getResultsOfExamInClassByTeacher: function(UserID, ClassID, ExamID) {
        return ExcuteSQL(`
            SELECT DISTINCT C.ClassID, C.ClassName, E.ExamID, E.ExamName, [dbo].GetSubmissionNumber(C.ClassID, E.ExamID) AS TotalSubmissions,
            U.UserID, U.Firstname, U.Lastname,
            TE.Feedback, TE.Mark, TE.Accept, TE.TimeSubmit, TE.Duration, TE.DoingTime, TE.CorrectNumber
            FROM tb_ClassMember AS CM
            JOIN tb_Class AS C ON CM.ClassID = C.ClassID
            JOIN tb_User AS U ON CM.UserID = U.UserID
            JOIN tb_ExamOfClass AS EC ON EC.ClassID = C.ClassID
            JOIN tb_Exam AS E ON E.ExamID = EC.ExamID
            JOIN tb_TakeExam AS TE ON TE.UserID = CM.UserID AND TE.ExamID = E.ExamID
            WHERE C.UserID = ${UserID} AND C.ClassID = ${ClassID} AND E.ExamID = ${ExamID}
            ORDER BY E.ExamID
        `);
    },
    confirmResults: function(data) {
        return ExcuteSQL(`
            UPDATE tb_TakeExam SET
            Feedback = N'${data.Feedback}', Mark = ${data.Mark}, Accept = ${data.Accept ? 1 : 0}
            WHERE ExamID = ${data.ExamID} AND UserID = ${data.UserID}
        `);
    },
    viewDoneExamOfStudentByTeacher: function(UserID, ExamID) {
        return ExcuteSQL(`
            SELECT U.Firstname, U.Lastname, U.Email, A.*, TE.Feedback, TE.DoingTime, TE.TimeSubmit, TE.CorrectNumber,
            TE.Mark, TE.Accept, QE.ExamID, E.ExamName, E.Duration,
            QE.QuestionID, Q.Question, Q.Type, Q.Level, QE.MaxEssay, S.SolutionID, S.Solution, S.Correct
            FROM tb_Answersheet AS A
            JOIN tb_QuestionOfExam AS QE ON A.QuestionOfExamID = QE.QuestionOfExamID
            JOIN tb_TakeExam AS TE ON TE.TakeExamID = A.TakeExamID
            JOIN tb_Exam AS E ON QE.ExamID = E.ExamID
            JOIN tb_Question AS Q ON Q.QuestionID = QE.QuestionID
            JOIN tb_Solution AS S ON S.QuestionID = Q.QuestionID
            JOIN tb_User AS U ON U.UserID = TE.UserID
            WHERE A.TakeExamID = (SELECT TakeExamID FROM tb_TakeExam WHERE UserID = ${UserID} AND ExamID = ${ExamID})
        `)
    },
    getAllMarks: function(UserID) {
        return ExcuteSQL(`
            SELECT * FROM tb_TakeExam WHERE UserID = ${UserID}
        `);
    },
    geGPAsOfAllStudent: function() {
        return ExcuteSQL(`
            SELECT UserID, ROUND((SUM(Mark)/ COUNT(UserID)), 1) AS GPA, SUM(DoingTime) AS TotalDoingTime FROM tb_TakeExam 
            GROUP BY UserID 
            ORDER BY GPA DESC, TotalDoingTime ASC
        `);
    },
    getGPAsOfAllStudentsOfTeacher: function(TeacherID) {
        return ExcuteSQL(`
            SELECT TOP(5) U.UserID, U.Firstname, U.Lastname, U.Email, G.GPA, G.TotalDoingTime FROM tb_User AS U
            JOIN   
            (SELECT UserID, ROUND((SUM(Mark)/ COUNT(UserID)), 1) AS GPA, SUM(DoingTime) AS TotalDoingTime FROM tb_TakeExam 
            WHERE ExamID IN 
            (SELECT DISTINCT ExamID FROM tb_ExamOfClass WHERE ClassID IN  
            (SELECT ClassID FROM tb_Class WHERE UserID = ${TeacherID}))
            GROUP BY UserID) AS G ON G.UserID = U.UserID
            ORDER BY G.GPA DESC, G.TotalDoingTime ASC 
        `);
    }
}
