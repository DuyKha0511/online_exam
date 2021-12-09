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
    }
}
