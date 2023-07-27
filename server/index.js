const express = require("express");
const bodyParser = require('body-parser');
const {compareEmails} = require("./comparatorFunction");
const cors = require('cors')
const {config} = require("./mailConfig")
require('dotenv').config()
const nodemailer = require("nodemailer");
const axios = require("axios");

const PORT = process.env.PORT || 3001;
//middleware
const app = express();
app.use(cors())

/*
    I didn't use a database for the assignment.
    Commented code is for the database implementation.

    *And there would be a file with DB connection credentials*
*/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let emails = []

app.get("/emails", (req, res) => {
    res.json(emails);
    //DB Code:
    //const emails = pool.query("SELECT * FROM USERS");
  });

app.post("/emails", async (req, res)=>{
    const newEmail = req.body.email;
    emails.push(newEmail)

    //DB Code:
    //const emails = pool.query("INSERT INTO USERS (email) VALUES ($1) RETURNING *", [newEmails[i]]);

    emails = emails.sort(compareEmails);
    res.json(emails)
    }
)

app.post("/sendEmail", async (req, res)=>{
    console.log(req.body.email)
    const emailTarget = req.body.email;
    let transporter = nodemailer.createTransport(config);

    const chuckJoke = await axios.get("https://api.chucknorris.io/jokes/random").then((response)=>{
        return response.data.value;
    });

    const data = {
        "from": "INSERT_DESIGNATED_EMAIL",
        "to": emailTarget,
        "subject": "Chuck Norris joke",
        "text": "chuckJoke",
        "html": `<!DOCTYPE html>
        <html>
          <head>
            <title>Chuck Norris Joke</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 20px;
              }
              .email-content {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .joke {
                font-size: 18px;
                font-weight: bold;
                color: #4caf50;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="email-content">
              <h1>Here's a Chuck Norris joke for you:</h1>
              <div class="joke">
                ${chuckJoke}
              </div>
            </div>
          </body>
        </html>`
    }

    transporter.sendMail(data).then((info) => {
        return res.status(201).json(
            {
                msg: "Email sent",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            }
        )
    }).catch((err) => {
        return res.status(500).json({ msg: err });
    }
    );
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});