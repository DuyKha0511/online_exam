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
        return ExcuteSQL(`select * from tb_Role`);
    },
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
    },
    getAllGFs: function() {
        return ExcuteSQL(`select * from tb_GroupFunction`)
    },
    getFunctionFromGF: function(groupFunctionID) {
        return ExcuteSQL(`select * from tb_Function where GroupFunctionID = ${groupFunctionID}`)
    },
    createNewRole: function(RoleName, Permissions) {
        var listGFids = '(' 
        var query = `INSERT INTO tb_Role VALUES (N'${RoleName}')\n`
        + `DECLARE @RoleID INT \n`
        + `SELECT @RoleID = RoleID FROM tb_Role WHERE RoleName = N'${RoleName}'\n`;
        Permissions.map((permission, index) => {
            query += `INSERT INTO tb_Permission VALUES (@RoleID, ${permission.GroupFunctionID}, ${permission.FunctionCode})\n`
            if (index < Permissions.length - 1) {
                listGFids += `${permission.GroupFunctionID}, `
            }
            else listGFids += `${permission.GroupFunctionID})`
        })
        query += `INSERT INTO tb_Permission (RoleID, GroupFunctionID, Enable)\n`
        + `SELECT @RoleID, GroupFunctionID, 0 FROM tb_GroupFunction WHERE\n`
        + `GroupFunctionID NOT IN ${listGFids}\n`
        + `SELECT @RoleID as RoleID`;
        return ExcuteSQL(query);
    },
    getRoleByRoleName: function(RoleName) {
        return ExcuteSQL(`select * from tb_Role where RoleName = N'${RoleName}'`);
    },
    getPermission: function(RoleID) {
        return ExcuteSQL(`select * from tb_Permission where RoleID = ${RoleID}`);
    }
}
