import express from "express";
import ValidationHandler from "../middlewares/ValidationHandler";
import BookingController from "../controllers/bookingControllers";
//import TripValidation from "../validations/TripValidation";
import Trim from "../middlewares/Trim";
import Authorization from "../middlewares/Authorization";

const bookingRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim, ValidationHandler.isEmptyReq];

bookingRoutes.use(Authorization.authenticate);



bookingRoutes.delete("/:booking_id", BookingController.deleteBooking);



export default bookingRoutes;

