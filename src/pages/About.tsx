import { FaHandsHelping, FaHeart, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import UserLogo from "../assets/UserLogo.jpg";
import AboutBanner from "../assets/AboutBanner.jpg";
import Footer from "../shared/footer";

const About = () => {
  return (
    <>
      <div className="fixed w-full z-10 ">
        <Navbar />
      </div>
      <div className="bg-gray-50 text-gray-800 py-16 px-6  ">
        {/* Hero Section */}
        <motion.div
          className="max-w-6xl mx-auto text-center p-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-green-600">About Us</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Helping Hands is a non-profit initiative dedicated to reducing food
            waste and feeding the hungry.
          </p>
        </motion.div>

        {/* Mission Section */}
        <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={AboutBanner}
            alt="Food Donation"
            className="rounded-xl shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-semibold text-green-700">
              Our Mission
            </h2>
            <p className="text-gray-600">
              We aim to bridge the gap between food surplus and those in need by
              connecting donors with local food banks.
            </p>
            <div className="flex mt-6 space-x-4">
              <FaHandsHelping color="green" size={40} />
              <FaHeart color="red" size={40} />
              <FaLeaf color="yellow" size={40} />
            </div>
          </motion.div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-6xl mx-auto mt-20 text-center">
          <h2 className="text-3xl font-semibold text-green-700">
            How It Works
          </h2>
          <p className="mt-4 text-gray-600">
            Our process is simple and efficient:
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {["Donate Food", "Connect with NGOs", "Feed the Needy"].map(
              (title, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-green-600">
                    {index + 1}. {title}
                  </h3>
                  <p className="mt-2 text-gray-600">
                    {index === 0 &&
                      "Restaurants, supermarkets, and individuals can donate excess food."}
                    {index === 1 &&
                      "We partner with trusted NGOs to distribute food efficiently."}
                    {index === 2 &&
                      "Ensuring food reaches people who need it the most."}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto mt-20 text-center">
          <h2 className="text-3xl font-semibold text-green-700">
            Meet Our Team
          </h2>
          <p className="mt-4 text-gray-600">
            Passionate individuals driving our mission forward.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {["John Doe", "Jane Smith", "Mike Johnson"].map((name, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <img
                  src={UserLogo}
                  alt="Team Member"
                  className="rounded-full w-32 h-32 mx-auto"
                />
                <h3 className="mt-4 text-lg font-semibold">{name}</h3>
                <p className="text-gray-500">
                  {index === 0 && "Founder & CEO"}
                  {index === 1 && "Operations Head"}
                  {index === 2 && "Volunteer Coordinator"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default About;
