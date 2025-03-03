import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
// import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import { jwtDecode } from "jwt-decode";

type ClaimData = {
  claimed_quantity: string;
  claim_status: string;
  food_transaction_id: number;
  user_id: number; // Donor's ID
  creator_user_id: number; // Logged-in NGO's ID
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
    console.log("Decoded token:", decodedToken);
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

// Updated: wrap claimData inside a food_claim key so Rails strong parameters work
const createFoodClaim = async (claimData: ClaimData): Promise<unknown> => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:3000/api/v1/food_claims", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ food_claim: claimData }),
  });

  if (!response.ok) {
    throw new Error("Failed to create claim");
  }
  return response.json();
};

const TransactionList = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [confirmingItem, setConfirmingItem] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(
    getUserIdFromToken()
  );

  useEffect(() => {
    setCurrentUserId(getUserIdFromToken());
  }, []);

  const {
    data: foodTransactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["foodTransactions"],
    queryFn: fetchData,
  });

  const mutation = useMutation<unknown, Error, ClaimData>({
    mutationFn: createFoodClaim,
    onSuccess: () => {
      alert("Claim created successfully!");
      setConfirmingItem(null);
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
      claimed_quantity: selectedTransaction.quantity.toString(), // Taking quantity from the selected food transaction
      claim_status: "in_progress",
      food_transaction_id: foodTransactionId,
      user_id: selectedTransaction.user_id,
      creator_user_id: currentUserId,
    };

    mutation.mutate(claimData);
  };

  const handleCancelClaim = () => {
    setConfirmingItem(null);
  };

  // Helper functions for UI (getFoodIcon, getStatusColor, formatExpirationDate, isItemExpired)
  // would remain the same as your existing code.
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
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div>
          {isLoggedIn && role === "ngo" ? (
            <main className="flex-1 p-6">
              <div className="max-w-7xl mx-auto">
                <header className="mb-8 text-center">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Available Food Donations
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Browse and claim available food donations in your area
                  </p>
                </header>

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
                  foodTransactions &&
                  foodTransactions.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-lg shadow">
                      <div className="text-5xl mb-4">🍽️</div>
                      <h3 className="text-lg font-medium text-gray-900">
                        No donations available
                      </h3>
                      <p className="mt-2 text-gray-500">
                        Check back later for new donations
                      </p>
                    </div>
                  )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {!isLoading &&
                    !isError &&
                    foodTransactions &&
                    foodTransactions.map((item: FoodTransaction) => {
                      const expired = false; // Replace with your isItemExpired(item.expiration_date) logic
                      const canClaim =
                        ["available", "pending"].includes(
                          item.status?.toLowerCase()
                        ) && !expired;

                      return (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                          onMouseEnter={() => setHoveredId(item.id)}
                          onMouseLeave={() => setHoveredId(null)}
                        >
                          <div className="p-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
                          <div className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="inline-block text-3xl mb-2">
                                  🍽️
                                </span>
                                <h2 className="text-xl font-semibold text-gray-800">
                                  {item.food_name}
                                </h2>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {item.status}
                              </span>
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium mr-2">Type:</span>{" "}
                                {item.food_type}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium mr-2">
                                  Quantity:
                                </span>{" "}
                                {item.quantity}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="font-medium mr-2">
                                  Transaction:
                                </span>{" "}
                                {item.transaction_type}
                              </div>
                              <div className="flex items-start text-sm text-gray-600">
                                <span className="font-medium mr-2">
                                  Location:
                                </span>
                                <span className="flex-1">{item.address}</span>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm text-gray-700">
                                {item.description}
                              </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">
                                  Expiration info
                                </span>
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
                                          ? "bg-green-600 text-white"
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
            <p className="text-red-500 text-lg font-bold flex items-center justify-center h-screen">
              Please wait for approval.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionList;
