import mongoose from 'mongoose';
import Moment from 'moment';
import pkg from 'moment-range';

const {extendMoment} = pkg;
const moment = extendMoment(Moment);

  
//   tableSchema.pre(["save", "findOneAndUpdate"], async function(next) {
//     let errMessage = {
//       error: ""
//     }
//     // Validate reservation time range
//     const shift = await Shift.findById(this.shift);
//     const tableReservation = moment.range(this.reservedFrom, this.reservedTo);
//     const shiftTime = moment.range(shift.start, shift.end);
//     if(!shiftTime.contains(tableReservation)) {
//       errMessage.error = "reserved time must be within shift range";
//       next(errMessage);
//     };
//     // Validate table reservation is one hour
//     if(!isTableRevervedOneHour(this)) {
//       errMessage.error = "Table reversation is not one hour";
//       next(errMessage);
//     }
//     if(!(this.reservedFrom < this.reservedTo)) {
//       errMessage.error = "Table reversation start is bigger than end";
//       next(errMessage);
//     }
//     next();
//   });
    
