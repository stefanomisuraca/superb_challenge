import mongoose from 'mongoose';

mongoose.set('runValidators', true);

export function dbConnect() {
    
  mongoose.connect('mongodb://mongodb:27017/superb',
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

export function dbConnectTest() {
    
  mongoose.connect('mongodb://mongodb_test:27018/superbTest',
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