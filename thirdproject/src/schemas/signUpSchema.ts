import {z} from 'zod';

export const usernameValidation = z
  .string()
  .min(3, "Username must be atleast 3 characters")
  .max(20, "Username must be atmost 16 characters")
  .regex(/^[a-zA-Z0-9_]+$/ , "Username must not contain special character")

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({message: "Invalid Email"}),
  password: z.string().min(6, {message: "Password must be atleas 6 characters"})
})