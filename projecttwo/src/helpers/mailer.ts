import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}: any) => {
  try {

    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userId, {
        $set: {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now()+3600000
              }
      })
    } else if(emailType === "RESET"){
      await User.findByIdAndUpdate(userId, {
        $set: {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now()+3600000
              }
      })
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "00336aaf167329",  // ❌
        pass: "ddaa6eb7c52417"   // ❌
      }
    });
    // user and pass should not be here they should be in .env

    const mailOptions = {
      from: 'devendrav1910@gmail.com', // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset Your password", // Subject line
      text: "Hello world?", // plain text body
      html: emailType === "VERIFY" ? (
        `<p>Click <a here="${process.env.DOMAIN}/verifyemail?token=${hashedToken}}">here<a> to verify your email
        or copy and paste the link below in your browser.
        <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
      ) : (`<p>Click < here="${process.env.DOMAIN}/resetPassword?token=${hashedToken}}    ">here</ a> to reset your password
        or copy and paste the link below in your browser.
        <br/> ${process.env.DOMAIN}/resetPassword?token=${hashedToken}
        </p>
        `), // html body
    }

    const mailResponse = await transport.sendMail(mailOptions)

    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message)
  }
}