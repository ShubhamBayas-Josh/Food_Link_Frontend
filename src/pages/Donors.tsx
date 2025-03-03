import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jwtDecode } from "jwt-decode";
import Navbar from "../shared/Navbar";
import { motion } from "framer-motion";
import Footer from "../shared/footer";
import {
  TrendingUp,
  Clock,
  Gift,
  MapPin,
  Calendar,
  DollarSign,
  Globe,
} from "lucide-react";
import Banner1 from "../assets/Banner1.png";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/Banner3.png";

// Function to get user ID from JWT token
const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("⚠️ No token found, user may not be logged in.");
    return null;
  }

  try {
    const decoded: any = jwtDecode(token);
    if (!decoded.user_id) {
      console.warn("⚠️ Token does not contain user_id.");
      return null;
    }
    return decoded.user_id;
  } catch (error) {
    console.error(" Error decoding token:", error);
    return null;
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Define validation schema using Yup
const validationSchema = Yup.object({
  food_type: Yup.string().required("Food type is required"),
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  expiration_date: Yup.date()
    .nullable()
    .required("Expiration date is required"),
});

const Donors: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const userId = getUserIdFromToken(); // Get user ID dynamically

  const mutation = useMutation({
    mutationFn: async (newTransaction: any) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated. Please log in.");

      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/food_transactions",
        newTransaction,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      alert("Donation submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["food_transactions"] });
      setOpen(false);
    },
    onError: (error: any) => {
      console.error("Submission error:", error.response?.data || error.message);
      alert(
        `Failed to submit donation: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      food_type: "",
      quantity: "",
      description: "",
      address: "",
      expiration_date: new Date(),
    },
    validationSchema,
    onSubmit: (values) => {
      if (!userId) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const formattedDate = values.expiration_date.toISOString();
      const newTransaction = {
        user_id: userId,
        food_type: values.food_type,
        quantity: values.quantity,
        description: values.description,
        address: values.address,
        expiration_date: formattedDate,
        transaction_type: "offer",
        status: "pending",
      };

      mutation.mutate(newTransaction);
    },
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user && user.role) {
      setIsLoggedIn(true);
      setRole(user.role);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {isLoggedIn && role === "donor" ? (
        <main className="flex-1 p-6" >

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative py-16 mb-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-100 opacity-30 rounded-3xl"></div>
            <div className="relative z-10 max-w-5xl mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                Make a Difference Today
              </h1>
              <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
                Your food donation can change lives. Help us fight hunger and
                reduce food waste.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg transition-all flex items-center justify-center mx-auto gap-2"
                onClick={() => setOpen(true)}
              >
                <Gift size={20} />
                <span>Donate Food</span>
              </motion.button>
            </div>
          </motion.div>

        

          {/* How It Works Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-white rounded-xl shadow-lg p-8 w-full mb-8"
          >
            <div className="max-w-6xl mx-auto">
              <motion.h1
                variants={itemVariants}
                className="text-center text-3xl font-bold text-gray-800 mb-10"
              >
                How It Works
              </motion.h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 rounded-xl p-6 text-center transition-all hover:shadow-lg"
                >
                  <div className="mb-4 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <DollarSign className="text-blue-600" size={24} />
                  </div>
                  <img
                    className="h-48 w-full rounded-lg object-cover mb-4"
                    src={Banner1}
                    alt="Food Donation"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Food is Donated
                  </h2>
                  <p className="text-gray-600">
                    Restaurants, cafeterias, hotels, and grocery stores post
                    excess food in under a minute on Meal Link.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 rounded-xl p-6 text-center transition-all hover:shadow-lg"
                >
                  <div className="mb-4 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="text-blue-600" size={24} />
                  </div>
                  <img
                    className="h-48 w-full rounded-lg object-cover mb-4"
                    src={Banner2}
                    alt="Food Security"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Food is Secured
                  </h2>
                  <p className="text-gray-600">
                    Pre-vetted charities are immediately notified about food
                    donations and can claim any donations they can use.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 rounded-xl p-6 text-center transition-all hover:shadow-lg"
                >
                  <div className="mb-4 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="text-blue-600" size={24} />
                  </div>
                  <img
                    className="h-48 w-full rounded-lg object-cover mb-4"
                    src={Banner3}
                    alt="Food Pickup"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Food Is Picked Up
                  </h2>
                  <p className="text-gray-600">
                    The charity, or a network of volunteers, picks up the food
                    and serves it to hungry people.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

                {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="bg-white rounded-xl shadow-lg p-8 w-full mb-8">
        <div className="max-w-6xl mx-auto">
          <motion.p
            variants={itemVariants}
            className="font-medium text-blue-500 text-center uppercase mb-2"
          >
            Our Features
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="font-bold text-gray-900 text-3xl text-center mb-10"
          >
            We believe we can save more lives with you
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 text-center shadow transition-all"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                  <Globe size={24} />
                </div>
              </div>
              <h4 className="font-semibold text-xl text-gray-900 mb-4">
                Transparent
              </h4>
              <p className="text-gray-600 mb-6">
                Donations and distributions can be seen transparently through
                our real-time dashboard.
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 font-medium text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Learn more →
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 text-center shadow transition-all"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                  <TrendingUp size={24} />
                </div>
              </div>
              <h4 className="font-semibold text-xl text-gray-900 mb-4">
                Quick Fundraise
              </h4>
              <p className="text-gray-600 mb-6">
                The simplest and quickest way to make a donation and see your
                impact immediately.
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 font-medium text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Learn more →
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 text-center shadow transition-all"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                  <Clock size={24} />
                </div>
              </div>
              <h4 className="font-semibold text-xl text-gray-900 mb-4">
                Real Time
              </h4>
              <p className="text-gray-600 mb-6">
                Reports related to donations and distribution are updated in
                real-time for full transparency.
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 font-medium text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Learn more →
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>

          {/* Statistics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">2,500+</h3>
              <p className="text-gray-600">Meals Donated</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">150+</h3>
              <p className="text-gray-600">Active Donors</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">20+</h3>
              <p className="text-gray-600">Communities Served</p>
            </div>
          </motion.section>

          <div>
            <Footer/>
          </div>


          {/* Donation Modal */}
          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Donate Food
                </h2>
                <p className="text-gray-600 mb-6 border-b pb-4">
                  Fill in the details below to contribute to our mission against
                  hunger.
                </p>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Food Type
                    </label>
                    <div className="relative">
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        name="food_type"
                        placeholder="Enter name of food"
                        value={formik.values.food_type}
                        onChange={formik.handleChange}
                      />
                    </div>
                    {formik.touched.food_type && formik.errors.food_type && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.food_type}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Quantity (kg)
                    </label>
                    <div className="relative">
                      <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        type="number"
                        name="quantity"
                        placeholder="Enter quantity in kg"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                      />
                    </div>
                    {formik.touched.quantity && formik.errors.quantity && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.quantity}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      name="description"
                      placeholder="Provide details about the food"
                      rows={3}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.description}
                        </p>
                      )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>Pickup Address</span>
                      </div>
                    </label>
                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      name="address"
                      placeholder="Enter pickup location"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>Expiration Date</span>
                      </div>
                    </label>
                    <DatePicker
                      selected={formik.values.expiration_date}
                      onChange={(date) =>
                        formik.setFieldValue("expiration_date", date)
                      }
                      dateFormat="yyyy-MM-dd"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    {formik.touched.expiration_date &&
                      formik.errors.expiration_date && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.expiration_date as string}
                        </p>
                      )}
                  </div>

                  <div className="flex flex-col gap-3 pt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      {mutation.isPending ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Gift size={18} />
                          Submit Donation
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition-all"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </main>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Account Pending
            </h3>
            <p className="text-gray-600 mb-6">
              Your donor account is currently awaiting approval. You'll be able
              to make donations once approved.
            </p>
            <p className="text-sm text-gray-500">
              If you believe this is an error, please contact our support team.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donors;
