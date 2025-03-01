import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define types
type FormData = {
  food_type: string;
  quantity: number;
  description: string;
  address: string;
  expiration_date: Date | null;
};

type FoodTransaction = Omit<FormData, "expiration_date"> & {
  user_id: number;
  transaction_type: string;
  status: string;
  expiration_date: string; // Convert Date to string for API
};

const Donors: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    food_type: "Rice",
    quantity: 10,
    description: "Freshly cooked rice",
    address: "Damani Nagar",
    expiration_date: new Date(), // Default to today
  });

  const queryClient = useQueryClient();

  // Define the mutation function
  const mutation = useMutation({
    mutationFn: async (newTransaction: FoodTransaction) => {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/food_transactions",
        newTransaction,
        { headers: { "Content-Type": "application/json" } }
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
      alert(`Failed to submit donation: ${error.response?.data?.message || error.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.expiration_date) {
      alert("Please select an expiration date.");
      return;
    }

    // Convert Date to ISO 8601 format
    const formattedDate = formData.expiration_date.toISOString();

    // Replace with actual logged-in user ID
    const newTransaction: FoodTransaction = {
      user_id: 1, 
      food_type: formData.food_type,
      quantity: formData.quantity,
      description: formData.description,
      address: formData.address,
      expiration_date: formattedDate,
      transaction_type: "offer",
      status: "pending",
    };

    mutation.mutate(newTransaction);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
        Donate
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold">Donate Food</h2>
            <p className="text-sm text-gray-600 mb-4">Fill in the details below to donate food.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block">Food Type</label>
              <input className="w-full p-2 border rounded" name="food_type" value={formData.food_type} onChange={handleChange} required />

              <label className="block">Quantity</label>
              <input className="w-full p-2 border rounded" type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

              <label className="block">Description</label>
              <textarea className="w-full p-2 border rounded" name="description" value={formData.description} onChange={handleChange} required />

              <label className="block">Address</label>
              <input className="w-full p-2 border rounded" name="address" value={formData.address} onChange={handleChange} required />

              <label className="block">Expiration Date</label>
              <DatePicker
                selected={formData.expiration_date}
                onChange={(date: Date | null) => setFormData({ ...formData, expiration_date: date })}
                dateFormat="yyyy-MM-dd"
                className="w-full p-2 border rounded"
                required
              />

              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
                {mutation.isPending ? "Submitting..." : "Submit"}
              </button>
              <button type="button" className="w-full bg-red-500 text-white py-2 mt-2 rounded" onClick={() => setOpen(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donors;
