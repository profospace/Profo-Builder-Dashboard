
// // // import { useState, useEffect, useMemo } from "react";
// // // import axios from "axios";
// // // import { base_url } from "../utils/baseurl";

// // // export default function FilterChipsUI() {
// // //     const [searchHistory, setSearchHistory] = useState([]);
// // //     const [selectedFilters, setSelectedFilters] = useState({});
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);


// // //     const id = "68bfe70b4faf3348f5f13a7b"; // Replace with actual user ID

// // //     // Fetch search history data
// // //     const fetchSearchHistory = async () => {
// // //         try {
// // //             setLoading(true);
// // //             setError(null);

// // //             const response = await axios.get(
// // //                 `${base_url}/api/users/search-history/${id}/search/history`,
// // //                 {
// // //                     params: {
// // //                         limit: 50,
// // //                     },
// // //                 }
// // //             );

// // //             if (response.data.success) {
// // //                 setSearchHistory(response.data.searchHistory || []);
// // //             } else {
// // //                 setError(response.data.message || "Failed to fetch search history");
// // //             }
// // //         } catch (err) {
// // //             console.error("Error fetching search history:", err);
// // //             setError(
// // //                 err.response?.data?.message ||
// // //                 "Something went wrong while fetching search history"
// // //             );
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         fetchSearchHistory();
// // //     }, []);

// // //     // Extract and combine all unique applied filters
// // //     const combinedFilters = useMemo(() => {
// // //         if (!searchHistory.length) return {};

// // //         const allFilters = {};

// // //         searchHistory.forEach(item => {
// // //             if (item.appliedFilters) {
// // //                 Object.entries(item.appliedFilters).forEach(([key, value]) => {
// // //                     if (!allFilters[key]) {
// // //                         allFilters[key] = new Set();
// // //                     }

// // //                     if (Array.isArray(value)) {
// // //                         value.forEach(v => allFilters[key].add(String(v)));
// // //                     } else if (value !== null && value !== undefined) {
// // //                         allFilters[key].add(String(value));
// // //                     }
// // //                 });
// // //             }
// // //         });

// // //         // Convert Sets back to arrays and sort
// // //         Object.keys(allFilters).forEach(key => {
// // //             allFilters[key] = Array.from(allFilters[key]).sort();
// // //         });

// // //         return allFilters;
// // //     }, [searchHistory]);

// // //     // Initialize selected filters when combinedFilters changes
// // //     useEffect(() => {
// // //         const initialSelected = {};
// // //         Object.entries(combinedFilters).forEach(([category, values]) => {
// // //             values.forEach(value => {
// // //                 const key = `${category}_${value}`;
// // //                 initialSelected[key] = true;
// // //             });
// // //         });
// // //         setSelectedFilters(initialSelected);
// // //     }, [combinedFilters]);

// // //     const toggleFilter = (category, value) => {
// // //         const key = `${category}_${value}`;
// // //         setSelectedFilters(prev => ({
// // //             ...prev,
// // //             [key]: !prev[key]
// // //         }));
// // //     };

// // //     // Category display names
// // //     const getCategoryDisplayName = (category) => {
// // //         const displayNames = {
// // //             onLocation: "Location",
// // //             bedrooms: "Bedrooms",
// // //             bathrooms: "Bathrooms",
// // //             priceMin: "Min Price",
// // //             priceMax: "Max Price",
// // //             facing: "Facing Direction",
// // //             religiousNearby: "Religious Places",
// // //             type_name: "Property Type",
// // //             purpose: "Purpose",
// // //             searchTerm: "Search Term",
// // //             searchType: "Search Type"
// // //         };
// // //         return displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
// // //     };

// // //     // Format value for display
// // //     const formatValue = (category, value) => {
// // //         if (category === 'priceMin' || category === 'priceMax') {
// // //             const numValue = parseInt(value);
// // //             if (numValue >= 10000000) {
// // //                 return `₹${(numValue / 10000000).toFixed(1)}Cr`;
// // //             } else if (numValue >= 100000) {
// // //                 return `₹${(numValue / 100000).toFixed(1)}L`;
// // //             } else {
// // //                 return `₹${(numValue / 1000).toFixed(0)}K`;
// // //             }
// // //         }
// // //         if (category === 'bedrooms') {
// // //             return `${value} BHK`;
// // //         }
// // //         if (category === 'bathrooms') {
// // //             return `${value} Bath${value > 1 ? 's' : ''}`;
// // //         }
// // //         return value;
// // //     };

