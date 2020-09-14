const express = require('express');
const nodemailer = require('nodemailer');
const config = require('config');
const validator = require('express-validator');



// let transporter = nodemailer.createTransport(transport, defaults);
// request object fields: 
// name, subject, email, message.



const sendMailRouter = express.Router();

sendMailRouter.get('/sendmail', (req, res) => {
    res.send("Endpoint for sending mail (ﾉ◕ヮ◕)ﾉ*:･ﾟ");
})

sendMailRouter.post('/sendmail/:sendTo',
[]
, (req, res) => {
    const sendToAddress = req.params.sendTo;

    const { name, subject, email, message } = req.body.email;

    const mail = {
        from: email,
        to: config.get(sendToAddress),
        subject: subject,
        text: `Client name: ${name}. Message: ${message}`,
    };

    res.send("mail sent");
});

module.exports = sendMailRouter;