const status = require('../Config/status.json');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        console.log('Error Header Authorization');
        res.json({status: status.Error, message: 'Error Header Authorization'});
    }
    else {
        token = authorizationHeader.split(' ')[1];
        if (!token) res.json({status: status.Error, message: 'Error Token'});
        else {
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
    };
}

module.exports = {
    verifyToken
}
