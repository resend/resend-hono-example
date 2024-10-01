import { Hono } from 'hono';
import { Resend } from 'resend';
import { EmailTemplate } from './emails/email-template';

const app = new Hono();
const resend = new Resend('re_123456789');

app.get('/', async (c) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'hello world',
    react: <EmailTemplate firstName="John" />,
  });

  if (error) {
    return c.json(error);
  }

  return c.json(data);
});

export default app;
