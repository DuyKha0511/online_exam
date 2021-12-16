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
            SELECT DISTINCT C.ClassID, C.ClassName, U.UserID AS TeacherID, CONCAT(U.Firstname, ' ', U.Lastname) AS TeacherFullname,
            E.ExamID, E.ExamName, E.TimeBegin, E.TimeEnd, E.Duration, Q.TotalQuestions, 
            (CASE WHEN TE.Mark = -1 THEN 'NotDone' ELSE 'Done' END)  AS 'DoingFlag'
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
    },
    createExam: function(exam) {
        var query = `INSERT INTO tb_Exam VALUES \n`
        + `(N'${exam.ExamName}', '${exam.TimeBegin}', '${exam.TimeEnd}', ${exam.Duration}, NULL)\n`
        + `DECLARE @ExamID INT\n`
        + `SELECT @ExamID = ExamID FROM tb_Exam WHERE\n`
        + `ExamName = N'${exam.ExamName}' AND TimeBegin = '${exam.TimeBegin}' AND TimeEnd = '${exam.TimeEnd}' AND Duration = ${exam.Duration}\n`;
        exam.ClassID.map((value) => {
            query += `INSERT INTO tb_ExamOfClass VALUES (${value}, @ExamID)\n`
        })
        exam.QuestionID.map((value) => {
            query += `INSERT INTO tb_QuestionOfExam VALUES (@ExamID, ${value}, NULL, (CASE WHEN [dbo].CheckIfEssayQuestion(${value}) = 1 THEN ${exam.MaxEssay} ELSE NULL END))\n`
        });
        query += `SELECT @ExamID as ExamID`;
        return ExcuteSQL(query);
    },
    deleteExamInClass: function(ExamID, ClassID) {
        var query = `DELETE FROM tb_TakeExam WHERE ExamID = ${ExamID} AND UserID IN \n`
        +   `(SELECT UserID FROM tb_ClassMember WHERE ClassID = ${ClassID})\n`
        +   `DELETE FROM tb_ExamOfClass WHERE ExamID = ${ExamID} AND ClassID = ${ClassID}`
        // return ExcuteSQL(
        //         `DELETE FROM tb_ExamOfClass WHERE ExamID = ${ExamID}\n`
        //     +   `DELETE FROM tb_QuestionOfExam WHERE ExamID = ${ExamID}\n`
        //     +   `DELETE FROM tb_TakeExam WHERE ExamID = ${ExamID}\n`
        //     +   `DELETE FROM tb_Exam WHERE ExamID = ${ExamID}\n`
        // );
        return ExcuteSQL(query);
    },
    updateExam: function(ExamID, exam) {
        // var query = `DELETE FROM tb_QuestionOfExam WHERE ExamID = ${ExamID}\n`
        // +   `DELETE FROM tb_TakeExam WHERE ExamID = ${ExamID}\n`
        // +   `DELETE FROM tb_ExamOfClass WHERE ExamID = ${ExamID}\n`;
        // exam.ClassID.map((value) => {
        //     query += `INSERT INTO tb_ExamOfClass VALUES (${value}, ${ExamID})\n`
        // })
        // exam.QuestionID.map((value) => {
        //     query += `INSERT INTO tb_QuestionOfExam VALUES (${ExamID}, ${value}, NULL, (CASE WHEN [dbo].CheckIfEssayQuestion(${value}) = 1 THEN ${exam.MaxEssay} ELSE NULL END))\n`
        // });
        // query += `UPDATE tb_Exam SET ExamName = N'${exam.ExamName}',\n`
        // +   `TimeBegin = '${exam.TimeBegin}', TimeEnd = '${exam.TimeEnd}', Duration =  ${exam.Duration}\n`
        // +   `WHERE ExamID = ${ExamID}`;
        var query = `UPDATE tb_Exam SET ExamName = N'${exam.ExamName}',\n`
        +   `TimeBegin = '${exam.TimeBegin}', TimeEnd = '${exam.TimeEnd}', Duration =  ${exam.Duration}\n`
        +   `WHERE ExamID = ${ExamID}`;
        return ExcuteSQL(query);
    },
    getClassByExamAndUser: function(ExamID, UserID) {
        return ExcuteSQL(`
            SELECT ClassID, ClassName FROM tb_Class WHERE ClassID =
            (SELECT ClassID FROM tb_ClassMember
            WHERE UserID = ${UserID}
            INTERSECT 
            SELECT ClassID FROM tb_ExamOfClass WHERE ExamID = ${ExamID})
        `);
    }
}
