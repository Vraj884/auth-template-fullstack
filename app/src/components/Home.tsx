import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand/useAuthStore ";

const Home = () => {
  const { isLoggedIn, logoutx } = useAuthStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        logoutx();
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FBEAEB] px-4">
      <div className="bg-[#2F3C7E] text-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold">
          {isLoggedIn ? "Welcome!" : "Not Logged In"}
        </h1>

        <p className="text-lg">
          {isLoggedIn
            ? "You are authenticated and can access protected content."
            : "Please log in or register to access this application."}
        </p>

        <div className="flex justify-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="px-6 py-2 bg-[#FBEAEB] text-black text-lg font-semibold rounded-md hover:bg-yellow-300 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 bg-[#FBEAEB] text-black text-lg font-semibold rounded-md hover:bg-yellow-300 transition duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 bg-[#FBEAEB] text-black text-lg font-semibold rounded-md hover:bg-yellow-300 transition duration-300"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
