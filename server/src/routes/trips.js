import express from "express";
import ValidationHandler from "../middlewares/ValidationHandler";
import TripController from "../controllers/TripsControllers";
import TripValidation from "../validations/TripValidation";
import Trim from "../middlewares/Trim";
import Authorization from "../middlewares/Authorization";

const tripRoutes = express.Router();
const validation = [ValidationHandler.validate, Trim.trim,ValidationHandler.isEmptyReq];

tripRoutes.use(Authorization.authenticate);

tripRoutes.get("/",  TripController.getTrips);

tripRoutes.post("/", Authorization.isAdmin, TripValidation.createTrip, validation, TripController.createTrip);


// tripRoutes.patch(
//   "/:id",
//   Authorization.isAdmin,
//   AccountValidation.updateAccount,
//   validation,
//   AccountController.update
// );
// accountRoutes.delete("/:id", Authorization.isAdmin, AccountController.delete);

export default tripRoutes;
