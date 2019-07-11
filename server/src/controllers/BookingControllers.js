/* eslint-disable no-console */
//import BookModel from '../models / trips';
import User from '../models/users';
import Bookings from '../models/trips';
import validateParam from '../helpers/validateParam';
import db from "../models/index";
import bookingQueries from "../models/queries";

const { getTripsQuery, checkBookingQuery, updateTripQuery, bookingQuery, deleteBookingQuery, getBookingQuery} = bookingQueries;




class BookingController {

    static getBookings(req, res) {
        const {  user_id,  } = req.body;
    
        db.query(getBookingQuery)
            .then((result) => {
                if (result.rows.length < 1) {
                    res.status(404).json({
                        status: 404,
                        error: 'No bookings on record',
                    });
                    return;
                }

                const data = result.rows.map(item => (
                    {
                        booking_id: item.id,
                        trip_id: item.trip_id,
                        user_id: item.user_id,
                        bus_id: item.bus_id,
                        trip_date: item.created_on,
                        seat_number: item.seat_number,
                        first_name: item.first_name,
                        last_name: item.last_name,
                        email: item.email,
                    }
                ));

                res.status(200).json({
                    status: 200,
                    data,
                });
            })
            .catch(err => console.log(err));
    }

    static deleteBooking(req, res) {
 
        validateParam(res, req.params.id);
        const {  user_id,  } = req.body;
        const { booking_id } = req.params;
       
        
        db.query(deleteBookingQuery, [booking_id])
            .then((result) => {
                const data = result.rows[0];
            
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
