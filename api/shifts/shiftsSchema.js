import mongoose from 'mongoose';
import Moment from 'moment';
import pkg from 'moment-range';
import Restaurant from '../restaurants/restaurantsSchema.js';

const {extendMoment} = pkg;
const moment = extendMoment(Moment);

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
        if(shift1.overlaps(shift2)) {
            errMessage.error.shift1 = shift1;
            errMessage.error.shift2 = shift2;
            next(errMessage);
        }
    }
    next();
});
  
const Shift = mongoose.model("Shift", shiftSchema);
export default Shift;