// // //     const FilterButton = ({ category, value, isSelected, onClick }) => (
// // //         <button
// // //             className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isSelected
// // //                     ? 'bg-blue-600 text-white shadow-sm'
// // //                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // //                 }`}
// // //             onClick={onClick}
// // //         >
// // //             {isSelected && (
// // //                 <svg
// // //                     className="w-4 h-4 mr-1.5"
// // //                     fill="currentColor"
// // //                     viewBox="0 0 20 20"
// // //                 >
// // //                     <path
// // //                         fillRule="evenodd"
// // //                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// // //                         clipRule="evenodd"
// // //                     />
// // //                 </svg>
// // //             )}
// // //             {formatValue(category, value)}
// // //         </button>
// // //     );

// // //     if (loading) {
// // //         return (
// // //             <div className="max-w-4xl mx-auto p-6 bg-white">
// // //                 <div className="flex items-center justify-center py-12">
// // //                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //                     <span className="ml-3 text-gray-600">Loading search history...</span>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     if (error) {
// // //         return (
// // //             <div className="max-w-4xl mx-auto p-6 bg-white">
// // //                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
// // //                     <div className="flex">
// // //                         <div className="flex-shrink-0">
// // //                             <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
// // //                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// // //                             </svg>
// // //                         </div>
// // //                         <div className="ml-3">
// // //                             <h3 className="text-sm font-medium text-red-800">Error</h3>
// // //                             <p className="mt-1 text-sm text-red-700">{error}</p>
// // //                             <button
// // //                                 onClick={fetchSearchHistory}
// // //                                 className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
// // //                             >
// // //                                 Try again
// // //                             </button>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     if (!Object.keys(combinedFilters).length) {
// // //         return (
// // //             <div className="max-w-4xl mx-auto p-6 bg-white">
// // //                 <div className="text-center py-12">
// // //                     <div className="text-gray-400 mb-4">
// // //                         <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// // //                         </svg>
// // //                     </div>
// // //                     <h3 className="text-lg font-medium text-gray-900 mb-2">No search history found</h3>
// // //                     <p className="text-gray-600">Start searching to see your applied filters here.</p>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div className="max-w-4xl mx-auto p-6 bg-white">
// // //             {/* Header */}
// // //             <div className="mb-8">
// // //                 <h1 className="text-2xl font-bold text-gray-900 mb-2">Applied Filters</h1>
// // //                 <p className="text-gray-600">Filters from your recent searches</p>
// // //             </div>

// // //             {/* Filter Sections */}
// // //             <div className="space-y-6">
// // //                 {Object.entries(combinedFilters).map(([category, values]) => (
// // //                     <div key={category} className="bg-gray-50 rounded-lg p-4">
// // //                         <h3 className="text-lg font-semibold text-gray-900 mb-3">
// // //                             {getCategoryDisplayName(category)}
// // //                         </h3>
// // //                         <div className="flex flex-wrap gap-2">
// // //                             {values.map((value) => {
// // //                                 const key = `${category}_${value}`;
// // //                                 return (
// // //                                     <FilterButton
// // //                                         key={key}
// // //                                         category={category}
// // //                                         value={value}
// // //                                         isSelected={selectedFilters[key]}
// // //                                         onClick={() => toggleFilter(category, value)}
// // //                                     />
// // //                                 );
// // //                             })}
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>

// // //             {/* Summary */}
// // //             <div className="mt-8 p-4 bg-blue-50 rounded-lg">
// // //                 <h4 className="font-semibold text-blue-900 mb-2">Filter Summary</h4>
// // //                 <p className="text-blue-700 text-sm">
// // //                     Search History Entries: {searchHistory.length} |
// // //                     Filter Categories: {Object.keys(combinedFilters).length} |
// // //                     Total Filters: {Object.values(combinedFilters).reduce((sum, arr) => sum + arr.length, 0)} |
// // //                     Selected: {Object.values(selectedFilters).filter(Boolean).length}
// // //                 </p>
// // //             </div>
// // //         </div>
// // //     );
// // // }
// // // import { useState, useEffect, useMemo } from "react";
// // // import axios from "axios";
// // // import { base_url } from "../utils/baseurl";

// // // export default function FilterChipsUI() {
// // //     const [searchHistory, setSearchHistory] = useState([]);
// // //     const [selectedFilters, setSelectedFilters] = useState({});
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);


// // //     const id = "68bfe70b4faf3348f5f13a7b"; // Replace with actual user ID

// // //     // Fetch search history data
// // //     const fetchSearchHistory = async () => {
// // //         try {
// // //             setLoading(true);
// // //             setError(null);

// // //             const response = await axios.get(
// // //                 `${base_url}/api/users/search-history/${id}/search/history`,
// // //                 {
// // //                     params: {
// // //                         limit: 50,
// // //                     },
// // //                 }
// // //             );

// // //             if (response.data.success) {
// // //                 setSearchHistory(response.data.searchHistory || []);
// // //             } else {
// // //                 setError(response.data.message || "Failed to fetch search history");
// // //             }
// // //         } catch (err) {
// // //             console.error("Error fetching search history:", err);
// // //             setError(
// // //                 err.response?.data?.message ||
// // //                 "Something went wrong while fetching search history"
// // //             );
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         fetchSearchHistory();
// // //     }, []);

