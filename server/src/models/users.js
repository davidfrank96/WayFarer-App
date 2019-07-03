
import hashPassword from "../helpers/hashPassword";
import db from "./index";

/**
* @exports
* @class User
*/
class User {
    /**
     * @description this method takes in  two agurment request
     * and data to insert into the  database to create a user
     * @param {*} data
     * @memberof User
     * @returns { object }
     */

    create(req, data) {
        const text = `INSERT INTO
        users(first_name, last_name, email, password, created_at) 
        VALUES ($1, $2, $3, $4, $5) returning *`;
        const { first_name, last_name, email, password, passwordConfirm } = data;
        const hashedPassword = hashPassword(password, 10);
        const user = [
            first_name,
            last_name,
            email.toLowerCase(),
            hashedPassword,
            new Date()
        ];
        const response = db.query(text, user);
        return response;
    }

    

    /**
     * @description Queries the db to find a user's email
     * @param {*} key
     */
    find(key) {
        const query = "SELECT * FROM users WHERE email=$1";
        const response = db.query(query, [key]);
        return response;
    }

    /**
     * @description Queries the db to find a user's ID
     * @param {*} id
     */
    findById(id) {
        const query = "SELECT * FROM users WHERE id=$1";
        const response = db.query(query, [id]);
        return response;
    }
}

export default new User();

// Object gotten from Olawale Aladeusi post on Codementor
