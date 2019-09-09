require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const mailgun = require('mailgun-js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/enviar-email', (req, res) => {
  res.send("API Iniciada...");
  enviarEmail(req);
});

app.listen(process.env.PORT || 3000);

async function enviarEmail(req) {

  const mailjet = require('node-mailjet').connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);
  const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": {
            "Email": `${req.query.from}`,
            "Name": `${req.query.name}`
          },
          "To": [
            {
              "Email": `${process.env.EMAIL_TO}`,
              "Name": "MinhaPrevidencia"
            }
          ],
          "Subject": "MinhaPrevidência - Relatório Aplicativo",
          "TextPart": `${req.query.html}`,
          "HTMLPart": `${req.query.html}`,
          "CustomID": "AppMinhaPrevidencia"
        }
      ]
    })
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    })


  // sgMail.setApiKey(process.env.SENDGRID_KEY);
  // const msg = {
  //     from: `${req.query.name} <${req.query.from}>`,
  //     to: `${process.env.EMAIL_TO}`,
  //     subject: `${req.query.subject}`,
  //     text: `${req.query.text}`,
  //     html: `<b>${req.query.html}</b>`
  // }
  // sgMail.send(msg).then((sent) => {
  //     console.log('Email enviado com sucesso!');
  //     console.log(sent.statusCode);
  // }).catch((error) => {
  //     console.log("Ocorreu um erro ao enviar o email.")
  //     console.log(error);
  // });
}