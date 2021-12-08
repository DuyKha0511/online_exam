const sql = require('./_database.connect').sql;
const db_config = require('./_database.connect').mssql_config;

// const jwt = require('jsonwebtoken');

// const user_selectAll = 'SELECT * INTO #tb_UserView ' + 
//                     'FROM tb_User ' +
//                     'ALTER TABLE #tb_UserView ' +
//                     'DROP COLUMN Password ' +
//                     'SELECT * FROM #tb_UserView ' +
//                     'DROP TABLE #tb_UserView '

const user_selectAll = 'SELECT * FROM tb_User'

module.exports = {
    getAll: function() {
        return sql.connect(db_config)
            .then(function() {
                return new sql.Request().query(user_selectAll)
                                        .catch(function(err) {
                                            console.log("Error!!!", err);
                                        });
            })
            .catch(function(err) {
                console.log("Error!!!", err);
            });
    },

    getByUsername: function(username) {
        return sql.connect(db_config)
            .then(function() {
                return user = new sql.Request().query(`SELECT * FROM  tb_User WHERE Username = '${username}'`)
                                        .catch(function(err) {
                                            console.log("Error!!!", err);
                                        });
            })
            .catch(function(err) {
                console.log("Error!!!", err);
            });
    },

    getByUsername1: function(username) {
        var user;
        sql.connect(db_config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            request.query(`SELECT * FROM  tb_User WHERE Username = '${username}'`, function (err, recordset) {
                if (err) console.log(err);
                console.log(recordset);
                user = recordset;
            });
        });
        console.log(user);
    }
}


