import mongoose from 'mongoose';
import Moment from 'moment';
import pkg from 'moment-range';

const {extendMoment} = pkg;
const moment = extendMoment(Moment);

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

const isTableRevervedOneHour = (table) => moment.duration(moment(table.reservedTo).diff(table.reservedFrom)).asHours() == 1;

const tableSchema = new mongoose.Schema({
  shift: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Shift',
    required: true
  },
  seats: {
    type: Number,
    min: 1,
    required: true
  },
  reservedFrom: {
    type: Date,
    required: true,
    validate: [{
      validator: async function() {
        const shift = await Shift.findById(this.shift);
        return this.reservedFrom > shift.start && this.reservedFrom < shift.end;
        
      },
      message: 'reservedFrom time must be within shift range'
    },{
      validator: function() {
        return isTableRevervedOneHour(this);
      },
      message: "Exeed one hour"
    },{
      validator: function() {
        return this.reservedFrom < this.reservedTo;
      },
      message: "ReservedFrom is bigger than ReservedTo"
    }]
  },
  reservedTo: {
    type: Date,
    required: true,
    validate: [{
      validator: async function() {
        const shift = await Shift.findById(this.shift);
        return this.reservedTo > shift.start && this.reservedTo < shift.end;
      },
      message: 'reservedTo time must be within shift range'
    },{
      validator: function() {
        return isTableRevervedOneHour(this);
      },
      message: "Exeed one hour"
    }]
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
    validate:{
      validator: function () {return this.start <= this.end},
      message: "Start time is bigger than end"
    },
  },
  end: {
    type: Date,
    required: true
  }
});

shiftSchema.pre("save", async function(next) {
  const restaurant = await Restaurant.findById(this.restaurant);
  const shifts = await restaurant.getAllShifts();
  let errMessage = {
    error: {
      shift1: "",
      shift2: "",
      message: "these shifts are overlapping"
    }
  };
  for(let i=0; i<shifts.length; i++) {
    let shift1 = moment.range(moment(this.start), moment(this.end));
    let shift2 = moment.range(shifts[i].start, shifts[i].end);
    if(shift1.overlaps(shift2)){
      errMessage.error.shift1 = shift1;
      errMessage.error.shift2 = shift2;
      next(errMessage);
    }
  }
  next();
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

restaurantSchema.methods.getAllShifts = async function(excludeShift=null) {
  const shifts = await Shift.find({restaurant: this._id})
  return shifts;
}

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
