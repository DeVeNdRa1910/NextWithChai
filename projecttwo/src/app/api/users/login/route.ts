import connectDB from "@/dbConfig/dbCongif";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

//DB connect karo
connectDB();

export async function POST(request: NextRequest, response: NextResponse){
  try {
    const reqBody = await request.json()
    const {email, password} = reqBody

    const user = await User.findOne({email})

    if(!user){
      return NextResponse.json({message: "Email does not exist"}, {status: 400})
    }

    console.log(user);

    const isPasswordValid = await bcryptjs.compare(password, user.password)
    
    if(!isPasswordValid){
      return NextResponse.json({message: "Check your credential"}, {status: 400})
    }


    //set JWT setupe and create token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    }

    // !-> showing value ayegi hi ayegi
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET! , {expiresIn: '1hr'})

    const response = NextResponse.json({
      message: "Logged In Success",
      success: true
    })

    // express me cookie-Parser install karna padta hai lekin NextJS me inbuilt hota hai
    response.cookies.set("token", token, {
      httpOnly: true
    })

    return response;

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500}, )
  }
}