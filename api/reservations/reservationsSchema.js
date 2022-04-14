import mongoose from 'mongoose';
import Moment from 'moment';
import pkg from 'moment-range';
import Shift from '../shifts/shiftsSchema.js';
import Table from '../tables/tableSchema.js';

const {extendMoment} = pkg;
const moment = extendMoment(Moment);

const reservationSchema = new mongoose.Schema({
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
        required: true
    },
    reservedFrom: {
      type: Date,
      required: true,
    },
    reservedTo: {
      type: Date,
      required: true,
    },
    customers: {
        type: Number,
        required: true,
        min: 1,
        validate: (v) => v >= 1
    }
});

const isReservedOneHour = reservation => moment.duration(moment(reservation.reservedTo).diff(reservation.reservedFrom)).asHours() === 1;

reservationSchema.pre("save", async function(next) {
    let errors = [];
    
    const shift = await Shift.findById(this.shift);
    const reservations = await Reservation.find({shift});
    const table = await Table.findById(this.table);

    const reservationTime = moment.range(this.reservedFrom, this.reservedTo);
    const shiftTime = moment.range(shift.start, shift.end);
    
    if(!shiftTime.contains(reservationTime)) errors.push("reserved time must be within shift range");
    if(!isReservedOneHour(this)) errors.push("reservation must be exactly one hour");
    if(!(this.reservedFrom < this.reservedTo)) errors.push("Reversation start is bigger than end");
    if(this.customers > table.seats) errors.push("Too many customers for this table");
    for(let i=0; i<reservations.length; i++) {
        const thisTableTime = moment.range(this.reservedFrom, this.reservedTo);
        const tableTime = moment.range(reservations[i].reservedFrom, reservations[i].reservedTo);
        const isAlreadyReserved = thisTableTime.overlaps(tableTime);
        if(reservations[i].table._id.equals(table._id) && reservations[i].shift._id.equals(shift._id) && isAlreadyReserved) {
            errors.push("This table is already reserved");
            break;
        }
    }
    
    errors.length > 0 ? next(errors) : next();
});

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
