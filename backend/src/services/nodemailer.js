import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
      user: 'constance.schuster@ethereal.email',
      pass: 'hEHT7DTd8bvWnY5rf6'
   }
});


export const sendMailToUser = async ({ to, subject, html, text }) => {
   await transporter.sendMail({
      from: 'constance.schuster@ethereal.email',
      to,
      subject,
      html,
      text,
   });
}

