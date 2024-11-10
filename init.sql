
-- Create the trips table if it doesn't already exist
CREATE TABLE IF NOT EXISTS trips (
                                     id SERIAL PRIMARY KEY,
                                     client_name VARCHAR(100) NOT NULL,
    start_location VARCHAR(100) NOT NULL,
    end_location VARCHAR(100) NOT NULL,
    distance DECIMAL(5, 2) NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    notes TEXT,
    cost DECIMAL(10, 2) NOT NULL
    );

-- Insert sample data into the trips table
INSERT INTO trips (client_name, start_location, end_location, distance, purpose, notes, cost)
VALUES
    ('Client A', 'Location 1', 'Location 2', 15.5, 'Consultation', 'Met with the client for an initial consultation.', 50.00),
    ('Client B', 'Location 3', 'Location 4', 25.0, 'Follow-up', 'Checked in on project status.', 75.00),
    ('Client C', 'Location 1', 'Location 5', 30.0, 'Maintenance', 'Performed scheduled maintenance.', 100.00),
    ('Client D', 'Location 2', 'Location 6', 10.0, 'Installation', 'Installed new equipment.', 150.00);