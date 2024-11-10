require('dotenv').config();
const mysql = require('mysql2');

const dbHost = process.env.USE_DOCKER ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL;

const connection = mysql.createConnection({
    host: dbHost,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// SQL query to create the trips table if it doesn't already exist
const createTable = `
  CREATE TABLE IF NOT EXISTS trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    start_location VARCHAR(255) NOT NULL,
    end_location VARCHAR(255) NOT NULL,
    distance FLOAT NOT NULL,
    purpose VARCHAR(255),
    notes TEXT,
    cost DECIMAL(10, 2) NOT NULL
  );
`;

// SQL query to insert test data
const insertData = `
  INSERT INTO trips (client_name, start_location, end_location, distance, purpose, notes, cost) VALUES
  ('Client A', 'Location 1', 'Location 2', 15.5, 'Consultation', 'Met with the client for an initial consultation.', 50.00),
  ('Client B', 'Location 3', 'Location 4', 25.0, 'Follow-up', 'Checked in on project status.', 75.00),
  ('Client C', 'Location 1', 'Location 5', 30.0, 'Maintenance', 'Performed scheduled maintenance.', 100.00),
  ('Client D', 'Location 2', 'Location 6', 10.0, 'Installation', 'Installed new equipment.', 150.00);
`;

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');

    // First, create the table if it doesn't exist
    connection.query(createTable, (err) => {
        if (err) throw err;
        console.log('Trips table is ready or already exists.');

        // Then, insert test data
        connection.query(insertData, (err, results) => {
            if (err) throw err;
            console.log('Test data inserted:', results);
            connection.end();
        });
    });
});