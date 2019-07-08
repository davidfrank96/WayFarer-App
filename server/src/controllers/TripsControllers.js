import TripModel from '../models/trips';
import User from '../models/users';
import Trip from '../models/trips';
import validateParam from '../helpers/validateParam';
import db from "../models/index";
import tripQueries from "../models/trips";
// const Trip = require('../models/trip');



const {createTripQuery, findBusQuery, getAllTripsQuery, cancelTripQuery, filterQuery,} = tripQueries;


class TripController {
/**
* @static
* @description this method takes in the params from the req.body and creates a Trip
* @param {object} req - Request object
* @param {object} res - Response object
* @memberof  TripController
*/
  static createTrip(req, res) {
    
      const { bus_id, origin, destination, fare, } = req.body;
        
      const tripDetails = [bus_id, origin, destination, fare];

      db.query(findBusQuery, [bus_id])
        .then(response => {
          const BusFound = response.rows[0];

              
          if (!BusFound) {
            res.status(400).json({
              status: 400,
              error: 'Bus with this ID  is not registered'
            });
            return;
          }

          const BusActive = response.rows.filter(
            eachBus => eachBus.status === "active"
          );

          if (BusFound && BusActive.length) {
            res.status(404).json({
              status: 404,
              error: 'Bus with this ID is already assigned'
            });
          } else {
            db.query(createTripQuery, tripDetails)
              .then(result2 => {
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
    
}
export default TripController;
