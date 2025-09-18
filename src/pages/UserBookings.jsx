// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { base_url } from "../utils/baseurl";

// const UserBookings = () => {
//   const { id } = useParams();

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   // Fetch user's booking history
//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axios.get(`${base_url}/api/users/search-history/${id}/bookings/history`, {
//         params: {
//           limit: 50, // You can make this dynamic if needed
//         },
//       });

//       if (response.data.success) {
//         setBookings(response.data.bookingHistory || []);
//         setLoading(false)
//       } else {
//         setError(response.data.message || "Failed to fetch bookings");
//       }
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//       setError(err.response?.data?.message || "Something went wrong while fetching bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchBookings();
//     }
//   }, [id]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">User Booking History</h1>

//       {/* Loading state */}
//       {loading && (
//         <div className="text-center py-6 text-gray-600">Loading bookings...</div>
//       )}

//       {/* Error state */}
//       {error && (
//         <div className="text-center text-red-500 py-4">{error}</div>
//       )}

//       {/* Empty state */}
//       {!loading && !error && bookings.length === 0 && (
//         <div className="text-center py-6 text-gray-500">
//           No bookings found for this user.
//         </div>
//       )}

//       {/* Bookings Table */}
//       {!loading && !error && bookings.length > 0 && (
//         <div className="overflow-x-auto bg-white rounded-xl shadow-md">
//           <table className="min-w-full border border-gray-200">
//             <thead className="bg-gray-100 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Property</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">BHK</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
//                 {/* <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th> */}
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Booked At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking, index) => (
//                 <tr key={booking._id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
//                   <td className="px-4 py-3 text-sm text-gray-800 font-medium">
//                     {booking.property?.post_title || "N/A"}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {booking.property?.bedrooms || "N/A"}BHK
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-700">
//                     ₹{booking.property?.price?.toLocaleString() || "N/A"}
//                   </td>
//                   {/* <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 text-xs rounded-full font-medium 
//                       ${
//                         booking.status === "confirmed"
//                           ? "bg-green-100 text-green-700"
//                           : booking.status === "pending"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {booking.status}
//                     </span>
//                   </td> */}
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {new Date(booking.bookedAt).toLocaleDateString("en-IN", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit"
//                     })}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserBookings;


import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../utils/baseurl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function usePriceRange(bookings) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    if (bookings?.length > 0) {
      const prices = bookings.map(b => b.property.price);
      setPriceRange({
        min: Math.min(...prices),
        max: Math.max(...prices)
      });
    }
  }, [bookings]);

  return priceRange;
}

