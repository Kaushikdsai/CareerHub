const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function sendAssessmentEmail(to,applicantName,job,link,deadline){
  const mailOptions={
    from: process.env.EMAIL_USER,
    to,
    subject: `Assessment for ${job.jobDomain} at ${job.organizationName}`,
    html: `
      <p>Hello ${applicantName},</p>
      <p>Thank you for applying to <strong>${job.organizationName}</strong> for the role of <strong>${job.jobDomain}</strong>.</p>
      <p>Please complete the following assessment to proceed with your application:</p>
      <p><a href="${link}">${link}</a></p>
      ${deadline ? `<p><strong>Deadline:</strong> ${deadline}</p>` : ''}
      <p>We look forward to reviewing your submission.</p>
      <p>Best regards,<br/>Recruitment Team<br/>${job.organizationName}</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports={sendAssessmentEmail};
