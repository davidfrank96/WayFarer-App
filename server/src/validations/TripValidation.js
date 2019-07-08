import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  createTrip: [
    check("bus_id")
      .trim()
      .exists()
      .withMessage("bus_id must be specified")
      .custom(value => notEmpty(value, "Type field cannot be left blank"))
      .isNumeric("must be an integer")
      .withMessage("bus_id must be an Integer"),
    check("fare")
      .trim()
      .exists()
      .withMessage("Fare must be specified")
      .custom(value => notEmpty(value, "Type field cannot be left blank"))
      .isNumeric("must be an integer")
      .withMessage("Fare must be an Integer")
  ]
};
