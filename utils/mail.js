const nodemailer = require('nodemailer');
console.log(process.env.EMAIL_USERNAME);

const transport = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendMessage = async (subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USERNAME, // Sender address
            to: 'mdashifreza3@gmail.com', // List of recipients
            subject: subject, // Subject line
            html: text, // Plain text body
        };
        const info = await transport.sendMail(mailOptions);
        console.log(info);
    } catch (error) {
        console.log(error);
        return new Error("Error sending message")
    }
}

module.exports = sendMessage;