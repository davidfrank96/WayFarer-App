const bus1 = `INSERT INTO buses (
                plate_number, manufacturer, model, year, capacity)
                VALUES ('SMK584AZ', 'TOYOTA', 'HIACE', '2007', 5);`;

const bus2 = `INSERT INTO buses (
                plate_number, manufacturer, model, year, capacity)
                VALUES ('CMK907EQ', 'TOYOTA', 'COROLLA', '2010', 5);`;

const bus3 = `INSERT INTO buses (
                plate_number, manufacturer, model, year, capacity)
                VALUES ('LND634AS', 'VOLKSWAGEN', 'GOLF', '2007', 5);`;

const bus4 = `INSERT INTO buses (
                plate_number, manufacturer, model, year, capacity)
                VALUES ('EKY32XC', 'TOYOTA', 'SIENNA', '2014', 8);`;

const busesQuery = `${bus1}${bus2}${bus3}${bus4}`;

module.exports = busesQuery;
