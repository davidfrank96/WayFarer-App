/* eslint-disable no-console */
const db = require('../migrations/index');
const userSeedQuery = require('../seeders/users');
const busSeedQuery = require("../seeders/buses");
const tripSeedQuery = require("../seeders/trips");
const bookingSeedQuery = require("../seeders/booking");
import pool from "../migrations/index";

pool.on('connect', async () => {
    console.log('Connected to the database');

});

const seedQuery = `${userSeedQuery}${busSeedQuery}${tripSeedQuery}${bookingSeedQuery}`;


const seed = async () => {
    const res = await pool.query(seedQuery)
        .then((result) => {
            console.log(result.rows);
            console.log('Tables seeded');
        })
        .catch(err => console.log(err));

    return res;
};

seed();

module.exports = seed;
