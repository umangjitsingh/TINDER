import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
      user: 'chyna14@ethereal.email',
      pass: 'R4WBwp7N3XyfZ2wVhF'
   }
});


export const sendMailToUser=async({emailId,randomToken})=>{
   const info=await transporter.sendMail({
      from: 'chyna14@ethereal.email',
      to: emailId,
      subject: "Verify your Email",
      html: `<h1>Verify your Email</h1>
      <p>You can use this token :<code>${randomToken}</code></p>
      `});

   const testEmailUrl = `https://ethereal.email/message/${info.messageId}`;
   console.log("test mail URL: %s", testEmailUrl)
}

