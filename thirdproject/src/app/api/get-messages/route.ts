import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request: Request){
  await dbConnect();

  // we was stored user details in session you can see in src/api/auth/options.ts
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User

  if(!session || !session.user){
    return Response.json(
      {
        success: false,
        message: "Not Authenticated"
      },
      {status : 401}
    )
  }


  //aggregation pipline
  const userId = new mongoose.Types.ObjectId(user._id);
  // abhi user._id ek string mongoose.Types.ObjectId(user._id) ye karne ke baad user._id ek Object id hai mongodb ke liye


  try {

  } catch (error) {
    
  }
}