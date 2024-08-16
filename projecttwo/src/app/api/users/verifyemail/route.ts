import connectDB from "@/dbConfig/dbCongif";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

//DB connect karo
connectDB();

export async function POST(request: NextRequest, response: NextResponse){
  try {

    const reqBody = await request.json()
    const {token} = reqBody

    const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
    
    if(!user){
      return NextResponse.json({message: "Invalid Token"}, {status: 400})
    }
    
    console.log(token); 
    
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    
    await user.save()

    return NextResponse.json({
      message: "Email Verified successfully",
      success: true,
    }, {status: 201})

  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({error: error.message}, {status: 500});
  }
}