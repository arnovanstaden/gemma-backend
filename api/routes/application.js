const express = require("express");
const router = express.Router();
const transporter = require("../utils/nodemailer");
const fs = require("fs");
const pdf = require("html-pdf");
const {
    create
} = require("domain");


// -----------------------
//  ROUTES


const search = (nameKey, data) => {
    for (var i = 0; i < data.length; i++) {
        if (data[i].name === nameKey) {
            return data[i];
        }
    }
}

router.post("/", (req, res) => {
    console.log("Therapy application:");
    console.log(req.body);

    // GEMMA Message
    let message = {
        from: "GEMMA Therapy Application <application@gemmainstitute.com>",
        to: "application@gemmainstitute.com",
        // to: "arnovanstaden@gmail.com",
        subject: `Therapy Application - ${search("name", req.body).value}`,
        replyTo: `${search("email", req.body).value}`,
        html: buildApplicationEmail(req.body),
        attachments: [{
            filename: `Therapy Application - ${search("name", req.body).value}.html`,
            content: buildApplicationEmail(req.body)
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

});


module.exports = router;


// --------------------------------
// EMAILS

const buildApplicationEmail = (applications) => {

    let rawdata = fs.readFileSync("./api/data/questions.json");
    let questions = JSON.parse(rawdata);

    const email =
        `<html>
        <body>
        <h3 style="text-decoration: underline;"> Personal Details </h3>

        <h4>Name:</h4>
        <p> ${search("name",applications).value} </p>
        </br>

        <h4>Date of Birth:</h4>
        <p> ${search("dob",applications).value} </p>
        </br>

        <h4>Email Address:</h4>
        <p> ${search("email",applications).value} </p>
        </br>

        <h4>Phone Number:</h4>
        <p> ${search("phone",applications).value} </p>
        </br>

        <h4>Date & Time of Availability:</h4>
        <p> ${search("availability",applications).value} </p>
        </br>

        <br>
        <h3 style="text-decoration: underline;"> 1. Current situation and symptoms </h3>

        <h4>1.1 ${questions[1.1]}</h4>
        <p> ${search("question1-1",applications).value} </p>
        </br>

        <h4>1.2 ${questions[1.2]}</h4>
        <p> ${search("question1-2",applications).value} </p>
        </br>

        <h4>1.3 ${questions[1.3]}</h4>
        <p> ${search("question1-3",applications).value} </p>
        </br>

        <h4>1.4 ${questions[1.4]}</h4>
        <p> ${search("question1-4",applications).value} </p>
        </br>

  
        <br>
        <h3 style="text-decoration: underline;"> 2. Personal history </h3>

        <h4>2.1 ${questions[2.1]}</h4>
        <p> ${search("question2-1",applications).value} </p>
        </br>

        <h4>2.2 ${questions[2.2]}</h4>
        <p> ${search("question2-2",applications).value} </p>
        </br>

        <h4>2.3 ${questions[2.3]}</h4>
        <p> ${search("question2-3",applications).value} </p>
        </br>

        <h4>2.4 ${questions[2.4]}</h4>
        <p> ${search("question2-4",applications).value} </p>
        </br>
  
        <br>
        <h3 style="text-decoration: underline;"> 3. Resources </h3>

        <h4>3.1 ${questions[3.1]}</h4>
        <p> ${search("question3-1",applications).value} </p>
        </br>

        <h4>3.2 ${questions[3.2]}</h4>
        <p> ${search("question3-2",applications).value} </p>
        </br>

        <h4>3.3 ${questions[3.3]}</h4>
        <p> ${search("question3-3",applications).value} </p>
        </br>
  
        <br>
        <h3 style="text-decoration: underline;"> 4. Goals/vision </h3>

        <h4>4.1 ${questions[4.1]}</h4>
        <p> ${search("question4-1",applications).value} </p>
        </br>

        <h4>4.2 ${questions[4.2]}</h4>
        <p> ${search("question4-2",applications).value} </p>
        </br>

        <h4>4.3 ${questions[4.3]}</h4>
        <p> ${search("question4-3",applications).value} </p>
        </br>

        <h4>4.4 ${questions[4.4]}</h4>
        <p> ${search("question4-4",applications).value} </p>
        </br>
  
        <br>
        <h3 style="text-decoration: underline;"> 6. Medical history </h3>

        <h4>Height:</h4>
        <p> ${search("height",applications).value} cm</p>
        </br>

        <h4>Weight:</h4>
        <p> ${search("weight",applications).value} kg</p>
        </br>

        <h4>6.1 Symptoms:</h4>
        <p> ${search("question6-1",applications).value.length < 1 ? "none" : search("question6-1",applications).value} </p>
        </br>

        <h4>6.2 ${questions[6.2]}</h4>
        <p> ${search("question6-2",applications).value} </p>
        </br>

        <h4>6.3 ${questions[6.3]}</h4>
        <p> ${search("question6-3",applications).value} </p>
        </br>

        <h4>6.4 ${questions[6.4]}</h4>
        <p> ${search("question6-4",applications).value} </p>
        </br>

        <h4>6.5 ${questions[6.5]}</h4>
        <p> ${search("question6-5",applications).value} </p>
        </br>

        <h4>6.6 ${questions[6.6]}</h4>
        <p> ${search("question6-6",applications).value} </p>
        </br>

        <h4>6.7 ${questions[6.7]}</h4>
        <p> ${search("question6-7",applications).value} </p>
        </br>

        <h4>6.8 ${questions[6.8]}</h4>
        <p> ${search("question6-8",applications).value} </p>
        </br>

        <h4>6.9 ${questions[6.9]}</h4>
        <p> ${search("question6-9",applications).value} </p>
        </br>

        <br>
        <h4 style="text-decoration: underline;">Gynaecological history </h4>
      

        <h4>6.10.1 ${questions["6.10.1"]}</h4>
        <p> ${search("question6-10-1",applications).value} </p>
        </br>

        <h4>6.10.2 ${questions["6.10.2"]}</h4>
        <p> ${search("question6-10-2",applications).value} </p>
        </br>

        <h4>6.10.3 ${questions["6.10.3"]}</h4>
        <p> ${search("question6-10-3",applications).value} </p>
        </br>

        <h4>6.10.4 ${questions["6.10.4"]}</h4>
        <p> ${search("question6-10-4",applications).value} </p>
        </br>

        <h4>6.10.5 ${questions["6.10.5"]}</h4>
        <p> ${search("question6-10-5",applications).value} </p>
        </br>

        <h4>6.10.6 ${questions["6.10.6"]}</h4>
        <p> ${search("question6-10-6",applications).value} </p>
        </br>

        <br>
        <h4 style="text-decoration: underline;"> Family history </h4>
        <br>
        <h4> Is there a history of illness in your family? (high blood pressure, cardiovascular diseases, cancer, addiction, mental illness, etc.) </h4>

        <h4>6.11.1 ${questions["6.11.1"]}</h4>
        <p> ${search("question6-11-1",applications).value} </p>
        </br>

        <h4>6.11.2 ${questions["6.11.2"]}</h4>
        <p> ${search("question6-11-2",applications).value} </p>
        </br>

        <h4>6.11.3 ${questions["6.11.3"]}</h4>
        <p> ${search("question6-11-3",applications).value} </p>
        </br>

        <h4>6.11.4 ${questions["6.11.4"]}</h4>
        <p> ${search("question6-11-4",applications).value} </p>
        </br>

        <br>
        <h4 style="text-decoration: underline;"> Suicidal Tendencies </h4>

        <h4>6.12.1 ${questions["6.12.1"]}</h4>
        <p> ${search("question6-12-2",applications).value} </p>
        </br>

        <h4>6.12.2 ${questions["6.12.2"]}</h4>
        <p> ${search("question6-12-2",applications).value} </p>
        </br>

        </br>
        </br>
        <h3> Terms & Conditions <h3>

        <h4>Costs:</h4>
        <p> ${search("cost-terms",applications).value} </p>
        </br>

        <h4>Medical:</h4>
        <p> ${search("medical-terms",applications).value} </p>
        </br>

        <h4>Privacy:</h4>
        <p> ${search("privacy-terms",applications).value} </p>
        </br>

        <h4>Video Recording</h4>
        <p> ${search("video-terms",applications).value.join("<br>")} </p>
        </br>
        </html>
        </body>
    `
    return email
}

const createPDF = (html) => {
    pdf.create(html).toBuffer(function (err, buffer) {
        return buffer
    })
}