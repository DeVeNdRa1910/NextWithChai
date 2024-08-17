import { z } from "zod";

export const messageSchema = z.object({
  content: z
  .string()
  .min(10, {message: 'Content must be at least of 10 characters'})
  .max(5000, {message: 'Content must be no longer then of 500 characters'})
});
