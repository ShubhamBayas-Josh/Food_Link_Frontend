import React, { useState, useEffect } from "react";
import Banner from "../assets/Banner1.png";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";

// Define types for our donation items
interface DonationItem {
  id: number;
  title: string;
  description: string;
  quantity: string;
  expiresIn: string;
  address: string;
  contact: string;
  category: string;
}

const Ngos: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DonationItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredItems, setFilteredItems] = useState<DonationItem[]>([]);

  // Sample items with more detailed information
  const items: DonationItem[] = [
    { 
      id: 1, 
      title: "Paneer", 
      description: "Fresh paneer donation from local dairy farm. High in protein and essential nutrients.", 
      quantity: "25 kg",
      expiresIn: "3 days",
      address: "123 Food Street, Mumbai",
      contact: "+91 98765 43210",
      category: "Dairy"
    },
    { 
      id: 2, 
      title: "Rice", 
      description: "Premium basmati rice donation. Perfect for feeding large groups.", 
      quantity: "50 kg",
      expiresIn: "30 days",
      address: "456 Grain Avenue, Delhi",
      contact: "+91 87654 32109",
      category: "Grains"
    },
    { 
      id: 3, 
      title: "Pizza", 
      description: "Freshly baked vegetarian pizzas. Ready to serve.", 
      quantity: "20 boxes",
      expiresIn: "1 day",
      address: "789 Baker Street, Bangalore",
      contact: "+91 76543 21098",
      category: "Ready-to-eat"
    },
    { 
      id: 4, 
      title: "Fresh Vegetables", 
      description: "Assorted seasonal vegetables from organic farms. Includes carrots, tomatoes, and greens.", 
      quantity: "35 kg",
      expiresIn: "4 days",
      address: "101 Farmer's Lane, Chennai",
      contact: "+91 65432 10987",
      category: "Produce"
    },
    { 
      id: 5, 
      title: "Bread", 
      description: "Whole wheat bread loaves. Fresh and nutritious.", 
      quantity: "40 loaves",
      expiresIn: "2 days",
      address: "202 Bakery Road, Hyderabad",
      contact: "+91 54321 09876",
      category: "Bakery"
    },
    { 
      id: 6, 
      title: "Fruits", 
      description: "Seasonal fruits including apples, bananas, and oranges.", 
      quantity: "30 kg",
      expiresIn: "5 days",
      address: "303 Orchard Lane, Pune",
      contact: "+91 43210 98765",
      category: "Produce"
    }
  ];

  // Get unique categories for filter
  const categories = ["All", ...new Set(items.map(item => item.category))];

  // Handle search and filtering
  useEffect(() => {
    let result = items;
    
    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter(item => item.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredItems(result);
  }, [searchTerm, activeCategory]);

  // Initialize filtered items
  useEffect(() => {
    setFilteredItems(items);
  }, []);

  const openModal = (item: DonationItem): void => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  // Function to determine urgency badge color
  const getExpiryBadgeColor = (days: string): string => {
    const daysNum = parseInt(days);
    if (daysNum <= 1) return "bg-red-600";
    if (daysNum <= 3) return "bg-yellow-600";
    return "bg-green-600";
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <div className="fixed w-full z-10">
        <Navbar />
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col pt-16">
        <div className="fixed left-0 top-0 h-screen z-10">
          <Sidebar />
        </div>
      
      <div className="pt-24 px-6 md:px-16 pb-10">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Available Donations</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Browse through available food donations and claim what your organization needs to support the community</p>
        </div>
        
        {/* Search & Filter Section */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Search by name, category, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredItems.length}</span> {filteredItems.length === 1 ? 'donation' : 'donations'}
              {activeCategory !== "All" && <span> in <span className="font-semibold">{activeCategory}</span></span>}
              {searchTerm && <span> matching "<span className="font-semibold">{searchTerm}</span>"</span>}
            </p>
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white">
                <option>Expiring Soon</option>
                <option>Recently Added</option>
                <option>Quantity</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Donations Grid */}
        {filteredItems.length === 0 ? (
          <div className="max-w-6xl mx-auto py-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-medium text-gray-700">No donations found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
            <button 
              onClick={() => {setSearchTerm(""); setActiveCategory("All");}}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => openModal(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={Banner}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                    Available
                  </div>
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1 m-2 rounded-lg text-sm font-medium">
                    {item.category}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                      <span>{item.quantity}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`${getExpiryBadgeColor(item.expiresIn.split(" ")[0])} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center`}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Expires in {item.expiresIn}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-200 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Details
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition duration-200 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Donation Details Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full animate-fade-in">
            <div className="relative">
              <img 
                src={Banner} 
                alt={selectedItem.title} 
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute top-0 left-0 m-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg text-sm font-medium">
                {selectedItem.category}
              </div>
              <button 
                onClick={closeModal}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                <span className={`${getExpiryBadgeColor(selectedItem.expiresIn.split(" ")[0])} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center`}>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Expires in {selectedItem.expiresIn}
                </span>
              </div>
              
              <p className="mt-4 text-gray-700 leading-relaxed">{selectedItem.description}</p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                    <p className="mt-1 text-lg font-semibold">{selectedItem.quantity}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Expiry</h3>
                    <p className="mt-1 text-lg font-semibold">{selectedItem.expiresIn}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Donor Address</h3>
                    <p className="mt-1 text-lg font-semibold">{selectedItem.address}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                    <p className="mt-1 text-lg font-semibold">{selectedItem.contact}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Request More Info
                </button>
                <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Claim This Donation
                </button>
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Important Note</h3>
                    <p className="mt-1 text-sm text-blue-700">Once claimed, you'll need to arrange pickup within 24 hours. Bring proper identification and containers for food transportation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Pagination Component - Add if needed */}
      <div className="max-w-6xl mx-auto mt-8 flex justify-center pb-10" >
        <nav className="flex items-center gap-1">
          <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button className="px-4 py-2 rounded-md border border-blue-600 bg-blue-600 text-white">1</button>
          <button className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">2</button>
          <button className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">3</button>
          <button className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </nav>
      </div>
    </div>
    </div>
    </>
  );
};

export default Ngos;