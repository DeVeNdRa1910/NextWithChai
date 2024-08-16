import connectDB from "@/dbConfig/dbCongif";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

//DB connect karo
connectDB();

export async function POST(request: NextRequest, response: NextResponse){
  try {
    //extract Data from token
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")
    return NextResponse.json({
      message: "User found",
      data: user
    },{status: 201})

  } catch (error: any) {
    return NextResponse.json({
      message: "Something went erong"
    }, {status: 404})
  }
}