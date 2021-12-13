const authHandle = require('../Models/auth.handle');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const status = require('../Config/status.json');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "phanduykha2000@gmail.com",
        pass: "duykha501001"
    }
})

let refreshTokens = [];

router.post('/login', (req, res) => {
    console.log(`api/auth/login called!!!!`);
    const username = req.body.username;
    const password = req.body.password;
    authHandle.login(username, password).then(function(user) {
        if (user.recordsets[0].length) {
            const accessToken = jwt.sign({UserID: user.recordset[0].UserID, Username: username}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            const refreshToken = jwt.sign({UserID: user.recordset[0].UserID, Username: username}, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            user.recordset[0].Password = '';
            res.json({accessToken: accessToken, refreshToken: refreshToken, data: user.recordset[0]});
        }
        else {
            res.json({status: status.Error, message: "Incorrect Username or Password!"});
        }
    });
})

router.post('/refreshToken', (req, res) => {
    console.log(`api/auth/refreshToken called!!!!`);
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) res.json({ status: status.Unauthorized});
    if (!refreshTokens.includes(refreshToken)) res.json({ status: status.Forbidden });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) res.json({status: status.Forbidden});
        const accessToken = jwt.sign({UserID: data.UserID, Username: data.Username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        res.json({accessToken: accessToken});
    })
})

router.post('/logout', (req, res) => {
    console.log(`api/auth/logout called!!!!`);
    const refreshToken = req.body.refreshToken;
    refreshTokens = refreshTokens.filter(refToken => refToken !== refreshToken);
    res.json({status: status.Success});
})

router.post('/signup', (req, res) => {
    console.log(`api/auth/signup called!!!!`);
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    authHandle.getByUsername(username).then((value) => {
        if (value.recordset.length === 1) {
            res.json({status: status.Error, message: "Username Existed!"});
        }
        else {
            authHandle.getByEmail(email).then((value2) => {
                if (value2.recordset.length === 1) {
                    res.json({status: status.Error, message: "Email is already taken!"});
                }
                else {
                    authHandle.signup(username, password, email).then(result => {
                        const verify_mail = {
                            from: "phanduykha2000@gmail.com",
                            to: `${email}`,
                            subject: "Online Exam - Verify your account",
                            text: `
                                Hello ${username}, thanks for registering on Online Exam.
                                Please click the link below to verify you account.
                                http://localhost:8889/api/auth/verify?token=${username}
                            `,
                            html: `
                                <h1>Hello ${username}, Welcome to Online Exam<h1>
                                <p>Thanks for registering on our site.<p>
                                <p>Please click the link below to verify you account.<p>
                                <a href="http://localhost:8889/api/auth/verify?token=${username}">Verify your account</a>
                            `
                        }
                        transporter.sendMail(verify_mail, (err, info) => {
                            if (err) {
                                console.error(err)
                            }
                            else res.json({status: status.Success})
                        })
                    });
                }
            });
        }
    });
})

router.get('/verify', (req, res) => {
    console.log(`api/auth/verify called!!!!`);
    const username = req.query.token;
    authHandle.verify(username).then(() => {
        res.json({status: status.Success, message: `Verified account '${username}'. Thanks for your register.`})
    })
})

module.exports = router;
