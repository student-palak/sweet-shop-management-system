## My AI Usage

I used ChatGPT as an AI assistant during the development of this project to support my learning and productivity.

### How I used AI
- To understand the assessment requirements clearly
- To brainstorm and design REST API structures
- To generate initial test case templates while following Test-Driven Development (TDD)
- To debug issues related to Prisma, Jest, Supertest, and Express routing
- To validate my approach to clean code practices and Git commit structuring

## Features
- User authentication (JWT-based)
- View all available sweets
- Search sweets by name, category, price
- Purchase sweets (inventory decreases)
- Admin-style add/update/delete support
- Modern responsive UI using React

## How to Run Locally

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev


### How AI helped my workflow
AI helped me speed up development, identify issues early, and explore best practices.  
All core logic, architectural decisions, test validations, and final implementations were written, reviewed, and fully understood by me.

I treated AI strictly as a productivity and learning aid, not as a replacement for problem-solving or understanding the code.

## Database
This project uses Prisma ORM with a SQLite database.
The database schema is defined in `prisma/schema.prisma` and managed using Prisma migrations.

## Test Report
All backend test cases pass successfully using Jest and Supertest.

## 📸 Application Screenshots

### 🔐 Login Page
![Login](screenshots/login.png)

### 👤 User Dashboard
![User Dashboard](screenshots/user-dashboard.png)

### 🧑‍💼 Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### 🔍 Search & Filter Sweets
![Search](screenshots/search-sweets.png)

### ✏️ Admin Add / Edit Sweets
![Admin Edit](screenshots/admin-add-edit.png)
