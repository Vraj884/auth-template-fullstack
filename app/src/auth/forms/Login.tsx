import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../zustand/useAuthStore ";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [err, setErr] = useState<string | null>("");

  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuthStore();

  const Authenticate = async (e: any) => {
    e.preventDefault();
    setErr("Loading...");

    if (!password) {
      setErr("Password is required");
      return;
    }

    const payload: Payload = {
      email: email,
      password: password,
    };

    const res = await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      login();
      navigate("/");
    } else {
      const data = await res.json();
      setErr(data.error || "Login failed");
    }
  };

  return (
    <div className="w-full h-full bg-[#FBEAEB] flex justify-center items-center px-2">
      {/* ✅ Already Logged In Box */}
      {isLoggedIn ? (
        <div className="w-full md:w-[45%] lg:w-[35%] bg-[#2F3C7E] text-white px-6 py-10 rounded-2xl flex flex-col items-center gap-4">
          <h2 className="text-4xl font-bold font-mono text-center">
            Already Logged In
          </h2>
          <p className="text-lg font-semibold text-center">
            You're already logged in. No need to sign in again.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-[#FBEAEB] text-black font-bold text-lg rounded-md hover:bg-yellow-300 duration-500"
          >
            Go to Home
          </button>
        </div>
      ) : (
        // 🔐 Login Form
        <form
          onSubmit={Authenticate}
          className="w-full md:w-[45%] lg:w-[35%] bg-[#2F3C7E] py-6 px-6 text-gray-200 flex flex-col gap-4 rounded-2xl"
        >
          <h2 className="text-center text-4xl font-bold font-mono">Login</h2>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="EID" className="text-sm font-bold">
              Email Address<span className="text-[red]"> * </span>
            </label>
            <input
              type="email"
              id="EID"
              className="bg-[#FBEAEB] rounded-md text-black font-bold italic text-lg px-4 focus:bg-yellow-200"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="Pass" className="text-sm font-bold">
              Password<span className="text-[red]"> * </span>
            </label>
            <input
              type="password"
              id="Pass"
              className="bg-[#FBEAEB] rounded-md text-black font-bold italic text-lg px-4 focus:bg-yellow-200"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {err && (
            <p className="text-[red] text-center text-sm font-bold py-2">
              {err} ⚠️
            </p>
          )}

          {/* Submit */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-[#FBEAEB] text-black font-bold text-lg rounded-md hover:bg-yellow-300 duration-500"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

interface Payload {
  email: string;
  password: string;
}
