-- Table structure for table `travel_logs`
--
CREATE TABLE travel_logs
(
    travel_id         SERIAL PRIMARY KEY,
    client_id         INT,
    travel_date       DATE          NOT NULL,
    start_address     VARCHAR(100)  NOT NULL,
    end_address       VARCHAR(100)  NOT NULL,
    distance_km       DECIMAL(5, 2) NOT NULL,
    travel_reason     VARCHAR(50),
    notes             TEXT,
    billing_period_id INT
);

-- Table structure for table `clients`
--
CREATE TABLE clients
(
    client_id           SERIAL PRIMARY KEY,
    client_name         VARCHAR(50) NOT NULL,
    client_group        VARCHAR(50),
    email               VARCHAR(100) UNIQUE,
    mobile_number       VARCHAR(15),
    address_street      VARCHAR(100),
    address_city        VARCHAR(50),
    address_region      VARCHAR(50),
    address_postal_code VARCHAR(10),
    address_country     VARCHAR(50) DEFAULT 'Australia',
    created_at          TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP   DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table `billing_periods`
--
CREATE TABLE billing_periods
(
    period_id      SERIAL PRIMARY KEY,
    start_date     DATE NOT NULL,
    end_date       DATE NOT NULL,
    total_distance NUMERIC(6, 2) DEFAULT 0 CHECK (total_distance >= 0)
);

-- Table structure for table `users`
--
CREATE TABLE users
(
    user_id      SERIAL PRIMARY KEY,
    email        VARCHAR(50) NOT NULL UNIQUE,
    display_name VARCHAR(50) NOT NULL,
    role         VARCHAR(20) DEFAULT 'user'
);

-- Insert data into clients table
INSERT INTO clients (client_name, client_group, email, mobile_number, address_street, address_city, address_region, address_postal_code, address_country)
VALUES ('Arvid Larsen', 'Corporate', 'arvid.larsen@digitalpathsnorway.no', '+47 910 11 223', 'Kirkegata 56', 'Oslo', 'Oslo', '0153', 'Norway'),
       ('Emma Berg', 'Retail', 'emma.berg@digitalpathsnorway.no', '+47 910 22 334', 'Holbergs gate 13', 'Bergen', 'Vestland', '5017', 'Norway'),
       ('Nils Sørensen', 'Private', 'nils.sorensen@digitalpathsnorway.no', '+47 910 33 445', 'Storgata 25', 'Trondheim', 'Trøndelag', '7013', 'Norway'),
       ('Lise Hansen', 'Corporate', 'lise.hansen@digitalpathsnorway.no', '+47 910 44 556', 'Kongens gate 81', 'Stavanger', 'Rogaland', '4005', 'Norway');

-- Insert data into billing_periods table
INSERT INTO billing_periods (start_date, end_date, total_distance)
VALUES ('2024-01-01', '2024-01-31', 350.75),
       ('2024-02-01', '2024-02-28', 420.50),
       ('2024-03-01', '2024-03-31', 390.25);

-- Insert data into users table
INSERT INTO users (email, display_name, role)
VALUES ('admin@digitalpathsnorway.no', 'Admin User', 'admin'),
       ('johannes.vik@digitalpathsnorway.no', 'Johannes Vik', 'user'),
       ('karin.holm@digitalpathsnorway.no', 'Karin Holm', 'user');

-- Insert data into travel_logs table
INSERT INTO travel_logs (client_id, travel_date, start_address, end_address, distance_km, travel_reason, notes, billing_period_id)
VALUES (1, '2024-01-10', 'Kirkegata 56, Oslo', 'Holbergs gate 13, Bergen', 120.50, 'Client Meeting', 'Met with client to discuss project requirements', 1),
       (2, '2024-01-15', 'Holbergs gate 13, Bergen', 'Storgata 25, Trondheim', 150.30, 'Consultation', 'On-site consulting for new product launch', 1),
       (3, '2024-02-05', 'Storgata 25, Trondheim', 'Kongens gate 81, Stavanger', 200.75, 'Installation', 'Installed new equipment at client premises', 2),
       (4, '2024-02-20', 'Kongens gate 81, Stavanger', 'Kirkegata 56, Oslo', 100.25, 'Maintenance', 'Performed routine maintenance check', 2),
       (1, '2024-03-12', 'Kirkegata 56, Oslo', 'Storgata 25, Trondheim', 180.00, 'Follow-up', 'Follow-up on previous consultation', 3);
