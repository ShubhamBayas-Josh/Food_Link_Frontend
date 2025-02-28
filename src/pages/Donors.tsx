import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  Globe,
  Clock,
  TrendingUp,
  DollarSign,
  Pizza,
} from "lucide-react";

import Banner1 from "../assets/Banner1.png";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/Banner3.png";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";

const Donors = () => {
  // Form state variables
  const [showForm, setShowForm] = useState(false);
  const [donationType, setDonationType] = useState("money");
  const [donationAmount, setDonationAmount] = useState(50);
  const [donationCategory, setDonationCategory] = useState("education");
  const [isRecurring, setIsRecurring] = useState(false);
  
  // Food donation specific variables
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [transactionType, setTransactionType] = useState("pickup");
  const [status, setStatus] = useState("pending");
  const [expirationDate, setExpirationDate] = useState("");

  // Preset donation amounts
  const presetAmounts = [10, 25, 50, 100, 250];

  // Animation variants
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    let donationData;
    
    if (donationType === "food") {
      donationData = {
        food_type: foodType,
        quantity,
        description,
        address,
        transaction_type: transactionType,
        status,
        expiration_date: expirationDate,
      };
    } else {
      donationData = {
        type: donationType,
        amount: donationAmount,
        category: donationCategory,
        is_recurring: isRecurring,
      };
    }
    
    console.log("Donation Data:", donationData);
    // Send donationData to your backend API
    
    // Reset form and close modal
    setShowForm(false);
  };

  return (
    <>
      <div className="fixed w-full z-10">
        <Navbar />
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col pt-16">
        <div className="fixed left-0 top-0 h-screen z-10">
          <Sidebar />
        </div>

        <div className="ml-16 w-full px-4 md:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-10 rounded-xl shadow-xl w-full mb-8 overflow-hidden relative mt-4"
          >
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 -mr-20 -mt-20"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-300 rounded-full opacity-20 -ml-10 -mb-10"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />

            <div className="max-w-6xl mx-auto text-center">
              <motion.h1 variants={itemVariants} className="text-4xl font-bold">
                Make a Difference Today!
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-3 text-lg max-w-3xl mx-auto"
              >
                Your donations help NGOs support those in need. Join us in
                creating positive change and building a better future together.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300"
                  onClick={() => setShowForm(true)}
                >
                  Donate Now <Heart className="inline ml-2" size={18} />
                </motion.button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-6 flex justify-center space-x-4"
              >
                <span className="bg-blue-500 bg-opacity-40 rounded-full py-2 px-4 text-sm font-medium">
                  20K+ Donors
                </span>
                <span className="bg-blue-500 bg-opacity-40 rounded-full py-2 px-4 text-sm font-medium">
                  100+ NGOs
                </span>
                <span className="bg-blue-500 bg-opacity-40 rounded-full py-2 px-4 text-sm font-medium">
                  50+ Countries
                </span>
              </motion.div>
            </div>
          </motion.section>

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
            className="bg-white rounded-xl shadow-lg p-8 w-full mb-8"
          >
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
                    Donations and distributions can be seen transparently
                    through our real-time dashboard.
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
                    The simplest and quickest way to make a donation and see
                    your impact immediately.
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

          {/* Impact Stats */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 w-full mb-8 text-white"
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-center mb-8"
              >
                Our Impact So Far
              </motion.h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <motion.div
                  variants={itemVariants}
                  className="bg-white bg-opacity-20 p-4 rounded-lg"
                >
                  <h3 className="text-3xl font-bold">12,500+</h3>
                  <p>Meals Delivered</p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white bg-opacity-20 p-4 rounded-lg"
                >
                  <h3 className="text-3xl font-bold">$250K+</h3>
                  <p>Funds Raised</p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white bg-opacity-20 p-4 rounded-lg"
                >
                  <h3 className="text-3xl font-bold">45+</h3>
                  <p>Partner NGOs</p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-white bg-opacity-20 p-4 rounded-lg"
                >
                  <h3 className="text-3xl font-bold">20+</h3>
                  <p>Cities Served</p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Donation CTA Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-white rounded-xl shadow-lg p-8 w-full mb-8 text-center"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Your contribution, no matter how small, can change someone's
                  life. Join thousands of donors in creating positive impact.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
                  onClick={() => setShowForm(true)}
                >
                  Make a Donation
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        </div>

        {/* Donation Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-white rounded-full p-1 z-10"
                  onClick={() => setShowForm(false)}
                >
                  <X size={20} />
                </button>

                {/* Form Content */}
                <motion.div variants={fadeIn} className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Make Your Donation
                  </h2>

                  {/* Donation Type Selector */}
                  <div className="mb-6">
                    <div className="flex space-x-4 mb-4">
                      
                      <button
                        type="button"
                        onClick={() => setDonationType("food")}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                          donationType === "food"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Pizza size={18} className="inline mr-1" />
                        Food
                      </button>
                    </div>
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    {donationType === "money" ? (
                      <>
                        {/* Money Donation Form */}
                        <div>
                          <label className="font-medium text-gray-700 block mb-2">
                            Amount
                          </label>
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            {presetAmounts.map((amount) => (
                              <button
                                key={amount}
                                type="button"
                                onClick={() => setDonationAmount(amount)}
                                className={`py-2 rounded-lg text-center ${
                                  donationAmount === amount
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                ${amount}
                              </button>
                            ))}
                          </div>
                          <input
                            type="number"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg mt-2"
                          />
                        </div>

                        <div>
                          <label className="font-medium text-gray-700 block mb-2">
                            Category
                          </label>
                          <select
                            value={donationCategory}
                            onChange={(e) => setDonationCategory(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="education">Education</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="environment">Environment</option>
                            <option value="disaster">Disaster Relief</option>
                            <option value="animal">Animal Welfare</option>
                          </select>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="recurring"
                            checked={isRecurring}
                            onChange={(e) => setIsRecurring(e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="recurring" className="text-gray-700">
                            Make this a monthly donation
                          </label>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Food Donation Form */}
                        <div>
                          <label className="font-medium text-gray-700 block mb-2">
                            Food Type
                          </label>
                          <input
                            type="text"
                            value={foodType}
                            onChange={(e) => setFoodType(e.target.value)}
                            placeholder="Enter food type (e.g., fruits, vegetables)"
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>

                        <div>
                          <label className="font-medium text-gray-700 block mb-2">
                            Quantity in Kilogram (kg)
                          </label>
                          <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            placeholder="Enter quantity"
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>

                        <div>
                          <label className="font-medium text-gray-700 block mb-2">
                            Description
                          </label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a brief description of the donation"
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>

                        <div>
                          <label className="font-medium text-gray-700 block mb-2">
                            Address
                          </label>
                          <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>

                        <div>
                          <label className="font-medium text-gray-700 block mb-2">
                            Transaction Type
                          </label>
                          <select
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="pickup">Pickup</option>
                            <option value="delivery">Delivery</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-medium text-gray-700 block mb-2">
                            Status
                          </label>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-medium text-gray-700 block mb-2">
                            Expiration Date
                          </label>
                          <input
                            type="date"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                      type="submit"
                    >
                      <Heart size={18} />
                      Submit Donation
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Donors;