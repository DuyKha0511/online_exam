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
    getAllQuestions: function() {
        return ExcuteSQL(`select * from tb_Question`);
    },
    getQuestionsByLibraryFolder: function(LibraryFolderID) {
        return ExcuteSQL(`
            SELECT Q.*, S.SolutionID, S.Solution, S.Correct from tb_Question AS Q 
            JOIN tb_Solution AS S ON Q.QuestionID = S.QuestionID
            WHERE Q.LibraryFolderID = ${LibraryFolderID}
        `);
    },
    getQuestionByID: function(questionID) {
        return ExcuteSQL(`
            SELECT Q.*, S.SolutionID, S.Solution, S.Correct from tb_Question AS Q 
            JOIN tb_Solution AS S ON Q.QuestionID = S.QuestionID
            WHERE Q.QuestionID = ${questionID}
        `);
    },
    getSolution: function(questionID) {
        return ExcuteSQL(`select * from tb_Solution where QuestionID = ${questionID}`);
    },
    createQuestion: function(QuestionData, LibraryFolderID) {
        var query = `INSERT INTO tb_Question VALUES (N'${QuestionData.Question}', '${QuestionData.Type}', '${QuestionData.Level}', ${LibraryFolderID})\n`
        +   `DECLARE @QuestionID INT\n` 
        +   `SELECT @QuestionID = QuestionID FROM tb_Question WHERE\n` 
        +   `Question = N'${QuestionData.Question}' AND \n`
        +   `Type = '${QuestionData.Type}' AND \n`
        +   `Level = '${QuestionData.Level}' AND LibraryFolderID = ${LibraryFolderID}\n`
        +   `INSERT INTO tb_Solution VALUES \n`;
        QuestionData.Solution.map((value, index) => {
            if (index < QuestionData.Solution.length - 1)
                query += `(N'${value.Solution}', ${value.Correct ? 1 : 0}, @QuestionID),\n`
            else  query += `(N'${value.Solution}', ${value.Correct ? 1 : 0}, @QuestionID)`
        });
        query += `SELECT QuestionID FROM tb_Question WHERE\n`
        +   `Question = N'${QuestionData.Question}' AND\n`
        +   `Type = '${QuestionData.Type}' AND \n`
        +   `Level = '${QuestionData.Level}' AND \n`
        +   `LibraryFolderID = ${LibraryFolderID}`
        return ExcuteSQL(query);
    },
    checkQuestion: function(QuestionData, LibraryFolderID) {
        return ExcuteSQL(`
            SELECT * FROM tb_Question WHERE 
            Question = N'${QuestionData.Question}' AND 
            Type = '${QuestionData.Type}' AND 
            Level = '${QuestionData.Level}' AND 
            LibraryFolderID = ${LibraryFolderID}
        `);
    },
    deleteQuestion: function(questionID) {
        var query = `(`;
        questionID.map((value, index) => {
            if (index < questionID.length - 1)
                query += `${value}, `
            else  query += `${value})`
        });
        return ExcuteSQL(`DELETE FROM tb_Question WHERE QuestionID IN ${query}`);
    },
    updateQuestion: function(questionID, QuestionData) {
        var query = `UPDATE tb_Question SET \n`
        + `Question = N'${QuestionData.Question}',\n`
        + `Type = '${QuestionData.Type}', Level = '${QuestionData.Level}'\n`
        + `WHERE QuestionID = ${questionID}\n`
        + `DELETE FROM tb_Solution WHERE QuestionID = ${questionID}\n`
        + `INSERT INTO tb_Solution VALUES\n`;
        QuestionData.Solution.map((value, index) => {
            if (index < QuestionData.Solution.length - 1)
                query += `(N'${value.Solution}', ${value.Correct ? 1 : 0}, ${questionID}),\n`
            else query += `(N'${value.Solution}', ${value.Correct ? 1 : 0}, ${questionID})`
        });
        return ExcuteSQL(query);
    }
}
