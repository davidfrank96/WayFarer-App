import db from "./index";


class Trip {
/**
     * @param {*} data
     * @memberof Account
     * @returns { object } account object
     */
    createTrip(data, req) {
        const { bus_id, origin, destination, fare, } = data;

        const tripDetails = [bus_id, origin, destination, fare];
        const text = 'INSERT INTO trips (bus_id, origin, destination, fare) VALUES ($1, $2, $3, $4) RETURNING *';
    
        const response = db.query(text, tripDetails);
        return response;
    }

    findBusQuery(bus_id) {
        const text = 'SELECT * FROM trips INNER JOIN buses ON trips.bus_id = buses.id WHERE bus_id = $1';
        const response = db.query(text, [bus_id]);
        return response;
    }

    getAllTrips(req) {
        const text =
            'SELECT * FROM trips ORDER BY id DESC';
        const response = db.query(text, []);
        return response;
    }

    update( data) {
        const text = `UPDATE trips SET status = $1 WHERE id = $2 RETURNING *`;
        const values = [
            data.status,
            data.trip_id
        ];
        const response = db.query(text, values);
        return response;
        }
        
    findById(trip_id) {
        const text = 'SELECT * FROM trip WHERE trip_id = $1';
        const response = db.query(text, [trip_id]);
        return response;
    }
}
export default new Trip();