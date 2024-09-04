import { Hono } from "hono";
import { Resend } from "resend";
import { EmailTemplate } from "./emails/email-template";

const app = new Hono();

app.get("/", async (c) => {
  const resend = new Resend("re_123456789" /* c.env.RESEND_API_KEY */);

  const data = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "hello world",
    react: <EmailTemplate firstName="John" />,
  });

  return c.json(data);
});

export default app;
