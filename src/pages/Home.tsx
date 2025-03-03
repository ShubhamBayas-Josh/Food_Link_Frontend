import Navbar from "../shared/Navbar";

//Images
import DonationBanner from "../assets/DonationBanner.jpg";
import Banner1 from "../assets/Banner1.png";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/Banner3.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-50">
        <div className="w-full">
          {/* Hero Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="mx-auto max-w-2xl mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                An innovative approach to helping people emerge from the cycle
                of poverty.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                The Food for People Story
              </p>
              <Link
                to="/Login"
                className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-base font-medium text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Donate Now
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                No Payments required
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-2xl mx-auto max-w-5xl">
              <img
                className="w-full h-auto object-cover"
                src={DonationBanner}
                alt="Donation Banner"
              />
            </div>
          </div>

          {/* How It Works Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-4xl font-bold text-gray-900 mb-16">
                How It Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Card 1 */}
                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <img
                    className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
                    src={Banner1}
                    alt="Food is Donated"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Food is Donated
                    </h3>
                    <p className="text-lg text-yellow-400 font-medium">
                      Restaurants, cafeterias, hotels, and grocery stores post
                      excess food within minutes on Meal Link.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <img
                    className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
                    src={Banner2}
                    alt="Food is Secured"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Food is Secured
                    </h3>
                    <p className="text-lg text-green-400 font-medium">
                      Pre-vetted charities get notified instantly and claim
                      donations to serve the hungry.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <img
                    className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
                    src={Banner3}
                    alt="Food is Picked Up"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Food is Picked Up
                    </h3>
                    <p className="text-lg text-red-400 font-medium">
                      The charity or volunteers collect the food and distribute
                      it to those in need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Food Facts Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center mb-16">
                <span className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase shadow-lg mb-6 transform transition-transform duration-300 hover:scale-105">
                  Food Facts
                </span>
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
                  A Solvable Problem
                </h2>
                <p className="text-center text-gray-600 max-w-3xl text-lg">
                  Service organizations want access to excess food, but there are
                  barriers — locating the excess food, establishing their
                  credentials, and efficiently deploying resources to transport
                  food.{" "}
                  <span className="text-green-500 font-semibold">
                    Waste No Food
                  </span>{" "}
                  breaks down these barriers.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Card 1 */}
                <div className="group bg-white border-2 border-green-400 p-8 rounded-xl text-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="text-6xl mb-6 transition-transform duration-300 group-hover:rotate-12 mx-auto">
                    🍏
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Raw Food
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-bold text-green-500 text-xl">40%</span> of all
                    food is wasted. In India alone, over{" "}
                    <span className="font-bold text-green-500">
                      100 billion pounds
                    </span>{" "}
                    go to waste.
                  </p>
                  <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
                </div>

                {/* Card 2 */}
                <div className="group bg-white border-2 border-blue-400 p-8 rounded-xl text-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="text-6xl mb-6 transition-transform duration-300 group-hover:rotate-12 mx-auto">
                    🥪
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Prepared Food
                  </h3>
                  <p className="text-gray-600">
                    Over{" "}
                    <span className="font-bold text-blue-500 text-xl">
                      5 billion pounds
                    </span>{" "}
                    of prepared food is discarded in India daily.
                  </p>
                  <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
                </div>

                {/* Card 3 */}
                <div className="group bg-white border-2 border-red-400 p-8 rounded-xl text-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="text-6xl mb-6 transition-transform duration-300 group-hover:rotate-12 mx-auto">
                    🍽️
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Hunger
                  </h3>
                  <p className="text-gray-600">
                    If just <span className="font-bold text-red-500 text-xl">1/3</span>{" "}
                    of India's excess food were redirected, hunger could be
                    significantly reduced.
                  </p>
                  <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  What Clients Are Saying
                </h2>
                <div className="flex justify-center items-center">
                  <span className="inline-block h-1 w-32 rounded-full bg-blue-500"></span>
                  <span className="mx-2 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
                  <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-2xl p-10 shadow-lg relative">
                  <svg className="absolute text-blue-500 w-16 h-16 -top-8 -left-8 opacity-25" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  
                  <p className="text-xl text-gray-600 mb-8 text-center italic">
                    This is one of the most significant benefits of giving food
                    to the poor. In a world where millions of people struggle to
                    secure their next meal, food donation drives provide a
                    much-needed lifeline to people in need.
                  </p>

                  <div className="flex flex-col items-center">
                    <img
                      className="h-16 w-16 rounded-full object-cover ring-4 ring-blue-100"
                      src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      alt="Mia Brown Portrait"
                    />
                    <div className="mt-4 text-center">
                      <h3 className="font-bold text-xl text-gray-900">
                        Mia Brown
                      </h3>
                      <p className="text-blue-600">
                        Marketer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <h2 className="text-4xl font-bold mb-8">
                    Get in Touch
                  </h2>
                  <p className="text-xl mb-12 text-blue-100">
                    Ask us everything and we would love to hear from you
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-4 text-blue-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-lg">Remote</span>
                    </div>

                    <div className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-4 text-blue-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-lg">(91) 0000000000</span>
                    </div>

                    <div className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-4 text-blue-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-lg">acb@example.com</span>
                    </div>
                  </div>

                  <div className="mt-12">
                    <h3 className="text-xl font-semibold text-blue-200 mb-4">Follow us</h3>
                    <div className="flex space-x-4">
                      <a
                        className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors duration-300"
                        href="#"
                        aria-label="Twitter"
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a
                        className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors duration-300"
                        href="#"
                        aria-label="LinkedIn"
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a
                        className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors duration-300"
                        href="#"
                        aria-label="Facebook"
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a
                        className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors duration-300"
                        href="#"
                        aria-label="Instagram"
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        Contact Form
                      </h3>
                      <form>
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                          />
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            placeholder="johndoe@example.com"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                          />
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                            Message
                          </label>
                          <textarea
                            id="message"
                            // rows="6"
                            placeholder="Your message here..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                          Get in Touch
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;