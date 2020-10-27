const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thegemmainstitute@gmail.com',
        pass: process.env.NODEMAILER_PW
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages (thegemmainstitute@)");
    }
});

module.exports = transporter;