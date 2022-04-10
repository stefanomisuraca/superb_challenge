import mongoose from 'mongoose';

export default function dbConnect() {
    
    mongoose.connect('mongodb://mongodb:27017',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
    return db;
  });
}
