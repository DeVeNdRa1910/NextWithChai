import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {

  await dbConnect()

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const isCodeValid = (user.verifyCode === code)

    console.log(user.verifyCode , " " ,  code); 

    const isCodeExpired = new Date(user.verifyCodeExpiry) > new Date()

    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Incorrect Verification code",
        },
        { status: 400 }
      );
    } else if(!isCodeExpired){
      return Response.json(
        {
          success: false,
          message: "Verification code has expired please signup again to get a new code",
        },
        { status: 400 }
      );
    } else {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Verification Successfull",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error verification of user",
      },
      { status: 500 }
    );
  }
}
