import mongoose from 'mongoose';
import Moment from 'moment';
import pkg from 'moment-range';
import Shift from '../shifts/shiftsSchema.js';

const {extendMoment} = pkg;
const moment = extendMoment(Moment);


const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: String
});

restaurantSchema.methods.getAllShifts = async function() {
    const shifts = await Shift.find({restaurant: this._id})
    return shifts;
}

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;