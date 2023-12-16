"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransporter = void 0;
const nodemailer_1 = require("nodemailer");
require("dotenv/config");
const getTransporter = async () => {
    const transporter = (0, nodemailer_1.createTransport)({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });
    return transporter;
};
exports.getTransporter = getTransporter;
