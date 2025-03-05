import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoimg from "../assets/logoimg.png"; // Import Logo

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleDashboardClick = () => {
    const isAuthenticated = localStorage.getItem("adminToken");
    if (isAuthenticated) {
      navigate("/dashboard"); // If logged in, go to Dashboard
    } else {
      navigate("/login"); // Otherwise, go to Login
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <img src={logoimg} alt="Logo" className="w-14 h-14" /> {/* Adjust Size as Needed */}
        <h1 className="text-2xl font-bold text-blue-600">MediKart</h1>
      </div>

      <div className="space-x-6 flex items-center">
        {/* Common Links */}
        <a href="/" className="text-gray-700 hover:text-blue-600">
          Home
        </a>
        <a href="/about" className="text-gray-700 hover:text-blue-600">
          About
        </a>

        {/* Conditional Navigation Based on Route */}
        {location.pathname === "/" && (
          <button
            onClick={handleDashboardClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Admin Dashboard
          </button>
        )}

        {location.pathname === "/user" ? (
          <button
            onClick={() => navigate("/viewhistory")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            View History
          </button>
        ) : (
          <button
            onClick={() => navigate("/user")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            User
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
