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
    getRole: function(UserID, groupFunctionID) {
        return ExcuteSQL(`
            SELECT P.*, R.RoleName FROM tb_Permission AS P
            JOIN tb_Role AS R ON R.RoleID = P.RoleID
            WHERE P.RoleID = 
            (SELECT RoleID FROM tb_RoleOfUser 
            WHERE UserID = ${UserID})
            AND P.GroupFunctionID = ${groupFunctionID}
        `)
    },

    getFunction: function(type, groupFunctionID) {
        return ExcuteSQL(`
            select * from tb_Function where Type = ${type} and GroupFunctionID = ${groupFunctionID}
        `);
    }
}