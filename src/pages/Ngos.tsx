import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

//structure of the data required to create a food claim.
type ClaimData = {
  claimed_quantity: string;
  claim_status: string;
  food_transaction_id: number;
  user_id: number; 
  creator_user_id: number; 
  update_transaction_status: boolean; 
};

type FoodTransaction = {
  id: number;
  user_id: number;
  food_name: string;
  quantity: number;
  expiration_date: string;
  food_type: string;
  status: string;
  transaction_type: string;
  address: string;
  description: string;
};

type DecodedToken = {
  user_id: number;
  exp: number;
};

// Filter options for expiration
type ExpirationFilter =
  | "all"
  | "expiring-soon"
  | "not-expiring-soon"
  | "expired";

const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return null;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000; // seconds
    if (decodedToken.exp < currentTime) {
      console.error("Token has expired");
      localStorage.removeItem("token");
      return null;
    }
    return decodedToken.user_id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const fetchData = async (): Promise<FoodTransaction[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "http://127.0.0.1:3000/api/v1/food_transactions",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch food transactions");
  }
  return response.json();
};

const createFoodClaim = async (claimData: ClaimData): Promise<unknown> => {
  const token = localStorage.getItem("token");

  // Send a single request to create the claim and update the transaction
  const response = await fetch("http://127.0.0.1:3000/api/v1/food_claims", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      food_claim: {
        ...claimData,
        update_transaction_status: true, 
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create claim");
  }

  return response.json();
};


const getDaysUntilExpiration = (expirationDate: string): number => {
  if (!expirationDate) return -1; 
  
  try {
    const today = new Date();
    const expDate = new Date(expirationDate);
    
    // Check if the date is valid
    if (isNaN(expDate.getTime())) return -1;
    
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error("Error calculating expiration days:", error);
    return -1; // Default to expired on error
  }
};

// Format date to a more readable format
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Get appropriate color for expiration indicator
const getExpirationColor = (expirationDate: string): string => {
  const daysLeft = getDaysUntilExpiration(expirationDate);

  if (daysLeft < 0) return "bg-red-500"; // Expired
  if (daysLeft <= 2) return "bg-red-400"; // Almost expired
  if (daysLeft <= 5) return "bg-yellow-400"; // Soon to expire
  return "bg-green-400"; // Plenty of time
};

const TransactionList = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [confirmingItem, setConfirmingItem] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(
    getUserIdFromToken()
  );
  // New states for filtering and search
  const [expirationFilter, setExpirationFilter] =
    useState<ExpirationFilter>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setCurrentUserId(getUserIdFromToken());
  }, []);

  const {
    data: foodTransactions,
    isLoading,
    isError,
    error,
    refetch, // Used to refresh data after successful claim
  } = useQuery({
    queryKey: ["foodTransactions"],
    queryFn: fetchData,
  });

  const mutation = useMutation<unknown, Error, ClaimData>({
    mutationFn: createFoodClaim,
    onSuccess: () => {
      toast.success("Claim created successfully!");
      setConfirmingItem(null);
      refetch(); // Refetch data after successful claim
    },
    onError: (error) => {
      alert("Error creating claim: " + error.message);
      setConfirmingItem(null);
    },
  });

  const handleClaimRequest = (foodTransactionId: number) => {
    setConfirmingItem(foodTransactionId);
  };

  const handleConfirmClaim = (foodTransactionId: number) => {
    if (!currentUserId) {
      console.error("User not authenticated.");
      alert("User not authenticated. Please log in.");
      return;
    }

    if (!foodTransactions) {
      console.error("Food transactions data is not yet available.");
      alert("Food transactions data is still loading. Please try again.");
      return;
    }

    const selectedTransaction = foodTransactions.find(
      (transaction) => transaction.id === foodTransactionId
    );

    if (!selectedTransaction) {
      alert("Transaction not found");
      return;
    }

    const claimData: ClaimData = {
      claimed_quantity: selectedTransaction.quantity.toString(),
      claim_status: "in_progress",
      food_transaction_id: foodTransactionId,
      user_id: selectedTransaction.user_id,
      creator_user_id: currentUserId,
      update_transaction_status: true, // Add this new field
    };

    mutation.mutate(claimData);
  };

  const handleCancelClaim = () => {
    setConfirmingItem(null);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user && user.role) {
      setIsLoggedIn(true);
      setRole(user.role);
    }
  }, []);

  // Filter transactions by status, expiration, and search term
  const filteredTransactions = foodTransactions
  // First filter - check for undefined status before using toLowerCase
  ?.filter((transaction) => {
    // Guard against undefined transaction
    if (!transaction) return false;
    // Guard against undefined status
    if (transaction.status === undefined || transaction.status === null) return false;
    // Now it's safe to use toLowerCase
    return transaction.status.toLowerCase() === "pending";
  })
  // Second filter - expiration filtering
  ?.filter((transaction) => {
    // Guard against undefined transaction
    if (!transaction || !transaction.expiration_date) return false;
    
    const daysLeft = getDaysUntilExpiration(transaction.expiration_date);
    
    switch (expirationFilter) {
      case 'expired':
        return daysLeft < 0;
      case 'expiring-soon':
        return daysLeft >= 0 && daysLeft <= 5;
      case 'not-expiring-soon':
        return daysLeft > 5;
      case 'all':
      default:
        return true;
    }
  })
  // Third filter - search term filtering
  ?.filter((transaction) => {
    // Guard against undefined transaction
    if (!transaction) return false;
    // If no search term, return all
    if (!searchTerm || !searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Check each property with null/undefined safety
    const nameMatch = transaction.food_name ? 
      transaction.food_name.toLowerCase().includes(searchLower) : false;
      
    const typeMatch = transaction.food_type ?
      transaction.food_type.toLowerCase().includes(searchLower) : false;
      
    const addressMatch = transaction.address ?
      transaction.address.toLowerCase().includes(searchLower) : false;
      
    const descriptionMatch = transaction.description ?
      transaction.description.toLowerCase().includes(searchLower) : false;
    
    return nameMatch || typeMatch || addressMatch || descriptionMatch;
  });

  // Get appropriate food emoji based on food type
  const getFoodEmoji = (foodType: string): string => {
    const typeToEmoji: Record<string, string> = {
      vegetables: "🥦",
      fruits: "🍎",
      grains: "🌾",
      dairy: "🥛",
      protein: "🥩",
      cooked: "🍲",
      bakery: "🍞",
      canned: "🥫",
      beverage: "🥤",
      snack: "🍪",
      frozen: "🧊",
      prepared: "🍱",
    };
    return typeToEmoji[foodType.toLowerCase()] || "🍽️";
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50 mt-12 pt-10">
        <Navbar />
        <div>
          {isLoggedIn && role === "ngo" ? (
            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                <header className="mb-8 text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Available Food Donations
                  </h1>
                  <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                    Browse and claim available food donations in your area.
                    Items with red indicators are expiring soon.
                  </p>

                  {/* Color legend */}
                  <div className="flex items-center justify-center space-x-6 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Not Expiring Soon
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Expiring Soon
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Expiring Very Soon
                      </span>
                    </div>
                  </div>
                </header>

                {/* Search and filter controls */}
                <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-full md:w-2/3 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name, type, location, or description..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="w-full md:w-1/3">
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                      value={expirationFilter}
                      onChange={(e) =>
                        setExpirationFilter(e.target.value as ExpirationFilter)
                      }
                    >
                      <option value="all">All Items</option>
                      <option value="expired">Expired</option>
                      <option value="expiring-soon">
                        Expiring Soon (≤ 5 days)
                      </option>
                      <option value="not-expiring-soon">
                        Not Expiring Soon ( 5 days)
                      </option>
                    </select>
                  </div>
                </div>

                {isLoading && (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                  </div>
                )}

                {isError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">⚠️</div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          Error loading donations: {error?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!isLoading &&
                  !isError &&
                  filteredTransactions &&
                  filteredTransactions.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                      <div className="text-5xl mb-4">🍽️</div>
                      <h3 className="text-lg font-medium text-gray-900">
                        No matching donations found
                      </h3>
                      <p className="mt-2 text-gray-500">
                        {searchTerm
                          ? "Try adjusting your search criteria"
                          : "Check back later for new donations"}
                      </p>
                    </div>
                  )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {!isLoading &&
                    !isError &&
                    filteredTransactions &&
                    filteredTransactions.map((item: FoodTransaction) => {
                      const isExpired =
                        getDaysUntilExpiration(item.expiration_date) < 0;
                      const canClaim =
                        ["available", "pending"].includes(
                          item.status?.toLowerCase()
                        ) && !isExpired;
                      const expirationColor = getExpirationColor(
                        item.expiration_date
                      );
                      const daysUntilExpiration = getDaysUntilExpiration(
                        item.expiration_date
                      );

                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                          onMouseEnter={() => setHoveredId(item.id)}
                          onMouseLeave={() => setHoveredId(null)}
                        >
                          <div className={`p-1 ${expirationColor}`}></div>
                          <div className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <span className="inline-block text-3xl mr-3">
                                  {getFoodEmoji(item.food_type)}
                                </span>
                                <h2 className="text-xl font-semibold text-gray-800">
                                  {item.food_name}
                                </h2>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {item.status}
                              </span>
                            </div>

                            <div className="mt-4 space-y-2.5">
                              <div className="flex items-center text-sm text-gray-600">
                                <svg
                                  className="h-4 w-4 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                  />
                                </svg>
                                <span className="font-medium mr-2">Type:</span>{" "}
                                {item.food_type}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <svg
                                  className="h-4 w-4 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                  />
                                </svg>
                                <span className="font-medium mr-2">
                                  Quantity:
                                </span>{" "}
                                {item.quantity}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <svg
                                  className="h-4 w-4 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                <span className="font-medium mr-2">
                                  Transaction:
                                </span>{" "}
                                {item.transaction_type}
                              </div>
                              <div className="flex items-start text-sm text-gray-600">
                                <svg
                                  className="h-4 w-4 mr-2 mt-0.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <span className="font-medium mr-2">
                                  Location:
                                </span>
                                <span className="flex-1">{item.address}</span>
                              </div>
                              <div
                                className={`flex items-center text-sm ${
                                  isExpired
                                    ? "text-red-600 font-semibold"
                                    : "text-gray-600"
                                }`}
                              >
                                <svg
                                  className="h-4 w-4 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="font-medium mr-2">
                                  Expires:
                                </span>{" "}
                                <span>
                                  {formatDate(item.expiration_date)}
                                  {daysUntilExpiration < 0
                                    ? " (Expired)"
                                    : daysUntilExpiration === 0
                                    ? " (Today)"
                                    : ` (${daysUntilExpiration} day${
                                        daysUntilExpiration === 1 ? "" : "s"
                                      })`}
                                </span>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg italic">
                                "{item.description}"
                              </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100">
                              <div className="flex justify-between items-center">
                                {isExpired ? (
                                  <span className="text-sm font-medium text-red-600">
                                    This item has expired
                                  </span>
                                ) : (
                                  <span className="text-sm font-medium text-gray-600">
                                    {daysUntilExpiration === 0
                                      ? "Expires today!"
                                      : daysUntilExpiration === 1
                                      ? "Expires tomorrow!"
                                      : `${daysUntilExpiration} days until expiration`}
                                  </span>
                                )}
                                {confirmingItem === item.id ? (
                                  <div className="flex space-x-2">
                                    <button
                                      className="py-2 px-3 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                      onClick={handleCancelClaim}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="py-2 px-3 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                                      onClick={() =>
                                        handleConfirmClaim(item.id)
                                      }
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                                      canClaim
                                        ? hoveredId === item.id
                                          ? "bg-green-600 text-white shadow-md"
                                          : "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    }`}
                                    disabled={!canClaim}
                                    onClick={() => handleClaimRequest(item.id)}
                                  >
                                    {hoveredId === item.id && canClaim
                                      ? "Claim Now →"
                                      : "Claim"}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </main>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
              <div className="text-5xl mb-4">⏳</div>
              <p className="text-xl font-semibold text-gray-800 mb-2">
                Account Pending Approval
              </p>
              <p className="text-gray-600 max-w-md text-center">
                Your NGO account is currently awaiting administrator approval.
                You'll have access to the donation platform once approved.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionList;
