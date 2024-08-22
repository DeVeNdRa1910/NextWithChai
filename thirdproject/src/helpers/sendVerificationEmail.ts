// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from "@/types/ApiResponse";

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<ApiResponse>{
//   try {

//     const resp = await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: email,
//       subject: "Mystry message | Verification Code",
//       react: VerificationEmail({username, otp: verifyCode}),
//     });

//     console.log(resp); 

//     return {success: true, message: "Send verification email successfully"};
//   } catch (emailError) {
//     console.error("Error sending verification email", emailError);
//     return {success: false, message: "Failed to send verification mail"};
//   }
// }


import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Log the email details
    console.log("Attempting to send email...");
    console.log("Email to:", email);
    console.log("Username:", username);
    console.log("Verification Code:", verifyCode);

    // Attempt to send the email
    const {data, error} = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Mystry message | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    // Log the response from the resend API
    console.log("Resend API Response:", data);

    // Check if the email was sent successfully
    if (error) {
      console.error("Failed to send email, response status:", error);
      return { success: false, message: "Failed to send verification email" };
    }
    return { success: true, message: "Send verification email successfully" };
  } catch (emailError: any) {
    // Detailed error logging
    console.error("Error sending verification email:", emailError.message);
    return { success: false, message: `Failed to send verification mail: ${emailError.message}` };
  }
}
