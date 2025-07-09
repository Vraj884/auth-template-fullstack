import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../zustand/useAuthStore ";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [DOB, setDOB] = useState<Date | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [err, setErr] = useState<string | null>("");

  const { login, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const Authenticate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr("Loading...");

    if (confirmPassword !== password) {
      setErr("Confirm password must match password");
      return;
    }

    if (!DOB) {
      setErr("Please select Date of Birth");
      return;
    }

    const payload: Payload = {
      name,
      email,
      dob: DOB,
      password,
    };

    const res = await fetch("http://localhost:7000/api/auth/signup", {
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
      setErr(data.error || "Registration failed");
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
            You are already logged in. You don’t need to register again.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-[#FBEAEB] text-black font-bold text-lg rounded-md hover:bg-yellow-300 duration-500"
          >
            Go to Home
          </button>
        </div>
      ) : (
        // 📝 Registration Form
        <form
          onSubmit={Authenticate}
          className="w-full mx-2 bg-[#2F3C7E] py-4 px-4 text-gray-200 flex flex-col gap-4 md:w-[45%] lg:w-[35%] rounded-2xl"
        >
          <h2 className="text-center text-4xl font-bold font-mono">Register</h2>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="Name" className="text-sm font-bold">
              Name<span className="text-[red]"> * </span>
            </label>
            <input
              type="text"
              id="Name"
              className="bg-[#FBEAEB] rounded-md text-black font-bold italic text-lg px-4 focus:bg-yellow-200"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          {/* DOB */}
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-sm font-bold">
              DOB<span className="text-[red]"> * </span>
            </label>
            <input
              type="date"
              id="date"
              className="bg-[#FBEAEB] rounded-md text-black font-bold italic text-lg px-4 focus:bg-yellow-200"
              onChange={(e) => setDOB(new Date(e.target.value))}
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

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="Confirm" className="text-sm font-bold">
              Confirm Password<span className="text-[red]"> * </span>
            </label>
            <input
              type="password"
              id="Confirm"
              className="bg-[#FBEAEB] rounded-md text-black font-bold italic text-lg px-4 focus:bg-yellow-200"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Error */}
          {err && (
            <p className="text-[red] text-center text-sm font-bold py-2">
              {err} ⚠️
            </p>
          )}

          {/* Submit Button */}
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
  name: string;
  email: string;
  dob: Date;
  password: string;
}
