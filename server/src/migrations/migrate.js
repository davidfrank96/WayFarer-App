import pool from "./index";

pool.on("connect", () => {
  console.log("Connected to the database");
});

const queryText = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        password VARCHAR(124) NOT NULL,
        created_at TIMESTAMP
    ); 

    CREATE TABLE IF NOT EXISTS buses(
        id SERIAL PRIMARY KEY,
        plate_number TEXT UNIQUE NOT NULL,
        manufacturer TEXT NOT NULL,
        model TEXT NOT NULL,
        year TEXT NOT NULL,
        capacity INT NOT NULL
        );

    CREATE TABLE IF NOT EXISTS trips (
        id SERIAL PRIMARY KEY,
        bus_id INT NOT NULL,
        origin TEXT NOT NULL,
        destination TEXT NOT NULL,
        trip_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        fare NUMERIC(10, 2) NOT NULL,
        status TEXT DEFAULT 'active',
        booking_status INT DEFAULT 0,
        passengers TEXT DEFAULT 'none',
        FOREIGN KEY (bus_id) REFERENCES buses (id)
        );    

    CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL NOT NULL,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        bus_id INT NOT NULL,
        trip_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        seat_number INT DEFAULT 1,
        created_on TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        FOREIGN KEY (trip_id) REFERENCES trips (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
        );
    
`;

pool
  .query(queryText)
  .then(res => {
    console.log(res);
    pool.end();
  })
  .catch(err => {
    console.log(err);
    pool.end();
  });
