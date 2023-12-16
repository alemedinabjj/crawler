"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const path_1 = __importDefault(require("path"));
const nodemailer_1 = require("../libs/nodemailer");
const handlebars_1 = __importDefault(require("handlebars"));
const fs = __importStar(require("fs"));
async function sendEmail({ subject, template, body }) {
    const transporter = await (0, nodemailer_1.getTransporter)();
    const templatePath = path_1.default.join(process.cwd(), 'src', 'templates', `${template}.hbs`);
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const templateCompiled = handlebars_1.default.compile(templateSource);
    const compiled = templateCompiled(body);
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject,
        html: compiled,
    };
    await transporter.sendMail(mailOptions);
}
exports.emailService = {
    sendEmail,
};
