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
    getRole: function(username, groupFunctionID) {
        return ExcuteSQL(`
            select P.*, R.RoleName from tb_Permission as P
            join tb_Role as R on R.RoleID = P.RoleID
            where P.RoleID = 
            (select RoleID from tb_RoleOfUser 
            where UserID = 
            (select UserID from tb_User where Username = '${username}'))
            and P.GroupFunctionID = ${groupFunctionID}
        `);
    },

    getFunction: function(type, groupFunctionID) {
        return ExcuteSQL(`
            select * from tb_Function where Type = ${type} and GroupFunctionID = ${groupFunctionID}
        `);
    }
}