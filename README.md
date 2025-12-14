# Sweet Shop Management System

A full-stack Sweet Shop Management System that allows users to browse and purchase sweets, and admins to manage inventory with add, edit, delete, restock, and search functionality.

This project is built as part of a technical assessment with a strong focus on:
- Clean code
- REST API design
- Test-Driven Development (TDD)
- Role-based access (Admin / User)

## Features

### User Features
- User login using JWT authentication
- View all available sweets
- Search sweets by name, category, and price range
- Purchase sweets (disabled if out of stock)

### Admin Features
- Admin login (role-based access)
- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock sweets
- Admin-only controls hidden from normal users

### Security
- Role-based UI rendering (Admin vs User)
- Token-based authentication using JWT

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite
- JWT Authentication
- Jest & Supertest (Testing)

### Frontend
- React (Vite)
- Axios
- CSS

### Tools
- Git & GitHub
- VS Code


## Screenshots

### Login Page
![Login](screenshots/login.png)

### User Dashboard
![User Dashboard](screenshots/user-dashboard.png)

### Search Sweets
![Search Sweets](screenshots/search-sweets.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### Admin Add / Edit Sweet
![Admin Add Edit](screenshots/admin-add-edit.png)

### test report
![test-report](screenshot/test-report.png)

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Sweets
- POST /api/sweets (Admin)
- GET /api/sweets
- GET /api/sweets/search
- PUT /api/sweets/:id (Admin)
- DELETE /api/sweets/:id (Admin)

### Inventory
- POST /api/sweets/:id/purchase
- POST /api/sweets/:id/restock (Admin)


## Setup & Run Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Clone Repository
```bash
git clone https://github.com/student-palak/sweet-shop-management-system.git
cd sweet-shop-management-system


cd backend
npm install
npx prisma migrate dev
npm run dev

http://localhost:3000

cd frontend
npm install
npm run dev
http://localhost:5173


---

## 📌 6️⃣ Running Tests (TEST REPORT)

This is **mandatory** and you already have passing tests 🎉

```md
## Running Tests

All backend APIs are tested using Jest and Supertest.

### Run Tests
```bash
cd backend
npm test


---

## 📌 7️⃣ My AI Usage (MANDATORY – YOU DID THIS RIGHT)

You already have this, but **final polished version** 👇  
Replace your current section with this if you want it stronger:

```md
## My AI Usage

I used ChatGPT as an AI assistant during development to:

- Clarify assessment requirements
- Design REST API structure
- Generate initial test case templates following TDD
- Debug issues related to Prisma, Jest, and Supertest
- Validate REST API best practices

### How AI Helped My Workflow
AI helped speed up development and catch errors early.  
All core logic, architectural decisions, test validations, and final implementations were written, reviewed, and fully understood by me.

I used AI as a productivity and learning aid — not as a replacement for problem-solving.

