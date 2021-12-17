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
            JOIN tb_TakeExam AS TE ON TE.ExamID = E.ExamID
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
    }
}