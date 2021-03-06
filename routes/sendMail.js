const express = require('express');
const nodemailer = require('nodemailer');
const config = require('config');
const { body, validationResult } = require('express-validator');

const sendMailRouter = express.Router();

sendMailRouter.get('/sendmail', (req, res) => {
    res.send("Endpoint for sending mail (ﾉ◕ヮ◕)ﾉ*:･ﾟ");
})

sendMailRouter.post('/sendmail/:sendTo',
[
    body('email.name')
        .notEmpty()
        .escape(),
    body('email.subject')
        .notEmpty()
        .escape(),
    body('email.message')
        .notEmpty()
        .escape(),
    body('email.email')
        .isEmail(),
]
, (req, res) => {
    // sata validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const sendToAddress = req.params.sendTo.toString();

    if (!config.has(sendToAddress) || sendToAddress.length > 10) {
        res.status(400).send('Invalid endpoint');
        return;
    }
    
    // send email
    const { name, subject, email, message } = req.body.email;

    const mail = {
        from: config.get(`${sendToAddress}.email`), 
        to: config.get(`${sendToAddress}.email`),
        subject: subject,
        html: `<p>Client name: ${name}. <br></br>Client email ${email}.<br></br> Message: ${message}.<p>`,
    };

    try {
        let transporter = nodemailer.createTransport({
            host: config.get(`${sendToAddress}.host`),
            port: config.get(`${sendToAddress}.port`),
            secure: false,   
            auth: {
                user: config.get(`${sendToAddress}.email`),
                pass: config.get(`${sendToAddress}.password`)
            }
        });
        
        transporter.sendMail(mail, (err) => {
            if (err) {
                throw err;
            }
            res.send('mail sent');
        });
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = sendMailRouter;