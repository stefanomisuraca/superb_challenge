import mongoose from 'mongoose';

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

const tableSchema = new mongoose.Schema({
  shiftId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Shift',
    required: true
  },
  seats: {
    type: Number,
    min: 1,
    required: true
  },
  reservedAt: {
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    }
  }
});

export const Table = mongoose.model("Table", tableSchema);

const shiftSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant',
    required: true
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
});

export const Shift = mongoose.model("Shift", shiftSchema);

const restaurantSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    owner: String
  });

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);