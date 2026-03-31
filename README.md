# 📦 Mini Inventory — Full Stack Project

**Tech Stack:** Spring Boot (Java) + React (JavaScript) + PostgreSQL

---

## 📁 Project Structure

```
mini-inventory/
├── inventory-backend/     ← Spring Boot project (open in STS)
└── inventory-frontend/    ← React project (open in VS Code)
```

---

## 🖥️ How to Run Locally (on your PC)

### STEP 1 — Set up PostgreSQL locally

1. Open **pgAdmin** or **psql**
2. Create a new database:
   ```sql
   CREATE DATABASE inventory_db;
   ```
3. That's it! Spring Boot will create the tables automatically.

---

### STEP 2 — Run the Backend (Spring Boot in STS)

1. Open **STS (Spring Tool Suite)**
2. Go to `File → Import → Existing Maven Projects`
3. Browse to the `inventory-backend` folder → Click Finish
4. Wait for Maven to download dependencies (first time takes a few minutes)
5. Open `src/main/resources/application.properties`
6. Set your local PostgreSQL username and password:
   ```properties
   spring.datasource.username=${DB_USER:YOUR_USERNAME_HERE}
   spring.datasource.password=${DB_PASSWORD:YOUR_PASSWORD_HERE}
   ```
   *(Default is `postgres` / `postgres` — change if yours is different)*
7. Right-click the project → `Run As → Spring Boot App`
8. You should see: `Tomcat started on port(s): 8080`

**Test it:** Open browser → `http://localhost:8080/api/products` → should return `[]`

---

### STEP 3 — Run the Frontend (React in VS Code)

1. Open **VS Code**
2. `File → Open Folder` → select the `inventory-frontend` folder
3. Open the Terminal (`Ctrl + backtick`)
4. Run:
   ```bash
   npm install
   npm start
   ```
5. Browser opens at `http://localhost:3000` → your app is running!

---

## 🔁 How the App Works (Big Picture)

```
You (Browser)          React Frontend          Spring Boot Backend       PostgreSQL
     │                 localhost:3000           localhost:8080            inventory_db
     │                      │                        │                        │
     │── opens app ────────>│                        │                        │
     │                      │── GET /api/products ──>│                        │
     │                      │                        │── SELECT * products ──>│
     │                      │                        │<── rows ───────────────│
     │<── shows table ──────│<── JSON data ──────────│                        │
```

---

## 🌐 Deploy on Render (Free Live URL)

You will deploy **two services** on Render + **one database**.

### STEP 1 — Push code to GitHub

1. Create a GitHub account if you don't have one
2. Create a new repository (e.g. `mini-inventory`)
3. Push your entire project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/mini-inventory.git
   git push -u origin main
   ```

---

### STEP 2 — Create PostgreSQL on Render

1. Go to [render.com](https://render.com) → Sign up free
2. Click **New → PostgreSQL**
3. Name: `inventory-db`
4. Plan: **Free**
5. Click **Create Database**
6. Copy the **Internal Database URL** (you'll need it next)

---

### STEP 3 — Deploy the Backend

1. Click **New → Web Service**
2. Connect your GitHub repo
3. Settings:
   - **Root Directory:** `inventory-backend`
   - **Runtime:** `Java`
   - **Build Command:** `./mvnw clean install -DskipTests`
   - **Start Command:** `java -jar target/inventory-backend-0.0.1-SNAPSHOT.jar`
4. Under **Environment Variables**, add:
   ```
   DB_HOST       = (from your Render PostgreSQL → Hostname)
   DB_PORT       = 5432
   DB_NAME       = (from your Render PostgreSQL → Database name)
   DB_USER       = (from your Render PostgreSQL → Username)
   DB_PASSWORD   = (from your Render PostgreSQL → Password)
   ```
5. Click **Create Web Service**
6. Wait ~3 minutes → you get a URL like: `https://inventory-backend-xxxx.onrender.com`

---

### STEP 4 — Deploy the Frontend

1. Click **New → Static Site**
2. Connect your GitHub repo
3. Settings:
   - **Root Directory:** `inventory-frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Under **Environment Variables**, add:
   ```
   REACT_APP_API_URL = https://inventory-backend-xxxx.onrender.com
   ```
   *(Use your actual backend URL from Step 3)*
5. Click **Create Static Site**
6. Wait ~2 minutes → your app is LIVE! 🎉

---

## 📡 API Endpoints (for testing with Postman)

| Method | URL                          | What it does              |
|--------|------------------------------|---------------------------|
| GET    | /api/products                | Get all products          |
| GET    | /api/products/{id}           | Get one product           |
| POST   | /api/products                | Add new product           |
| PUT    | /api/products/{id}           | Update product            |
| DELETE | /api/products/{id}           | Delete product            |
| GET    | /api/products/dashboard      | Dashboard summary         |

### Sample POST body (JSON):
```json
{
  "name": "Samsung TV 43 inch",
  "category": "Electronics",
  "quantity": 10,
  "price": 32999.00
}
```

---

## ✅ Features

- View all products in a table
- Add new products (name, category, quantity, price)
- Edit existing products
- Delete products (with confirmation)
- Dashboard with total products count
- Low stock alert (quantity ≤ 5) highlighted in red
- Fully deployed and accessible from any device

---

## 🛠️ Troubleshooting

| Problem | Fix |
|---|---|
| Backend won't start | Check DB credentials in application.properties |
| `npm install` fails | Make sure Node.js is installed (`node -v`) |
| Frontend shows blank | Check browser console (F12), check if backend is running |
| Can't connect frontend to backend | Make sure REACT_APP_API_URL is set correctly |
| Render deploy fails | Check build logs on Render dashboard |
