import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod';
import { usernameValidation } from "@/schemas/signUpSchema"; 

const UsernameQuerySchema = z.object({
  username: usernameValidation
})

export async function GET(request: Request){

  await dbConnect();

  try {
    
    const { searchParams } = new URL(request.url)

    const queryParam = {
      username: searchParams.get('username')
    }
    //validation with zod
    const result = UsernameQuerySchema.safeParse(queryParam)

    console.log(result);
    if(!result.success){
      const usernameError = result.error.format().username?._errors || []
      return Response.json({
        success: false,
        message: usernameError?.length > 0 ? usernameError.join(', '): "Invalid query parameter"
      }, {status: 400})
    } 

    const {username} = result.data

    const existingVarifiedUser = await UserModel.findOne({username, isVerified: true})

    if(existingVarifiedUser){
      return Response.json({
        success: false,
        message: "username is already taken"
      }, {status: 400})
    }

    return Response.json({
      success: true,
      message: "User resistered successfully"
    }, {status: 201})

  } catch (error) {
    console.log("Error checking username" , error);
    return Response.json(
      {
        success: false,
        message: "Error checking username"
      },
      {status: 500}
    ) 
  }
}