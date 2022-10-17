const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "enriquewillian2@gmail.com",
    pass: "mksozfcbxpqyqmon",
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

module.exports = transporter;