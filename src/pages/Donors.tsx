import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jwtDecode } from "jwt-decode";

// Function to get user ID from JWT token
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("⚠️ No token found, user may not be logged in.");
    return null;
  }

  try {
    const decoded: any = jwtDecode(token);
    return decoded.user_id; // Ensure user_id exists in the token payload
  } catch (error) {
    console.error("❌ Error decoding token:", error);
    return null;
  }
};



// Define validation schema using Yup
const validationSchema = Yup.object({
  food_type: Yup.string().required("Food type is required"),
  quantity: Yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  expiration_date: Yup.date().nullable().required("Expiration date is required"),
});

const Donors: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const userId = getUserIdFromToken(); // Get user ID dynamically

  const mutation = useMutation({
    mutationFn: async (newTransaction: any) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated. Please log in.");

      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/food_transactions",
        newTransaction,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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

  const formik = useFormik({
    initialValues: {
      food_type: "",
      quantity: "",
      description: "",
      address: "",
      expiration_date: new Date(),
    },
    validationSchema,
    onSubmit: (values) => {
      if (!userId) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const formattedDate = values.expiration_date.toISOString();
      const newTransaction = {
        user_id: userId,
        food_type: values.food_type,
        quantity: values.quantity,
        description: values.description,
        address: values.address,
        expiration_date: formattedDate,
        transaction_type: "offer",
        status: "pending",
      };

      mutation.mutate(newTransaction);
    },
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)}>
          Donate
        </button>

        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-80">
              <h2 className="text-lg font-bold">Donate Food</h2>
              <p className="text-sm text-gray-600 mb-4">Fill in the details below to donate food.</p>

              <form onSubmit={formik.handleSubmit} className="space-y-3">
                <label className="block">Food Type</label>
                <input

                  className="w-full p-2 border rounded"
                  name="food_type"
                  placeholder="Enter Name of Food"
                  value={formik.values.food_type}
                  onChange={formik.handleChange}
                />
                {formik.touched.food_type && formik.errors.food_type && (
                  <p className="text-red-500 text-sm">{formik.errors.food_type}</p>
                )}

                <label className="block">Quantity</label>
                <input
                  className="w-full p-2 border rounded"
                  type="number"
                  name="quantity"
                  placeholder="Enter Quantity in Kg"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                />
                {formik.touched.quantity && formik.errors.quantity && (
                  <p className="text-red-500 text-sm">{formik.errors.quantity}</p>
                )}

                <label className="block">Description</label>
                <textarea
                  className="w-full p-2 border rounded"
                  name="description"
                  placeholder="Enter Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-sm">{formik.errors.description}</p>
                )}

                <label className="block">Address</label>
                <input
                  className="w-full p-2 border rounded"
                  name="address"
                  placeholder="Enter Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-500 text-sm">{formik.errors.address}</p>
                )}

                <label className="block">Expiration Date</label>
                <DatePicker
                  selected={formik.values.expiration_date}
                  onChange={(date) => formik.setFieldValue("expiration_date", date)}
                  dateFormat="yyyy-MM-dd"
                  className="w-full p-2 border rounded"
                />
                {formik.touched.expiration_date && formik.errors.expiration_date && (
                  <p className="text-red-500 text-sm">{formik.errors.expiration_date as string}</p>
                )}

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
    </>
  );
};

export default Donors;
