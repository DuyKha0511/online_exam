const status = require('../Config/status.json');
const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    // 'Bear [token]'
    if (!token) res.json({status: status.Error, message: 'Error Token'});
    const token = authorizationHeader.split(' ')[1];
    
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
