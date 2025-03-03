import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode"; 
import Navbar from "../shared/Navbar";
import Footer from "../shared/footer";

interface CustomJwtPayload extends JwtPayload {
  user_id: string;
}

interface Donation {
  id: string | number;
  food_type: string;
  quantity: number;
  status: string;
  created_at: string;
  user_id: string;
}


const fetchUserData = async (userId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`http://127.0.0.1:3000/api/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const fetchUserDonations = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get(`http://127.0.0.1:3000/api/v1/food_transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const DonorProfile = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'donations'>('profile');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        console.log("Decoded token:", decoded); 
        if (decoded.user_id) {
          setUserId(decoded.user_id);
        } else {
          console.error("User ID not found in token");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const { data: userData, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserData(userId as string),
    enabled: Boolean(userId),
  });

  const { data: donations, isLoading: donationsLoading, error: donationsError } = useQuery({
    queryKey: ["donations"],
    queryFn: fetchUserDonations,
  });

  // Manually filter donations for the logged-in user
  const userDonations = donations?.filter((donation: Donation) => donation.user_id === userId);

  // Status badge color mapping
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'collected': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to safely get donation ID for display
  const formatDonationId = (id: string | number) => {
    if (typeof id === 'string' && id.length > 4) {
      return id.slice(-4);
    } else if (typeof id === 'number') {
      return id.toString().padStart(4, '0');
    } else {
      return id;
    }
  };

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-center text-gray-800">Please log in to view your profile</h2>
          <p className="mt-2 text-center text-gray-600">You need to be logged in to access your donor profile information.</p>
        </div>
      </div>
    );
  }

  if (userLoading || donationsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-700">Loading data...</p>
        </div>
      </div>
    );
  }

  if (userError || donationsError) {
    return (
      <div className="p-6 mx-auto mt-10 bg-red-50 rounded-lg shadow-md max-w-4xl">
        <div className="flex items-center mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="ml-2 text-lg font-semibold text-red-800">Error Loading Data</h2>
        </div>
        <p className="text-red-700">{userError?.message || donationsError?.message}</p>
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-50 ">
              <Navbar />
    
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 flex items-center justify-center text-white text-2xl font-bold">
                    {userData?.name?.charAt(0) || "D"}
                  </div>
                </div>
                <div className="ml-4 text-white">
                  <h1 className="text-2xl font-bold">{userData?.name}</h1>
                  <p className="text-blue-100">{userData?.email}</p>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 py-2 px-4 rounded-lg text-white">
                <span className="font-medium">{userData?.role || "Donor"}</span>
                <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-white text-indigo-700">
                  {userData?.is_approved ? "Verified" : "Pending"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="px-6 border-b">
            <div className="flex space-x-6">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-2 font-medium transition-colors duration-200 ${
                  activeTab === 'profile' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                Profile Details
              </button>
              <button 
                onClick={() => setActiveTab('donations')}
                className={`py-4 px-2 font-medium transition-colors duration-200 ${
                  activeTab === 'donations' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                Donation History
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        {activeTab === 'profile' ? (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Donor Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                <p className="text-gray-800 font-medium">{userData?.name}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                <p className="text-gray-800 font-medium">{userData?.email}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Role</h3>
                <p className="text-gray-800 font-medium">{userData?.role}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Organization Type</h3>
                <p className="text-gray-800 font-medium">{userData?.organization_type || "Individual"}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                <p className="text-gray-800 font-medium">{userData?.address}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Approval Status</h3>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    userData?.is_approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {userData?.is_approved ? "Approved ✅" : "Pending ❌"}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Joined On</h3>
                <p className="text-gray-800 font-medium">
                  {new Date(userData?.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Donations</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                Total: {userDonations?.length || 0} donations
              </span>
            </div>
            
            {userDonations && userDonations.length > 0 ? (
              <div className="space-y-4">
                {userDonations.map((donation: Donation) => (
                  <div key={donation.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                          <span className="font-medium text-gray-700">Donation #{formatDonationId(donation.id)}</span>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                          {donation.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-xs font-medium text-gray-500 mb-1">Food Type</h3>
                          <p className="text-gray-800">{donation.food_type}</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-gray-500 mb-1">Quantity</h3>
                          <p className="text-gray-800">{donation.quantity} units</p>
                        </div>
                        <div className="md:col-span-2">
                          <h3 className="text-xs font-medium text-gray-500 mb-1">Donated On</h3>
                          <p className="text-gray-800">
                            {new Date(donation.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No donations found</h3>
                <p className="text-gray-600">You haven't made any donations yet. Start contributing to make a difference!</p>
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </div>

    <div>
      <Footer/>
    </div>
  </>
  );
};

export default DonorProfile;