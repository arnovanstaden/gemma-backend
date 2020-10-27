const express = require("express");
const router = express.Router();
const transporter = require("../utils/nodemailer");
const fs = require("fs");

const searchName = (nameKey, data) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i].name === nameKey) {
            return data[i];
        }
    }
}

router.post("/website", (req, res) => {

    console.log("Website Feedback:");
    console.log(req.body);

    let message = {
        from: "GEMMA Feedback <thegemmainstitute@gmail.com>",
        // to: "arnovanstaden@gmail.com",
        to: "feedback@gemmainstitute.com",
        subject: "Website Feedback",
        html: `
            <h4>Website Feedback:</h4>
            <p> ${req.body[0].value}</p>
        `,
    };

    transporter.sendMail(message, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "There seems to be an error submitting your feedback at this time. Please email your feedback to feedback@gemmainstitute.com."
            })
            return console.log(error)
        }
        res.status(200).json({
            message: "Successful"
        });

        console.log(result);
    })

});

router.post("/session", (req, res) => {

    console.log("Session Feedback:");
    console.log(req.body);

    let message = {
        from: "GEMMA Feedback <feedback@gemmainstitute.com>",
        // to: "arno@webdacity.dev",
        to: "feedback@gemmainstitute.com",
        subject: "Session Feedback",
        html: buildSessionFeedbackEmail(req.body),
        attachments: [{
            filename: `Session Feedback - ${searchName("full_name", req.body).value}.html`,
            content: buildSessionFeedbackEmail(req.body)
        }]
    };

    transporter.sendMail(message, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "There seems to be an error submitting your feedback at this time. Please email your feedback to feedback@gemmainstitute.com."
            })
            return console.log(error)
        }
        res.status(200).json({
            message: "Successful"
        });

        console.log(result);
    });


})


module.exports = router;

// --------------------------------
// EMAILS

const buildSessionFeedbackEmail = (feedback) => {
    const search = (nameKey) => {
        for (var i = 0; i < feedback.length; i++) {
            if (feedback[i].name === nameKey) {
                if (feedback[i].name === "") {
                    return "No Answer"
                } else {
                    return feedback[i];
                }
            }
        }
    }

    let rawdata;
    if (search("german-feedback").value === true) {
        console.log("German Feedback")
        rawdata = fs.readFileSync("./api/data/feedback-german.json");
    } else {
        console.log("English Feedback")
        rawdata = fs.readFileSync("./api/data/feedback-english.json");
    }

    let questions = JSON.parse(rawdata);

    const email =

        `
        <h4>${questions["name"]}:</h4>
        <p> ${search("full_name").value} </p>
        </br>
        </br>
        
        <h4>${questions["sessionDate"]}:</h4>
        <p> ${search("session_date").value} </p>
        </br>
        </br>

        <h4>${questions[1]}</h4>
        <p> Rating: ${search("question1-rating").value}/10</p>
        <p> ${search("question1").value} </p>
        </br>
        </br>
        <h4>${questions[2]}</h4>
        <p> Rating: ${search("question2-rating").value}/10</p>
        </br>
        <p> ${questions["notUnderstood"]}: </p>
        <p> ${search("question2a").value} </p>
        </br>
        <p> ${questions["understood"]}: </p>
        <p> ${search("question2b").value} </p>
        </br>
        </br>
        <h4>${questions[3]}</h4>
        <p> Rating: ${search("question3-rating").value}/10</p>
        </br>
        <p> ${questions["notUnderstood"]}: </p>
        <p> ${search("question3a").value} </p>
        </br>
        <p> ${questions["understood"]}: </p>
        <p> ${search("question3b").value} </p>
        </br>
        </br>
        <h4>${questions[4]}</h4>
        <p> ${search("question4").value} </p>
        </br>
        </br>
        <h4>${questions[5]}</h4>
        <p> ${search("question5").value} </p>
        </br>
    `
    return email
}