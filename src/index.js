require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/enviar-email', (req, res) => {
    res.send("API Iniciada...");
    enviarEmail(req, res);
});

app.listen(process.env.PORT || 3000);

async function enviarEmail(req, res) {
    res.send("Enviando email...");
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const msg = {
        from: `${req.query.name} <${req.query.from}>`,
        to: `${process.env.EMAIL_TO}`,
        subject: `${req.query.subject}`,
        text: `${req.query.text}`,
        html: `<b>${req.query.html}</b>`
    }
    sgMail.send(msg).then((sent) => {
        console.log('Email enviado com sucesso!');
        console.log(sent);
    }).catch((error) => {
        console.log("Ocorreu um erro ao enviar o email.")
        console.log(error);
    });
}