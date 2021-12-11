const status = require('../Config/status.json');
const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // 'Bear [token]'
    if (!authorizationHeader) res.json({status: status.Error, message: 'Error Header Authorization'});
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.json({status: status.Error, message: 'Error Token'});
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) res.json({status: status.Unauthorized, message: 'Unauthorized'});
        try {
            req.Username = data.Username;
            req.UserID = data.UserID;
            next();
        }
        catch {}
    })
}

module.exports = {
    verifyToken
}