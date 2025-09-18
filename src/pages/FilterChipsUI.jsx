
// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { base_url } from "../utils/baseurl";

// export default function FilterChipsUI() {
//     const [searchHistory, setSearchHistory] = useState([]);
//     const [selectedFilters, setSelectedFilters] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

    
//     const id = "68bfe70b4faf3348f5f13a7b"; // Replace with actual user ID

//     // Fetch search history data
//     const fetchSearchHistory = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             const response = await axios.get(
//                 `${base_url}/api/users/search-history/${id}/search/history`,
//                 {
//                     params: {
//                         limit: 50,
//                     },
//                 }
//             );

//             if (response.data.success) {
//                 setSearchHistory(response.data.searchHistory || []);
//             } else {
//                 setError(response.data.message || "Failed to fetch search history");
//             }
//         } catch (err) {
//             console.error("Error fetching search history:", err);
//             setError(
//                 err.response?.data?.message ||
//                 "Something went wrong while fetching search history"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchSearchHistory();
//     }, []);

//     // Extract and combine all unique applied filters
//     const combinedFilters = useMemo(() => {
//         if (!searchHistory.length) return {};

//         const allFilters = {};

//         searchHistory.forEach(item => {
//             if (item.appliedFilters) {
//                 Object.entries(item.appliedFilters).forEach(([key, value]) => {
//                     if (!allFilters[key]) {
//                         allFilters[key] = new Set();
//                     }

//                     if (Array.isArray(value)) {
//                         value.forEach(v => allFilters[key].add(String(v)));
//                     } else if (value !== null && value !== undefined) {
//                         allFilters[key].add(String(value));
//                     }
//                 });
//             }
//         });

//         // Convert Sets back to arrays and sort
//         Object.keys(allFilters).forEach(key => {
//             allFilters[key] = Array.from(allFilters[key]).sort();
//         });

//         return allFilters;
//     }, [searchHistory]);

//     // Initialize selected filters when combinedFilters changes
//     useEffect(() => {
//         const initialSelected = {};
//         Object.entries(combinedFilters).forEach(([category, values]) => {
//             values.forEach(value => {
//                 const key = `${category}_${value}`;
//                 initialSelected[key] = true;
//             });
//         });
//         setSelectedFilters(initialSelected);
//     }, [combinedFilters]);

//     const toggleFilter = (category, value) => {
//         const key = `${category}_${value}`;
//         setSelectedFilters(prev => ({
//             ...prev,
//             [key]: !prev[key]
//         }));
//     };

//     // Category display names
//     const getCategoryDisplayName = (category) => {
//         const displayNames = {
//             onLocation: "Location",
//             bedrooms: "Bedrooms",
//             bathrooms: "Bathrooms",
//             priceMin: "Min Price",
//             priceMax: "Max Price",
//             facing: "Facing Direction",
//             religiousNearby: "Religious Places",
//             type_name: "Property Type",
//             purpose: "Purpose",
//             searchTerm: "Search Term",
//             searchType: "Search Type"
//         };
//         return displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
//     };

//     // Format value for display
//     const formatValue = (category, value) => {
//         if (category === 'priceMin' || category === 'priceMax') {
//             const numValue = parseInt(value);
//             if (numValue >= 10000000) {
//                 return `₹${(numValue / 10000000).toFixed(1)}Cr`;
//             } else if (numValue >= 100000) {
//                 return `₹${(numValue / 100000).toFixed(1)}L`;
//             } else {
//                 return `₹${(numValue / 1000).toFixed(0)}K`;
//             }
//         }
//         if (category === 'bedrooms') {
//             return `${value} BHK`;
//         }
//         if (category === 'bathrooms') {
//             return `${value} Bath${value > 1 ? 's' : ''}`;
//         }
//         return value;
//     };

