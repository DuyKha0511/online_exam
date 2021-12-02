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
    getLibrariesByUser: function(username) {
        return ExcuteSQL(`
            SELECT Lf.* FROM tb_LibraryFolder AS Lf
            JOIN tb_User AS U ON U.UserID = Lf.UserID
            WHERE U.Username = '${username}' 
        `);
    }
}


