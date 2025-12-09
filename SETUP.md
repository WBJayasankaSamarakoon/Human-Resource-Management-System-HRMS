# Human Resource Management System (HRMS) - Setup Guide

This document provides step-by-step instructions for setting up the HRMS project on your local development environment.

## Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Backend Setup (Laravel)](#backend-setup-laravel)
- [Frontend Setup (Angular)](#frontend-setup-angular)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

If you're experienced with Laravel and Angular, here's a quick reference for all setup commands:

### Backend Setup Commands

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Install NPM dependencies (for Vite)
npm install

# Create .env file from template (if .env.example exists)
copy .env.example .env

# Generate application key
php artisan key:generate

# Generate JWT secret
php artisan jwt:secret

# Run database migrations
php artisan migrate

# Start Laravel development server
php artisan serve
```

### Frontend Setup Commands

```bash
# Navigate to frontend directory
cd frontend

# Install NPM dependencies
npm install

# Start Angular development server
ng serve
```

### Complete Setup Sequence

```bash
# 1. Backend Setup
cd backend
composer install
npm install
copy .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate
php artisan serve

# 2. Frontend Setup (in a new terminal)
cd frontend
npm install
ng serve
```

**Note:** Keep backend and frontend servers running in separate terminal windows.

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **PHP** (version 8.2 or higher)
   - Download from: [https://www.php.net/downloads.php](https://www.php.net/downloads.php)
   - Verify installation: `php -v`

2. **Composer** (PHP Dependency Manager)
   - Download from: [https://getcomposer.org/download/](https://getcomposer.org/download/)
   - Verify installation: `composer --version`

3. **Node.js** (version 18.19+ or 20.9+)
   - Download from: [https://nodejs.org/](https://nodejs.org/)
   - Verify installation: `node -v`

4. **npm** (Node Package Manager - comes with Node.js)
   - Verify installation: `npm -v`

5. **Angular CLI** (globally)
   ```bash
   npm install -g @angular/cli
   ```
   - Verify installation: `ng version`

6. **Database** (MySQL/MariaDB recommended)
   - MySQL: [https://www.mysql.com/downloads/](https://www.mysql.com/downloads/)
   - Or MariaDB: [https://mariadb.org/download/](https://mariadb.org/download/)
   - Or SQLite (default, for quick setup)

---

## Project Structure

```
Human-Resource-Management-System-HRMS/
├── backend/          # Laravel API Backend
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── ...
├── frontend/         # Angular Frontend
│   ├── src/
│   ├── angular.json
│   └── ...
└── README.md
```

---

## Backend Setup (Laravel)

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install PHP Dependencies

```bash
composer install
```

This will install all Laravel framework dependencies and packages defined in `composer.json`.

**Note:** If you encounter memory issues, you can use:
```bash
COMPOSER_MEMORY_LIMIT=-1 composer install
```

### Step 3: Install NPM Dependencies (for Laravel Vite assets)

```bash
npm install
```

### Step 4: Environment Configuration

1. Create a `.env` file from the template (if `.env` doesn't exist):
   ```bash
   copy .env.example .env
   ```
   Or on Linux/Mac:
   ```bash
   cp .env.example .env
   ```

2. Generate application encryption key:
   ```bash
   php artisan key:generate
   ```

3. Generate JWT secret (for API authentication):
   ```bash
   php artisan jwt:secret
   ```

### Step 5: Database Setup

#### Option A: Using MySQL/MariaDB (Recommended for Production)

1. Create a new database in your MySQL/MariaDB:
   ```sql
   CREATE DATABASE hrms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Update your `.env` file with database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=hrms_db
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

#### Option B: Using SQLite (Quick Setup)

1. The default configuration uses SQLite. Ensure the database file exists:
   ```bash
   touch database/database.sqlite
   ```

2. Your `.env` should have:
   ```env
   DB_CONNECTION=sqlite
   DB_DATABASE=C:\Users\HP\Documents\GitHub\Human-Resource-Management-System-HRMS\backend\database\database.sqlite
   ```
   (Update the path according to your system)

### Step 6: Run Database Migrations

```bash
php artisan migrate
```

This will create all necessary database tables.

### Step 7: (Optional) Seed Database

If you have seeders configured:
```bash
php artisan db:seed
```

---

## Frontend Setup (Angular)

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

Or from the root directory:
```bash
cd ../frontend
```

### Step 2: Install NPM Dependencies

```bash
npm install
```

This will install all Angular dependencies and packages defined in `package.json`.

**Note:** This may take a few minutes depending on your internet connection.

### Step 3: Verify Angular Setup

Check that Angular CLI is installed correctly:
```bash
ng version
```

---

## Environment Configuration

### Backend `.env` File Configuration

The `.env` file in the `backend/` directory contains all environment variables. Create this file in the `backend/` directory. Here's a comprehensive template with all required settings (Lines 1-80+):

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:+AHx3Ae+1We+U+Y7DUvyq7jQVKfQLb1sUmhYoErulP0=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost:8000

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
APP_MAINTENANCE_STORE=database

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=testlaravel
DB_USERNAME=root
DB_PASSWORD=     # Add the password if needed

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

# MAIL_MAILER=smtp
# MAIL_HOST=smtp.gmail.com
# MAIL_PORT=587
# MAIL_USERNAME=buddhika@ultimate.lk
# MAIL_PASSWORD=Ultimate@1234
# MAIL_ENCRYPTION=tls
# MAIL_FROM_ADDRESS=buddhika@ultimate.lk
# MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

JWT_SECRET=336oPKPdLahib1T0dabSLnT0wOFm7S891j2huuO3uIjZ0xOs6JikBgZMLyW5UgrE

JWT_ALGO=HS256

```

### Important Environment Variables to Configure:

1. **APP_KEY** (Line 4) - **REQUIRED**: Run `php artisan key:generate` to set this automatically. This encrypts application data.

2. **JWT_SECRET** (Line 69) - **REQUIRED**: Run `php artisan jwt:secret` to set this automatically. Used for API token authentication.

3. **Database Configuration** (Lines 23-36) - **REQUIRED**: 
   - Update `DB_DATABASE` with your database name
   - Update `DB_USERNAME` with your database username
   - Update `DB_PASSWORD` with your database password
   - Or configure SQLite as an alternative

4. **Mail Configuration** (Lines 54-62) - **OPTIONAL**: 
   - Update `MAIL_HOST`, `MAIL_USERNAME`, `MAIL_PASSWORD` if you need email functionality
   - Default uses `mail.ultimate.lk` - change to your mail server

5. **APP_URL** (Line 6) - **IMPORTANT**: Should match your backend server URL (default: `http://localhost:8000`)

6. **SANCTUM_STATEFUL_DOMAINS** (Line 87) - **IMPORTANT**: Add your frontend URL (default: `localhost:4200`) for CORS configuration

### Creating the .env File:

1. **Copy from example** (if available):
   ```bash
   cd backend
   copy .env.example .env
   ```
   Or on Linux/Mac:
   ```bash
   cp .env.example .env
   ```

2. **Generate required keys**:
   ```bash
   php artisan key:generate
   php artisan jwt:secret
   ```

3. **Update database credentials** in the `.env` file with your actual database information.

4. **Save the file** - The `.env` file should be in the `backend/` directory.

---

## Running the Application

### Backend Server (Laravel)

Open a terminal/command prompt and navigate to the `backend` directory:

```bash
cd backend
php artisan serve
```

The backend API will be available at: **http://localhost:8000**

**Note:** Keep this terminal window open while developing.

### Frontend Server (Angular)

Open a **new** terminal/command prompt and navigate to the `frontend` directory:

```bash
cd frontend
ng serve
```

Or using npm:
```bash
npm start
```

The frontend application will be available at: **http://localhost:4200**

The browser should open automatically. If not, navigate to the URL manually.

**Note:** Keep this terminal window open while developing.

### Running Both Servers Together

You can also use the Laravel dev script that runs both backend and frontend:

From the `backend` directory:
```bash
composer run dev
```

This will start:
- Laravel server (http://localhost:8000)
- Queue worker
- Laravel Pail (logs)
- Vite dev server

---

## Complete Setup Checklist

- [ ] PHP 8.2+ installed and verified
- [ ] Composer installed and verified
- [ ] Node.js 18.19+ or 20.9+ installed and verified
- [ ] Angular CLI installed globally
- [ ] Database created (MySQL/SQLite)
- [ ] Backend dependencies installed (`composer install`)
- [ ] Backend NPM dependencies installed (`npm install` in backend/)
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] `.env` file created and configured
- [ ] Application key generated (`php artisan key:generate`)
- [ ] JWT secret generated (`php artisan jwt:secret`)
- [ ] Database migrations run (`php artisan migrate`)
- [ ] Backend server running (`php artisan serve`)
- [ ] Frontend server running (`ng serve`)

---

## Common Commands Reference

### Backend (Laravel) Commands

```bash
# Install dependencies
composer install
npm install

# Generate application key
php artisan key:generate

# Generate JWT secret
php artisan jwt:secret

# Run migrations
php artisan migrate

# Run migrations with rollback
php artisan migrate:rollback

# Seed database
php artisan db:seed

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Start development server
php artisan serve

# Start with specific port
php artisan serve --port=8000

# Run all development services
composer run dev
```

### Frontend (Angular) Commands

```bash
# Install dependencies
npm install

# Start development server
ng serve
# or
npm start

# Build for production
ng build

# Run tests
ng test

# Lint code
ng lint
```

---

## Troubleshooting

### Issue: Composer memory limit error

**Solution:**
```bash
COMPOSER_MEMORY_LIMIT=-1 composer install
```

### Issue: Permission denied errors (Linux/Mac)

**Solution:**
```bash
# Make storage and cache directories writable
chmod -R 775 storage bootstrap/cache
```

### Issue: Database connection failed

**Solutions:**
- Verify database credentials in `.env` file
- Ensure database server is running
- Check if database exists
- Verify `DB_CONNECTION` matches your database type (mysql/sqlite)

### Issue: Port already in use

**Solutions:**
- For Laravel: `php artisan serve --port=8001` (or any available port)
- For Angular: `ng serve --port 4201` (or any available port)
- Or stop the process using the port

### Issue: JWT authentication not working

**Solution:**
- Ensure you've run `php artisan jwt:secret`
- Clear config cache: `php artisan config:clear`
- Verify `JWT_SECRET` is set in `.env`

### Issue: CORS errors when connecting frontend to backend

**Solution:**
- Update `SANCTUM_STATEFUL_DOMAINS` in backend `.env` to include your frontend URL
- Check `config/cors.php` for allowed origins
- Ensure backend URL in frontend API service matches backend `APP_URL`

### Issue: npm install fails

**Solutions:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Try using `npm install --legacy-peer-deps`

### Issue: Angular CLI not found

**Solution:**
```bash
npm install -g @angular/cli
```

---

## Development Tips

1. **Use Two Terminal Windows**: Keep backend and frontend servers running in separate terminals for easier debugging.

2. **Hot Reload**: Both Laravel and Angular support hot reload. Changes to code will automatically refresh the browser.

3. **API Endpoints**: Backend API endpoints are typically available at `http://localhost:8000/api/...`

4. **Database Tools**: Consider using tools like:
   - phpMyAdmin (for MySQL)
   - DB Browser for SQLite (for SQLite)
   - TablePlus (multi-database tool)

5. **Code Editor**: Recommended VS Code extensions:
   - Laravel Blade Snippets
   - Angular Language Service
   - PHP Intelephense
   - ESLint

---

## Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [Composer Documentation](https://getcomposer.org/doc/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

## Support

If you encounter issues not covered in this guide, please:
1. Check the troubleshooting section above
2. Review error logs in `backend/storage/logs/laravel.log`
3. Check browser console for frontend errors
4. Ensure all prerequisites are installed correctly

---

**Last Updated:** 2024
**Project:** Human Resource Management System (HRMS)

