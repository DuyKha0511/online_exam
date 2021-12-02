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
    getQuestionsByUser: function(userID) {
        return ExcuteSQL(`
            select Q.QuestionID, Q.Question, Q.Type, Q.Level, Lf.* from tb_Question as Q
            join tb_LibraryFolder as Lf on Q.LibraryFolderID = Lf.LibraryFolderID
            where Lf.UserID = ${userID}
        `);
    },
    getQuestionByID: function(questionID) {
        return ExcuteSQL(`select * from tb_Question where QuestionID = ${questionID}`);
    },
    getSolution: function(questionID) {
        return ExcuteSQL(`select * from tb_Solution where QuestionID = ${questionID}`);
    }
}


