import { validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";

/**
 * @exports
 * @class ValidationHandler
 */
class ValidationHandler {
    /**
     * Function to check for empty request
     * @method isEmptyReq
     * @memberof ValidationHandler
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {(function|object)} Function next() or JSON object
     */
    static isEmptyReq(req, res, next) {
        if (!Object.values(req.body).length) {
            return res.status(400).json({
                error: "Empty PUT Requests Are Not Allowed"
            });
        }

        next();
    }

    /**
     * Sends validation errors if existent, passes it on to the next middleware if not
     * @method validate
     * @memberof ValidationHandler
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {(function|object)} Function next() or JSON object
     */
    static validate(req, res, next) {
        const errors = validationResult(req);
        req = { ...req, ...matchedData(req) };

        if (!errors.isEmpty()) {

            const mappedErrors = errors.mapped();

            var results = Object.keys(mappedErrors).map(function (key) {
                return [mappedErrors[key]];
            });

            const results = results.map((result) => {
                return result[0].msg;
            });

            return res.status(400).json({
                status: 400,
                errors: results,
            });
        }
        //code gotten from stackoverflow but modified

        return next();
    }
}

export default ValidationHandler;
