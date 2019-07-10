import TripModel from '../models/trips';
import User from '../models/users';
import Trip from '../models/trips';
import validateParam from '../helpers/validateParam';
import db from "../models/index";
import tripQueries from "../models/tripQueries";
// const Trip = require('../models/trip');



const { createTripQuery, findBusQuery, getAllTripsQuery, cancelTripQuery, filterQuery, patchTripQuery } = tripQueries;


class TripController {
  /**
   * @static
   * @description this method takes in the params from the req.body and creates a Trip
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @memberof  TripController
   */
  static createTrip(req, res) {
    const { bus_id, origin, destination, fare } = req.body;

    const tripDetails = [bus_id, origin, destination, fare];

    db.query(findBusQuery, [bus_id])
      .then(response => {
        const BusFound = response.rows[0];

        if (!BusFound) {
          res.status(400).json({
            status: 400,
            error: "Bus with this ID  is not registered"
          });
          return;
        }

        const BusActive = response.rows.filter(
          eachBus => eachBus.status === "active"
        );

        if (BusFound && BusActive.length) {
          res.status(404).json({
            status: 404,
            error: "Bus with this ID is already assigned"
          });
        } else {
          db.query(createTripQuery, tripDetails)
            .then(response2 => {
              res.status(201).json({
                status: 201,
                data: "Trip  Successfully created"
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  static getTrips(req, res) {
    db.query(getAllTripsQuery)
      .then(response => {
        if (response.rows.length < 1) {
          res.status(204).json({
            status: 204,
            data: "No trips available"
          });
        } else {
          const trips = response.rows.map(item => ({
            trip_id: item.id,
            bus_id: item.bus_id,
            origin: item.origin,
            destination: item.destination,
            trip_date: item.trip_date,
            booking_status: item.booking_status,
            fare: parseFloat(item.fare),
            status: item.status
          }));

          res.status(200).json({
            status: 200,
            data: trips
          });
        }
      })
      .catch(err => console.log(err));
  }

  static patchTrip(req, res) {

    const { trip_id } = req.params;

    db.query(patchTripQuery, ['cancelled', trip_id])
      .then((response) => {
        const patchedTrip = response.rows[0];

        console.log(trip_id);
        if (!patchedTrip) {
          res.status(404).json({
            error: 'Trip neither found nor updated',
          });
          return;
        }

        res.status(200).json({
          status: 200,
          message: 'Trip cancelled successfully',
        });
      })
      .catch(err => console.log(err));
  }

 
}
export default TripController;
