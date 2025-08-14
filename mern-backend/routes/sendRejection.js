const express=require('express')
const nodemailer=require('nodemailer')
const router=express.Router();

router.post('/', async (req,res) => {
    const{
        applicantEmail, applicantName, jobTitle, organizationName
    }=req.body;

    const emailContent=`
        <h2>Application Update</h2>
        <p>Hi ${applicantName},</p>
        <p>Thank you for applying for the <strong>${jobTitle}</strong> position at <strong>${organizationName}</strong>.</p>
        <p>After careful consideration of your profile, we regret to inform you that we will not be moving forward with your application at this time.</p>
        <p>We wish you all the best in your future endeavors and encourage you to apply for other opportunities with us.</p>
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
            subject: `Application Update - ${jobTitle} - ${organizationName}`,
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