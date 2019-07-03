/* eslint-disable no-console */
import pool from './index';
//import hashPassword from '../helpers/hashPassword';

pool.on('connect', async () => {
  console.log('Connected to the database');
  
});

const queryString = `
    INSERT INTO users ("first_name", "last_name", email, password,  "is_admin") 
    VALUES ('Frank', 'Frank', 'frank@gmail.com', 'password', true);
        
    
`;

pool.query(queryString)
  .then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err);
    pool.end();
  });
