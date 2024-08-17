
import mongoose from 'mongoose';

//Yaha pe hame deckna hoga ki DB pehle se hi to connect nahi hai yadi pehle se hi connect hai or ham fir bhi connect karte ja rahe hai to database chocking ho sakti hai isiliye har bar connection karne se pehle dekh rahe hai ki connection pehle se hi to nahi hai yadi connection pehle se hi hai to usi connection ko use karlo yadi connection nahi hai to naya connection kar lo

type ConnectionObject = {
  isConnected? : number
}

const connection: ConnectionObject = {

}

async function dbConnect(): Promise<void>{
  if(connection.isConnected){
    console.log('Already  connected to database');
    return; 
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    console.log(db);
    
    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected successfully"); 
  } catch (error) {
    console.log("Database connection failed", error); 
    process.exit(1);
  }
}

export default dbConnect;