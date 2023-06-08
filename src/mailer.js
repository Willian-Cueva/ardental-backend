const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // type: "OAuth2",
    user: "enriquewillian2@gmail.com",
    pass: "mksozfcbxpqyqmon",
    // pass: "frlhstixrqfdvyrl",
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
}).catch((e)=>console.log("no se pudo conectar con el servicio de nodemailer"));

module.exports = transporter;