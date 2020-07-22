const nodemailer = require("nodemailer");

// Nodemailer Transport Setup
let transporterOrders = nodemailer.createTransport({
    host: "mail.gemmainstitute.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: "feedback@gemmainstitute.com",
        pass: process.env.NODEMAILER_PW
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporterOrders.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages (feedback@)");
    }
});