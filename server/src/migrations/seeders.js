import pool from './index';
//import hashPassword from '../helpers/hashPassword';

pool.on('connect', async () => {
  console.log('Connected to the database');
  
});

const queryString = `INSERT INTO buses (
                plate_number, manufacturer, model, year, capacity)
                VALUES ('SMK584AZ', 'KIA', 'CERATO', '2010', 5);`

               
        
    



pool.query(queryString)
  .then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err);
    pool.end();
  });
