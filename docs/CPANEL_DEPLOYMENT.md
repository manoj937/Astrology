# cPanel Deployment Guide for Astrology Project

This guide provides step-by-step instructions for deploying the Astrology project (Angular Frontend + Node.js Backend) to a cPanel shared hosting environment.

## Prerequisites

*   **cPanel Access**: You must have access to a cPanel account.
*   **Domain/Subdomain**: A domain or subdomain configured in cPanel (e.g., `astrology.yourdomain.com`).
*   **Node.js Support**: Your cPanel hosting must support Node.js apps (via "Setup Node.js App" icon).
*   **Database**: Access to "MySQL Databases" in cPanel.

---

## Part 1: Database Setup

1.  **Log in to cPanel**.
2.  Go to **Databases** > **MySQL Databases**.
3.  **Create a New Database**:
    *   Enter a name (e.g., `astrodharsan_astrology`).
    *   Click **Create Database**.
4.  **Create a User**:
    *   Scroll down to "MySQL Users".
    *   Enter a username (e.g., `astrodharsan_admin`).
    *   Enter a strong password. **Important:** Note this password down.
    *   Click **Create User**.
5.  **Add User to Database**:
    *   Scroll down to "Add User to Database".
    *   Select the database and user you just created.
    *   Click **Add**.
    *   Check **ALL PRIVILEGES** and click **Make Changes**.
6.  **Import Schema**:
    *   Go to cPanel home > **Databases** > **phpMyAdmin**.
    *   Select your new database from the left sidebar.
    *   Click the **Import** tab.
    *   Upload the SQL file located at `Backend/scripts/database.sql`.
    *   Click **Go**.

---

## Part 2: Backend Deployment (Node.js)

The backend is located in the `Backend` folder.

### 1. Upload Backend Files
1.  Go to cPanel > **Files** > **File Manager**.
2.  Create a folder for your backend (e.g., `astrology-backend` in your home directory, **outside** `public_html` for security).
3.  Upload the contents of your local `Backend` folder to this directory.
    *   Upload `email_app.js`, `mysql_conn.js`, `encryptor.js`, and `package.json`.
    *   **Do not** upload `node_modules`.

### 2. Configure Database Connection & Secrets
> [!WARNING]
> **Security Notice**: Your current code has hardcoded database credentials. It is highly recommended to use environment variables.

**Option A: Quick Fix (Not Recommended for Production)**
1.  Edit `mysql_conn.js` in File Manager.
2.  Update `host`, `user`, `password`, and `database` with your cPanel database details.
    *   `host`: \`23.94.181.5\`
    *   `user`: \`astrodharsan_admin\`
    *   `database`: \`astrodharsan_astrology\`

**Option B: Environment Variables (Secure)**
1.  Modify your code to use `process.env.DB_USER`, `process.env.DB_PASS`, etc.
2.  Set these variables in the "Setup Node.js App" interface (see next step).
    *   *Note*: This requires code changes which are outside the scope of this deployment guide, but highly recommended.

### 3. Setup Node.js App
1.  Go to cPanel > **Software** > **Setup Node.js App**.
2.  Click **Create Application**.
3.  **Node.js Version**: Select a compatible version (e.g., 10.x or 12.x, or newer if your code supports it).
4.  **Application Mode**: `Production`.
5.  **Application Root**: Enter the path to your uploaded folder (e.g., `astrology-backend`).
6.  **Application URL**: Select your domain/subdomain.
    *   *Note*: If you want the backend on a sub-path like `/api`, you might need to configure `.htaccess` or run it on a separate subdomain like `api.yourdomain.com`. Running on the same domain as the frontend usually requires reverse proxy setup via `.htaccess`.
    *   **Simpler Approach**: Run backend on a subdomain (e.g., `api.astrology.com`) and frontend on the main domain (e.g., `astrology.com`).
7.  **Application Startup File**: `email_app.js`.
8.  Click **Create**.
9.  After creation, click **Run NPM Install** to install dependencies defined in `package.json`.
10. Click **Start App**.

---

## Part 3: Frontend Deployment (Angular)

The frontend is an Angular 8 application.

### 1. Build for Production
On your local machine, run:
```bash
ng build --prod
```
This will create a `dist/astrology` folder with the compiled files.

### 2. Update API URL
Before building, ensure your Angular service calls point to your live backend URL (e.g., `https://api.yourdomain.com`), not `localhost:49153`. You may need to update `src/environments/environment.prod.ts` and use it in your services.

### 3. Upload Frontend Files
1.  Go to cPanel > **File Manager**.
2.  Navigate to the `public_html` folder (or the document root of your domain).
3.  Upload **all files** from inside the local `dist/astrology` folder to this directory.
    *   You should see `index.html`, `main...,js`, `polyfills...,js`, etc.

### 4. Configure CLIENT-SIDE Routing
Angular is a Single Page Application (SPA). If users refresh a page like `/home`, they might get a 404 error because the server looks for a `home` folder. You need to redirect all requests to `index.html`.

1.  Create a file named `.htaccess` in your frontend directory (`public_html`).
2.  Add the following code:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Troubleshooting

*   **Backend Error**: Check the `stderr.log` file in your backend directory for Node.js errors.
*   **Database Connection Failed**: Double-check your database username, password, and privileges in cPanel. Ensure `localhost` is used as the host.
*   **White Screen on Frontend**: Open Browser Console (F12). If you see 404 errors for `.js` files, check `base href` in `index.html`. It should usually be `<base href="/">`.