// // //     // Extract and combine all unique applied filters
// // //     const combinedFilters = useMemo(() => {
// // //         if (!searchHistory.length) return {};

// // //         const allFilters = {};

// // //         searchHistory.forEach(item => {
// // //             if (item.appliedFilters) {
// // //                 Object.entries(item.appliedFilters).forEach(([key, value]) => {
// // //                     if (!allFilters[key]) {
// // //                         allFilters[key] = new Set();
// // //                     }

// // //                     if (Array.isArray(value)) {
// // //                         value.forEach(v => allFilters[key].add(String(v)));
// // //                     } else if (value !== null && value !== undefined) {
// // //                         allFilters[key].add(String(value));
// // //                     }
// // //                 });
// // //             }
// // //         });

// // //         // Convert Sets back to arrays and sort
// // //         Object.keys(allFilters).forEach(key => {
// // //             allFilters[key] = Array.from(allFilters[key]).sort();
// // //         });

// // //         return allFilters;
// // //     }, [searchHistory]);

// // //     // Initialize selected filters when combinedFilters changes
// // //     useEffect(() => {
// // //         const initialSelected = {};
// // //         Object.entries(combinedFilters).forEach(([category, values]) => {
// // //             values.forEach(value => {
// // //                 const key = `${category}_${value}`;
// // //                 initialSelected[key] = true;
// // //             });
// // //         });
// // //         setSelectedFilters(initialSelected);
// // //     }, [combinedFilters]);

// // //     const toggleFilter = (category, value) => {
// // //         const key = `${category}_${value}`;
// // //         setSelectedFilters(prev => ({
// // //             ...prev,
// // //             [key]: !prev[key]
// // //         }));
// // //     };

// // //     // Category display names
// // //     const getCategoryDisplayName = (category) => {
// // //         const displayNames = {
// // //             onLocation: "Location",
// // //             bedrooms: "Bedrooms",
// // //             bathrooms: "Bathrooms",
// // //             priceMin: "Min Price",
// // //             priceMax: "Max Price",
// // //             facing: "Facing Direction",
// // //             religiousNearby: "Religious Places",
// // //             type_name: "Property Type",
// // //             purpose: "Purpose",
// // //             searchTerm: "Search Term",
// // //             searchType: "Search Type"
// // //         };
// // //         return displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
// // //     };

// // //     // Format value for display
// // //     const formatValue = (category, value) => {
// // //         if (category === 'priceMin' || category === 'priceMax') {
// // //             const numValue = parseInt(value);
// // //             if (numValue >= 10000000) {
// // //                 return `₹${(numValue / 10000000).toFixed(1)}Cr`;
// // //             } else if (numValue >= 100000) {
// // //                 return `₹${(numValue / 100000).toFixed(1)}L`;
// // //             } else {
// // //                 return `₹${(numValue / 1000).toFixed(0)}K`;
// // //             }
// // //         }
// // //         if (category === 'bedrooms') {
// // //             return `${value} BHK`;
// // //         }
// // //         if (category === 'bathrooms') {
// // //             return `${value} Bath${value > 1 ? 's' : ''}`;
// // //         }
// // //         return value;
// // //     };

// // //     const FilterButton = ({ category, value, isSelected, onClick }) => (
// // //         <button
// // //             className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 min-w-0 ${isSelected
// // //                     ? 'bg-blue-600 text-white border-blue-600 shadow-sm hover:bg-blue-700 hover:border-blue-700'
// // //                     : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
// // //                 }`}
// // //             onClick={onClick}
// // //         >
// // //             {isSelected && (
// // //                 <svg
// // //                     className="w-4 h-4 mr-1.5 flex-shrink-0"
// // //                     fill="currentColor"
// // //                     viewBox="0 0 20 20"
// // //                 >
// // //                     <path
// // //                         fillRule="evenodd"
// // //                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// // //                         clipRule="evenodd"
// // //                     />
// // //                 </svg>
// // //             )}
// // //             <span className="truncate">{formatValue(category, value)}</span>
// // //         </button>
// // //     );

