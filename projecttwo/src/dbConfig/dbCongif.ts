import mongoose, { connection } from "mongoose";

export default async function connectDB() {
  try {
    // !-> ye guarantee provide karna hai ki ye variable to ayega hi ayega
    // typeScript ke chochle hai ye sab, otherwise ifElse se bhi kar sakte hai
    mongoose.connect(process.env.MONGO_URI!);

    connection.on("connected", () => {
      console.log("MongoDb connected");
    });

    connection.on("error", (err) => {
      console.log(
        "mongoDB connection error, please make sure DB is up and running :" +
          err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting DB");
    console.log(error);
  }
}
