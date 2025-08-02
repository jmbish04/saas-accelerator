"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailPreview = void 0;
const welcome_1 = require("@repo/email/welcome");
const EmailPreview = () => {
    if (process.env.NODE_ENV !== "development")
        return null;
    return (<div className="p-8">
      <welcome_1.WelcomeEmail name="Test User"/>
    </div>);
};
exports.EmailPreview = EmailPreview;
