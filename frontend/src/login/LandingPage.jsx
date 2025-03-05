import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar Component

const LandingPage = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/user"); // Navigate to the user route when clicking Shop Now
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section (Added padding to prevent overlap with fixed navbar) */}
      <section className="flex flex-col items-center justify-center text-center mt-24 px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Your Trusted Online Medicine Store
        </h2>
        <p className="text-gray-600 max-w-2xl">
          Get high-quality medicines delivered to your doorstep. Fast, safe, and reliable.
        </p>
        <button
          onClick={handleShopNowClick}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Shop Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
