import { Resend } from "resend";
import { WelcomeEmail } from "@repo/email/welcome";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendWelcomeEmail = async (email: string, name: string) => {
  await resend.emails.send({
    from: "onboarding@yourdomain.com",
    to: email,
    subject: "Welcome to Our Platform",
    react: <WelcomeEmail name={name} />,
  });
}; 