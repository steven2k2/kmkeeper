# Software Design Document (SDD) - KmKeeper

### Version 1.0 | Draft
### Author: Steven Thompson
### Date: 12 November 2024

---

## Table of Contents

1. [Introduction](#introduction)
    - 1.1 [Goals and Objectives](#goals-and-objectives)
    - 1.2 [Project Overview and Scope](#project-overview-and-scope)
    - 1.3 [Software Context](#software-context)
    - 1.4 [Major Constraints](#major-constraints)
    - 1.5 [Intended Audience and Reading Suggestions](#intended-audience-and-reading-suggestions)

2. [Data Design](#data-design)
    - 2.1 [Internal Software Data Structure](#internal-software-data-structure)
    - 2.2 [Global Data Structure](#global-data-structure)
    - 2.3 [Temporary Data Structure](#temporary-data-structure)
    - 2.4 [Database Description](#database-description)

3. [Architectural and Component-Level Design](#architectural-and-component-level-design)
    - 3.1 [System Structure](#system-structure)
    - 3.2 [TravelLog Class](#travellog-class)
        - 3.2.1 [Processing Narrative (PSPEC)](#processing-narrative-pspec)
        - 3.2.2 [Interface Description](#interface-description)
        - 3.2.3 [Processing Detail](#processing-detail)
    - 3.3 [Client Class](#client-class)
        - 3.3.1 [Processing Narrative (PSPEC)](#processing-narrative-pspec)
        - 3.3.2 [Interface Description](#interface-description)
        - 3.3.3 [Processing Detail](#processing-detail)
    - 3.4 [BillingPeriod Class](#billingperiod-class)
        - 3.4.1 [Processing Narrative (PSPEC)](#processing-narrative-pspec)
        - 3.4.2 [Interface Description](#interface-description)
        - 3.4.3 [Processing Detail](#processing-detail)
    - 3.5 [User Class](#user-class)
        - 3.5.1 [Processing Narrative (PSPEC)](#processing-narrative-pspec)
        - 3.5.2 [Interface Description](#interface-description)
        - 3.5.3 [Processing Detail](#processing-detail)

4. [User Interface Design](#user-interface-design)
    - 4.1 [Description of the User Interface](#description-of-the-user-interface)
        - 4.1.1 [Objects and Actions](#objects-and-actions)
    - 4.2 [Interface Design Rules](#interface-design-rules)
    - 4.3 [Components Available](#components-available)
    - 4.4 [UIDS Description](#uids-description)

5. [Restrictions, Limitations, and Constraints](#restrictions-limitations-and-constraints)

6. [Testing Issues](#testing-issues)
    - 6.1 [Testing Cases and Expected Results](#testing-cases-and-expected-results)
        - 6.1.1 [White Box Testing](#white-box-testing)
        - 6.1.2 [Black Box Testing](#black-box-testing)
        - 6.1.3 [Feature Testing](#feature-testing)
    - 6.2 [Performance Bounds](#performance-bounds)
    - 6.3 [Critical Systems](#critical-systems)
    - 6.4 [Testing Cases](#testing-cases)

7. [Appendices](#appendices)
    - 7.1 [Packaging and Installation Issues](#packaging-and-installation-issues)
    - 7.2 [Design Metrics to Be Used](#design-metrics-to-be-used)
    - 7.3 [Sequence Diagrams](#sequence-diagrams)
    - 7.4 [UML Diagram](#uml-diagram)

---

## 1. Introduction

The purpose of this software design document is to provide a low-level description of the **KmKeeper** application, providing insight into the structure and design of each component. Topics covered include the following:

- Class hierarchies and component interactions
- Data flow and data model design
- Processing narratives and workflows
- Algorithmic structures
- Design constraints and limitations
- User interface layout and interactions
- Testing cases with expected outcomes

This document provides readers with a clear, comprehensive overview of how the **KmKeeper** application functions internally.

## 1.1 GOALS AND OBJECTIVES

The **KmKeeper** app is designed to simplify and streamline the process of tracking and recording travel distances for support workers assisting clients in various locations. Typical scenarios include transporting clients to medical 
appointments, conducting home visits, or running errands on behalf of clients.

To achieve these goals, **KmKeeper** must be quick, efficient, and easy to use, with a user interface that is intuitive and requires minimal learning. The app should focus on delivering core features that enhance usability without 
overwhelming the user. Key functionalities include:

- **Efficient Travel Logging**: Allow support workers to log trip details, distances, and client information with minimal input.
- **Client-Based Organisation**: Organise travel logs by client or client group for simplified reporting and billing.
- **Billing Period Management**: Automatically group trips by billing period for easy expense tracking and report generation.
- **Offline Functionality and Data Sync**: Enable data entry offline, with automatic synchronisation when connectivity is restored.
- **User Notifications**: Provide reminders for end-of-day logging, billing period deadlines, and other critical events.
- **Data Security and Backup**: Ensure data is securely stored and backed up to prevent data loss.

---

## 1.2 PROJECT OVERVIEW AND SCOPE

The **KmKeeper** application is composed of a web application that allows support workers to log work-related travel details, such as kilometers traveled, trip purpose, and client information. KmKeeper organises these entries into 
structured billing periods, simplifying the process of submitting claims for reimbursement. The application's features are categorised into two groups: core features, essential for core functionality, and additional features, which enhance 
the user experience. The following list outlines all the features planned for the final release of **KmKeeper**:

### CORE FEATURES

#### 1. DAILY TRAVEL LOG PROMPT
- Appears at the end of each day to prompt the user for travel log entries.
- Offers options to log travel details or dismiss the prompt if no work-related travel occurred.
- Helps ensure consistent record-keeping by prompting daily input.

#### 2. CLIENT SELECTION & MANAGEMENT
- Provides a dropdown menu for selecting individual clients or client groups.
- Allows users to add, edit, or delete clients from the list.
- Supports grouping of clients by families or organisations to streamline combined claims and reporting.

#### 3. ADDRESS MANAGEMENT
- Enables users to add frequently used addresses to a saved list for easy selection.
- Allows for quick start and end address entry from saved addresses.
- Supports updating and deleting addresses as needed.

#### 4. TRIP DETAILS INPUT
- Offers input fields for logging trip details, including reason, distance traveled, and notes.
- Dropdown menu for selecting common trip reasons (e.g., Doctor, Pharmacy, Shopping).
- Accommodates both one-way and round-trip distance entries.

#### 5. BILLING PERIOD ORGANISATION
- Automatically organises travel records by two-week billing periods.
- Excludes the last Thursday of each period to maintain consistent billing cycles.
- Allows users to view travel logs within each billing period for easy submission.

#### 6. EXPENSE TRACKING & MILEAGE CALCULATION
- Calculates total kilometers for each billing period based on entered distances.
- Summarises all recorded kilometers, organised by client or trip reason.
- Provides clear totals for submission during reimbursement claims.

#### 7. CLIENT-BASED ORGANISATION
- Groups travel logs by client for organised reporting.
- Supports viewing travel details specific to each client for transparency.
- Offers an overview of total kilometers per client to help with expense tracking.

### ADDITIONAL FEATURES (Planned for Future Releases)

The following features are not guaranteed in the initial release but may be added as enhancements as time and resources allow. These features are not covered in this document due to their tentative nature.

#### 1. HELP MENU
- Provides a list of topics covering the various functions of **KmKeeper**.
- Offers detailed guidance on each feature, menu, and input field.
- Accessible from the main menu for quick reference.

#### 2. SETTINGS MENU
- Allows users to customise preferences for notifications and data input.
- Enables options for setting reminders or adjusting interface display settings.
- Available at any time through the main navigation.

#### 3. GPS-ASSISTED TRIP TRACKING
- Track start and end locations via GPS for automatic address entry.
- Records exact routes traveled for accurate mileage calculation.
- Provides an option to manually adjust distances if necessary.

#### 4. CSV EXPORT FOR REPORTING
- Allows users to export travel logs as CSV files for claim submission.
- Organises exported data by billing period, client, and travel reason.
- Supports custom formatting options for report generation.

#### 5. CLOUD DATA BACKUP & SYNC
- Syncs travel records to a secure cloud account for data backup.
- Provides multi-device support, enabling access from multiple devices.
- Ensures offline data entry with automatic sync upon connectivity.

#### 6. PUSH NOTIFICATIONS
- Sends reminders for end-of-day travel logging.
- Alerts users to upcoming claim submission deadlines.
- Provides customisable notifications to fit the user's schedule.

#### 7. IN-APP TUTORIAL
- Walks new users through the basic functionality of KmKeeper.
- Offers a quick, step-by-step tutorial on logging trips, managing clients, and submitting claims.
- Designed to reduce the learning curve and assist users in maximising **KmKeeper’s** functionality.

---

## 1.3 SOFTWARE CONTEXT

**KmKeeper** will be available initially as a web application. The application is specifically targeted toward support workers, providing them with an efficient and organised way to log and manage work-related travel for reimbursement 
purposes.

Initial development and maintenance costs are expected to be minimal, funded internally. If additional funding is required in the future, options such as a premium version with additional features or a small one-time purchase fee may be 
explored.

Future development will focus on enhancing usability and incorporating features that may not be included in the initial release, such as GPS-assisted trip tracking or cloud-based data backup. Additional experimental features, like 
automated mileage calculation or CSV export options, may also be considered based on user feedback. These features are outside the scope of this document.

---

## 1.4 MAJOR CONSTRAINTS

The primary constraint for the **KmKeeper** project is time. Approximately six weeks have been allocated for the development, testing, and documentation of the application. Given the limited timeline, priority will be placed on delivering
core features that allow support workers to log travel details, organise trips by client, and generate billing period summaries.

Additional constraints include limited resources for testing across all potential device types and limited funding for maintenance. To mitigate these constraints, the initial release will focus on browser compatibility, with an emphasis on 
stability and ease of use. Some advanced features, such as GPS-assisted trip tracking or cloud backup, may be deferred to future updates to ensure timely delivery of essential functionality.

---

## 1.5 INTENDED AUDIENCE AND READING SUGGESTIONS

While the Software Requirements Specification (SRS) document provides a general overview, this Software Design Document (SDD) is intended for team members directly involved in the development of **KmKeeper**. This includes software 
developers, project managers, and technical consultants. The document is organised to allow readers to focus on sections relevant to their roles; it does not need to be read sequentially. Below is an outline of each part of the document:

- **Part 1 (Introduction)**
    - This section provides an overview of the **KmKeeper** project, including its goals, objectives, scope, system context, and key project constraints.

- **Part 2 (Data Design)**
    - Readers interested in **KmKeeper’s** data management approach can review this section, which details data structures, relationships, and data flow patterns used throughout the application.

- **Part 3 (Architectural and Component-Level Design)**
    - This section describes the system architecture, breaking down **KmKeeper’s** classes, interfaces, class hierarchies, and design constraints. It also covers core processing narratives and algorithmic considerations.

- **Part 4 (User Interface Design)**
    - This section provides details on **KmKeeper’s** graphical user interface (GUI) design, including layout structure and user navigation flow. It includes preliminary interface mockups to illustrate the intended design.

- **Part 5 (Restrictions, Limitations, and Constraints)**
    - This section discusses the primary constraints and limitations affecting the development of **KmKeeper**, such as time and resource constraints.

- **Part 6 (Testing Issues)**
    - For information on testing, this section outlines key test cases, expected results, and critical performance checks to ensure reliability and functionality.

- **Part 7 (Appendices)**
    - Additional information and supporting documents can be found here, providing readers with helpful resources relevant to the project.

---


## 2. DATA DESIGN

### 2.1 INTERNAL SOFTWARE DATA STRUCTURE
**KmKeeper’s** internal data structure is designed to support a client-server architecture. The mobile client application will store temporary data locally for quick access and offline functionality, organised according to the classes 
defined in later sections. This will allow the **KmKeeper** app to function efficiently offline, with data synchronised to the server when connectivity is available. KmKeeper will follow a Model-View-Controller (MVC) pattern to maintain 
separation between data management, UI components, and application logic.

On the server side, permanent data storage will be managed with **PostgreSQL**, which will store structured records for travel logs, clients, and addresses. Data from the client application will be sent to the server via JSON, a 
lightweight format ideal for transmitting structured data between the mobile client and server.

### 2.2 GLOBAL DATA STRUCTURE
The global data structure of KmKeeper centers around its **PostgreSQL** database, which is used to store persistent data, such as travel logs, clients, and addresses. The mobile client will not access this database directly. Instead, it will issue HTTP requests to a server-side API, which will interact with the PostgreSQL database, perform necessary CRUD operations, and send responses back to the client in JSON format.

### 2.3 TEMPORARY DATA STRUCTURE
Temporary data structures in KmKeeper include:
- **Client-Side Data Objects**: These objects are created and stored in local memory while the application is running. They include representations of travel logs, client records, and addresses.
- **JSON Objects**: These objects are used to send and receive data between the client and server. Once the server processes a JSON request, it will destroy the object, and the client will also remove the JSON data from memory once it is parsed and stored locally.

---

### 2.4 DATABASE DESCRIPTION

```sql
-- Table structure for table `travel_logs`
--
CREATE TABLE travel_logs (
  travel_id SERIAL PRIMARY KEY,
  client_id INT,
  travel_date DATE NOT NULL,
  start_address VARCHAR(100) NOT NULL,
  end_address VARCHAR(100) NOT NULL,
  distance_km DECIMAL(5,2) NOT NULL,
  travel_reason VARCHAR(50),
  notes TEXT,
  billing_period_id INT
);

-- Table structure for table `clients`
--
CREATE TABLE clients (
  client_id SERIAL PRIMARY KEY,
  client_name VARCHAR(50) NOT NULL,
  client_group VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  mobile_number VARCHAR(15),
  address_street VARCHAR(100),
  address_city VARCHAR(50),
  address_region VARCHAR(50),
  address_postal_code VARCHAR(10),
  address_country VARCHAR(50) DEFAULT 'Australia',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table `billing_periods`
--
CREATE TABLE billing_periods (
    period_id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_distance NUMERIC(6,2) DEFAULT 0 CHECK (total_distance >= 0)
);

-- Table structure for table `users`
--
CREATE TABLE users (
                       user_id SERIAL PRIMARY KEY,
                       email VARCHAR(50) NOT NULL UNIQUE,
                       display_name VARCHAR(50) NOT NULL,
                       role VARCHAR(20) DEFAULT 'user'
);

```

---

## 3. ARCHITECTURAL & COMPONENT-LEVEL DESIGN

### 3.1 SYSTEM STRUCTURE
The **KmKeeper** system is composed of two primary components: a mobile client application and a server-side application powered by Node.js, with data stored in a **PostgreSQL** database.

- **Client-Side Application**: The client-side component is divided into two main parts: the functional logic (written in JavaScript, using a framework like React Native for cross-platform compatibility) and the graphical interface 
- (implemented with mobile-optimised UI elements). The functional component is responsible for the core application logic, capturing and validating user input for travel logs, client information, and billing period summaries. It formats 
- and sends this data to the server for storage and synchronises data when connectivity is available. The graphical component, or GUI, provides an intuitive, user-friendly interface with buttons, input fields, and navigation elements that enable easy access to KmKeeper's features.

- **Server-Side Application**: The server component of KmKeeper consists of an API layer built with **Node.js** that communicates with the **PostgreSQL** database for persistent storage. The Node.js API is responsible for handling HTTP/HTTPS requests from the client, parsing JSON data, performing server-side validation, and interacting with the database to store or retrieve data. The API endpoints provide CRUD (Create, Read, Update, Delete) operations for managing travel logs, clients, addresses, and billing periods.

The client and server communicate via HTTP/HTTPS using JSON-formatted data. This approach ensures platform-agnostic, efficient data interchange between the client application and server, enabling the mobile app to function seamlessly on both Android and iOS devices.

## 3.2 TRAVEL_LOG CLASS
The `TravelLog` class represents individual travel records in the KmKeeper application. Each `TravelLog` object includes a unique identifier, client information, the date of travel, starting and ending addresses, distance traveled, and additional notes. Instances of `TravelLog` objects are associated with specific billing periods and clients, allowing support workers to track and organise travel records easily.

### 3.2.1 PROCESSING NARRATIVE (PSPEC)
When a support worker records a new travel entry, a `TravelLog` object is created to store the details of that entry. This object holds essential information, such as:
- Travel ID
- Client ID
- Date of travel
- Start address
- End address
- Distance traveled in kilometers
- Travel reason (e.g., medical appointment)
- Notes (e.g., "assisted client with shopping")

Whenever information related to a travel entry is needed (e.g., when generating billing reports), the `TravelLog` object is accessed to retrieve or update relevant details.

---

### 3.2.2 INTERFACE DESCRIPTION
```plaintext
TravelLog
new( client_id: int, travel_date: Date, start_address: String, end_address: String, distance_km: Decimal, travel_reason: String, notes: String )
get_client_id() : int
get_travel_date() : Date
get_start_address() : String
get_end_address() : String
get_distance_km() : Decimal
get_travel_reason() : String
get_notes() : String
set_travel_date( newDate : Date )
set_start_address( newAddress : String )
set_end_address( newAddress : String )
set_distance_km( newDistance : Decimal )
set_travel_reason( newReason : String )
set_notes( newNotes : String )
associate_billing_period( billing_period_id: int ) : boolean
pull_data_from_server() : boolean
push_data_to_server() : boolean
```

### 3.2.3 PROCESSING DETAIL
Since `TravelLog` is primarily used for data storage and retrieval, it does not include complex algorithms. The methods are largely accessors, mutators, and server communication processes.

#### 3.2.3.1 DESIGN CLASS HIERARCHY
The `TravelLog` class is independent, with no parent or child classes. Each `TravelLog` object may be linked to a `BillingPeriod` instance for organisational purposes.

#### 3.2.3.2 RESTRICTIONS/LIMITATIONS
Each `TravelLog` instance must be associated with a unique `travel_id`. `TravelLog` instances must have valid data entries for required fields like `client_id`, `travel_date`, and `distance_km` to ensure accurate data processing.

#### 3.2.3.3 PERFORMANCE ISSUES
Since each `TravelLog` entry stores only essential data, there are no significant performance constraints. The primary concern is network availability for syncing data between the client and server. If connectivity is lost, server-related methods will be deferred until reconnection.

#### 3.2.3.4 DESIGN CONSTRAINTS
Each `TravelLog` object should represent a unique trip. Multiple travel records cannot share the same `travel_id`. The application should ensure valid and accurate entry of travel dates and addresses for reliable reporting.

#### 3.2.3.5 PROCESSING DETAIL FOR EACH OPERATION
- `new( client_id: int, travel_date: Date, start_address: String, end_address: String, distance_km: Decimal, travel_reason: String, notes: String )`
    - This constructor is called whenever a new travel entry is recorded. It initialises a `TravelLog` object with client information, travel details, and notes.

- `associate_billing_period( billing_period_id: int ) : boolean`
    - Associates the travel log with a specific billing period. Used when calculating total kilometers per billing cycle.

- `pull_data_from_server() : boolean`
    - Syncs travel data from the server, replacing local information if there are server updates.

- `push_data_to_server() : boolean`
    - Updates the server with local travel log information, ensuring all recent entries are stored on the server.

- **Accessors/Mutators**
    - These methods allow retrieval and modification of `TravelLog` attributes as needed. Fields like `distance_km` and `notes` are editable, while `travel_id` remains immutable.
- ## 3.3 CLIENT CLASS
The `Client` class represents individual clients in the KmKeeper application. Each `Client` object includes unique identifiers, client details, and optional grouping information. Instances of `Client` objects are associated with travel logs, allowing support workers to organise and track travel for specific clients or groups of clients.

### 3.3.1 PROCESSING NARRATIVE (PSPEC)
When a new client is added to the KmKeeper application, a `Client` object is created to store the relevant details for that client. This includes:
- Client ID
- Client name
- Client group (optional)

The `Client` object serves as a reference for travel logs, ensuring each travel record can be linked to a specific client. It supports both individual clients and client groups, making it easier to categorise and retrieve travel records based on client relationships.

### 3.3.2 INTERFACE DESCRIPTION

```plaintext
Client
new( client_name: String, client_group: String? )
get_client_id() : int
get_client_name() : String
set_client_name( new_name : String )
get_client_group() : String
set_client_group( new_group : String )
associate_travel_log( travel_log: TravelLog ) : boolean
remove_travel_log( travel_log_id: int ) : boolean
get_associated_travel_logs() : TravelLog[]
```

### 3.3.3 PROCESSING DETAIL
The `Client` class primarily manages client data and associations with travel logs. It includes methods for setting and retrieving client details and linking travel logs to specific clients.

#### 3.3.3.1 DESIGN CLASS HIERARCHY
The `Client` class is standalone and does not have parent or child classes. Each `Client` instance may be linked to multiple `TravelLog` instances, allowing for organised tracking of client-related travel.

#### 3.3.3.2 RESTRICTIONS/LIMITATIONS
Each `Client` instance must have a unique `client_id`. Valid data entries are required for fields like `client_name`, and optional group information must be appropriately formatted if provided.

#### 3.3.3.3 PERFORMANCE ISSUES
Since `Client` instances contain basic data and associations, there are minimal performance concerns. However, if a client is associated with a large number of travel logs, retrieval performance should be monitored to ensure efficiency.

#### 3.3.3.4 DESIGN CONSTRAINTS
Each `Client` object should represent a unique client or client group. To avoid redundancy, client IDs must remain unique.

#### 3.3.3.5 PROCESSING DETAIL FOR EACH OPERATION
- `new( client_name: String, client_group: String? )`
    - This constructor initialises a new `Client` object with specified client details, including name and optional group association.

- `associate_travel_log( travel_log: TravelLog ) : boolean`
    - Links a `TravelLog` object to the client, allowing travel records to be associated with a specific client.

- `remove_travel_log( travel_log_id: int ) : boolean`
    - Unlinks a `TravelLog` object from the client, removing the association if the travel log is no longer relevant.

- **Accessors/Mutators**
    - These methods allow retrieval and modification of `Client` attributes, such as `client_name` and `client_group`, as needed.

## 3.4 BILLING_PERIOD CLASS
The `BillingPeriod` class represents billing cycles in the KmKeeper application. Each `BillingPeriod` object defines a specific timeframe for grouping travel logs, enabling accurate tracking of kilometers traveled and costs within each billing period.

### 3.4.1 PROCESSING NARRATIVE (PSPEC)
When a new billing period begins, a `BillingPeriod` object is created to store the start and end dates for that period. This object also tracks total kilometers accumulated within the period by aggregating data from associated `TravelLog` entries. Key attributes include:
- Period ID
- Start date
- End date
- Total distance (in kilometers)

This setup allows for organised, period-specific reporting of travel data, which can be used for submitting reimbursement claims or reviewing client travel patterns.

### 3.4.2 INTERFACE DESCRIPTION
```plaintext
BillingPeriod
new( start_date: Date, end_date: Date )
get_period_id() : int
get_start_date() : Date
set_start_date( new_date: Date )
get_end_date() : Date
set_end_date( new_date: Date )
get_total_distance() : Decimal
add_travel_log( travel_log: TravelLog ) : boolean
remove_travel_log( travel_log_id: int ) : boolean
update_total_distance() : void
```

### 3.4.3 PROCESSING DETAIL
The `BillingPeriod` class manages the start and end dates for each billing cycle, along with the total distance traveled within the period. It contains methods to add or remove `TravelLog` entries and to recalculate the total kilometers whenever a new travel log is associated with the billing period.

#### 3.4.3.1 DESIGN CLASS HIERARCHY
The `BillingPeriod` class is standalone and has no parent or child classes. Each `BillingPeriod` instance may be associated with multiple `TravelLog` entries, aggregating the total distance for each billing cycle.

#### 3.4.3.2 RESTRICTIONS/LIMITATIONS
Each `BillingPeriod` instance must have a unique `period_id`. It requires valid `start_date` and `end_date` entries, and the end date must be after the start date.

#### 3.4.3.3 PERFORMANCE ISSUES
Calculating the total kilometers in real-time may impact performance if there are many travel logs associated with the billing period. To mitigate this, total kilometers are stored and updated only when a new `TravelLog` is added or removed.

#### 3.4.3.4 DESIGN CONSTRAINTS
Each billing period must have unique dates to avoid overlapping records, which could lead to duplicate or inaccurate reporting. The application should prevent overlapping periods when new billing periods are created.

#### 3.4.3.5 PROCESSING DETAIL FOR EACH OPERATION
- `new( start_date: Date, end_date: Date )`
    - This constructor initialises a new `BillingPeriod` object with a specified start and end date, setting up a timeframe for grouping travel logs.

- `add_travel_log( travel_log: TravelLog ) : boolean`
    - Associates a `TravelLog` with this billing period, allowing it to be included in the total distance calculation.

- `remove_travel_log( travel_log_id: int ) : boolean`
    - Removes a `TravelLog` from the billing period, updating the association if a travel log is no longer relevant.

- `update_total_distance() : void`
    - Recalculates the `total_distance` attribute based on all associated travel logs, ensuring accurate aggregation of kilometers traveled within the period.

- **Accessors/Mutators**
    - These methods allow retrieval and modification of `BillingPeriod` attributes such as `start_date`, `end_date`, and `total_distance`, as needed.

---


## 3.5 USER CLASS
The `User` class represents individual users of the KmKeeper application, primarily support workers who log travel information. Each `User` object includes unique identifiers, authentication details, and optional settings for customising the user experience. Instances of the `User` class manage user-specific data and preferences.

### 3.5.1 PROCESSING NARRATIVE (PSPEC)
When a new user registers or logs into the KmKeeper application, a `User` object is created to store their unique information. This object holds essential details, such as:
- User ID
- Email address
- Display name
- User role (e.g., "support worker")
- Settings and preferences (e.g., notification preferences)

This information allows the KmKeeper system to manage user-specific data and enable role-based access to features. The `User` class supports basic user management functions like updating settings and retrieving user information.

### 3.5.2 INTERFACE DESCRIPTION
```plaintext
User
new( email: String, display_name: String, role: String )
get_user_id() : int
get_email() : String
set_email( new_email : String )
get_display_name() : String
set_display_name( new_display_name : String )
get_role() : String
set_role( new_role : String )
get_settings() : Settings
update_settings( new_settings : Settings ) : boolean
authenticate( password: String ) : boolean
log_out() : void
```

### 3.5.3 PROCESSING DETAIL
The `User` class primarily manages user data and preferences. It contains methods for authentication, updating settings, and retrieving user information, as well as storing role-based permissions for additional security.

#### 3.5.3.1 DESIGN CLASS HIERARCHY
The `User` class is standalone, with no parent or child classes. Each `User` instance may have associations with other classes, such as `TravelLog` or `BillingPeriod`, to manage user-specific travel data.

#### 3.5.3.2 RESTRICTIONS/LIMITATIONS
Each `User` instance must have a unique `user_id` and a valid `email` address. Certain fields, like `email` and `display_name`, must be formatted correctly to ensure consistent user data.

#### 3.5.3.3 PERFORMANCE ISSUES
Since `User` instances only contain basic user data and preferences, performance concerns are minimal. Authentication processes, however, may involve database lookups, which can affect performance if implemented inefficiently.

#### 3.5.3.4 DESIGN CONSTRAINTS
Each user must have a unique identifier and valid email address to facilitate secure authentication. Role-based access control must be maintained to ensure that only authorised users access specific features.

#### 3.5.3.5 PROCESSING DETAIL FOR EACH OPERATION
- `new( email: String, display_name: String, role: String )`
    - This constructor initialises a new `User` object with essential details, including email, display name, and role.

- `authenticate( password: String ) : boolean`
    - Validates the user’s login credentials, checking the provided password against stored authentication data.

- `update_settings( new_settings : Settings ) : boolean`
    - Updates the user’s preferences and settings, enabling customisation of notifications, display options, and other preferences.

- `log_out() : void`
    - Log the user out of the KmKeeper application, removing any session data and resetting authentication state.

- **Accessors/Mutators**
    - These methods allow retrieval and modification of `User` attributes as needed, including `email`, `display_name`, `role`, and `settings`.

---

## 4. USER INTERFACE DESIGN
The user interface for KmKeeper consists of a set of screens that allow support workers to interact with their travel data and manage client information. These screens include a “Welcome” screen, a “Travel Log” screen, a “Client Management” screen, a “Billing Period Summary” screen, and a “Settings” screen. Each screen will contain input fields, buttons, and other controls needed to perform specific tasks efficiently. The user will interact with these screens primarily through touch, utilising the device’s touchscreen capabilities.

### 4.1 DESCRIPTION OF THE USER INTERFACE
Each screen in KmKeeper will feature various GUI elements, including buttons, labels, text fields, dropdowns, and list views. These components will be arranged intuitively to ensure that the user can quickly understand each screen’s purpose and perform the associated tasks. The screens are designed for ease of use and clarity, ensuring that users can log travel entries, manage client data, and review billing information with minimal effort.

### 4.1.1 OBJECTS AND ACTIONS
The following pages describe and illustrate the primary screens of the KmKeeper application:

For first-time users:
- **Welcome/Registration Screen**
    - Provides an introduction to KmKeeper and walks new users through the account setup process.
    - Allows users to enter basic account information and configure initial settings.

- **Add Client Screen**
    - Enables users to create client profiles by entering client details such as name, address, and group affiliation.
    - Displays a list of all clients, with options to add, edit, or delete clients.

For returning users:
- **Daily Travel Log Screen**
    - Prompts users at the end of each day to record travel details, including client, trip purpose, and kilometers traveled.
    - Allows users to view, edit, or delete travel entries associated with the day.

- **Billing Period Summary Screen**
    - Displays an overview of travel logs organised by billing period.
    - Shows total kilometers traveled and expenses accrued within each billing period.
    - Provides options for submitting or exporting summaries for reimbursement.

- **Client Management Screen**
    - Lists all clients with options to view individual client details, including travel history.
    - Supports adding, editing, or removing client records.

- **Settings Screen**
    - Allows users to adjust notification preferences, app settings, and view user-specific details.
    - Provides an option to log out or update personal account information.

Each screen is structured to ensure that the user can navigate through tasks quickly and intuitively, optimising the travel logging experience for support workers. Further details, including layout and interactions, are provided in section 4.1.2.

---
DIAGRAMS GO HERE

---


## 4.2 INTERFACE DESIGN RULES
The interface design for KmKeeper follows Google’s usability principles and Material Design guidelines, ensuring a user-friendly, consistent, and visually appealing experience across devices. Drawing inspiration from applications like Google Drive, KmKeeper emphasises simplicity, intuitiveness, and responsiveness, making it easy for support workers to record travel logs and manage client information effectively. The following design rules guide the interface:

1. **Consistency Across Screens**
    - Consistent sequences and visual patterns are applied throughout the app to build user familiarity. Icons, labels, and terminology are standardised, making navigation intuitive and predictable.
    - Main actions, such as “Add Entry” and “Submit,” are located at the bottom of each screen, while lists, like travel logs or clients, are displayed centrally. Fields for data entry are organised near the top for easy accessibility.

2. **Quick Access for Frequent Users**
    - Frequent users benefit from quick-access features and streamlined workflows. Shortcuts and predictive text reduce the number of required interactions.
    - Users can quickly add a travel entry directly from the main dashboard, minimising repetitive steps and speeding up frequent actions.

3. **Clear, Immediate Feedback**
    - Every interaction provides immediate visual feedback, ensuring users know when actions are successfully completed or require further input.
    - Notifications, such as data successfully saved or synced, appear unobtrusively within the app, and offline alerts clearly indicate the need to reconnect for data synchronisation.

4. **Guided, Task-Focused Dialogues**
    - Each process is broken into logical steps with a clear beginning, middle, and end, creating a sense of completion with each task.
    - After logging a travel entry, a confirmation message is displayed, letting users know the entry was saved. This task-based approach encourages users to complete entries confidently.

5. **Proactive Error Prevention and Resolution**
    - KmKeeper’s design prevents common errors by guiding users with prompts and ensuring data is complete before submission.
    - If required fields are missing or formatted incorrectly, users receive real-time prompts and validation indicators that make it easy to correct entries before submitting.

6. **Flexible and Reversible Actions**
    - Actions are designed to be reversible, allowing users to explore options without anxiety. Undo options and easy edits are available wherever appropriate.
    - For example, users can easily edit or delete a travel entry if entered incorrectly, providing flexibility and reducing errors.

7. **User Empowerment and Control**
    - KmKeeper gives users control over their experience, with features that respond directly to their actions. Personalisation options allow for customised notifications and settings.
    - Support workers can tailor the app to their needs, adjusting notification preferences or personalising client organisation, providing a sense of control over their workflow.

8. **Minimal Memory Load**
    - The interface is designed to focus on one task per screen, reducing cognitive load and making navigation effortless.
    - Relevant options and data are presented clearly, and complex tasks are broken down to ensure the app remains straightforward and easy to use, even for new users.

---

## 4.3 COMPONENTS AVAILABLE
The KmKeeper application will use a variety of GUI components to ensure a user-friendly and intuitive experience. Depending on the final choice of framework (Ext JS or React), the following components will be used, as both frameworks offer equivalent options.

- **Container/View**
    - The foundational component for all interface elements, allowing for layout structuring, alignment, and responsive behavior.
    - All screens in KmKeeper (e.g., Travel Log, Client Management) will use containers to group related components, ensuring a cohesive layout.

- **Form Panel / Form**
    - Used for data input and organisation, providing fields, labels, and validation for easy and accurate data entry.
    - KmKeeper will use form components for screens where users log travel details, create client profiles, or adjust billing information.

- **Button**
    - Provides an interactive element that allows users to perform actions with a click or tap. Buttons trigger events, which are handled by functions attached to specific actions.
    - In KmKeeper, buttons will be used extensively to submit data, navigate between screens, and interact with menus.

- **Text Field / Input Field**
    - Allows users to enter and edit text, such as names, addresses, or travel notes. Validation can be applied to ensure the data meets specific criteria.
    - KmKeeper will use input fields for entering client information, travel details, and mileage.

- **Date Picker**
    - Offers a calendar interface for selecting dates, streamlining entry and reducing errors in date-related fields.
    - This component will be used for specifying travel dates and setting billing period start and end dates.

- **Dropdown Menu / Select Field**
    - Provides a list of options that users can select from, useful for selecting clients, trip purposes, or other predefined categories.
    - KmKeeper will implement dropdowns for choosing clients or filtering records by specific categories.

- **List / Grid**
    - Displays data in a structured, scrollable format, allowing users to view multiple records at a time. These components support selection, sorting, and filtering.
    - In KmKeeper, lists or grids will display travel logs, client records, and billing summaries, offering a clear overview of each category.

- **Panel**
    - A flexible container that can hold multiple types of content, including text, images, and interactive components. Panels allow for collapsible sections to manage content display effectively.
    - Panels will be used to organise information, such as displaying user profile details, billing summaries, or settings in collapsible sections.

- **Modal Dialog / Pop-up**
    - Used for prompts, alerts, and confirmations, modal dialogs ensure that users address important tasks or warnings before proceeding.
    - KmKeeper will use modals to confirm actions (e.g., deleting a travel log) or alert users to errors (e.g., incomplete fields).

## 4.4 UIDS DESCRIPTION
The User Interface Development System (UIDS) for KmKeeper is powered by **WebStorm**, a versatile IDE that supports both Ext JS and React, making it ideal for building a flexible and modern UI.

- **WebStorm IDE**
    - WebStorm provides an integrated environment for designing and developing UI components with a code-centric approach, supporting JavaScript, HTML, and CSS. With extensive code completion and debugging features, it simplifies the development and testing of dynamic web interfaces.

- **Component-Based Development**
    - WebStorm’s support for component-based libraries (e.g., Ext JS components or React components) enables modular UI construction. Developers can create reusable components for screens and interface elements, building the UI from modular parts that ensure consistency and maintainability.

- **Style and Layout Management**
    - Visual adjustments and style definitions are handled in SCSS or CSS files directly within WebStorm, allowing for precise control over layout, responsiveness, and adherence to Material Design guidelines. The IDE's live preview and CSS inspection tools make it easy to fine-tune visual details.

- **JavaScript and Event Handling**
    - Functional behavior is implemented in JavaScript, handling user interactions through event listeners and functions. WebStorm’s debugging tools and live console help streamline event handling and logic debugging, making the development process efficient.

This UIDS setup allows for a highly flexible and code-centric approach, where UI elements are crafted with precision using WebStorm’s advanced development tools, empowering developers to create a dynamic and responsive user interface for KmKeeper.

---

## 5. RESTRICTIONS, LIMITATIONS, AND CONSTRAINTS

Given time constraints, some optional features outlined in the SRS document are not covered in this design document, as these features may not be achievable within the project’s timeline. However, the modular architecture of KmKeeper, 
combined with expandable server capabilities, will facilitate the addition of these features in future iterations with minimal disruption to the initial design.

Another current limitation is the lack of a dedicated web interface. While a web interface could expand accessibility by enabling browser-based access to KmKeeper’s features, it is not part of the initial design. This enhancement could be 
implemented in the future, leveraging the server’s modular design to support a web front end alongside the mobile application.

A key operational constraint is the requirement for users to have an active internet connection. KmKeeper relies on real-time synchronisation with the server to perform data modifications. To address periods of offline usage, a queued 
actions system may be implemented. This system would store actions locally and push them to the server once connectivity is restored. If conflicting updates are detected upon reconnection, the queued actions are discarded, and the user is 
prompted to resolve any discrepancies.

Since KmKeeper frequently interacts with a server, data efficiency is essential to minimise bandwidth consumption. To reduce potential data usage, KmKeeper will rely on compact JSON encoding for data exchanges. In the event that data 
consumption exceeds acceptable levels during testing, optimisations will be explored, such as sending only updated fields rather than entire objects or applying JSON compression techniques.

Finally, KmKeeper requires users to provide a valid email address as a unique identifier. This email-based identification supports account recovery and allows users to re-register if they switch devices, with their email and device ID 
ensuring authentication continuity.

---

## 6. TESTING ISSUES
Each class in KmKeeper will undergo individual testing to ensure the correct operation of its functions and constructors. Once all components are assembled, the system will be tested as a whole to verify that they work together seamlessly.

### 6.1 TESTING CASES AND EXPECTED RESULTS
The following testing methodologies will be employed, focusing on both black-box and white-box testing.

#### 6.1.1 WHITE BOX TESTING
Each developer will perform unit testing on their assigned classes during implementation to verify that each function operates as expected. Developers are primarily responsible for debugging their own code; however, all code is accessible in the version control system, allowing for collaborative debugging when necessary.

#### 6.1.2 BLACK BOX TESTING
Once all components are integrated, black-box testing will simulate various usage scenarios for KmKeeper to ensure robustness. This process will cover different usage patterns and edge cases to validate that KmKeeper performs correctly across expected user interactions.

#### 6.1.3 FEATURE TESTING
The following subsections outline the testing process for each primary feature in KmKeeper.

##### 6.1.3.1 ACCOUNT CREATION
- **Description: Correct Data Input**
    - **Input:** Valid email not already in the system
    - **Output:** Account is created, and the user is directed to the main dashboard.

- **Description: Incorrect Data Input (Invalid Email)**
    - **Input:** Invalid email format
    - **Output:** Account is not created; user is prompted to enter a valid email.

- **Description: Duplicate Account**
    - **Input:** Email already registered
    - **Output:** User is notified of the duplicate account and prompted to enter a different email.

##### 6.1.3.2 SERVER CONNECTION
- **Description: Connection Established**
    - **Input:** Device attempts to connect to the server and succeeds.
    - **Output:** Data syncs to the server as expected.

- **Description: Connection Failure**
    - **Input:** Device attempts to connect to the server and fails.
    - **Output:** User is notified of offline status; changes are stored locally until connectivity is restored.

- **Description: Sync After Offline Changes**
    - **Input:** User makes changes offline, and connectivity is later restored.
    - **Output:** Local changes sync to the server, with conflict resolution if discrepancies are detected.

##### 6.1.3.3 TRAVEL LOG ENTRY
- **Description: Adding a Travel Log Entry**
    - **Input:** User enters valid travel log details.
    - **Output:** Travel log entry is saved, and details are synced to the server if online.

- **Description: Invalid Data Entry**
    - **Input:** Invalid data in required fields
    - **Output:** User is prompted to correct entries before proceeding.

##### 6.1.3.4 BILLING PERIOD MANAGEMENT
- **Description: Starting a New Billing Period**
    - **Input:** Start and end dates entered correctly.
    - **Output:** Billing period is created and displayed, summarising related travel logs.

- **Description: Invalid Date Range**
    - **Input:** End date before start date.
    - **Output:** User is prompted to enter a valid date range.

##### 6.1.3.5 CLIENT MANAGEMENT
- **Description: Adding a New Client**
    - **Input:** Valid client details.
    - **Output:** Client profile created and displayed in the client list.

- **Description: Duplicate Client Check**
    - **Input:** Client name already exists.
    - **Output:** User is notified of the duplicate and prompted to enter unique details.

##### 6.1.3.6 OFFLINE SYNCING
- **Description: Offline Data Storage and Sync**
    - **Input:** User makes entries offline.
    - **Output:** Data is stored locally and synced to the server once connection is restored.

##### 6.1.3.7 NOTIFICATIONS
- **Description: Notifications for Key Events**
    - **Input:** User completes actions like adding a travel log or starting a new billing period.
    - **Output:** User receives confirmation notifications for successful actions.

These testing cases and methodologies will ensure that KmKeeper performs reliably across various scenarios and that core features function as expected.

---

### 6.2 PERFORMANCE BOUNDS
Given KmKeeper’s focus on mobile usability and frequent user interactions, local actions must perform seamlessly with minimal delay. This includes screen transitions, client and billing management, and travel log creation. Local interactions should respond instantaneously, providing a smooth experience for support workers.

Data exchanges between the client and server are designed to be efficient, utilising compact JSON messages to minimise data usage and latency. Server interactions, including data syncs and updates, should complete within a few seconds to avoid interrupting user workflows.

For the server component, a scalable setup is anticipated, with a focus on handling a moderate user base. Initially, a Node.js application on a standard virtual private server will support interactions between the app and a PostgreSQL database. The server, responsible primarily for simple queries and CRUD operations, is not expected to encounter significant performance bottlenecks with a limited user base of 30-40 support workers. Should demand increase, upgrading server resources or implementing load balancing can address performance needs.

---

### 6.3 CRITICAL SYSTEMS
The core functionality of KmKeeper relies on the following critical components:

1. **Accurate Distance Calculations**
    - Kilometer calculations for each travel entry must be precise, as these form the basis for reimbursement claims. Testing will focus on ensuring that distances are recorded and aggregated correctly for each client and billing period.

2. **Reliable Server Synchronisation**
    - The server must consistently update the database with accurate, complete data. This includes syncing travel logs, billing periods, and client records without data loss or corruption.
    - Testing procedures will verify that all data sent to the server is accurately written to the database and that data retrieved from the server is correct and up-to-date.

3. **Efficient Server Communication**
    - Reliable server interactions are essential for KmKeeper’s functionality. Without dependable data exchange between the app and server, the application’s effectiveness is compromised. Testing will validate the integrity of information flows, ensuring data syncs occur as expected both to and from the app.
    - Node.js will manage these server processes, handling API requests to read/write data and ensuring that each transaction is processed accurately without data loss.

Extensive testing will be conducted on both the server and client sides to verify data accuracy, sync reliability, and responsive performance, ensuring that KmKeeper operates efficiently for its intended user base.

---

## 6.4 TESTING CASES

The following table lists all currently scheduled test cases for KmKeeper:

| Feature               | Cases                                                                                                                           |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------|
| **Server Communication** | Connection is established. New account, new client, new travel log, and new billing period are created and sent to the server. |
|                       | Connection is not established. New account, new client, new travel log, and new billing period are created offline.                |
|                       | Connection is restored after offline entries. Data syncs to the server and conflicts, if any, are resolved.                        |
| **Account Creation**  | Correct information input.                                                                                                       |
|                       | Incorrect information input (e.g., invalid email or duplicate account).                                                          |
| **Client Management** | New client created.                                                                                                              |
| **Add Travel Log**    | Valid travel details are input, and a log entry is created.                                                                      |
|                       | Invalid input detected (e.g., missing required fields), user is prompted to correct.                                             |
| **Billing Period Management** | Correct date range is entered, and a billing period is created.                                                          |
|                       | Invalid date range (e.g., end date before start date) prompts correction.                                                       |
| **Resolve Travel Logs**  | Resolve travel logs within a billing period and confirm data sync to server.                                                 |
|                       | Attempt to resolve travel logs offline and sync changes once connected.                                                         |
| **Algorithm Testing** | Create multiple clients, travel logs, and billing periods to validate accurate kilometer calculations and data handling.         |
| **Performance**       | Time all actions to ensure that the application responds smoothly, including data sync times and local operations.              |

---

## 7. APPENDICES

### 7.1 PACKAGING AND INSTALLATION ISSUES
No special considerations are required for installing **KmKeeper** beyond downloading it from the App Store (if a web version is made available) or installing it directly on compatible devices. For production deployment, the app package 
must be signed. Unsigned packages cannot be installed due to security requirements. Once signed, the final package can be prepared for deployment or shipped for distribution.

### 7.2 DESIGN METRICS TO BE USED
To assess design quality and maintainability, the following metrics will be evaluated:
- **Stability**: This metric will gauge how easily components can be modified without impacting unrelated parts of the application. Highly modular and independent components will contribute to greater stability.
- **Code Readability and Abstractness**: Readability and clarity will be assessed by examining code organisation, class modularisation, and method encapsulation. Well-structured code should be easy to understand, modify, and extend.