const UserBookings = () => {
  const { id } = useParams();

  const [bookings, setBookings] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0
  })

  const { min, max } = usePriceRange(bookings);

  useEffect(
    () => {
      setPriceRange({
        min,
        max
      })
    }, [bookings]
  )


  // ✅ Fetch user's booking history
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${base_url}/api/users/search-history/${id}/bookings/history`,
        { params: { limit: 50 } }
      );

      if (response.data.success) {
        setBookings(response.data.bookingHistory || []);

      } else {
        setError(response.data.message || "Failed to fetch bookings");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(
        err.response?.data?.message ||
        "Something went wrong while fetching bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch search history data
  const fetchSearchHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${base_url}/api/users/search-history/${id}/search/history`,
        {
          params: {
            limit: 50,
          },
        }
      );

      if (response.data.success) {
        setSearchHistory(response.data.searchHistory || []);
      } else {
        setError(response.data.message || "Failed to fetch search history");
      }
    } catch (err) {
      console.error("Error fetching search history:", err);
      setError(
        err.response?.data?.message ||
        "Something went wrong while fetching search history"
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Helper function to render applied filters
   * Excludes latitude, longitude, radius
   */
  const renderFilters = (filters) => {
    if (!filters || Object.keys(filters).length === 0) {
      return <span className="text-gray-400">None</span>;
    }

    // Keys to exclude
    const excludedKeys = ["latitude", "longitude", "radius"];

    // Filter out unwanted keys
    const filteredEntries = Object.entries(filters).filter(
      ([key]) => !excludedKeys.includes(key)
    );

    if (filteredEntries.length === 0) {
      return <span className="text-gray-400">None</span>;
    }

    return (
      <div className="space-y-1">
        {filteredEntries.map(([key, value], index) => (
          <div key={index} className="flex gap-2">
            <span className="font-medium text-gray-700 capitalize">{key}:</span>
            <span className="text-gray-600">{value || "N/A"}</span>
          </div>
        ))}
      </div>
    );
  };


  // Extract and combine all unique applied filters
  const combinedFilters = useMemo(() => {
    if (!searchHistory.length) return {};

    const allFilters = {};

    searchHistory.forEach(item => {
      if (item.appliedFilters) {
        Object.entries(item.appliedFilters).forEach(([key, value]) => {
          if (!allFilters[key]) {
            allFilters[key] = new Set();
          }

          if (Array.isArray(value)) {
            value.forEach(v => allFilters[key].add(String(v)));
          } else if (value !== null && value !== undefined) {
            allFilters[key].add(String(value));
          }
        });
      }
    });

    // Convert Sets back to arrays and sort
    Object.keys(allFilters).forEach(key => {
      allFilters[key] = Array.from(allFilters[key]).sort();
    });

    return allFilters;
  }, [searchHistory]);

  // Initialize selected filters when combinedFilters changes
  useEffect(() => {
    const initialSelected = {};
    Object.entries(combinedFilters).forEach(([category, values]) => {
      values.forEach(value => {
        const key = `${category}_${value}`;
        initialSelected[key] = true;
      });
    });
    setSelectedFilters(initialSelected);
  }, [combinedFilters]);

  const toggleFilter = (category, value) => {
    const key = `${category}_${value}`;
    setSelectedFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Category display names
  const getCategoryDisplayName = (category) => {
    const displayNames = {
      onLocation: "Location",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      priceMin: "Min Price",
      priceMax: "Max Price",
      facing: "Facing Direction",
      religiousNearby: "Religious Places",
      type_name: "Property Type",
      purpose: "Purpose",
      searchTerm: "Search Term",
      searchType: "Search Type"
    };
    return displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Format value for display
  const formatValue = (category, value) => {
    if (category === 'priceMin' || category === 'priceMax') {
      const numValue = parseInt(value);
      if (numValue >= 10000000) {
        return `₹${(numValue / 10000000).toFixed(1)}Cr`;
      } else if (numValue >= 100000) {
        return `₹${(numValue / 100000).toFixed(1)}L`;
      } else {
        return `₹${(numValue / 1000).toFixed(0)}K`;
      }
    }
    if (category === 'bedrooms') {
      return `${value} BHK`;
    }
    if (category === 'bathrooms') {
      return `${value} Bath${value > 1 ? 's' : ''}`;
    }
    return value;
  };

  // const FilterButton = ({ category, value, isSelected, onClick }) => (
  //   <button
  //     className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-normal transition-all duration-200 border-2 relative ${isSelected
  //       ? 'bg-blue-600 text-white border-blue-600'
  //       : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
  //       }`}
  //     onClick={onClick}
  //   >
  //     {isSelected && (
  //       <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
  //         <svg
  //           className="w-3 h-3 text-white"
  //           fill="currentColor"
  //           viewBox="0 0 20 20"
  //         >
  //           <path
  //             fillRule="evenodd"
  //             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
  //             clipRule="evenodd"
  //           />
  //         </svg>
  //       </div>
  //     )}
  //     <span>{formatValue(category, value)}</span>
  //   </button>
  // );

  const FilterButton = ({ category, value, isSelected, onClick }) => (
    <button
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isSelected
          ? 'bg-white text-gray-700 border-gray-300'
          : 'bg-blue-50 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
      onClick={onClick}
    >
      {isSelected && (
        <svg
          className="w-4.5 h-4.5 text-white bg-blue-600 rounded-full"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span>{formatValue(category, value)}</span>
    </button>
  );
  useEffect(() => {
    if (id) {
      fetchBookings();
      fetchSearchHistory();
    }
  }, [id]);



  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* <div className="flex items-center gap-5 mb-5">
        <h1 className="text-2xl font-bold">User Booking History</h1>
        {!loading && (
          <div>
            ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
          </div>
        )}
      </div> */}

      <div className="flex items-center gap-5 mb-5">
        <h1 className="text-2xl font-bold text-gray-900">User Booking History</h1>

        {!loading && (
          <div className="px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300">
            ₹{priceRange.min.toLocaleString()} – ₹{priceRange.max.toLocaleString()}
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-6 text-gray-600">
          Loading bookings...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-500 py-4">{error}</div>
      )}

      {/* Empty */}
      {!loading && !error && bookings.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No bookings found for this user.
        </div>
      )}

      {/* Carousel */}
      {!loading && !error && bookings.length > 0 && (
        <div className="w-full relative px-8">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !bg-gray-300 !opacity-100",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-indigo-600",
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="booking-carousel pb-12"
          >
            {bookings.map((booking) => {
              const property = booking.property || {};
              return (
                <SwiperSlide key={booking._id}>
                  <div className="group relative bg-white rounded-3xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 ease-out overflow-hidden mb-9 ">
                    {/* Property Image Placeholder */}
                    <div className="relative ">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Booking Status Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></div>
                          Confirmed
                        </span>
                      </div>

                      {/* Property Type Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-700 border border-white/20">
                          {property.bedrooms || "N/A"}BHK
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 mt-7">
                      {/* Property Title */}
                      <div className="mb-3">
                        {/* <h3 className="font-semibold text-gray-900 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">
                          {property.title ||
                            property.name ||
                            "Property Booking"}
                        </h3> */}
                        <div className="flex items-center gap-2 mb-4">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-semibold text-gray-900 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            Booked on{" "}
                            {new Date(booking.bookedAt).toLocaleDateString(
                              "en-IN",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        {/* <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                          {property.location || property.address || "Location not specified"}
                        </p> */}
                      </div>

                      {/* Booking Date */}
                      {/* <div className="flex items-center gap-2 mb-4">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          Booked on{" "}
                          {new Date(booking.bookedAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div> */}

                      {/* Price and Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-gray-900">
                            ₹{property.price?.toLocaleString() || "N/A"}
                          </span>
                        </div>

                        <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200 border border-indigo-200">
                          View Details
                          {/* <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg> */}
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute -left-6 md:-left-4 top-1/3 -translate-y-1/3 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-200 group">
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>

          <div className="swiper-button-next-custom absolute -right-6 md:-right-4 top-1/3 -translate-y-1/3 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-200 group">
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* Optional: Add custom styles */}
          <style jsx>{`
          .booking-carousel .swiper-pagination {
            bottom: 0 !important;
          }

          .booking-carousel .swiper-pagination-bullet {
            width: 8px !important;
            height: 8px !important;
            margin: 0 4px !important;
          }

          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
        </div>
      )}

      {/* Search History Table */}
      {/* {!loading && !error && searchHistory.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Search Type
                </th>
               
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Applied Filters
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Total Results
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {searchHistory.map((entry, index) => (
                <tr key={entry._id || index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {entry.searchType || "N/A"}
                  </td>
                  
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {renderFilters(entry.appliedFilters)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {entry.resultCounts?.total ?? 0}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {entry.timestamp
                      ? new Date(entry.timestamp).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}

      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-black mb-1">User Searches</h1>
        </div>

        {/* Filter Sections */}
        <div className="space-y-2">
          {Object.entries(combinedFilters).map(([category, values]) => (
            <div key={category} className="pb-4 border-b border-gray-500 last:border-b-0">
              <h2 className="text-lg font-semibold text-black mb-4">
                {getCategoryDisplayName(category)}
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {values.map((value) => {
                  const key = `${category}_${value}`;
                  return (
                    <FilterButton
                      key={key}
                      category={category}
                      value={value}
                      isSelected={selectedFilters[key]}
                      onClick={() => toggleFilter(category, value)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );

};

export default UserBookings;
