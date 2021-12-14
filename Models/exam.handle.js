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
    getExamsOnClass: function(ClassID) {
        return ExcuteSQL(`
            SELECT Exam.*, Q.TotalQuestions FROM 
            (SELECT E.ExamID, E.ExamName, E.TimeBegin, E.TimeEnd, E.Duration FROM tb_ExamOfClass AS EC
            JOIN tb_Exam AS E ON E.ExamID = EC.ExamID
            WHERE EC.ClassID = ${ClassID}) AS Exam
            JOIN 
            (SELECT ExamID, COUNT(*) AS TotalQuestions FROM tb_QuestionOfExam
            GROUP BY ExamID) AS Q
            ON Exam.ExamID = Q.ExamID
        `);
    },
    getExamsOfATeacher: function(UserID) {
        return ExcuteSQL(`
            SELECT C.ClassID, C.ClassName, E.ExamID, E.ExamName, E.TimeBegin, E.TimeEnd, E.Duration, Q.TotalQuestions FROM tb_ExamOfClass AS EC
            JOIN tb_Class AS C ON EC.ClassID = C.ClassID
            JOIN tb_Exam AS E ON E.ExamID = EC.ExamID
            JOIN 
            (SELECT ExamID, COUNT(*) AS TotalQuestions FROM tb_QuestionOfExam
            GROUP BY ExamID) AS Q
            ON E.ExamID = Q.ExamID
            WHERE C.UserID = ${UserID}
            ORDER BY C.ClassID
        `);
    },
    getExamsOfAStudent: function(UserID) {
        return ExcuteSQL(`
            SELECT C.ClassID, C.ClassName, U.UserID AS TeacherID, CONCAT(U.Firstname, ' ', U.Lastname) AS TeacherFullname,
            E.ExamID, E.ExamName, E.TimeBegin, E.TimeEnd, E.Duration, Q.TotalQuestions
            FROM tb_ClassMember AS CM
            JOIN tb_Class AS C ON CM.ClassID = C.ClassID
            JOIN tb_User AS U ON U.UserID = C.UserID
            JOIN tb_ExamOfClass AS EC ON EC.ClassID = C.ClassID
            JOIN tb_Exam AS E ON E.ExamID = EC.ExamID
            JOIN 
            (SELECT ExamID, COUNT(*) AS TotalQuestions FROM tb_QuestionOfExam
            GROUP BY ExamID) AS Q
            ON E.ExamID = Q.ExamID
            WHERE CM.UserID = ${UserID}
            ORDER BY C.ClassID
        `);
    },
    getQuestionsOfExam: function(ExamID) {
        return ExcuteSQL(`
            SELECT Q.*, S.SolutionID, S.Solution, S.Correct FROM tb_QuestionOfExam AS QE
            JOIN tb_Question AS  Q ON QE.QuestionID = Q.QuestionID
            JOIN tb_Solution AS S ON Q.QuestionID = S.QuestionID
            WHERE QE.ExamID = ${ExamID}
        `)
    },
    getExamByID: function(ExamID) {
        return ExcuteSQL(`
            SELECT ExamID, ExamName, TimeBegin, TimeEnd, Duration FROM tb_Exam WHERE ExamID = ${ExamID}
        `)
    }
}
