const express = require('express');
const nodemailer = require('nodemailer');
const config = require('config');
const validator = require('express-validator');

// request object fields: 
// name, subject, email, message.




const sendMailRouter = express.Router();

sendMailRouter.get('/sendmail', (req, res) => {
    res.send("Endpoint for sending mail (ﾉ◕ヮ◕)ﾉ*:･ﾟ");
})

sendMailRouter.post('/sendmail/:sendTo',
[]
, (req, res) => {
    const sendToAddress = req.params.sendTo.toString();

    const { name, subject, email, message } = req.body.email;

    const mail = {
        from: email,
        to: config.get(`${sendToAddress}.email`),
        subject: subject,
        html: `<p>Client name: ${name}. <br></br> Message: ${message}<p>`,
    };

    let transporter = nodemailer.createTransport({
        host: config.get(`${sendToAddress}.host`),
        port: config.get(`${sendToAddress}.port`),
        secure: false,   
        auth: {
          user: config.get(`${sendToAddress}.email`),
          pass: config.get(`${sendToAddress}.password`)
        }
    });
    transporter.verify(function(error, success) {
        if (error) {
            console.log("Transporter is incorrectly configured.")
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    transporter.sendMail(mail, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send();
            return;
        }
        res.send('mail sent');
    })
});

module.exports = sendMailRouter;