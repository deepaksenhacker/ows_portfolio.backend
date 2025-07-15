import express from 'express'
import 'dotenv/config'
import transporter from './nodemailer/mailer.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Express is Started !")
})

app.post("/send-mail", async (req, res) => {
    const { fullname, service, mobile, email, message } = req.body
    try {
        const info = await transporter.sendMail({
            from: `"One Web Solutions OWS Pali" <${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            subject: "New Client Alert !",
            text: `They Want ${service}\n\nName: ${fullname}\nMobile: ${mobile}\nMessage: ${message}`,
            html: `<h3>New Service Request</h3>
                   <p><b>Service:</b> ${service}</p>
                   <p><b>Name:</b> ${fullname}</p>
                   <p><b>Mobile:</b> ${mobile}</p>
                   <p><b>Message:</b> ${message}</p>`
        });
        console.log(info);

        const info2 = await transporter.sendMail({
            from: `"One Web Solutions OWS Pali" <${process.env.EMAIL}>`,
            to: email,
            subject: "Thank you for visiting our website!",
            text: `We truly appreciate your interest in OWS – One Web Solutions, Pali.
Our team will connect with you shortly to assist you further.`,
            html: `Dear ${fullname},<br><br>

            Thank you for visiting <b>OWS – One Web Solutions, Pali</b>.<br>
            We hope you had a great experience exploring our services.<br><br>
            
            We would love to hear your valuable feedback to help us improve and serve you better.<br><br>

            📞 <b>Contact Number:</b> +917300457541 (Deepak Sen)<br>
            📧 <b>Email:</b> care.deepaksen@gmail.com<br>
            <b>Sender:</b> ${process.env.EMAIL}<br><br>

            Thank you once again for choosing <b>OWS Pali!</b><br><br>

            Warm regards,<br>
            <b>Team OWS - One Web Solutions, Pali</b>`
        });
        console.log(info2);

        res.status(200).json({ success: "Successfully Submitted!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Try After Sometime!" })
    }
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is Running On ${PORT}`);
})
