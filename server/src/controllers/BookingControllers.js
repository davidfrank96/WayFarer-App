/* eslint-disable no-console */
//import BookModel from '../models / trips';
import User from '../models/users';
import Bookings from '../models/trips';
import validateParam from '../helpers/validateParam';
import db from "../models/index";
import bookingQueries from "../models/queries";

const { getTripsQuery, checkBookingQuery, updateTripQuery, bookingQuery, deleteBookingQuery, getBookingQuery } = bookingQueries;
const updateData = [1, "id"];



class BookingController {
      static createBookings(req, res) {
    const { id,  } = req.body;
          const { user_id } = req.user;
   
    db.query(getTripsQuery, [id])
        .then((response1) => {
            const foundTrip = response1.rows[0]

            // if (foundTrip.status === 'cancelled') {
            //     res.status(404).json({
            //         status: 404,
            //         error: 'Trip has been cancelled',
            //     });
            //     return;
            // }

            if (!foundTrip) {
                res.status(404).json({
                    status: 404,
                    error: 'Trip is not available',
                });
                return;
            }

            db.query(checkBookingQuery, [user_id, id])
                .then((response2) => {
                    const tripBooked = response2.rows[0];
                
                    // if (tripBooked) {
                    //     res.status(404).json({
                    //         status: 404,
                    //         error: 'You have been booked on this trip already',
                    //     });
                    //     return;
                    // }
                
                    db.query(updateTripQuery, [1, id])
                        .then((response3) => {
                            const tripUpdate = response3.rows[0];
                            // const bus_id = foundTrip;

                            console.log(foundTrip);
                            const bookData = [foundTrip.bus_id, tripUpdate.trip_date, tripUpdate.booking_status];
                        
                            const returnBookingData = [1, id, ...bookData];

                            db.query(bookingQuery, returnBookingData)
                                .then((response4) => {
                                    const booking = response4.rows[0];

                                    const data = {
                                        booking_id: booking.id,
                                        trip_id: booking.id,
                                        user_id: booking.user_id,
                                        bus_id: foundTrip.bus_id,
                                        trip_date: tripUpdate.trip_date,
                                        seat_number: tripUpdate.booking_status,
                                        message: 'Your trip has been booked',
                                    };

                                    res.status(200).json({
                                        status: 200,
                                        data,
                                    });
                                })
                                .catch(err => console.log(err));

                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}



    static getBookings(req, res) {
        const { user_id, } = req.user;
    
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
                        trip_id: item.id,
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
 
       // validateParam(res, req.params.id);
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
