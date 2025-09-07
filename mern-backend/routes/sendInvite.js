const express=require('express')
const nodemailer=require('nodemailer')
const router=express.Router();

router.post('/', async (req,res) => {
    const{
        applicantEmail, applicantName, jobTitle, organizationName, date, time, mode, link, location
    }=req.body;

    const emailContent=`
        <h2>Interview Invitation</h2>
        <p>Hi ${applicantName},</p>
        <p>We are pleased to inform you that you have been shortlisted for the position of <strong>${jobTitle}</strong> at <strong>${organizationName}</strong>.</p>
        <p><strong>Date & Time:</strong> ${date} at ${time}</p>
        <p><strong>Mode:</strong> ${mode === 'online' ? 'Online' : 'Offline'}</p>
        ${mode === 'online' ? `<p><strong>Meeting Link:</strong> <a href="${link}">${link}</a></p>` : `<p><strong>Location:</strong> ${location}</p>`}
        <p>We look forward to your presence. Please confirm your availability.</p>
        <p>Best Regards,<br/>${organizationName} Recruitment Team</p>
    `;

    try{
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

        await transporter.sendMail({
            from: `"${organizationName} Recruitment" <${process.env.EMAIL_USER}>`,
            to: applicantEmail,
            subject: `Interview Invitation - ${jobTitle} - ${organizationName}`,
            html: emailContent
        });

        res.send({ message: 'Email sent successfully'});
    }
    catch(err){
        console.error(err);
        res.status(500).send({ error: 'Failed to send mail'});
    }
});

module.exports=router;