import express from "express";
import ValidationHandler from "../middlewares/ValidationHandler";
import BookingController from "../controllers/BookingControllers";
//import TripValidation from "../validations/TripValidation";
import Trim from "../middlewares/Trim";
import Authorization from "../middlewares/Authorization";

const bookingRoutes = express.Router();
const validation = [
  ValidationHandler.validate,
  Trim.trim,
  ValidationHandler.isEmptyReq
];

bookingRoutes.use(Authorization.authenticate);

bookingRoutes.get("/",  BookingController.getBookings);

bookingRoutes.delete("/:id", BookingController.deleteBooking);

bookingRoutes.post("/",  BookingController.createBookings);

export default bookingRoutes;
