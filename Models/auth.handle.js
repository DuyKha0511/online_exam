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
    login: function(username, password) {
        return ExcuteSQL(`select * from tb_User where Username = '${username}' and Password = '${password}'`);
    },
    signup: function(username, password, email) {
        return ExcuteSQL(`
            insert into tb_User (Username, Password, Email, Authentication) 
            values ('${username}', '${password}', '${email}', 0)
        `);
    },
    verify: function(username) {
        return ExcuteSQL(`update tb_User set Authentication = 1 where Username = '${username}'`);
    }
}


