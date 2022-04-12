import mongoose from 'mongoose';
import Moment from 'moment';
import pkg from 'moment-range';

const {extendMoment} = pkg;
const moment = extendMoment(Moment);

const tableSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    seats: {
        type: Number,
        min: 1,
        required: true,
        validate: (v) => v >= 1
    },
});

const Table = mongoose.model("Table", tableSchema);
export default Table;