// // //     if (loading) {
// // //         return (
// // //             <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
// // //                 <div className="flex items-center justify-center py-12">
// // //                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //                     <span className="ml-3 text-gray-600">Loading search history...</span>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     if (error) {
// // //         return (
// // //             <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
// // //                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
// // //                     <div className="flex">
// // //                         <div className="flex-shrink-0">
// // //                             <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
// // //                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// // //                             </svg>
// // //                         </div>
// // //                         <div className="ml-3">
// // //                             <h3 className="text-sm font-medium text-red-800">Error</h3>
// // //                             <p className="mt-1 text-sm text-red-700">{error}</p>
// // //                             <button
// // //                                 onClick={fetchSearchHistory}
// // //                                 className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
// // //                             >
// // //                                 Try again
// // //                             </button>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     if (!Object.keys(combinedFilters).length) {
// // //         return (
// // //             <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
// // //                 <div className="text-center py-12">
// // //                     <div className="text-gray-400 mb-4">
// // //                         <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// // //                         </svg>
// // //                     </div>
// // //                     <h3 className="text-lg font-medium text-gray-900 mb-2">No search history found</h3>
// // //                     <p className="text-gray-600">Start searching to see your applied filters here.</p>
// // //                 </div>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
// // //             {/* Header */}
// // //             <div className="mb-8">
// // //                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Applied Filters</h1>
// // //                 <p className="text-gray-600 text-lg">Filters from your recent searches</p>
// // //             </div>

// // //             {/* Filter Sections */}
// // //             <div className="space-y-8">
// // //                 {Object.entries(combinedFilters).map(([category, values]) => (
// // //                     <div key={category} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
// // //                         <div className="border-b border-gray-200 pb-3 mb-6">
// // //                             <h2 className="text-xl font-bold text-gray-900">
// // //                                 {getCategoryDisplayName(category)}
// // //                             </h2>
// // //                         </div>
// // //                         <div className="flex flex-wrap gap-3">
// // //                             {values.map((value) => {
// // //                                 const key = `${category}_${value}`;
// // //                                 return (
// // //                                     <FilterButton
// // //                                         key={key}
// // //                                         category={category}
// // //                                         value={value}
// // //                                         isSelected={selectedFilters[key]}
// // //                                         onClick={() => toggleFilter(category, value)}
// // //                                     />
// // //                                 );
// // //                             })}
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>

// // //             {/* Summary */}
// // //             <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
// // //                 <h4 className="text-lg font-bold text-gray-900 mb-3">Filter Summary</h4>
// // //                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
// // //                     <div className="text-center p-3 bg-blue-50 rounded-lg">
// // //                         <div className="text-2xl font-bold text-blue-600">{searchHistory.length}</div>
// // //                         <div className="text-gray-600">Search Entries</div>
// // //                     </div>
// // //                     <div className="text-center p-3 bg-green-50 rounded-lg">
// // //                         <div className="text-2xl font-bold text-green-600">{Object.keys(combinedFilters).length}</div>
// // //                         <div className="text-gray-600">Categories</div>
// // //                     </div>
// // //                     <div className="text-center p-3 bg-purple-50 rounded-lg">
// // //                         <div className="text-2xl font-bold text-purple-600">
// // //                             {Object.values(combinedFilters).reduce((sum, arr) => sum + arr.length, 0)}
// // //                         </div>
// // //                         <div className="text-gray-600">Total Filters</div>
// // //                     </div>
// // //                     <div className="text-center p-3 bg-orange-50 rounded-lg">
// // //                         <div className="text-2xl font-bold text-orange-600">
// // //                             {Object.values(selectedFilters).filter(Boolean).length}
// // //                         </div>
// // //                         <div className="text-gray-600">Selected</div>
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }


// // import { useState, useEffect, useMemo } from "react";
// // import axios from "axios";
// // import { base_url } from "../utils/baseurl";

// // export default function FilterChipsUI() {
// //     const [searchHistory, setSearchHistory] = useState([]);
// //     const [selectedFilters, setSelectedFilters] = useState({});
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);


// //     const id = "68bfe70b4faf3348f5f13a7b"; // Replace with actual user ID

// //     // Fetch search history data
// //     const fetchSearchHistory = async () => {
// //         try {
// //             setLoading(true);
// //             setError(null);

// //             const response = await axios.get(
// //                 `${base_url}/api/users/search-history/${id}/search/history`,
// //                 {
// //                     params: {
// //                         limit: 50,
// //                     },
// //                 }
// //             );

// //             if (response.data.success) {
// //                 setSearchHistory(response.data.searchHistory || []);
// //             } else {
// //                 setError(response.data.message || "Failed to fetch search history");
// //             }
// //         } catch (err) {
// //             console.error("Error fetching search history:", err);
// //             setError(
// //                 err.response?.data?.message ||
// //                 "Something went wrong while fetching search history"
// //             );
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchSearchHistory();
// //     }, []);

// //     // Extract and combine all unique applied filters
// //     const combinedFilters = useMemo(() => {
// //         if (!searchHistory.length) return {};

// //         const allFilters = {};

// //         searchHistory.forEach(item => {
// //             if (item.appliedFilters) {
// //                 Object.entries(item.appliedFilters).forEach(([key, value]) => {
// //                     if (!allFilters[key]) {
// //                         allFilters[key] = new Set();
// //                     }

