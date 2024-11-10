
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


-- Create the clients table
CREATE TABLE IF NOT EXISTS clients (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    organisation VARCHAR(100),
    job_title VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    address_street VARCHAR(150),
    address_city VARCHAR(100),
    address_state VARCHAR(50),
    post_code VARCHAR(20),
    address_country VARCHAR(100),
    notes TEXT
    );

-- Insert sample data into the clients table
INSERT INTO clients (name, organisation, job_title, email, phone_number, address_street, address_city, address_state, post_code, address_country, notes)
VALUES
    ('Ola Hansen', '', 'client', 'ola.hansen@digitalpathsnorway.no', '+47-980-12345', 'Wessels gate 181', 'Trondheim', 'Trøndelag', '7043', 'Norway', 'Primary contact for digital transformation projects.'),
    ('Kari Nygaard', '', 'client', 'kari.nygaard@nordicgreenenergy.no', '+47-980-45678', 'Bjerggata 12', 'Stavanger', 'Rogaland', '4006', 'Norway', 'Key client for renewable energy initiatives in the region.'),
    ('Lars Solberg', '', 'client', 'lars.solberg@innotechsolutions.no', '+47-980-78901', 'Nygata 7', 'Bergen', 'Vestland', '5003', 'Norway', 'Focus on Scandinavian technology solutions.'),
    ('Mette Lund', '', 'client', 'mette.lund@helselogistikk.no', '+47-980-11223', 'Storgata 22', 'Oslo', 'Oslo', '0155', 'Norway', 'Main contact for health sector logistics and supply chain management.'),
    ('Svenn Berg', '', 'client', 'svenn.berg@autonord.no', '+47-980-33445', 'Kongens gate 5', 'Oslo', 'Oslo', '0153', 'Norway', 'Research and development in automotive innovation in Norway.');