//     const FilterButton = ({ category, value, isSelected, onClick }) => (
//         <button
//             className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isSelected
//                     ? 'bg-blue-600 text-white shadow-sm'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//             onClick={onClick}
//         >
//             {isSelected && (
//                 <svg
//                     className="w-4 h-4 mr-1.5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                 >
//                     <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                     />
//                 </svg>
//             )}
//             {formatValue(category, value)}
//         </button>
//     );

//     if (loading) {
//         return (
//             <div className="max-w-4xl mx-auto p-6 bg-white">
//                 <div className="flex items-center justify-center py-12">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                     <span className="ml-3 text-gray-600">Loading search history...</span>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="max-w-4xl mx-auto p-6 bg-white">
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                     <div className="flex">
//                         <div className="flex-shrink-0">
//                             <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                             </svg>
//                         </div>
//                         <div className="ml-3">
//                             <h3 className="text-sm font-medium text-red-800">Error</h3>
//                             <p className="mt-1 text-sm text-red-700">{error}</p>
//                             <button
//                                 onClick={fetchSearchHistory}
//                                 className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
//                             >
//                                 Try again
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (!Object.keys(combinedFilters).length) {
//         return (
//             <div className="max-w-4xl mx-auto p-6 bg-white">
//                 <div className="text-center py-12">
//                     <div className="text-gray-400 mb-4">
//                         <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No search history found</h3>
//                     <p className="text-gray-600">Start searching to see your applied filters here.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white">
//             {/* Header */}
//             <div className="mb-8">
//                 <h1 className="text-2xl font-bold text-gray-900 mb-2">Applied Filters</h1>
//                 <p className="text-gray-600">Filters from your recent searches</p>
//             </div>

//             {/* Filter Sections */}
//             <div className="space-y-6">
//                 {Object.entries(combinedFilters).map(([category, values]) => (
//                     <div key={category} className="bg-gray-50 rounded-lg p-4">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                             {getCategoryDisplayName(category)}
//                         </h3>
//                         <div className="flex flex-wrap gap-2">
//                             {values.map((value) => {
//                                 const key = `${category}_${value}`;
//                                 return (
//                                     <FilterButton
//                                         key={key}
//                                         category={category}
//                                         value={value}
//                                         isSelected={selectedFilters[key]}
//                                         onClick={() => toggleFilter(category, value)}
//                                     />
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Summary */}
//             <div className="mt-8 p-4 bg-blue-50 rounded-lg">
//                 <h4 className="font-semibold text-blue-900 mb-2">Filter Summary</h4>
//                 <p className="text-blue-700 text-sm">
//                     Search History Entries: {searchHistory.length} |
//                     Filter Categories: {Object.keys(combinedFilters).length} |
//                     Total Filters: {Object.values(combinedFilters).reduce((sum, arr) => sum + arr.length, 0)} |
//                     Selected: {Object.values(selectedFilters).filter(Boolean).length}
//                 </p>
//             </div>
//         </div>
//     );
// }
// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { base_url } from "../utils/baseurl";

// export default function FilterChipsUI() {
//     const [searchHistory, setSearchHistory] = useState([]);
//     const [selectedFilters, setSelectedFilters] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);


//     const id = "68bfe70b4faf3348f5f13a7b"; // Replace with actual user ID

//     // Fetch search history data
//     const fetchSearchHistory = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             const response = await axios.get(
//                 `${base_url}/api/users/search-history/${id}/search/history`,
//                 {
//                     params: {
//                         limit: 50,
//                     },
//                 }
//             );

//             if (response.data.success) {
//                 setSearchHistory(response.data.searchHistory || []);
//             } else {
//                 setError(response.data.message || "Failed to fetch search history");
//             }
//         } catch (err) {
//             console.error("Error fetching search history:", err);
//             setError(
//                 err.response?.data?.message ||
//                 "Something went wrong while fetching search history"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchSearchHistory();
//     }, []);

//     // Extract and combine all unique applied filters
//     const combinedFilters = useMemo(() => {
//         if (!searchHistory.length) return {};

//         const allFilters = {};

