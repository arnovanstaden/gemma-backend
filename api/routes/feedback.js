const express = require("express");
const router = express.Router();
const transporter = require("../utils/nodemailer")

router.post("/website", (req, res) => {
    const data = req.body;

    var message = {
        from: "info@gemmainstitute.com",
        to: "arnovanstaden@gmail.com",
        subject: "Test",
        text: data,
    };

    transporter.sendMail(message, (error, result) => {
        if (error) {
            return console.log(error)
        }
        console.log(result);
    })


    res.status(200).json({
        message: "Successful"
    })
});

router.post("/session", (req, res) => {
    console.log(req.body);
    res.status(200).json({
        message: "Successful"
    })
})


module.exports = router;