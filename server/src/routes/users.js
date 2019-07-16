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

userRoutes.post("/signup",  UserController.signup);
//UserValidation.signup, validation,

userRoutes.post("/signin", validation, UserController.login);
// UserValidation.login, validation,
export default userRoutes;
