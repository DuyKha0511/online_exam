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
    getAll: function() {
        return ExcuteSQL(`
            SELECT * FROM tb_User
        `)
    },
    getByUserID: function(UserID) {
        return ExcuteSQL(`
            SELECT * FROM  tb_User WHERE UserID = ${UserID}
        `)
    }
}
