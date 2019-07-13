const trip1 = `INSERT INTO trips (
                bus_id, origin, destination, fare, status)
                VALUES (1, 'OGUN', 'ABUJA', 6000, 'cancelled');`;

const trip2 = `INSERT INTO trips (
                bus_id, origin, destination, fare)
                VALUES (2, 'CALABAR', 'LAGOS', 7000);`;

const trip3 = `INSERT INTO trips (
                bus_id, origin, destination, fare, status)
                VALUES (3, 'AKWA IBOM', 'LAGOS', 6500, 'cancelled');`;

const trip4 = `INSERT INTO trips (
                bus_id, origin, destination, fare)
                VALUES (4, 'ILORIN', 'ABUJA', 5500);`;

const tripsQuery = `${trip1}${trip2}${trip3}${trip4}`;

module.exports = tripsQuery;

// INSERT INTO users("first_name", "last_name", email, password,  "is_admin")
// VALUES('Frank', 'Frank', 'frank@gmail.com', '$2b$10$kt2XBkla5mYrhPAap8Ud2OPOXk7Q2r75JNaO9EWvqBeoovIOqhnjK', true),
//     ('John', 'Doe', 'john@gmail.com', '$2b$10$kt2XBkla5mYrhPAap8Ud2OPOXk7Q2r75JNaO9EWvqBeoovIOqhnjK', false);
