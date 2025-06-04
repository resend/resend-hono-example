import { Hono } from 'hono';
import { Resend } from 'resend';
import { EmailTemplate } from './emails/email-template';

type Bindings = {
  RESEND_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
  const resend = new Resend(c.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'hello world',
    react: <EmailTemplate firstName="John" />,
  });

  if (error) {
    return c.json(error, 400);
  }

  return c.json(data);
});

export default app;
