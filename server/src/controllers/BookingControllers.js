/* eslint-disable no-console */
//import BookModel from '../models / trips';
import User from '../models/users';
import Bookings from '../models/trips';
import validateParam from '../helpers/validateParam';
import db from "../models/index";
import bookingQueries from "../models/queries";

const { getTripsQuery, checkBookingQuery, updateTripQuery, bookingQuery, } = bookingQueries;

const bookingData = [user_id, trip_id];
const updateData = [1, trip_id];


class BookingController {

    static deleteBooking(req, res) {
        const {  user_id,  } = req.body;
        const { booking_id } = req.params;

        console.log(bookingId, user_id);

        const deleteBookingQuery = 'DELETE FROM bookings WHERE id = $1 RETURNING *';

        db.query(deleteBookingQuery, [booking_id])
            .then((result) => {
                const data = result.rows[0];
                console.log(data);

                if (data === undefined) {
                    res.status(404).json({
                        status: 404,
                        error: 'Booking neither found nor deleted',
                    });
                    return;
                }
                res.status(200).json({
                    status: 200,
                    message: 'Booking deleted successfully',
                });
            })
            .catch(err => console.log(err));
    }
         



}


export default BookingController;