//         searchHistory.forEach(item => {
//             if (item.appliedFilters) {
//                 Object.entries(item.appliedFilters).forEach(([key, value]) => {
//                     if (!allFilters[key]) {
//                         allFilters[key] = new Set();
//                     }

//                     if (Array.isArray(value)) {
//                         value.forEach(v => allFilters[key].add(String(v)));
//                     } else if (value !== null && value !== undefined) {
//                         allFilters[key].add(String(value));
//                     }
//                 });
//             }
//         });

//         // Convert Sets back to arrays and sort
//         Object.keys(allFilters).forEach(key => {
//             allFilters[key] = Array.from(allFilters[key]).sort();
//         });

//         return allFilters;
//     }, [searchHistory]);

//     // Initialize selected filters when combinedFilters changes
//     useEffect(() => {
//         const initialSelected = {};
//         Object.entries(combinedFilters).forEach(([category, values]) => {
//             values.forEach(value => {
//                 const key = `${category}_${value}`;
//                 initialSelected[key] = true;
//             });
//         });
//         setSelectedFilters(initialSelected);
//     }, [combinedFilters]);

//     const toggleFilter = (category, value) => {
//         const key = `${category}_${value}`;
//         setSelectedFilters(prev => ({
//             ...prev,
//             [key]: !prev[key]
//         }));
//     };

//     // Category display names
//     const getCategoryDisplayName = (category) => {
//         const displayNames = {
//             onLocation: "Location",
//             bedrooms: "Bedrooms",
//             bathrooms: "Bathrooms",
//             priceMin: "Min Price",
//             priceMax: "Max Price",
//             facing: "Facing Direction",
//             religiousNearby: "Religious Places",
//             type_name: "Property Type",
//             purpose: "Purpose",
//             searchTerm: "Search Term",
//             searchType: "Search Type"
//         };
//         return displayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
//     };

//     // Format value for display
//     const formatValue = (category, value) => {
//         if (category === 'priceMin' || category === 'priceMax') {
//             const numValue = parseInt(value);
//             if (numValue >= 10000000) {
//                 return `₹${(numValue / 10000000).toFixed(1)}Cr`;
//             } else if (numValue >= 100000) {
//                 return `₹${(numValue / 100000).toFixed(1)}L`;
//             } else {
//                 return `₹${(numValue / 1000).toFixed(0)}K`;
//             }
//         }
//         if (category === 'bedrooms') {
//             return `${value} BHK`;
//         }
//         if (category === 'bathrooms') {
//             return `${value} Bath${value > 1 ? 's' : ''}`;
//         }
//         return value;
//     };

//     const FilterButton = ({ category, value, isSelected, onClick }) => (
//         <button
//             className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 min-w-0 ${isSelected
//                     ? 'bg-blue-600 text-white border-blue-600 shadow-sm hover:bg-blue-700 hover:border-blue-700'
//                     : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
//                 }`}
//             onClick={onClick}
//         >
//             {isSelected && (
//                 <svg
//                     className="w-4 h-4 mr-1.5 flex-shrink-0"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                 >
//                     <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                     />
//                 </svg>
//             )}
//             <span className="truncate">{formatValue(category, value)}</span>
//         </button>
//     );

