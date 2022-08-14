const nodemailer = require("nodemailer");
const { info, error, success } = require('consola');
if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const config = {
 smtp_host: process.env.SMTP_HOST,
 smtp_secret: process.env.SMTP_SECRET,
 smtp_user: process.env.SMTP_USER,
 smtp_port: process.env.SMTP_PORT,
 application_name: "Sentinel"
}

exports.sendMail = async function(message = {}) {
    info("sending mail to", message.to+'...');
    const transporter = nodemailer.createTransport({

        host: config.smtp_host,
        port: config.smtp_port, // 587 465
        secure: true,
        auth: {
            user: config.smtp_user,
            pass: config.smtp_secret
        }
    })
    const packet = {
        from: `"${config.application_name}" <${config.smtp_user}>`,
        to: message.to,
        replyTo: `<${config.smtp_user}>`,
        subject: message.subject,
        html: message.body
    };

    try {
        /* send the mail */
        transporter.sendMail(packet, (err, infos) => {
            if (err) {
                error("email sending failed:", err.message);
                info("attempting to send mail again...");
                transporter.sendMail(packet, (err, info) => {
                    if (err) {
                        error("Failed to send mail");
                    } else success("Email sent to:", info.messageId, "after failed trial ");
                });
            } else success("Email sent to:", infos.messageId);
        });

    } catch (e) {
        throw new Error("Something is wrong with the mail service, please try again.");
    }
};