// //                     if (Array.isArray(value)) {
// //                         value.forEach(v => allFilters[key].add(String(v)));
// //                     } else if (value !== null && value !== undefined) {
// //                         allFilters[key].add(String(value));
// //                     }
// //                 });
// //             }
// //         });

// //         // Convert Sets back to arrays and sort
// //         Object.keys(allFilters).forEach(key => {
// //             allFilters[key] = Array.from(allFilters[key]).sort();
// //         });

// //         return allFilters;
// //     }, [searchHistory]);

// //     // Initialize selected filters when combinedFilters changes
// //     useEffect(() => {
// //         const initialSelected = {};
// //         Object.entries(combinedFilters).forEach(([category, values]) => {
// //             values.forEach(value => {
// //                 const key = `${category}_${value}`;
// //                 initialSelected[key] = true;
// //             });
// //         });
// //         setSelectedFilters(initialSelected);
// //     }, [combinedFilters]);

// //     const toggleFilter = (category, value) => {
// //         const key = `${category}_${value}`;
// //         setSelectedFilters(prev => ({
// //             ...prev,
// //             [key]: !prev[key]
// //         }));
// //     };

// //     // Category display names
// //     const getCategoryDisplayName = (category) => {
// //         const displayNames = {
// //             onLocation: "Location",
// //             bedrooms: "Bedrooms",
// //             bathrooms: "Bathrooms",
// //             priceMin: "Min Price",
// //             priceMax: "Max Price",
// //             facing: "Facing Direction",
// //             religiousNearby: "Religious Places",
// //             type_name: "Property Type",
// //             purpose: "Purpose",
// //             searchTerm: "Search Term",
// //             searchType: "Search Type"
// //         };
// //         return displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
// //     };

// //     // Format value for display
// //     const formatValue = (category, value) => {
// //         if (category === 'priceMin' || category === 'priceMax') {
// //             const numValue = parseInt(value);
// //             if (numValue >= 10000000) {
// //                 return `₹${(numValue / 10000000).toFixed(1)}Cr`;
// //             } else if (numValue >= 100000) {
// //                 return `₹${(numValue / 100000).toFixed(1)}L`;
// //             } else {
// //                 return `₹${(numValue / 1000).toFixed(0)}K`;
// //             }
// //         }
// //         if (category === 'bedrooms') {
// //             return `${value} BHK`;
// //         }
// //         if (category === 'bathrooms') {
// //             return `${value} Bath${value > 1 ? 's' : ''}`;
// //         }
// //         return value;
// //     };

// //     const FilterButton = ({ category, value, isSelected, onClick }) => (
// //         <button
// //             className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-normal transition-all duration-200 border-2 relative ${isSelected
// //                     ? 'bg-blue-600 text-white border-blue-600'
// //                     : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
// //                 }`}
// //             onClick={onClick}
// //         >
// //             {isSelected && (
// //                 <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
// //                     <svg
// //                         className="w-3 h-3 text-white"
// //                         fill="currentColor"
// //                         viewBox="0 0 20 20"
// //                     >
// //                         <path
// //                             fillRule="evenodd"
// //                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// //                             clipRule="evenodd"
// //                         />
// //                     </svg>
// //                 </div>
// //             )}
// //             <span>{formatValue(category, value)}</span>
// //         </button>
// //     );

