const express = require("express");
const router = express.Router();
const transporter = require("../utils/nodemailer");
const fs = require("fs");
const {
    application
} = require("express");

router.post("/", (req, res) => {
    console.log("Therapy application:");
    console.log(req.body);

    let message = {
        from: "GEMMA Therapy Application <application@gemmainstitute.com>",
        to: "arnovanstaden@gmail.com",
        subject: "Therapy Application",
        html: buildApplicationEmail(req.body)
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

    function search(nameKey) {
        for (var i = 0; i < applications.length; i++) {
            if (applications[i].name === nameKey) {
                return applications[i];
            }
        }
    }

    let rawdata = fs.readFileSync("./api/data/questions.json");
    let questions = JSON.parse(rawdata);

    const email =
        `
        <h3 style="text-decoration: underline;"> Personal Details </h3>

        <h4>Name:</h4>
        <p> ${search("name").value} </p>
        </br>

        <h4>Date of Birth:</h4>
        <p> ${search("dob").value} </p>
        </br>

        <h4>Email Address:</h4>
        <p> ${search("email").value} </p>
        </br>

        <h4>Phone Number:</h4>
        <p> ${search("phone").value} </p>
        </br>

        <h4>Address:</h4>
        <p> ${search("address").value} </p>
        </br>

        <h4>Date & Time of Availability:</h4>
        <p> ${search("availability").value} </p>
        </br>

        <br>
        <h3 style="text-decoration: underline;"> 1. Current situation and symptoms </h3>

        <h4>1.1 ${questions[1.1]}</h4>
        <p> ${search("question1-1").value} </p>
        </br>

        <h4>1.2 ${questions[1.2]}</h4>
        <p> ${search("question1-2").value} </p>
        </br>

        <h4>1.3 ${questions[1.3]}</h4>
        <p> ${search("question1-3").value} </p>
        </br>

        <h4>1.4 ${questions[1.4]}</h4>
        <p> ${search("question1-4").value} </p>
        </br>

  
        <br>
        <h3 style="text-decoration: underline;"> 2. Personal history </h3>

        <h4>2.1 ${questions[2.1]}</h4>
        <p> ${search("question2-1").value} </p>
        </br>

        <h4>2.2 ${questions[2.2]}</h4>
        <p> ${search("question2-2").value} </p>
        </br>

        <h4>2.3 ${questions[2.3]}</h4>
        <p> ${search("question2-3").value} </p>
        </br>

        <h4>2.4 ${questions[2.4]}</h4>
        <p> ${search("question2-4").value} </p>
        </br>
  
        <br>
        <h3 style="text-decoration: underline;"> 3. Resources </h3>

        <h4>3.1 ${questions[3.1]}</h4>
        <p> ${search("question3-1").value} </p>
        </br>

        <h4>3.2 ${questions[3.2]}</h4>
        <p> ${search("question3-2").value} </p>
        </br>

        <h4>3.3 ${questions[3.3]}</h4>
        <p> ${search("question3-3").value} </p>
        </br>
  
        <br>
        <h3 style="text-decoration: underline;"> 4. Goals/vision </h3>

        <h4>4.1 ${questions[4.1]}</h4>
        <p> ${search("question4-1").value} </p>
        </br>

        <h4>4.2 ${questions[4.2]}</h4>
        <p> ${search("question4-2").value} </p>
        </br>

        <h4>4.3 ${questions[4.3]}</h4>
        <p> ${search("question4-3").value} </p>
        </br>

        <h4>4.4 ${questions[4.4]}</h4>
        <p> ${search("question4-4").value} </p>
        </br>
  
        <br>
        <h3 style="text-decoration: underline;"> 6. Medical history </h3>

        <h4>Height:</h4>
        <p> ${search("height").value} cm</p>
        </br>

        <h4>Weight:</h4>
        <p> ${search("weight").value} kg</p>
        </br>

        <h4>6.1 Symptoms:</h4>
        <p> ${search("question6-1").value.length < 1 ? "none" : search("question6-1").value} </p>
        </br>

        <h4>6.2 ${questions[6.2]}</h4>
        <p> ${search("question6-2").value} </p>
        </br>

        <h4>6.3 ${questions[6.3]}</h4>
        <p> ${search("question6-3").value} </p>
        </br>

        <h4>6.4 ${questions[6.4]}</h4>
        <p> ${search("question6-4").value} </p>
        </br>

        <h4>6.5 ${questions[6.5]}</h4>
        <p> ${search("question6-5").value} </p>
        </br>

        <h4>6.6 ${questions[6.6]}</h4>
        <p> ${search("question6-6").value} </p>
        </br>

        <h4>6.7 ${questions[6.7]}</h4>
        <p> ${search("question6-7").value} </p>
        </br>

        <h4>6.8 ${questions[6.8]}</h4>
        <p> ${search("question6-8").value} </p>
        </br>

        <h4>6.9 ${questions[6.9]}</h4>
        <p> ${search("question6-9").value} </p>
        </br>

        <br>
        <h4 style="text-decoration: underline;">Gynaecological history </h4>
      

        <h4>6.10.1 ${questions["6.10.1"]}</h4>
        <p> ${search("question6-10-1").value} </p>
        </br>

        <h4>6.10.2 ${questions["6.10.2"]}</h4>
        <p> ${search("question6-10-2").value} </p>
        </br>

        <h4>6.10.3 ${questions["6.10.3"]}</h4>
        <p> ${search("question6-10-3").value} </p>
        </br>

        <h4>6.10.4 ${questions["6.10.4"]}</h4>
        <p> ${search("question6-10-4").value} </p>
        </br>

        <h4>6.10.5 ${questions["6.10.5"]}</h4>
        <p> ${search("question6-10-5").value} </p>
        </br>

        <h4>6.10.6 ${questions["6.10.6"]}</h4>
        <p> ${search("question6-10-6").value} </p>
        </br>

        <br>
        <h4 style="text-decoration: underline;"> Family history </h4>
        <br>
        <h4> Is there a history of illness in your family? (high blood pressure, cardiovascular diseases, cancer, addiction, mental illness, etc.) </h4>

        <h4>6.11.1 ${questions["6.11.1"]}</h4>
        <p> ${search("question6-11-1").value} </p>
        </br>

        <h4>6.11.2 ${questions["6.11.2"]}</h4>
        <p> ${search("question6-11-2").value} </p>
        </br>

        <h4>6.11.3 ${questions["6.11.3"]}</h4>
        <p> ${search("question6-11-3").value} </p>
        </br>

        <h4>6.11.4 ${questions["6.11.4"]}</h4>
        <p> ${search("question6-11-4").value} </p>
        </br>

        <br>
        <h4 style="text-decoration: underline;"> Suicidal Tendencies </h4>

        <h4>6.12.1 ${questions["6.12.1"]}</h4>
        <p> ${search("question6-12-2").value} </p>
        </br>

        <h4>6.12.2 ${questions["6.12.2"]}</h4>
        <p> ${search("question6-12-2").value} </p>
        </br>

    `
    console.log(email)
    return email
}