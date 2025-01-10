# Conplaint Manage Task (Node + MySQL)

A TypeScript-based ticket management system designed for customers and admins. This full-stack application leverages **TypeScript**, **MySQL** with **TypeORM**, and modern frameworks to ensure type safety and scalability.

---

## Features

### Customer Dashboard
- Create new support tickets with a subject and description.
- View a list of your submitted tickets.

### Admin Dashboard
- Manage tickets via a DataGrid, including resolving or deleting tickets.
- View all ticket details, including status, subject, and customer information.

### General Features
- Secure authentication using JWT-based token authentication.
- Responsive user interface with **Material-UI**.
- Dynamic data fetching and API integration with custom hooks.

---

## Tech Stack

### Frontend
- **React**: Used for building reusable and interactive UI components.
- **TypeScript**: Ensures type safety in all React components and state management.
- **Material-UI**: Styled UI components and DataGrid for tables.
- **Axios**: For HTTP requests to the backend.

### Backend
- **Node.js**: Server runtime for building scalable APIs.
- **Express.js**: Backend framework for routing and middleware.
- **TypeScript**: Type-safe backend with improved development productivity.
- **MySQL**: Database for ticket management and user information.
- **TypeORM**: ORM for easy management of MySQL schema and queries.

---

## Prerequisites

- **Node.js** installed
- **MySQL** installed locally or accessible remotely
- **npm** or **yarn** for dependency management

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/AsadAnik/complaint-manage-task.git
cd ticket-management-system
```

### 2. Install Dependencies

#### Frontend
```bash
cd client-web
npm install
```

#### Backend
```bash
cd server-api
npm install
```

### 3. Configure the Environment Variables

#### Backend `.env` Example
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=user
DB_PASSWORD=userpassword
DB_NAME=mydatabase
PASSWORD_SALT=10
JWT_SECRET=my_secret
JWT_REFRESH_TOKEN_SECRET=REFRESH-SECRET
JWT_EXPIRES_IN=1h
```

#### Frontend `.env` Example
```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

---

## Running the Application

### Backend
Run the backend server (including database migrations with TypeORM):
This one for Generate Migration
```bash
npm run migration:generate
```

This one for Run the Migration
```bash
npm run migration:run
```

Now you can run the API Server
```bash
npm run dev
```

### Frontend
Run the React development server:
```bash
npm run dev
```

---

## Folder Structure

```
/
├── client-web/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── hooks/            # Custom React hooks for data fetching
│   │   ├── context/          # ContextAPI for global state management
│   │   └── pages/            # Page components (CustomerDashboard, AdminDashboard)
├── server-api/                   # Express backend
│   ├── src/
│   │   ├── app/              # Application Level Global Configs
│   │   ├── controllers/      # HTTP handlers directory
│   │   ├── services/         # Business logic for tickets, users and auth
│   │   └── db/               # Database Config, Models, Migrations, Factory
│   │   └── middlewares/      # All Necessay Middlewares
│   │   └── routes/           # API Routings Handlers
│   │   └── lib/              # Third party dependency and ORM modules
│   │   └── utils/            # Utility functions and validations
│   └── index.ts              # Main Server File
│   └── Dockerfile            # Dockerfile for Production
│   └── Dockerfile.dev        # Dockerfile for Development
│   └── docker-compose.yaml   # Docker Compose YAML file
│   └── Makefile              # Shorted docker commands
└── README.md                 # Documentation
```

---

## API Endpoints

### Base URL: `http://localhost:3001/api`

| Method | Endpoint              | Description                  | Auth Required |
|--------|------------------------|------------------------------|---------------|
| POST   | `/api/auth/login`          | Log in as a user             | ✅             |
| POST   | `/api/auth/register`       | Register a new customer      | ✅             |
| GET    | `/api/tickets`             | Fetch all tickets            | ✅             |
| POST   | `/api/tickets`             | Create a new ticket          | ✅             |
| PATCH  | `/api/tickets/:id`         | Update a ticket's status     | ✅             |
| PUT    | `/api/tickets/:id`         | Update a ticket's info       | ✅             |
| DELETE | `/api/tickets/:id`         | Delete a ticket              | ✅             |

---

## Custom Hooks

### `useTickets`
A custom hook to manage ticket-related data fetching and actions.

#### Functions Provided
1. **fetchTickets**: Fetches all tickets from the API.
2. **createTicket**: Creates a new ticket with subject and description.
3. **updateTicketStatus**: Updates the status of a ticket.
4. **deleteTicket**: Deletes a specific ticket.

---

## Screenshots

### Customer Dashboard
<img src="path/to/customer-dashboard-screenshot.png" alt="Customer Dashboard" width="600"/>

### Admin Dashboard
<img src="path/to/admin-dashboard-screenshot.png" alt="Admin Dashboard" width="600"/>

---

## Database Schema

### Users Table
| Column Name  | Type       | Description               |
|--------------|------------|---------------------------|
| `id`         | UUID       | Primary key               |
| `firstname`  | VARCHAR    | Customer's first name     |
| `lastname`   | VARCHAR    | Customer's last name      |
| `email`      | VARCHAR    | Email address (unique)    |
| `password`   | VARCHAR    | Hashed password           |
| `role`       | ENUM       | Either `Customer` or `Admin` |
| `createdAt`  | TIMESTAMP  | Creation timestamp        |

### Tickets Table
| Column Name  | Type       | Description               |
|--------------|------------|---------------------------|
| `id`         | UUID       | Primary key               |
| `subject`    | VARCHAR    | Ticket subject            |
| `description`| TEXT       | Detailed issue description|
| `status`     | ENUM       | Open/Resolved/Closed      |
| `userId`     | UUID       | Foreign key to Users table|
| `createdAt`  | TIMESTAMP  | Creation timestamp        |

---

## Future Enhancements
- Add pagination and filtering for tickets.
- Enhanced roles and permissions for better admin control.
- Improve performance with server-side rendering using Next.js.

---

## Contributors

- **Asad Anik** (Developer)

Feel free to contribute to the project by raising issues or making pull requests on [GitHub](https://github.com/your-username/ticket-management-system).

---

## License
This project is licensed under the MIT License.