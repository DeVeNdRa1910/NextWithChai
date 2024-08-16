// Next js me jab bhi Db ka use karoge to har bar Db ko connect klarna padega ye next js ka syntax hai

import connectDB from "@/dbConfig/dbCongif";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";

//DB connect karo
connectDB();

export async function POST(request: NextRequest, response: NextResponse){
  try {
    const reqBody = await request.json()

    const {username, email, password} = reqBody
    //validation
    console.log(reqBody); 

    const user = await User.findOne({email})

    if(user){
      return NextResponse.json({message: "User already exist"}, {status: 400})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    const savedUser = await newUser.save()

    console.log(savedUser);
    
    //send Verification  Mail


    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

    return NextResponse.json({
      message: "User Resistered successfully",
      success: true,
      savedUser,
    })

  } catch (error : any) {
    return NextResponse.json({error: error.message}, {status: 500}, )
  }
}
