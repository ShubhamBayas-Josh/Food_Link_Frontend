import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";

type ClaimData = {
  claimed_quantity: string;
  claim_status: string;
  food_transaction_id: number;
  user_id: number;
  creator_user_id: number;
};

const fetchData = async () => {
  const response = await fetch(
    "http://127.0.0.1:3000/api/v1/food_transactions"
  );
  return response.json();
};

const createFoodClaim = async (claimData: ClaimData): Promise<unknown> => {
  const response = await fetch("http://127.0.0.1:3000/api/v1/food_claims", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(claimData),
  });
  return response.json();
};

const TransactionList = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [confirmingItem, setConfirmingItem] = useState<number | null>(null);

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
    console.log("Confirming claim for transaction:", foodTransactionId);
    const claimData: ClaimData = {
      claimed_quantity: "1",
      claim_status: "pending",
      food_transaction_id: foodTransactionId,
      user_id: 1, // Replace with actual user ID
      creator_user_id: 1, // Replace with actual creator ID
    };
    mutation.mutate(claimData);
  };

  const handleCancelClaim = () => {
    setConfirmingItem(null);
  };

  // Function to get appropriate food icon based on food type
  const getFoodIcon = (foodType: string) => {
    switch (foodType.toLowerCase()) {
      case "vegetable":
        return "🥦";
      case "fruit":
        return "🍎";
      case "dairy":
        return "🥛";
      case "grain":
        return "🍞";
      case "protein":
        return "🥩";
      case "prepared":
        return "🍱";
      default:
        return "🍽️";
    }
  };

  // Function to get appropriate status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "claimed":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format expiration date to show days remaining and check if expired
  const formatExpirationDate = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return "Expired";
    } else if (diffDays === 0) {
      return "Expires today";
    } else if (diffDays === 1) {
      return "Expires tomorrow";
    } else {
      return `Expires in ${diffDays} days`;
    }
  };

  // Check if an item is expired
  const isItemExpired = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    return expDate < today;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
       <div className="fixed left-0 top-0 h-screen">
          <Sidebar />
        </div>
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900">Available Food Donations</h1>
              <p className="mt-2 text-gray-600">Browse and claim available food donations in your area</p>
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

            {!isLoading && !isError && foodTransactions && foodTransactions.length === 0 && (
              <div className="text-center py-16 bg-white rounded-lg shadow">
                <div className="text-5xl mb-4">🍽️</div>
                <h3 className="text-lg font-medium text-gray-900">No donations available</h3>
                <p className="mt-2 text-gray-500">Check back later for new donations</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {!isLoading && !isError && foodTransactions && foodTransactions.map((item: any) => {
                const expired = isItemExpired(item.expiration_date);
                const canClaim = ["available", "pending"].includes(item.status?.toLowerCase()) && !expired;
                
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
                          {getFoodIcon(item.food_type)}
                        </span>
                        <h2 className="text-xl font-semibold text-gray-800">{item.food_name}</h2>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        expired ? "bg-red-100 text-red-800" : getStatusColor(item.status)
                      }`}>
                        {expired ? "Expired" : item.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Type:</span> {item.food_type}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Quantity:</span> {item.quantity}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Transaction:</span> {item.transaction_type}
                      </div>
                      <div className="flex items-start text-sm text-gray-600">
                        <span className="font-medium mr-2">Location:</span> 
                        <span className="flex-1">{item.address}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-medium ${
                          formatExpirationDate(item.expiration_date).includes("Expired") 
                            ? "text-red-600" 
                            : formatExpirationDate(item.expiration_date).includes("today") 
                              ? "text-orange-600" 
                              : "text-gray-600"
                        }`}>
                          {formatExpirationDate(item.expiration_date)}
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
                              onClick={() => handleConfirmClaim(item.id)}
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
                            {hoveredId === item.id && canClaim ? "Claim Now →" : "Claim"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </main>
      </div>
    
  );
};

export default TransactionList;