import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from './zustand/useAuthStore '; // ✅ removed trailing space

import Login from "./auth/forms/Login";
import Register from "./auth/forms/Register";
import Home from "./components/Home"; // Home or protected component

function App() {
  const { login, logoutx } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {


        // ✅ Step 1: Check if refreshToken is valid
        
        
        const checkRes = await fetch("http://localhost:7000/api/auth/check", {
          method: "POST",
          credentials: "include",
        });

        if (checkRes.status === 200) {
          login();
          console.log("✅ User is authenticated");


          // ✅ Step 2: Refresh access token
          
          
          const refreshRes = await fetch("http://localhost:7000/api/auth/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (refreshRes.ok) {
            console.log("✅ Access token refreshed");
          } else {
            console.warn("⚠️ Failed to refresh access token");
          }
        } else {
          logoutx();
          console.log("🚫 Not authenticated");
        }
      } catch (err:any) {
        logoutx();
        console.error("❌ Error during auth check:", err.message);
      }
    };

    initializeAuth();
  }, [login, logoutx]);

  return (
    <div className="w-screen h-screen flex bg-[#FBEAEB] transition-all">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
