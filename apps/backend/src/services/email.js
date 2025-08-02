"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const sendWelcomeEmail = async (email, name) => {
    await resend.emails.send({
        from: "onboarding@yourdomain.com",
        to: email,
        subject: "Welcome to Our Platform",
        react: name
    }, { name } /  > );
};
exports.sendWelcomeEmail = sendWelcomeEmail;
;