//     if (loading) {
//         return (
//             <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//                 <div className="flex items-center justify-center py-12">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                     <span className="ml-3 text-gray-600">Loading search history...</span>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                     <div className="flex">
//                         <div className="flex-shrink-0">
//                             <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                             </svg>
//                         </div>
//                         <div className="ml-3">
//                             <h3 className="text-sm font-medium text-red-800">Error</h3>
//                             <p className="mt-1 text-sm text-red-700">{error}</p>
//                             <button
//                                 onClick={fetchSearchHistory}
//                                 className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
//                             >
//                                 Try again
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (!Object.keys(combinedFilters).length) {
//         return (
//             <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//                 <div className="text-center py-12">
//                     <div className="text-gray-400 mb-4">
//                         <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No search history found</h3>
//                     <p className="text-gray-600">Start searching to see your applied filters here.</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//             {/* Header */}
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Applied Filters</h1>
//                 <p className="text-gray-600 text-lg">Filters from your recent searches</p>
//             </div>

//             {/* Filter Sections */}
//             <div className="space-y-8">
//                 {Object.entries(combinedFilters).map(([category, values]) => (
//                     <div key={category} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//                         <div className="border-b border-gray-200 pb-3 mb-6">
//                             <h2 className="text-xl font-bold text-gray-900">
//                                 {getCategoryDisplayName(category)}
//                             </h2>
//                         </div>
//                         <div className="flex flex-wrap gap-3">
//                             {values.map((value) => {
//                                 const key = `${category}_${value}`;
//                                 return (
//                                     <FilterButton
//                                         key={key}
//                                         category={category}
//                                         value={value}
//                                         isSelected={selectedFilters[key]}
//                                         onClick={() => toggleFilter(category, value)}
//                                     />
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Summary */}
//             <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
//                 <h4 className="text-lg font-bold text-gray-900 mb-3">Filter Summary</h4>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                     <div className="text-center p-3 bg-blue-50 rounded-lg">
//                         <div className="text-2xl font-bold text-blue-600">{searchHistory.length}</div>
//                         <div className="text-gray-600">Search Entries</div>
//                     </div>
//                     <div className="text-center p-3 bg-green-50 rounded-lg">
//                         <div className="text-2xl font-bold text-green-600">{Object.keys(combinedFilters).length}</div>
//                         <div className="text-gray-600">Categories</div>
//                     </div>
//                     <div className="text-center p-3 bg-purple-50 rounded-lg">
//                         <div className="text-2xl font-bold text-purple-600">
//                             {Object.values(combinedFilters).reduce((sum, arr) => sum + arr.length, 0)}
//                         </div>
//                         <div className="text-gray-600">Total Filters</div>
//                     </div>
//                     <div className="text-center p-3 bg-orange-50 rounded-lg">
//                         <div className="text-2xl font-bold text-orange-600">
//                             {Object.values(selectedFilters).filter(Boolean).length}
//                         </div>
//                         <div className="text-gray-600">Selected</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { base_url } from "../utils/baseurl";

export default function FilterChipsUI() {
    const [searchHistory, setSearchHistory] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const id = "68bfe70b4faf3348f5f13a7b"; // Replace with actual user ID

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
        fetchSearchHistory();
    }, []);

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

    const FilterButton = ({ category, value, isSelected, onClick }) => (
        <button
            className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-normal transition-all duration-200 border-2 relative ${isSelected
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
            onClick={onClick}
        >
            {isSelected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                    <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            )}
            <span>{formatValue(category, value)}</span>
        </button>
    );

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6 bg-white">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Loading search history...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-6 bg-white">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <p className="mt-1 text-sm text-red-700">{error}</p>
                            <button
                                onClick={fetchSearchHistory}
                                className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!Object.keys(combinedFilters).length) {
        return (
            <div className="max-w-6xl mx-auto p-6 bg-white">
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No search history found</h3>
                    <p className="text-gray-600">Start searching to see your applied filters here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-black mb-1">Applied Filters</h1>
                <p className="text-gray-500">Filters from your recent searches</p>
            </div>

            {/* Filter Sections */}
            <div className="space-y-6">
                {Object.entries(combinedFilters).map(([category, values]) => (
                    <div key={category} className="pb-4 border-b border-gray-100 last:border-b-0">
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

            {/* Summary */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Filter Summary</h4>
                <p className="text-gray-600 text-sm">
                    Search History Entries: {searchHistory.length} |
                    Filter Categories: {Object.keys(combinedFilters).length} |
                    Total Filters: {Object.values(combinedFilters).reduce((sum, arr) => sum + arr.length, 0)} |
                    Selected: {Object.values(selectedFilters).filter(Boolean).length}
                </p>
            </div>
        </div>
    );
}