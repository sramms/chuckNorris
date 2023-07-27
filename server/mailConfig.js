require('dotenv').config();

const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.ACC_NAME,
        pass: process.env.APP_PASS2
    }
}

module.exports = {config}