# 🛡️ Auth Backend API (Express + MongoDB)

This is a secure authentication backend using **Express**, **JWT**, **MongoDB**, and **cookies**. It provides a robust system with access/refresh token handling, bcrypt password hashing, cookie-based session storage, and secure API routes.

---

## ✨ Features

- 🔐 JWT-based access and refresh tokens
- 🍪 Secure HTTP-only cookie storage
- 🔁 Token refresh endpoint
- 🔍 Auth middleware (`authcheck.js`)
- 🧼 Password hashing with bcrypt
- 🧾 MongoDB user schema with validation
- 📦 Clean and modular route/controller/middleware structure

---

## 📁 Folder Structure

```
backend/
│
├── controllers/
│   ├── check.js
│   ├── loginUser.js
│   ├── logout.js
│   ├── refreshToken.js
│   └── signupUser.js
│
├── middleware/
│   └── authcheck.js
│
├── models/
│   └── userSchema.js
│
├── routes/
│   └── auth.js
│
├── db.connect.js
├── index.js
└── .env
```

---

## ⚙️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **cookie-parser** for secure cookies
- **CORS** for frontend/backend communication

---

## 📦 Environment Variables (`.env`)

Create a `.env` file at the root of your backend project and add:

```
PORT=7000
URI=mongodb://localhost:27017/authDB
JWTKEY=your-access-token-secret
REFRESH_KEY=your-refresh-token-secret
NODE_ENV=development
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB (if running locally)

```bash
mongod
```

### 3. Run the Server

```bash
npm run dev
```

Your API will run at: `http://localhost:7000`  
Make sure your frontend runs on `http://localhost:5173`

---

## 📬 API Endpoints

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/api/auth/signup` | Register a new user          |
| POST   | `/api/auth/login`  | Login user and set cookies   |
| POST   | `/api/auth/logout` | Clear access/refresh cookies |
| POST   | `/api/auth/check`  | Validate refresh token       |
| POST   | `/api/auth/refresh`| Refresh access token         |

---

## 🔐 Middleware: `authcheck.js`

This file exports `verifyAccessToken(req, res, next)`, which:

- Reads the `accessToken` from cookies
- Verifies its validity using `JWTKEY`
- If valid: attaches `email` to `req` and calls `next()`
- If invalid: returns 401 Unauthorized

This can be used on protected routes like:

```js
import { verifyAccessToken } from "./middleware/authcheck.js";

app.get("/api/protected", verifyAccessToken, (req, res) => {
  res.json({ email: req.email });
});
```

---

## 🔐 Authentication Flow

1. **Signup/Login**:
   - Server verifies credentials
   - Sends `accessToken` (15 min) + `refreshToken` (7 days) via cookies

2. **Middleware**:
   - `verifyAccessToken()` protects private routes using cookies

3. **Token Refresh**:
   - `/check` validates `refreshToken`
   - `/refresh` issues new `accessToken`

4. **Logout**:
   - Clears both tokens from browser

---

## ⚠️ Security Notice

🛑 **Important:**  
Always replace the `.env` secrets (`JWTKEY`, `REFRESH_KEY`) with strong, unique values.  
All passwords are securely hashed with **bcrypt**, but remember to use **HTTPS** and deploy with secure cookies (`secure: true` in production).

---

## 🤝 Contributing

Pull requests and feedback are welcome. Please open an issue to discuss major changes.

---

## 📄 License

[MIT](LICENSE)

---

## 📬 Contact

Made with ❤️ by [Vraj patel](https://github.com/your-username)
