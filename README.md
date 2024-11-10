# kmKeeper

**kmKeeper** is an application designed to help support workers accurately record and track the kilometers they drive for work-related purposes. The app allows users to assign each trip to a specific client and generates a detailed record that can be used to claim reimbursement for distances traveled.

## Key Features
- **Trip Recording**: Log each trip with start and end locations, distance, purpose, and notes.
- **Client Assignment**: Assign each trip to a client to keep records organized and client-specific.
- **Claim Calculation**: Automatically calculate claimable amounts based on recorded distances.
- **Dashboard and Reports**: View summary reports to track total kilometers traveled and amount claimable for reimbursement.

**kmKeeper** simplifies mileage tracking and ensures that support workers are properly reimbursed for their work-related travel.



> **Note**: All data, including the company names, addresses, and other details, are fictional.
> Nordic-themed data is used to make the sample content stand out from "real" data in an Australasian context.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web application framework for Node.js
- **PostgreSQL** - Relational database
- **Docker** - Containerisation for deployment and local development
- **pgAdmin** - PostgreSQL management interface (optional)
- **Bootstrap** - Frontend styling and responsive design

&nbsp;  
&nbsp;

![Screenshot](public/images/screenshot.png)

## Project Structure

```plaintext
kmkeeper/
├── public/                    # Static assets (CSS, JS, images)
├── src/                       # Main application source files
│   ├── controllers/           # Route controllers
│   ├── models/                # Database models
│   ├── routes/                # Route definitions
│   ├── views/                 # Templating engine views
│   ├── config/                # Config files (database setup, etc.)
│   ├── app.js                 # Main app configuration
│   └── server.js              # Server start and setup
├── .env                       # Environment variables
├── Dockerfile                 # Dockerfile for containerizing the app
├── docker-compose.yml         # Docker Compose configuration
├── init.sql                   # SQL for initializing the database
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## Features

- Preconfigured Express server with PostgreSQL connection using `pg`
- Bootstrap styling included for quick UI setup
- Dockerized environment for streamlined deployment and local development
- Example route (`/users`) displaying user data in a Bootstrap-styled table

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [pgAdmin](https://www.pgadmin.org/) (optional for database management)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/steven2k2/kmkeeper.git
   cd web_stack
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment setup**:
    - Copy `.env.example` to `.env` and update values as needed.

4. **Run with Docker**:
   ```bash
   docker-compose up
   ```

5. **Access the Application**:
    - **Express server**: [http://localhost:3000](http://localhost:3000)
    - **pgAdmin** (if configured): [http://localhost:pgAdmin_port](http://localhost:pgAdmin_port)

## Development

### Starting the Server

```bash
npm start
```

### Development Mode

If using `nodemon`:

```bash
npm run dev
```

## Example Endpoints

- **GET /users** - Displays users in a styled table format using Bootstrap.

## Deployment

1. Ensure Docker is installed on your server or deployment environment.
2. Run the following to start the application:

   ```bash
   docker-compose up -d
   ```