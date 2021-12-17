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
            SELECT U.*, R.* FROM tb_User as U
            join tb_RoleOfUser as RU on U.UserID = RU.UserID
            join tb_Role as R on R.RoleID = RU.RoleID
        `)
    },
    getByUserID: function(UserID) {
        return ExcuteSQL(`
            SELECT * FROM  tb_User WHERE UserID = ${UserID}
        `)
    }
}
