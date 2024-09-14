import * as React from 'react';

export interface EmailTemplateProps {
  firstName: string;
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  orderId,
  totalAmount,
  paymentUrl
}) => (
  <div>
    <h1>Thank you for choosing mine beats, {firstName}!</h1>
    <h2>Order {orderId}, {totalAmount}$. To purchase <a href={paymentUrl}>click here</a></h2>
    ...
  </div>
);