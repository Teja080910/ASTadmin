import { db } from "../db.js";
import { message } from "./message.js";
export const SendOtp = async (req, resend, res) => {
    const { regd } = req.body;
    try {
        const user = await db.collection('Signup').findOne({ Reg_No: regd });
        if (!user) {
            return res.json({ error: 'Invalid registration number.' });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        req.session.key = otp
        console.log(regd, req.session)
        const { data, error } = await resend.emails.send({
            from: 'AST Teams <login@ast-admin.in>',
            to: [user?.Gmail],
            subject: 'Your OTP for daily login',
            html: await message.otp(user?.Name, otp, user?.Gmail, user?.Num),
        });
        if (data) {
            res.status(200).json({ message: "OTP successfully sent to your email" });
        }
        if (error) {
            res.status(200).json({ error: error });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error sending OTP' });
    }
}