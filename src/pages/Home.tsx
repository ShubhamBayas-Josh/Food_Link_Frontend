import Sidebar from "../shared/Sidebar";
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
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="h-screen flex bg-gray-200">
        <div className="fixed left-0 top-0 h-screen">
          <Sidebar />
        </div>
        <div className="w-screen ml-20">
          <div className="container mx-auto px-6 py-16 text-center">
            <div className="mx-auto max-w-lg">
              <h1 className="text-3xl font-bold text-gray-600  lg:text-4xl mt-5">
                An innovative approach to helping people emerge from the cycle
                of poverty.
              </h1>
              <p className="mt-8 p-4 text-gray-500 dark:text-black-350">
                The Food for People Story
              </p>
              <Link
                to="/Login"
                className="mt-6 p-4 rounded-lg bg-blue-600 px-6 py-2.5 text-center text-sm font-medium capitalize leading-5 text-white hover:bg-blue-500 focus:outline-none lg:mx-0 lg:w-auto"
              >
                Donate Now
              </Link>
              <p className="mt-3 p-2 text-sm text-gray-400">
                No Payments required
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <img
                className="h-96 w-full rounded-xl object-cover lg:w-4/5"
                src={DonationBanner}
              />
            </div>
          </div>
          <section className="bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6 py-10">
              <h1 className="text-center text-3xl font-bold capitalize text-gray-900 dark:text-white lg:text-4xl">
                How It Works
              </h1>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
                {/* Card 1 */}
                <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                  <img
                    className="h-96 w-full object-cover rounded-lg transition-transform duration-300 group-hover:brightness-75"
                    src={Banner1}
                    alt="Food is Donated"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h2 className="text-2xl font-semibold capitalize text-white">
                      Food is Donated
                    </h2>
                    <p className="mt-2 text-lg uppercase tracking-wider text-yellow-400">
                      Restaurants, cafeterias, hotels, and grocery stores post
                      excess food within minutes on Meal Link.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                  <img
                    className="h-96 w-full object-cover rounded-lg transition-transform duration-300 group-hover:brightness-75"
                    src={Banner2}
                    alt="Food is Secured"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h2 className="text-2xl font-semibold capitalize text-white">
                      Food is Secured
                    </h2>
                    <p className="mt-2 text-lg uppercase tracking-wider text-green-400">
                      Pre-vetted charities get notified instantly and claim
                      donations to serve the hungry.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                  <img
                    className="h-96 w-full object-cover rounded-lg transition-transform duration-300 group-hover:brightness-75"
                    src={Banner3}
                    alt="Food is Picked Up"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h2 className="text-2xl font-semibold capitalize text-white">
                      Food is Picked Up
                    </h2>
                    <p className="mt-2 text-lg uppercase tracking-wider text-red-400">
                      The charity or volunteers collect the food and distribute
                      it to those in need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-900">
            <div className="flex flex-col items-center py-10 bg-white dark:bg-gray-900">
              {/* Food Facts Tag */}
              <div className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold uppercase shadow-lg transition-transform duration-300 hover:scale-105">
                Food Facts
              </div>

              {/* Heading */}
              <h2 className="text-4xl font-bold text-center mt-4 text-gray-900 dark:text-white">
                A Solvable Problem
              </h2>

              {/* Description */}
              <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mt-4 px-6">
                Service organizations want access to excess food, but there are
                barriers — locating the excess food, establishing their
                credentials, and efficiently deploying resources to transport
                food.{" "}
                <span className="text-green-500 font-semibold">
                  Waste No Food
                </span>
                breaks down these barriers.
              </p>

              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl w-full px-6">
                {/* Card 1 */}
                <div className="group relative border border-green-400 p-6 rounded-lg text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-green-500 text-6xl mb-4 transition-transform duration-300 group-hover:rotate-12">
                    🍏
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Raw Food
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    <span className="font-bold text-green-500">40%</span> of all
                    food is wasted. In India alone, over{" "}
                    <span className="font-bold text-green-500">
                      100 billion pounds
                    </span>{" "}
                    go to waste.
                  </p>
                  <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
                </div>

                {/* Card 2 */}
                <div className="group relative border border-blue-400 p-6 rounded-lg text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-blue-500 text-6xl mb-4 transition-transform duration-300 group-hover:rotate-12">
                    🥪
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Prepared Food
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Over{" "}
                    <span className="font-bold text-blue-500">
                      5 billion pounds
                    </span>{" "}
                    of prepared food is discarded in India daily.
                  </p>
                  <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
                </div>

                {/* Card 3 */}
                <div className="group relative border border-red-400 p-6 rounded-lg text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-red-500 text-6xl mb-4 transition-transform duration-300 group-hover:rotate-12">
                    🍽️
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Hunger
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    If just <span className="font-bold text-red-500">1/3</span>{" "}
                    of India’s excess food were redirected, hunger could be
                    significantly reduced.
                  </p>
                  <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6 py-10">
              <h1 className="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">
                What clients saying
              </h1>

              <div className="mx-auto mt-6 flex justify-center">
                <span className="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
                <span className="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
                <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
              </div>

              <div className="mx-auto mt-16 flex max-w-6xl items-start">
                <button className="hidden rounded-full border p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-100 rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div>
                  <p className="flex items-center text-center text-gray-500 lg:mx-8">
                    This is one of the most significant benefits of giving food
                    to the poor. In a world where millions of people struggle to
                    secure their next meal, food donation drives provide a
                    much-needed lifeline to people in need.
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center">
                    <img
                      className="h-14 w-14 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      alt=""
                    />

                    <div className="mt-4 text-center">
                      <h1 className="font-semibold text-gray-800 dark:text-white">
                        Mia Brown
                      </h1>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Marketer
                      </span>
                    </div>
                  </div>
                </div>

                <button className="hidden rounded-full border p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-100 rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          <section className="min-h-screen bg-gradient-to-r from-blue-600 via-blue-800 to-blue-900 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900">
            <div className="container mx-auto flex min-h-screen flex-col px-6 py-12">
              <div className="flex-1 lg:-mx-6 lg:flex lg:items-center">
                <div className="text-white lg:mx-6 lg:w-1/2">
                  <h1 className="text-3xl font-semibold capitalize lg:text-5xl">
                    Get a quote
                  </h1>

                  <p className="mt-6 max-w-xl">
                    Ask us everything and we would love to hear from you
                  </p>

                  <div className="mt-6 space-y-8 md:mt-8">
                    <p className="-mx-2 flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-2 h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                      <span className="mx-2 w-72 truncate text-white">
                        {" "}
                        Remote
                      </span>
                    </p>

                    <p className="-mx-2 flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-2 h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>

                      <span className="mx-2 w-72 truncate text-white">
                        (91) 0000000000)
                      </span>
                    </p>

                    <p className="-mx-2 flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-2 h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>

                      <span className="mx-2 w-72 truncate text-white">
                        acb@example.com
                      </span>
                    </p>
                  </div>

                  <div className="mt-6 md:mt-8">
                    <h3 className="text-gray-300">Follow us</h3>

                    <div className="-mx-1.5 mt-4 flex">
                      <a
                        className="mx-1.5 transform text-white transition-colors duration-300 hover:text-blue-500"
                        href="#"
                      >
                        <svg
                          className="h-10 w-10 fill-current"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7468 6.84201C12.6822 7.24068 11.9848 8.21534 12.0002 9.33334V10C9.83683 10.0553 7.91016 9.07001 6.66683 7.33334C6.66683 7.33334 3.87883 12.2887 9.3335 14.6667C8.0855 15.498 6.84083 16.0587 5.3335 16C7.53883 17.202 9.94216 17.6153 12.0228 17.0113C14.4095 16.318 16.3708 14.5293 17.1235 11.85C17.348 11.0351 17.4595 10.1932 17.4548 9.34801C17.4535 9.18201 18.4615 7.50001 18.6668 6.67268V6.67334Z" />
                        </svg>
                      </a>

                      <a
                        className="mx-1.5 transform text-white transition-colors duration-300 hover:text-blue-500"
                        href="#"
                      >
                        <svg
                          className="h-8 w-8"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z"
                            fill="currentColor"
                          />
                          <path
                            d="M7.2 9.6001H4V19.2001H7.2V9.6001Z"
                            fill="currentColor"
                          />
                          <path
                            d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>

                      <a
                        className="mx-1.5 transform text-white transition-colors duration-300 hover:text-blue-500"
                        href="#"
                      >
                        <svg
                          className="h-8 w-8"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 10.2222V13.7778H9.66667V20H13.2222V13.7778H15.8889L16.7778 10.2222H13.2222V8.44444C13.2222 8.2087 13.3159 7.9826 13.4826 7.81591C13.6493 7.64921 13.8754 7.55556 14.1111 7.55556H16.7778V4H14.1111C12.9324 4 11.8019 4.46825 10.9684 5.30175C10.1349 6.13524 9.66667 7.2657 9.66667 8.44444V10.2222H7Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>

                      <a
                        className="mx-1.5 transform text-white transition-colors duration-300 hover:text-blue-500"
                        href="#"
                      >
                        <svg
                          className="h-8 w-8"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C18.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 lg:mx-6 lg:w-1/2">
                  <div className="mx-auto w-full overflow-hidden rounded-xl bg-white px-8 py-10 shadow-2xl dark:bg-gray-900 lg:max-w-xl">
                    <h1 className="text-2xl font-medium text-gray-700 dark:text-gray-200">
                      Contact form
                    </h1>

                    <form className="mt-6">
                      <div className="flex-1">
                        <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        />
                      </div>

                      <div className="mt-6 flex-1">
                        <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                          Email address
                        </label>
                        <input
                          type="email"
                          placeholder="johndoe@example.com"
                          className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        />
                      </div>

                      <div className="mt-6 w-full">
                        <label className="mb-2 block text-sm text-gray-600 dark:text-gray-200">
                          Message
                        </label>
                        <textarea
                          className="mt-2 block h-32 w-full rounded-md border border-gray-200 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 md:h-48"
                          placeholder="Message"
                        ></textarea>
                      </div>

                      <button className="mt-6 w-full transform rounded-md bg-blue-600 px-6 py-3 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                        get in touch
                      </button>
                    </form>
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
