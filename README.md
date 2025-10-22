# Engineered-Assets
A full-stack inventory system for engineering equipment, featuring role-based access, CRUD operations, real-time search, cart/order management, and responsive UI using Node.js, Express, PostgreSQL, jQuery, and Bootstrap.

# Engineering Equipment Inventory System

The Engineering Equipment Inventory System is a full-stack web application designed to manage engineering equipment across multiple domains, including mechanical workshops, pharmacies, hospitals, laboratories, construction sites, and medical supply units. The system supports role-based access control, dynamic inventory management, user orders, equipment ratings, and a responsive user interface.

This project was developed as part of a university software engineering course (Winter 2024) and fulfills the requirements of Milestone I (Backend & Database) and Milestone II (Frontend Integration).

## Features

### Authentication and Authorization
- Secure session-based login system.
- Role-based access: Admin (full CRUD + user management) and Standard User (view, order, rate).
- Session expiration handling with automatic redirection to login.

### Inventory Management (Admin Only)
- Add, edit, delete, and view equipment with associated images.
- Categorize equipment (e.g., Mechanical, Pharmacy, Hospital, Laboratory, Construction, Medical Supplies).
- Link equipment to suppliers with contact and address details.
- Track equipment status: Available, In Use, or Under Maintenance.

### User Functionality (Standard Users)
- Browse and search equipment by name, category, or status.
- Add items to cart and place orders.
- Submit ratings and comments for equipment.
- View personal order history and user profile.

### Frontend Experience
- Dynamic data loading without page refresh using jQuery and AJAX.
- Real-time search and filtering.
- Responsive layout compatible with desktops, tablets, and mobile devices.

## Technologies Used

### Backend
- Node.js
- Express.js
- Knex.js (query builder)
- PostgreSQL (relational database)

### Frontend
- HTML5
- CSS3
- Bootstrap 5
- jQuery
- Handlebars (.hjs templates)

### Development and Database Tools
- Visual Studio Code (code editor)
- PostgreSQL (database server)
- pgAdmin (PostgreSQL administration and query tool)

## Project Structure

```
├── connectors/          # Database connection (db.js) and SQL scripts
├── middleware/          # Authentication middleware (auth.js)
├── public/              # Static assets (images, vendor CSS/JS)
├── routes/              # API and view routes
│   ├── private/         # Admin-only routes
│   ├── public/          # Public and user routes
│   └── utils/           # Session utility functions
├── src/                 # Custom frontend JavaScript logic
├── views/               # Handlebars templates (.hjs)
├── server.js            # Main application entry point
├── scripts.sql          # Database schema creation
└── seed.sql             # Sample data for testing
```

## Setup Instructions

### Prerequisites
Install the following software before running the application:
- **Visual Studio Code** (or any code editor)
- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **pgAdmin** (optional but recommended for database management)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/engineering-inventory-system.git
cd engineering-inventory-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure the Database
- Ensure PostgreSQL is running locally.
- Create a database (e.g., `postgres`—or update `connectors/db.js` to match your database name).
- Execute the schema and seed files using pgAdmin or psql:
  ```sql
  \i connectors/scripts.sql
  \i connectors/seed.sql
  ```

> Note: The default admin account is:
> - Username: `adminUser`
> - Email: `admin@example.com`
> - Password: `123`  
> (For demonstration only—password hashing should be implemented in production.)

### 4. Start the Application
```bash
node server.js
```
Open your browser and navigate to:  
`http://localhost:3000`

## Testing
- Use **Postman** to test all RESTful API endpoints (`/api/v1/...`).
- Verify that:
  - Admins can manage equipment and users.
  - Standard users can view, order, and rate equipment.
  - Unauthenticated users are redirected to the login page.
- Confirm responsive behavior across different screen sizes and browsers.

## Security Notes
- Passwords in `seed.sql` are stored in plain text for simplicity during development.
- In a production environment, passwords must be hashed (e.g., using bcrypt).
- Session tokens are stored in the database with expiration timestamps for improved security.

## Documentation
This project satisfies the deliverables for:
- **Milestone I**: Backend and Database Setup (CRUD operations, PostgreSQL schema, RESTful APIs)
- **Milestone II**: Frontend Integration (jQuery, Bootstrap, authentication, cart/order system, responsive UI)

## License
This project is for academic and educational purposes only.
```

---

You can now copy this content into a file named `README.md` at the root of your GitHub repository. Remember to replace `your-username` in the clone URL with your actual GitHub username.

Let me know if you'd like a **LinkedIn post** next!
