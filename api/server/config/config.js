const nodemailer = require("nodemailer");
require("dotenv").config();

const dbConfig = {
    client: "mongodb",
    connection: {
        host: process.env.DATABASE_HOST || "localhost",
        port: process.env.DATABASE_PORT || 27017,
        database: process.env.DATABASE_SCHEMAS || "edu-quizly",
        username: process.env.DATABASE_USER || "",
        password: process.env.DATABASE_PASSWORD || "",
    },
};

const mailTransportConfig = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

module.exports = {
    dbConfig,
    mailTransportConfig,
};
