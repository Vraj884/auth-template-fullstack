# 🔐 React Pre-Authentication Template

A minimal and elegant authentication-ready frontend built with **React**, **TypeScript**, **Zustand**, and **Tailwind CSS**, featuring login, register, and protected home routes. Auth tokens are managed via **cookies** and validated via `check` and `refresh` routes from a backend server.

---

## ✨ Features

- 🔁 Auto-auth check using refresh token on app load
- 🧠 Global auth state with Zustand
- ✅ Login / Register / Logout flows
- 🔒 Protected home screen
- 🧼 Type-safe with TypeScript
- 🎨 Clean and responsive UI using Tailwind CSS
- 🍪 Cookie-based JWT session handling

---

## 📁 Folder Structure

```
src/
│
├── auth/
│   └── forms/
│       ├── Login.tsx
│       └── Register.tsx
│
├── components/
│   └── Home.tsx
│
├── zustand/
│   └── useAuthStore.ts
│
├── App.tsx
└── main.tsx (or index.tsx)
```

---

## ⚙️ Tech Stack

- **React 18**
- **TypeScript**
- **Zustand** (for state management)
- **Tailwind CSS** (for styling)
- **React Router DOM**
- **Fetch API with `credentials: 'include'`**
- Backend expected at: `http://localhost:7000`

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/react-auth-template.git
cd react-auth-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Make sure your backend is running on `http://localhost:7000` and exposes the following endpoints:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/check`
- `POST /api/auth/refresh`

---

## ⚠️ Notice

🔒 **Important:**  
This template provides basic form handling and validation **only for demonstration**.  
**You must implement your own password rules, hashing, and secure validation on the backend.**  
Never store plain-text passwords or use weak validation in production.

---

## 🔐 Authentication Flow

1. On app load:
   - `check` endpoint verifies `refreshToken` via cookies.
   - If valid, logs in user and calls `refresh` to get new access token.
2. On Login / Register:
   - Backend returns cookies.
   - Zustand updates `isLoggedIn` state.
3. On Logout:
   - Calls backend to invalidate cookie and resets auth state.

---

## 🖼️ Screenshots

### 🧾 Login
![Login](public/Signup.png)

### 📝 Register
![Register](public/Register.png)

### 🏠 Home (Authenticated)
![Home](public/Profile.png)

---

## 📌 Notes

- `useAuthStore.ts` provides `isLoggedIn`, `login()`, and `logoutx()` functions.
- All protected logic is inside the `Home.tsx` component.
- Tailwind colors:  
  - Background: `#FBEAEB`  
  - Button/Box: `#2F3C7E`

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss.

---

## 📄 License

[MIT](LICENSE)

---

## 📬 Contact

Made with ❤️ by [Vraj Patel](https://github.com/your-username)
