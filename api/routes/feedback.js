const express = require("express");
const router = express.Router();
const transporter = require("../utils/nodemailer")

router.post("/website", (req, res) => {

    console.log("Website Feedback:");
    console.log(req.body);

    let message = {
        from: "GEMMA Feedback <feedback@gemmainstitute.com>",
        to: "arnovanstaden@gmail.com",
        // to: "feedback@gemmainstitute.com",
        subject: "Website Feedback",
        html: `
            <h4>Website Feedback:</h4>
            <p> ${req.body[0].value}</p>
        `
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
        to: "arnovanstaden@gmail.com",
        // to: "feedback@gemmainstitute.com",
        subject: "Session Feedback",
        html: buildSessionFeedbackEmail(req.body)
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

    function search(nameKey) {
        for (var i = 0; i < feedback.length; i++) {
            if (feedback[i].name === nameKey) {
                return feedback[i];
            }
        }
    }

    const email =

        `
        <h4>Name:</h4>
        <p> ${search("full_name").value} </p>
        </br>

        <h4>Session Date:</h4>
        <p> ${search("session_date").value} </p>
        </br>


        <h4>Were you able to talk about what you wanted in the session?</h4>
        <p> Rating: ${search("question1-rating").value}/10</p>
        <p> ${search("question1").value} </p>
        </br>

        <h4>Were you able to talk about what you wanted in the session?</h4>
        <p> Rating: ${search("question2-rating").value}/10</p>
        <p> ${search("question2a").value} </p>
        </br>
        <p> ${search("question2b").value} </p>
        </br>

        <h4>Did you feel understood by the therapist during the session?</h4>
        <p> Rating: ${search("question3-rating").value}/10</p>
        <p> ${search("question3a").value} </p>
        </br>
        <p> ${search("question3b").value} </p>
        </br>

        <h4>What surprised you most during the session?</h4>
        <p> ${search("question4").value} </p>
        </br>

        <h4>What moved you most during the session?</h4>
        <p> ${search("question5").value} </p>
        </br>
    `

    return email
}