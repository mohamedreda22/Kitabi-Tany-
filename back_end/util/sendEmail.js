const nodemailer = require("nodemailer");

const transporterOptions = {
    host: process.env.HOST,
    port: +process.env.PORT,
    secure: true,
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.USER_PASSWORD
    }
}

const transporter = nodemailer.createTransport(transporterOptions)


const sendEmail = (options) => {
    transporter.sendMail({
        from: process.env.USER_NAME,
        to: options.mailTo,
        subject: options.subject,
        html: options.emailBody
    })
}


module.exports = sendEmail