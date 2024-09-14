import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { EmailTemplate, EmailTemplateProps } from '../components/shared/email-templates/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail  = async (to: string, subject: string, template: React.ReactNode) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to,
    subject,
    react: template,
  });

  if (error) {
    throw error
  }

  return data
};