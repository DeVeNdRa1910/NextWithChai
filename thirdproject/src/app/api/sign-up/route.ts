import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    //username checking purpose
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }


    // for checking of email is exist or not
    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random()*900000)

    if (existingUserByEmail) {

      if(existingUserByEmail.isVerified){
        return Response.json({
          success: false,
          message: "User already exist with this email"
        },{
          status: 500
        })
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode.toString();
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000);

        await existingUserByEmail.save()
      }

    } else {
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save()
      
    }

    //send verifiaction email
    const emailResponse = await sendVerificationEmail(email, username, verifyCode.toString())

    if(!emailResponse.success){
      return Response.json({
        success: false,
        message: emailResponse.message
      },{
        status: 500
      })
    }

    return Response.json({
      success: true,
      message: "User resistered successfully . Please verify your email"
    },{
      status: 201
    })

  } catch (error) {
    console.log("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error resistring user",
      },
      { status: 500 }
    );
  }
}
