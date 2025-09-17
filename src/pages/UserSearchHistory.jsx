// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { base_url } from "../utils/baseurl";

// const UserSearchHistory = () => {
//   const { id } = useParams();

//   const [searchHistory, setSearchHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

 

//   // Fetch search history data
//   const fetchSearchHistory = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axios.get(`${base_url}/api/users/search-history/${id}/search/history`, {
//         params: {
//           limit: 50, // Optional limit
//         },
//       });

//       if (response.data.success) {
//         setSearchHistory(response.data.searchHistory || []);
//         setLoading(false)
//       } else {
//         setError(response.data.message || "Failed to fetch search history");
//       }
//     } catch (err) {
//       console.error("Error fetching search history:", err);
//       setError(err.response?.data?.message || "Something went wrong while fetching search history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchSearchHistory();
//     }
//   }, [id]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">User Search History</h1>

//       {/* Loading state */}
//       {loading && (
//         <div className="text-center py-6 text-gray-600">Loading search history...</div>
//       )}

//       {/* Error state */}
//       {error && (
//         <div className="text-center text-red-500 py-4">{error}</div>
//       )}

//       {/* Empty state */}
//       {!loading && !error && searchHistory.length === 0 && (
//         <div className="text-center py-6 text-gray-500">
//           No search history found for this user.
//         </div>
//       )}

//       {/* Search History Table */}
//       {!loading && !error && searchHistory.length > 0 && (
//         <div className="overflow-x-auto bg-white rounded-xl shadow-md">
//           <table className="min-w-full border border-gray-200">
//             <thead className="bg-gray-100 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Search Type</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Query</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Applied Filters</th>
//                 <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {searchHistory.map((entry, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
//                   <td className="px-4 py-3 text-sm font-medium text-gray-800">
//                     {entry.searchType || "N/A"}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {entry.query || "N/A"}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {entry.filters
//                       ? JSON.stringify(entry.filters)
//                       : "None"}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-600">
//                     {entry.timestamp
//                       ? new Date(entry.timestamp).toLocaleDateString("en-IN", {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit"
//                         })
//                       : "N/A"}
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

// export default UserSearchHistory;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../utils/baseurl";

const UserSearchHistory = () => {
  const { id } = useParams();

  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (id) {
      fetchSearchHistory();
    }
  }, [id]);

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Search History</h1>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-6 text-gray-600">
          Loading search history...
        </div>
      )}

      {/* Error state */}
      {error && <div className="text-center text-red-500 py-4">{error}</div>}

      {/* Empty state */}
      {!loading && !error && searchHistory.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No search history found for this user.
        </div>
      )}

      {/* Search History Table */}
      {!loading && !error && searchHistory.length > 0 && (
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
                {/* <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Search Term
                </th> */}
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
                  {/* <td className="px-4 py-3 text-sm text-gray-600">
                    {entry.searchTerm || "N/A"}
                  </td> */}
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
      )}
    </div>
  );
};

export default UserSearchHistory;
