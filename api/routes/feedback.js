const express = require("express");
const router = express.Router();
const transporter = require("../utils/nodemailer")

router.post("/website", (req, res) => {

    console.log("Website Feedback:");
    console.log(req.body);

    var message = {
        from: "feedback@gemmainstitute.com",
        to: "arnovanstaden@gmail.com",
        subject: "Website Feedback",
        html: `
            <h4>Website Feedback:</h4>
            <p> ${req.body[0].value}</p>
        `
    };

    transporter.sendMail(message, (error, result) => {
        if (error) {
            return console.log(error)
        }
        console.log(result);
    })


    res.status(200).json({
        message: "Successful"
    });

});

router.post("/session", (req, res) => {
    console.log(req.body);
    res.status(200).json({
        message: "Successful"
    })
})


module.exports = router;