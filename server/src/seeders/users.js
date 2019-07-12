//import hashPassword from '../helpers/hashpassword'
//const { hashPassword } = require("../helpers/hashpassword");

const user1 = `INSERT INTO users (
                email, first_name, last_name, password, is_admin)
                VALUES ('oba@gmail.com', 'oba', 'femi',  'password', true);`;

const user2 = `INSERT INTO users (
                email, first_name, last_name, password)
                VALUES ('dami@gmail.com', 'dami', 'lola', 'password');`;

const user3 = `INSERT INTO users (
                email, first_name, last_name, password)
                VALUES ('demi@gmail.com', 'demi', 'lade', 'password');`;

const user4 = `INSERT INTO users("first_name", "last_name", email, password,  "is_admin")
 VALUES('Frank', 'Frank', 'frank@gmail.com', '$2b$10$kt2XBkla5mYrhPAap8Ud2OPOXk7Q2r75JNaO9EWvqBeoovIOqhnjK', true);`;

const usersQuery = `${user1}${user2}${user3}${user4}`;

module.exports = usersQuery;
