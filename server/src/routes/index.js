import express from "express";
import userRoutes from "./users";
import tripRoutes from "./trips";
import bookingRoutes from "./bookings";
import UserValidation from "../validations/UserValidation";
import Authorization from "../middlewares/Authorization";
import Trim from "../middlewares/Trim";
import ValidationHandler from "../middlewares/ValidationHandler";
import TripController from "../controllers/TripsControllers";

const validation = [
  ValidationHandler.validate,
  Trim.trim,
  ValidationHandler.isEmptyReq
];

const apiRoutes = express.Router();

apiRoutes.get("/", (req, res) =>
  res.json({
    status: 200,
    message: "Welcome to Banka API"
  })
);

apiRoutes.get("/v1", (req, res) =>
  res.json({
    status: 200,
    message: "Welcome to version 1 of Banka API"
  })
);

apiRoutes.use("/v1/auth", userRoutes);
apiRoutes.use("/v1/trips", tripRoutes);
apiRoutes.use("/v1/bookings", bookingRoutes);
apiRoutes.use("/v1/admin", UserValidation.signup);

export default apiRoutes;
