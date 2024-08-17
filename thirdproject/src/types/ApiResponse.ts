import { Message } from "@/model/User";

export interface ApiResponse{
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages? : Array<Message>;
}

// message => request status method for failed or success
// messages => actual messages or feedback