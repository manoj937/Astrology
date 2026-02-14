# Astrology Project - Shared Hosting Deployment Guide

## Project Structure

```
Astrology/
├── Backend/          ← Node.js Express server (API, email, payments)
├── src/              ← Angular 21 frontend source
├── dist/Astrology/browser/  ← Production build output (deploy this)
└── package.json      ← Angular frontend dependencies
```

---

## Part 1: Frontend Deployment (Angular)

### Step 1: Update Production API URL

Before building, update the production backend URL in:

**File:** `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://predicthoroscope.com'  // Your domain where backend runs
};
```

> **Important:** If frontend and backend are on the same domain, set `apiUrl` to just `''` (empty string) and configure backend paths via `.htaccess` proxy rules.

### Step 2: Build for Production

```bash
npm run build
```

This creates the production bundle at: `dist/Astrology/browser/`

### Step 3: Upload to Shared Hosting

1. **Login to cPanel** → **File Manager**
2. Navigate to `public_html/` (or your website's root directory)
3. **Upload all contents** from `dist/Astrology/browser/`:
   - `index.html`
   - `main-*.js`
   - `styles-*.css`
   - `favicon.ico`
   - `assets/` folder (contains JSON data files + images)
   - `media/` folder (contains font files)

### Step 4: Create `.htaccess` for Angular Routing

Create `.htaccess` file in `public_html/`:

```apache
RewriteEngine On

# Don't rewrite files or directories that exist
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Redirect all other requests to index.html for Angular routing
RewriteRule ^ index.html [L]
```

> This ensures Angular routes like `/aboutus`, `/marriagematch`, `/success`, `/failure` work properly on page refresh.

---

## Part 2: Backend Deployment (Node.js)

### Step 1: Upload Backend Files

1. In cPanel **File Manager**, create a folder **outside** `public_html`:
   ```
   /home/your-username/astrology-backend/
   ```
2. Upload these files from `Backend/`:
   - `email_app.js`
   - `mysql_conn.js`
   - `encryptor.js`
   - `package.json`

### Step 2: Install Backend Dependencies

In cPanel → **Terminal** (or via SSH):

```bash
cd ~/astrology-backend
npm install
```

### Step 3: Configure MySQL Database

1. In cPanel → **MySQL Databases**:
   - Create database: `nagoreto_darshini_astrology`
   - Create user: `nagoreto_astro_admin`
   - Add user to database with **ALL PRIVILEGES**

2. Import the schema via cPanel → **phpMyAdmin**:
   - Select the database
   - Go to **Import** tab
   - Upload `Backend/scripts/database.sql`

3. Update `mysql_conn.js` with your hosting's MySQL details:
   ```javascript
   pool = mysql.createPool({
       host: 'localhost',           // Usually 'localhost' on shared hosting
       user: 'your_cpanel_dbuser',  // e.g., 'nagoreto_astro_admin'
       password: 'your_password',
       database: 'your_cpanel_dbname',
       connectionLimit: 10,
       port: 3306
   });
   ```

### Step 4: Set Up Node.js App in cPanel

1. Go to cPanel → **Setup Node.js App**
2. Click **Create Application**:
   - **Node.js version:** 18.x or higher
   - **Application mode:** Production
   - **Application root:** `astrology-backend`
   - **Application URL:** `predicthoroscope.com` (or a subdomain like `api.predicthoroscope.com`)
   - **Application startup file:** `email_app.js`
3. Click **Create**
4. Click **Run NPM Install**
5. Click **Start App**

### Step 5: Configure Backend Port

On shared hosting, cPanel assigns a port automatically via `process.env.PORT`. The backend already handles this:

```javascript
const port = process.env.PORT || 49153;
```

No changes needed.

---

## Part 3: Connecting Frontend to Backend

### Option A: Same Domain (Recommended)

If both frontend and backend share the same domain (e.g., `predicthoroscope.com`):

**`src/environments/environment.prod.ts`:**
```typescript
export const environment = {
  production: true,
  apiUrl: ''  // Empty string = same origin
};
```

Then add proxy rules in `.htaccess` to route `/pay`, `/callback`, etc. to the Node.js backend:

```apache
RewriteEngine On

# Proxy API requests to Node.js backend
RewriteRule ^pay(.*)$ http://127.0.0.1:YOUR_NODE_PORT/pay$1 [P,L]
RewriteRule ^callback(.*)$ http://127.0.0.1:YOUR_NODE_PORT/callback$1 [P,L]
RewriteRule ^marriage_match_callback(.*)$ http://127.0.0.1:YOUR_NODE_PORT/marriage_match_callback$1 [P,L]
RewriteRule ^test$ http://127.0.0.1:YOUR_NODE_PORT/test [P,L]

# Angular routes (must be AFTER API rules)
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^ index.html [L]
```

> Replace `YOUR_NODE_PORT` with the port shown in cPanel's Node.js App setup.

### Option B: Subdomain

1. Create a subdomain: `api.predicthoroscope.com`
2. Point the Node.js app to that subdomain in cPanel
3. Set environment:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.predicthoroscope.com'
};
```

---

## Part 4: Update Callback URLs in Backend

In `Backend/email_app.js`, update the redirect URLs to match your domain:

```javascript
// Line ~115: After horoscope payment success
return res.redirect("https://predicthoroscope.com/success");

// Line ~118: After horoscope payment failure
return res.redirect("https://predicthoroscope.com/failure");

// Line ~127: Payment failed
return res.redirect("https://predicthoroscope.com/failure");

// Line ~149: After marriage match payment success
return res.redirect("https://predicthoroscope.com/success");

// Line ~152: After marriage match payment failure
return res.redirect("https://predicthoroscope.com/failure");

// Line ~161: Marriage match payment failed
return res.redirect("https://predicthoroscope.com/failure");
```

These are already set to `predicthoroscope.com` — update only if your domain changes.

---

## Quick Reference

| Component | Local URL | Production URL |
|-----------|-----------|----------------|
| Frontend | `http://localhost:4200` | `https://predicthoroscope.com` |
| Backend API | `http://localhost:49153` | Same domain or `https://api.predicthoroscope.com` |
| MySQL | `63.141.243.98:3306` | `localhost:3306` (on shared hosting) |
| Email SMTP | `server190.iseencloud.com:465` | Same (no change needed) |

---

## Checklist Before Going Live

- [ ] Update `environment.prod.ts` with production API URL
- [ ] Run `npm run build` to generate fresh production bundle
- [ ] Upload `dist/Astrology/browser/` contents to `public_html/`
- [ ] Create `.htaccess` with Angular routing + API proxy rules
- [ ] Upload `Backend/` files to separate directory
- [ ] Run `npm install` in backend directory
- [ ] Create MySQL database and import `database.sql`
- [ ] Update `mysql_conn.js` with hosting DB credentials
- [ ] Set up Node.js app in cPanel
- [ ] Test `/test` endpoint to verify backend is running
- [ ] Test payment flow end-to-end
