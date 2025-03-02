import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useAuth } from "../pages/AuthContext"; // Import the useAuth hook

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    role: "donor",
    organizationType: "non-profit",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Use the login function from AuthContext
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validate form data
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call the signup API endpoint
      const response = await fetch("http://127.0.0.1:3000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          role: formData.role,
          organizationType: formData.organizationType, // ✅ Ensure correct key naming
        }),
      });
      
      const data = await response.json();
      console.log("Response:", data);
      

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Automatically log in the user after successful signup
      login({
        email: data.user.email,
        token: data.token,
        role: data.user.role,
        exp: data.exp, // Token expiration time
      });

      // Redirect to the dashboard or home page
      // navigate("/");
      if (data.user.role === "ngo") {
        navigate("/ngos");
      } else {
        navigate("/donors");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred during signup");
      }
    } finally {
      setLoading(false);
    }
  }; // <-- Closing brace for handleSubmit

  return (
    <>
      <div className="fixed w-full z-10">
        <Navbar />
      </div>
      <div className="flex h-screen">
        {/* Left Section */}
        <div className="hidden md:flex w-1/2 bg-gray-200 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="524.67004"
            height="531.39694"
            className="w-full"
            viewBox="0 0 524.67004 531.39694"
          >
            {/* SVG content remains the same */}
          </svg>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {/* Address Field */}
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Address"
                  required
                />
              </div>

              {/* Role Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="donor">Donor</option>
                  <option value="ngo">NGO</option>
                </select>
              </div>

              {/* Organization Type Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700">Organization Type</label>
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="non-profit">Non-Profit</option>
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </form>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}