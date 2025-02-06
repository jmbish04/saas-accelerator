import { WelcomeEmail } from "@repo/email/welcome";

export const EmailPreview = () => {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="p-8">
      <WelcomeEmail name="Test User" />
    </div>
  );
}; 