// //     if (loading) {
// //         return (
// //             <div className="max-w-6xl mx-auto p-6 bg-white">
// //                 <div className="flex items-center justify-center py-12">
// //                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //                     <span className="ml-3 text-gray-600">Loading search history...</span>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <div className="max-w-6xl mx-auto p-6 bg-white">
// //                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
// //                     <div className="flex">
// //                         <div className="flex-shrink-0">
// //                             <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
// //                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// //                             </svg>
// //                         </div>
// //                         <div className="ml-3">
// //                             <h3 className="text-sm font-medium text-red-800">Error</h3>
// //                             <p className="mt-1 text-sm text-red-700">{error}</p>
// //                             <button
// //                                 onClick={fetchSearchHistory}
// //                                 className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
// //                             >
// //                                 Try again
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     if (!Object.keys(combinedFilters).length) {
// //         return (
// //             <div className="max-w-6xl mx-auto p-6 bg-white">
// //                 <div className="text-center py-12">
// //                     <div className="text-gray-400 mb-4">
// //                         <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //                         </svg>
// //                     </div>
// //                     <h3 className="text-lg font-medium text-gray-900 mb-2">No search history found</h3>
// //                     <p className="text-gray-600">Start searching to see your applied filters here.</p>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="max-w-6xl mx-auto p-6 bg-white">
// //             {/* Header */}
// //             <div className="mb-8">
// //                 <h1 className="text-2xl font-semibold text-black mb-1">Applied Filters</h1>
// //                 <p className="text-gray-500">Filters from your recent searches</p>
// //             </div>

// //             {/* Filter Sections */}
// //             <div className="space-y-6">
// //                 {Object.entries(combinedFilters).map(([category, values]) => (
// //                     <div key={category} className="pb-4 border-b border-gray-100 last:border-b-0">
// //                         <h2 className="text-lg font-semibold text-black mb-4">
// //                             {getCategoryDisplayName(category)}
// //                         </h2>
// //                         <div className="flex flex-wrap gap-2.5">
// //                             {values.map((value) => {
// //                                 const key = `${category}_${value}`;
// //                                 return (
// //                                     <FilterButton
// //                                         key={key}
// //                                         category={category}
// //                                         value={value}
// //                                         isSelected={selectedFilters[key]}
// //                                         onClick={() => toggleFilter(category, value)}
// //                                     />
// //                                 );
// //                             })}
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>

// //             {/* Summary */}
// //             <div className="mt-8 p-4 bg-gray-50 rounded-lg">
// //                 <h4 className="font-semibold text-gray-900 mb-2">Filter Summary</h4>
// //                 <p className="text-gray-600 text-sm">
// //                     Search History Entries: {searchHistory.length} |
// //                     Filter Categories: {Object.keys(combinedFilters).length} |
// //                     Total Filters: {Object.values(combinedFilters).reduce((sum, arr) => sum + arr.length, 0)} |
// //                     Selected: {Object.values(selectedFilters).filter(Boolean).length}
// //                 </p>
// //             </div>
// //         </div>
// //     );
// // }


// import React from 'react';
// import {
//     LayoutDashboard,
//     BookOpen,
//     Users,
//     MessageCircle,
//     Bell,
//     Calendar,
//     Users2,
//     Settings,
//     Download,
//     ArrowUpRight
// } from 'lucide-react';

// const FilterChipsUI = () => {
//     const menuItems = [
//         { name: 'Dashboard', icon: LayoutDashboard, active: true },
//         { name: 'My Courses', icon: BookOpen, active: false },
//         { name: 'My Classes', icon: Users, active: false },
//         { name: 'Messages', icon: MessageCircle, active: false },
//         { name: 'Notifications', icon: Bell, active: false, badge: '2' },
//         { name: 'Calendars', icon: Calendar, active: false },
//         { name: 'Community', icon: Users2, active: false },
//         { name: 'Settings', icon: Settings, active: false },
//     ];

//     return (
//         <div className="w-64 h-screen bg-sidebar-bg flex flex-col">
//             {/* Logo/Brand Section */}
//             <div className="p-6 flex items-center gap-3">
//                 <div className="w-8 h-8 bg-sidebar-active rounded-full flex items-center justify-center">
//                     <div className="w-4 h-4 bg-sidebar-active-text rounded-full"></div>
//                 </div>
//                 <span className="text-sidebar-text text-xl font-semibold">Eduplex</span>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="flex-1 px-4">
//                 <ul className="space-y-2">
//                     {menuItems.map((item, index) => (
//                         <li key={index}>
//                             <a
//                                 href="#"
//                                 className={`
//                   flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200
//                   ${item.active
//                                         ? 'bg-sidebar-active text-sidebar-active-text'
//                                         : 'text-sidebar-text hover:text-sidebar-text hover:bg-sidebar-bg/80'
//                                     }
//                 `}
//                             >
//                                 <item.icon size={20} />
//                                 <span>{item.name}</span>
//                                 {item.badge && (
//                                     <span className="ml-auto bg-notification-badge text-white text-xs px-2 py-1 rounded-full">
//                                         {item.badge}
//                                     </span>
//                                 )}
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             </nav>

//             {/* Bottom Promotional Card */}
//             <div className="p-4">
//                 <div className="bg-sidebar-promo rounded-2xl p-4 relative overflow-hidden">
//                     {/* Background decoration */}
//                     <div className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
//                         <ArrowUpRight size={16} className="text-sidebar-active-text" />
//                     </div>

//                     {/* Content */}
//                     <div className="relative z-10">
//                         <div className="flex items-center gap-2 mb-2">
//                             <Download size={16} className="text-sidebar-active-text" />
//                             <div className="flex gap-1">
//                                 <div className="w-3 h-1 bg-sidebar-active-text rounded-full"></div>
//                                 <div className="w-3 h-1 bg-sidebar-active-text rounded-full"></div>
//                                 <div className="w-3 h-1 bg-sidebar-active-text rounded-full"></div>
//                             </div>
//                         </div>
//                         <p className="text-sidebar-active-text text-sm font-medium">
//                             Download our<br />mobile app
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FilterChipsUI;
// import React from 'react';
// import {
//     LayoutDashboard,
//     BookOpen,
//     GraduationCap,
//     MessageCircle,
//     Bell,
//     Calendar,
//     Users2,
//     Settings,
//     ArrowUpRight
// } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const FilterChipsUI = () => {
//     const navigate = useNavigate()
//     const location = useLocation();
//     const menuItems = [
//         { name: 'My Properties', icon: LayoutDashboard, route: '/properties', active: true },
//         { name: 'My Enquiries', icon: BookOpen, route: '/enquiries', active: false },
//         { name: 'Property Performance', icon: GraduationCap, route: '/performance', active: false },
//         { name: 'Bookings', icon: MessageCircle, route: '/bookings', active: false },
//         { name: 'Callbacks', icon: Bell, route: '/callbacks', active: false, badge: '2' },
//         { name: 'RM Bookings', icon: Calendar, route: '/rm-manager', active: false },
//         { name: 'Profile', icon: Users2, route: '/profile', active: false },
//         { name: 'Settings', icon: Settings, route: '/settings', active: false },
//     ];

//     return (
//         // <div className='flex justify-center'>
//         <div className="w-56 h-[96vh] bg-[#1E1E30] flex flex-col rounded-2xl">
//             {/* Logo Section */}
//             {/* <div className="p-6 flex items-center gap-">
//                     <img src='https://wityysaver.s3.ap-south-1.amazonaws.com/1758194017476-logo.png' className='w-11 h-auto'/>
//                     <span className="text-[#D8F375] text-4xl font-bold">PROFO</span>
//                 </div> */}

//             <div className="p-6 flex items-center">
//                 <img
//                     src="https://wityysaver.s3.ap-south-1.amazonaws.com/1758194017476-logo.png"
//                     className="w-11 h-auto"
//                 />
//                 <span className="relative text-[#D8F375] text-3xl font-bold">
//                     PROFO
//                     <span className="absolute -top-0 -right-7 bg-[#D8F375] text-black text-[8px] font-semibold rounded-full px-2 py-0.5">
//                         IQ
//                     </span>
//                 </span>
//             </div>


//             {/* Navigation Menu */}
//             <nav className="flex-1 px-4">
//                 <ul className="space-y-0.5">
//                     {menuItems.map((item, index) => {
//                         const isActive = location.pathname === item.route;
//                         return (
//                             <li key={index}>
//                                 <a
//                                     href="#"
//                                     onClick={() => navigate(`${item.route}`)}
//                                     className={`
//                   flex items-center gap-3 px-4 py-3 rounded-3xl text-xs font-medium transition-all duration-200 relative
//                   ${isActive
//                                             ? 'bg-[#D8F375] text-[#2D3748]'
//                                             : 'text-white hover:bg-white/5'
//                                         }
//                 `}
//                                 >
//                                     <item.icon size={18} />
//                                     <span className="flex-1">{item.name}</span>
//                                     {item.badge && (
//                                         <div className="w-5 h-5 bg-[#F8CDB7] text-black text-xs font-medium rounded-full flex items-center justify-center">
//                                             {item.badge}
//                                         </div>
//                                     )}
//                                 </a>
//                             </li>
//                         )
//                     })}
//                 </ul>
//             </nav>

//             {/* Bottom Promotional Card */}
//             <div className="p-4 mx-auto">
//                 <img src='https://wityysaver.s3.ap-south-1.amazonaws.com/1758193627053-Screenshot%202025-09-18%20163610.png' className='h-36' />
//             </div>
//         </div>
//         // </div>
//     );
// };

// export default FilterChipsUI;


import React from "react";

// Builder Dashboard Preview
// Single-file React component using Tailwind CSS for quick preview.
// - Left navigation grouped
// - Top header with search/profile
// - KPI cards row
// - Persistent Action Zone
// - Recent Activity and Insights

export default function FilterChipsUI() {
    const kpis = [
        { id: 1, label: "Pending Assignments", value: 10, tone: "danger", note: "5% from yesterday" },
        { id: 2, label: "Active Bookings", value: 2, tone: "accent", note: "8% from last week" },
        { id: 3, label: "Completed Visits", value: 1, tone: "success", note: "15% from last month" },
        { id: 4, label: "Total RMs", value: 7, tone: "muted", note: "12% from last month" },
    ];

    const actions = [
        { id: "add-rm", label: "Add RM", style: "secondary" },
        { id: "assign", label: "Assign Bookings", style: "primary" },
        { id: "performance", label: "View Performance", style: "ghost" },
        { id: "manage-rm", label: "Manage RMs", style: "ghost" },
    ];

    const recent = [
        { id: 1, text: "New RM added to team", time: "2 hours ago", dot: "purple" },
        { id: 2, text: "Booking assigned successfully", time: "4 hours ago", dot: "blue" },
        { id: 3, text: "Callback pending for Property A", time: "1 day ago", dot: "yellow" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-200 min-h-screen sticky top-0">
                <div className="px-6 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-red-600 flex items-center justify-center text-white font-bold">P</div>
                        <div>
                            <div className="font-extrabold text-lg">PROFO</div>
                            <div className="text-xs text-gray-400">Builder Dashboard</div>
                        </div>
                    </div>
                </div>

                <nav className="px-4 py-2 text-sm text-gray-700">
                    <div className="mb-4">
                        <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Properties</div>
                        <ul className="space-y-1">
                            <li className="px-3 py-2 rounded hover:bg-gray-50">My Properties</li>
                            <li className="px-3 py-2 rounded hover:bg-gray-50">Property Performance</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Bookings</div>
                        <ul className="space-y-1">
                            <li className="px-3 py-2 rounded hover:bg-gray-50">All Bookings</li>
                            <li className="px-3 py-2 rounded bg-blue-50 font-medium">RM Assignments</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Communication</div>
                        <ul className="space-y-1">
                            <li className="px-3 py-2 rounded hover:bg-gray-50">Enquiries</li>
                            <li className="px-3 py-2 rounded hover:bg-gray-50">Callbacks <span className="ml-2 inline-block text-xs bg-yellow-100 px-2 rounded">2</span></li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <div className="text-xs font-semibold text-gray-400 uppercase mb-2">Team</div>
                        <ul className="space-y-1">
                            <li className="px-3 py-2 rounded hover:bg-gray-50">Relationship Managers</li>
                        </ul>
                    </div>

                    <div className="mt-6 border-t pt-4 text-xs text-gray-400">
                        <div className="px-3 py-2">Profile</div>
                        <div className="px-3 py-2">Settings</div>
                    </div>
                </nav>
            </aside>

            {/* Main area */}
            <main className="flex-1 p-8">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-extrabold">Welcome back <span className="text-blue-600">Anurag</span> 👋</h1>
                        <p className="text-sm text-gray-500 mt-1">Overview of your properties & RM assignments</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input className="w-80 rounded-full border border-gray-200 px-4 py-2 text-sm bg-white" placeholder="Search" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">A</div>
                    </div>
                </header>

                {/* KPI Row */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {kpis.map(k => (
                        <div key={k.id} className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-xs text-gray-400">{k.label}</div>
                                    <div className="mt-2 text-2xl font-bold">{k.value}</div>
                                    <div className="text-xs text-gray-400 mt-1">{k.note}</div>
                                </div>
                                <div className="ml-4">
                                    {k.tone === 'danger' && <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center text-red-600">!</div>}
                                    {k.tone === 'success' && <div className="w-10 h-10 rounded bg-green-50 flex items-center justify-center text-green-600">✓</div>}
                                    {k.tone === 'accent' && <div className="w-10 h-10 rounded bg-orange-50 flex items-center justify-center text-orange-600">📅</div>}
                                    {k.tone === 'muted' && <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center text-blue-600">👥</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Action Zone */}
                <section className="sticky top-6 bg-transparent mb-6">
                    <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 flex gap-4 items-center">
                        <div className="flex-1 text-sm text-gray-600">Quick actions — make the most common tasks reachable from anywhere.</div>
                        <div className="flex gap-3">
                            {actions.map(a => (
                                <button key={a.id}
                                    className={
                                        `px-4 py-2 rounded-md font-medium text-sm shadow-sm ${a.style === 'primary' ? 'bg-orange-500 text-white' : ''} ${a.style === 'secondary' ? 'bg-blue-50 text-blue-700 border border-blue-100' : ''} ${a.style === 'ghost' ? 'bg-white text-purple-600 border border-gray-100' : ''}`
                                    }>
                                    {a.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Recent Activity</h3>
                                <div className="text-sm text-gray-400">All activity</div>
                            </div>

                            <ul className="space-y-4">
                                {recent.map(r => (
                                    <li key={r.id} className="flex items-start gap-4">
                                        <div className={`w-3 h-3 rounded-full mt-2 ${r.dot === 'purple' ? 'bg-purple-500' : r.dot === 'blue' ? 'bg-blue-500' : 'bg-yellow-400'}`}></div>
                                        <div>
                                            <div className="text-sm font-medium">{r.text}</div>
                                            <div className="text-xs text-gray-400 mt-1">{r.time}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                            <h3 className="text-lg font-semibold mb-3">Performance Insights</h3>
                            <div className="text-sm text-gray-500">A compact insight panel — show charts, trends, and suggestions here. (Placeholder)</div>
                        </div>
                    </div>

                    {/* Right rail */}
                    <aside>
                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mb-4">
                            <h4 className="text-sm font-semibold mb-2">Today</h4>
                            <div className="text-sm text-gray-500">2 tasks due — <button className="text-xs underline">View</button></div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                            <h4 className="text-sm font-semibold mb-2">Shortcuts</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="px-2 py-2 rounded hover:bg-gray-50">Assign next booking</li>
                                <li className="px-2 py-2 rounded hover:bg-gray-50">Invite RM</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
