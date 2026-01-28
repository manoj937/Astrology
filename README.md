# Astrology Project

This is a comprehensive Astrology application consisting of an Angular 8 Frontend and a Node.js/Express Backend.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Recommended version 10.x or 12.x (due to Angular 8 and older dependencies).
*   **Angular CLI**: Install globally via `npm install -g @angular/cli@8.x`.
*   **MySQL**: A running MySQL server instance.

## Project Structure

*   `src/`: Angular Frontend source code.
*   `Backend/`: Node.js Backend source code.
*   `docs/`: Documentation.

## Local Development Setup

### 1. Database Setup

1.  Create a MySQL database (e.g., `darshini_astrology`).
2.  Import the project schema from `Backend/scripts/database.sql`.
3.  Update the database connection settings in `Backend/mysql_conn.js`.
    > **Note**: For security, it is best practice to use environment variables instead of hardcoding credentials.

### 2. Backend Setup

The backend runs on Node.js and handles emails and payment processing.

```bash
cd Backend
npm install
node email_app.js
```
The server will start on port `49153`.

### 3. Frontend Setup

The frontend is an Angular 8 application.

```bash
# From the root directory
npm install
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deployment

For detailed instructions on deploying this project to a cPanel environment, please read the [cPanel Deployment Guide](docs/CPANEL_DEPLOYMENT.md).
