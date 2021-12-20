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

// const bcrypt = require('bcryptjs');
// ExcuteSQL('select * from tb_User').then(function(value) {
//     const salt = bcrypt.genSaltSync(10);
//     console.log(value.recordset.length)
//     value.recordset.map((v, index) => {   
//         const hashPassword = bcrypt.hashSync('123456', salt);
//         console.log(v.UserID)
//         new sql.Request().query(`
//             update tb_User set Password = '${hashPassword}' where UserID=${v.UserID}
//         `)
//     })
//     console.log('ok')
// })

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
            Firstname = N'${newInfo.Firstname}',
            Lastname = N'${newInfo.Lastname}',
            Email = '${newInfo.Email}',
            Gender = ${newInfo.Gender ? 1 : 0},
            DateOfBirth = '${newInfo.DateOfBirth}',
            Address = N'${newInfo.Address}',
            Phone = N'${newInfo.Phone}',
            Avatar = N'${newInfo.Avatar}'
            where Username='${username}'
        `);
    },
    checkPassword: function(userID) {
        return ExcuteSQL(`
            select * from tb_User where UserID = ${userID}
        `);
    },
    changePassword: function(userID, newPassword) {
        return ExcuteSQL(`
            update tb_User set Password = '${newPassword}' where UserID = ${userID}
        `);
    },
    checkEmail: function(UserID, Email) {
        return ExcuteSQL(`
            select * from tb_User where Email = '${Email}' and UserID != ${UserID}
        `);
    }
}
