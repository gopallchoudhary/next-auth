import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer'


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //? hashed Token
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        //? nodemailer
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "79e8a80836a728",
                pass: "e6d99986ac9bc4"
            }
        });

        const mailOptions = {
            from: 'choudharygopal723@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Resest your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> HERE </a> to ${emailType === 'VERIFY' ? "verify your email" : "Reset your password"}
            or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;


    } catch (error: any) {
        throw new Error(error.message)
    }
}