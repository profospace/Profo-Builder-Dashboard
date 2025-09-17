import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../utils/baseurl";

const UserBookings = () => {
  const { id } = useParams();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch user's booking history
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${base_url}/api/users/search-history/${id}/bookings/history`, {
        params: {
          limit: 50, // You can make this dynamic if needed
        },
      });

      if (response.data.success) {
        setBookings(response.data.bookingHistory || []);
        setLoading(false)
      } else {
        setError(response.data.message || "Failed to fetch bookings");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.response?.data?.message || "Something went wrong while fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookings();
    }
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Booking History</h1>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-6 text-gray-600">Loading bookings...</div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center text-red-500 py-4">{error}</div>
      )}

      {/* Empty state */}
      {!loading && !error && bookings.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No bookings found for this user.
        </div>
      )}

      {/* Bookings Table */}
      {!loading && !error && bookings.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Property</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">BHK</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                {/* <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th> */}
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Booked At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                    {booking.property?.post_title || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {booking.property?.bedrooms || "N/A"}BHK
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    ₹{booking.property?.price?.toLocaleString() || "N/A"}
                  </td>
                  {/* <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium 
                      ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td> */}
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(booking.bookedAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
