const roleHandle = require('../Models/role.handle');
const status = require('../Config/status.json');
const jwt = require('jsonwebtoken');

const class_GroupFunction = 7


function verifyToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // 'Bear [token]'
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.json({status: status.Unauthorized, message: 'Unauthorized'});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.json({status: status.Forbidden, message: 'Error Token'});
        try {
            req.Username = data.Username;
            req.UserID = data.UserID;
            next();
        }
        catch {}
    })
}

function checkRole_View(req, res, next) {
    const view_type = 1;
    roleHandle.getRole(req.UserID, class_GroupFunction).then(function(role) {
        if (role.recordset[0].Enable >= view_type) next();
        else res.json({status: status.Forbidden, message: `As a ${role.recordset[0].RoleName}, you cannot access this function!`});
    });
}

function checkRole_Create(req, res, next) {
    const view_type = 2;
    roleHandle.getRole(req.UserID, class_GroupFunction).then(function(role) {
        if (role.recordset[0].Enable >= view_type) next();
        else res.json({status: status.Forbidden, message: `As a ${role.recordset[0].RoleName}, you cannot access this function!`});
    });
}

function checkRole_AddRemove(req, res, next) {
    const view_type = 3;
    roleHandle.getRole(req.UserID, class_GroupFunction).then(function(role) {
        if (role.recordset[0].Enable >= view_type) next();
        else res.json({status: status.Forbidden, message: `As a ${role.recordset[0].RoleName}, you cannot access this function!`});
    });
}

module.exports = {
    verifyToken, 
    checkRole_View,
    checkRole_Create,
    checkRole_AddRemove
}