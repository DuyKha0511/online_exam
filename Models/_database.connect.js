var sql = require("mssql");
const mssql_config = require("../Config/dbconnection_config.json").mssql;

module.exports = {sql, mssql_config};