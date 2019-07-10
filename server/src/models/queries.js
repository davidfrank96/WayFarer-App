export default {
    //   trip queries
    createTripQuery: 'INSERT INTO trips (bus_id, origin, destination, fare) VALUES ($1, $2, $3, $4) RETURNING *',
    findBusQuery: 'SELECT * FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE bus_id = $1',
    getAllTripsQuery: 'SELECT * FROM trips ORDER BY id DESC',
    filterQuery: 'SELECT * FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE trips.origin = $1',
    patchTripQuery: "UPDATE trips SET status = $1 WHERE id = $2 RETURNING *",
    getTripsQuery: 'SELECT * FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE buses.id = $1',
    checkBookingQuery: 'SELECT * FROM bookings INNER JOIN users ON bookings.user_id = users.id WHERE user_id = $1 AND trip_id = $2',
    updateTripQuery: 'UPDATE trips SET booking_status = $1 WHERE id = $2 RETURNING *',
    bookingQuery: 'INSERT INTO bookings (user_id, trip_id, bus_id, trip_date, seat_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    deleteBookingQuery: 'DELETE FROM bookings WHERE id = $1 RETURNING *',
};