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
    profile: function(username) {
        return ExcuteSQL(`
            select U.*, R.* from tb_User as U
            join tb_RoleOfUser as RU on U.UserID = RU.UserID
            join tb_Role as R on R.RoleID = RU.RoleID
            where U.Username='${username}'
        `);
    },
    updateProfile: function(username, newInfo) {
        return ExcuteSQL(`
            update tb_User set 
            Fullname = N'${newInfo.Fullname}',
            Email = '${newInfo.Email}',
            Gender = ${newInfo.Gender ? 1 : 0},
            DateOfBirth = '${newInfo.DateOfBirth}',
            Address = N'${newInfo.Address}'
            where Username='${username}'
        `);
    }
}