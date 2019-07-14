import express from "express";
import ValidationHandler from "../middlewares/ValidationHandler";
import UserController from "../controllers/UserController";
import UserValidation from "../validations/UserValidation";
import Trim from "../middlewares/Trim";

const userRoutes = express.Router();
const validation = [
  ValidationHandler.validate,
  Trim.trim,
  ValidationHandler.isEmptyReq
];

userRoutes.post("/signup", UserValidation.signup, validation, UserController.signup);

userRoutes.post("/signin", UserValidation.login, validation, UserController.login);

export default userRoutes;
