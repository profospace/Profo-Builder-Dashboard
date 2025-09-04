// // import React, { useState, useEffect } from 'react';
// // import { base_url } from '../utils/baseurl';

// // const CallbackRequests = () => {
// //     const [loading, setLoading] = useState(true);
// //     const [callbacks, setCallbacks] = useState([]);
// //     const [pagination, setPagination] = useState({
// //         current: 1,
// //         total: 1,
// //         totalRecords: 0
// //     });
// //     const [status, setStatus] = useState('');
// //     const [page, setPage] = useState(1);
// //     const [limit, setLimit] = useState(10);
// //     const [builderId] = useState('67bb17484e27e62569bcfd17');

// //     useEffect(() => {
// //         fetchCallbacks();
// //     }, [builderId, status, page, limit]);

// //     const fetchCallbacks = async () => {
// //         try {
// //             setLoading(true);
// //             const response = await fetch(
// //                 `${base_url}/api/callback/builder/${builderId}`
// //             );
// //             const result = await response.json();

// //             if (result.success) {
// //                 setCallbacks(result.data);
// //                 setPagination(result.pagination);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching callbacks:', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleStatusChange = (e) => {
// //         setStatus(e.target.value);
// //         setPage(1);
// //     };

// //     const handlePageChange = (newPage) => {
// //         if (newPage > 0 && newPage <= pagination.total) {
// //             setPage(newPage);
// //         }
// //     };

// //     const formatDate = (dateString) => {
// //         const options = {
// //             year: 'numeric',
// //             month: 'short',
// //             day: 'numeric',
// //             hour: '2-digit',
// //             minute: '2-digit'
// //         };
// //         return new Date(dateString).toLocaleDateString('en-US', options);
// //     };

// //     const getStatusClass = (status) => {
// //         switch (status) {
// //             case 'PENDING':
// //                 return 'bg-yellow-100 text-yellow-800';
// //             case 'COMPLETED':
// //                 return 'bg-green-100 text-green-800';
// //             case 'CANCELLED':
// //                 return 'bg-red-100 text-red-800';
// //             default:
// //                 return 'bg-gray-100 text-gray-800';
// //         }
// //     };

// //     return (
// //         <div className="w-full p-4 rounded-lg shadow-md bg-white text-black">
// //             <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
// //                 <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-blue-900">Callback Requests</h2>

// //                 <div className="flex flex-col sm:flex-row gap-3">
// //                     <select
// //                         value={status}
// //                         onChange={handleStatusChange}
// //                         className="rounded-md px-3 py-2 text-sm bg-gray-50 border border-stroke focus:outline-none focus:ring-1 focus:ring-primary"
// //                     >
// //                         <option value="">All Status</option>
// //                         <option value="PENDING">Pending</option>
// //                         <option value="COMPLETED">Completed</option>
// //                         <option value="CANCELLED">Cancelled</option>
// //                     </select>

// //                     <select
// //                         value={limit}
// //                         onChange={(e) => setLimit(Number(e.target.value))}
// //                         className="rounded-md px-3 py-2 text-sm bg-gray-50 border border-stroke focus:outline-none focus:ring-1 focus:ring-primary"
// //                     >
// //                         <option value={5}>5 per page</option>
// //                         <option value={10}>10 per page</option>
// //                         <option value={25}>25 per page</option>
// //                         <option value={50}>50 per page</option>
// //                     </select>
// //                 </div>
// //             </div>

// //             {loading ? (
// //                 <div className="flex justify-center items-center py-10">
// //                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
// //                 </div>
// //             ) : callbacks.length === 0 ? (
// //                 <div className="text-center py-10 text-gray-500">
// //                     No callback requests found
// //                 </div>
// //             ) : (
// //                 <>
// //                     <div className="overflow-x-auto">
// //                         <table className="w-full min-w-full text-black">
// //                             <thead className="text-xs uppercase bg-gray-50 text-gray-700">
// //                                 <tr>
// //                                     <th className="px-6 py-3 text-left">ID</th>
// //                                     <th className="px-6 py-3 text-left">Phone Number</th>
// //                                     <th className="px-6 py-3 text-left">Requested Time</th>
// //                                     <th className="px-6 py-3 text-left">Status</th>
// //                                     <th className="px-6 py-3 text-left">Created At</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody className="divide-y divide-gray-200">
// //                                 {callbacks.map((callback) => (
// //                                     <tr
// //                                         key={callback._id}
// //                                         className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
// //                                     >
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {callback._id.substring(0, 8)}...
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {callback.phoneNumber}
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {callback.requestedTime}
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(callback.status)}`}>
// //                                                 {callback.status}
// //                                             </span>
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {formatDate(callback.createdAt)}
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>

// //                     {/* Pagination */}
// //                     <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4">
// //                         <div className="text-sm text-gray-700 mb-4 sm:mb-0">
// //                             Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, pagination.totalRecords)} of {pagination.totalRecords} results
// //                         </div>

// //                         <div className="flex space-x-1">
// //                             <button
// //                                 onClick={() => handlePageChange(1)}
// //                                 disabled={page === 1}
// //                                 className={`px-3 py-1 rounded ${page === 1 ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 First
// //                             </button>
// //                             <button
// //                                 onClick={() => handlePageChange(page - 1)}
// //                                 disabled={page === 1}
// //                                 className={`px-3 py-1 rounded ${page === 1 ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 Prev
// //                             </button>

// //                             {Array.from({ length: Math.min(5, pagination.total) }, (_, i) => {
// //                                 let pageNumber;

// //                                 if (pagination.total <= 5) {
// //                                     pageNumber = i + 1;
// //                                 } else if (page <= 3) {
// //                                     pageNumber = i + 1;
// //                                 } else if (page >= pagination.total - 2) {
// //                                     pageNumber = pagination.total - 4 + i;
// //                                 } else {
// //                                     pageNumber = page - 2 + i;
// //                                 }

// //                                 return (
// //                                     <button
// //                                         key={i}
// //                                         onClick={() => handlePageChange(pageNumber)}
// //                                         className={`px-3 py-1 rounded ${page === pageNumber ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                                     >
// //                                         {pageNumber}
// //                                     </button>
// //                                 );
// //                             })}

// //                             <button
// //                                 onClick={() => handlePageChange(page + 1)}
// //                                 disabled={page === pagination.total}
// //                                 className={`px-3 py-1 rounded ${page === pagination.total ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 Next
// //                             </button>
// //                             <button
// //                                 onClick={() => handlePageChange(pagination.total)}
// //                                 disabled={page === pagination.total}
// //                                 className={`px-3 py-1 rounded ${page === pagination.total ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 Last
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default CallbackRequests;


// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getAllCallbacks, updateCallbackStatus, deleteCallback, clearCallbacksError } from '../features/callbacks/callbacksSlice';

// // const CallbackRequests = () => {
// //     const dispatch = useDispatch();

// //     // Redux state
// //     const { callbacks, pagination, isLoading, isError, message } = useSelector(state => state.callbacks);
// //     const { user } = useSelector(state => state.auth);

// //     console.log("callbacks", callbacks)

// //     // Local state
// //     const [status, setStatus] = useState('');
// //     const [page, setPage] = useState(1);
// //     const [limit, setLimit] = useState(10);

// //     // Get builder ID from user
// //     const builderId = user?.id;

// //     useEffect(() => {
// //         if (builderId) {
// //             fetchCallbacks();
// //         }
// //     }, [builderId, status, page, limit]);

// //     useEffect(() => {
// //         // Clear error when component unmounts
// //         return () => {
// //             if (isError) {
// //                 dispatch(clearCallbacksError());
// //             }
// //         };
// //     }, []);

// //     const fetchCallbacks = () => {
// //         if (builderId) {
// //             dispatch(getAllCallbacks({ builderId, status, page, limit }));
// //         }
// //     };

// //     const handleStatusChange = (e) => {
// //         setStatus(e.target.value);
// //         setPage(1);
// //     };

// //     const handlePageChange = (newPage) => {
// //         if (newPage > 0 && newPage <= pagination.total) {
// //             setPage(newPage);
// //         }
// //     };

// //     const handleUpdateStatus = async (callbackId, newStatus) => {
// //         try {
// //             await dispatch(updateCallbackStatus({ callbackId, status: newStatus })).unwrap();
// //             // Optionally refresh the data
// //             fetchCallbacks();
// //         } catch (error) {
// //             console.error('Error updating callback status:', error);
// //         }
// //     };

// //     const handleDeleteCallback = async (callbackId) => {
// //         if (window.confirm('Are you sure you want to delete this callback request?')) {
// //             try {
// //                 await dispatch(deleteCallback(callbackId)).unwrap();
// //                 // If we're on the last page and it becomes empty, go to previous page
// //                 if (callbacks.length === 1 && page > 1) {
// //                     setPage(page - 1);
// //                 } else {
// //                     fetchCallbacks();
// //                 }
// //             } catch (error) {
// //                 console.error('Error deleting callback:', error);
// //             }
// //         }
// //     };

// //     const formatDate = (dateString) => {
// //         const options = {
// //             year: 'numeric',
// //             month: 'short',
// //             day: 'numeric',
// //             hour: '2-digit',
// //             minute: '2-digit'
// //         };
// //         return new Date(dateString).toLocaleDateString('en-US', options);
// //     };

// //     const getStatusClass = (status) => {
// //         switch (status) {
// //             case 'PENDING':
// //                 return 'bg-yellow-100 text-yellow-800';
// //             case 'COMPLETED':
// //                 return 'bg-green-100 text-green-800';
// //             case 'CANCELLED':
// //                 return 'bg-red-100 text-red-800';
// //             default:
// //                 return 'bg-gray-100 text-gray-800';
// //         }
// //     };

// //     // Show error message if no user or builder ID
// //     if (!user || !builderId) {
// //         return (
// //             <div className="w-full p-4 rounded-lg shadow-md bg-white text-black">
// //                 <div className="text-center py-10 text-red-500">
// //                     Please log in to view callback requests
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="w-full p-4 rounded-lg shadow-md bg-white text-black">
// //             <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
// //                 <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-blue-900">Callback Requests</h2>

// //                 <div className="flex flex-col sm:flex-row gap-3">
// //                     <select
// //                         value={status}
// //                         onChange={handleStatusChange}
// //                         className="rounded-md px-3 py-2 text-sm bg-gray-50 border border-stroke focus:outline-none focus:ring-1 focus:ring-primary"
// //                     >
// //                         <option value="">All Status</option>
// //                         <option value="PENDING">Pending</option>
// //                         <option value="COMPLETED">Completed</option>
// //                         <option value="CANCELLED">Cancelled</option>
// //                     </select>

// //                     <select
// //                         value={limit}
// //                         onChange={(e) => setLimit(Number(e.target.value))}
// //                         className="rounded-md px-3 py-2 text-sm bg-gray-50 border border-stroke focus:outline-none focus:ring-1 focus:ring-primary"
// //                     >
// //                         <option value={5}>5 per page</option>
// //                         <option value={10}>10 per page</option>
// //                         <option value={25}>25 per page</option>
// //                         <option value={50}>50 per page</option>
// //                     </select>
// //                 </div>
// //             </div>

// //             {/* Error Message */}
// //             {isError && message && (
// //                 <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
// //                     {message}
// //                 </div>
// //             )}

// //             {isLoading ? (
// //                 <div className="flex justify-center items-center py-10">
// //                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
// //                 </div>
// //             ) : callbacks.length === 0 ? (
// //                 <div className="text-center py-10 text-gray-500">
// //                     No callback requests found
// //                 </div>
// //             ) : (
// //                 <>
// //                     <div className="overflow-x-auto">
// //                         <table className="w-full min-w-full text-black">
// //                             <thead className="text-xs uppercase bg-gray-50 text-gray-700">
// //                                 <tr>
// //                                     <th className="px-6 py-3 text-left">Name</th>
// //                                     <th className="px-6 py-3 text-left">Phone Number</th>
// //                                     <th className="px-6 py-3 text-left">Requested Time</th>
// //                                     <th className="px-6 py-3 text-left">Status</th>
// //                                     <th className="px-6 py-3 text-left">Created At</th>
// //                                     {/* <th className="px-6 py-3 text-left">Actions</th> */}
// //                                 </tr>
// //                             </thead>
// //                             <tbody className="divide-y divide-gray-200">
// //                                 {callbacks.map((callback) => (
// //                                     <tr
// //                                         key={callback._id}
// //                                         className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
// //                                     >
// //                                          <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {callback.userName}
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {callback.phoneNumber}
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {callback.requestedTime}
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(callback.status)}`}>
// //                                                 {callback.status}
// //                                             </span>
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {formatDate(callback.createdAt)}
// //                                         </td>
// //                                         {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             <div className="flex space-x-2">
// //                                                 {callback.status === 'PENDING' && (
// //                                                     <>
// //                                                         <button
// //                                                             onClick={() => handleUpdateStatus(callback._id, 'COMPLETED')}
// //                                                             className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
// //                                                         >
// //                                                             Complete
// //                                                         </button>
// //                                                         <button
// //                                                             onClick={() => handleUpdateStatus(callback._id, 'CANCELLED')}
// //                                                             className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
// //                                                         >
// //                                                             Cancel
// //                                                         </button>
// //                                                     </>
// //                                                 )}
// //                                                 <button
// //                                                     onClick={() => handleDeleteCallback(callback._id)}
// //                                                     className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
// //                                                 >
// //                                                     Delete
// //                                                 </button>
// //                                             </div>
// //                                         </td> */}
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>

// //                     {/* Pagination */}
// //                     <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4">
// //                         <div className="text-sm text-gray-700 mb-4 sm:mb-0">
// //                             Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, pagination.totalRecords)} of {pagination.totalRecords} results
// //                         </div>

// //                         <div className="flex space-x-1">
// //                             <button
// //                                 onClick={() => handlePageChange(1)}
// //                                 disabled={page === 1}
// //                                 className={`px-3 py-1 rounded ${page === 1 ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 First
// //                             </button>
// //                             <button
// //                                 onClick={() => handlePageChange(page - 1)}
// //                                 disabled={page === 1}
// //                                 className={`px-3 py-1 rounded ${page === 1 ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 Prev
// //                             </button>

// //                             {Array.from({ length: Math.min(5, pagination.total) }, (_, i) => {
// //                                 let pageNumber;

// //                                 if (pagination.total <= 5) {
// //                                     pageNumber = i + 1;
// //                                 } else if (page <= 3) {
// //                                     pageNumber = i + 1;
// //                                 } else if (page >= pagination.total - 2) {
// //                                     pageNumber = pagination.total - 4 + i;
// //                                 } else {
// //                                     pageNumber = page - 2 + i;
// //                                 }

// //                                 return (
// //                                     <button
// //                                         key={i}
// //                                         onClick={() => handlePageChange(pageNumber)}
// //                                         className={`px-3 py-1 rounded ${page === pageNumber ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                                     >
// //                                         {pageNumber}
// //                                     </button>
// //                                 );
// //                             })}

// //                             <button
// //                                 onClick={() => handlePageChange(page + 1)}
// //                                 disabled={page === pagination.total}
// //                                 className={`px-3 py-1 rounded ${page === pagination.total ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 Next
// //                             </button>
// //                             <button
// //                                 onClick={() => handlePageChange(pagination.total)}
// //                                 disabled={page === pagination.total}
// //                                 className={`px-3 py-1 rounded ${page === pagination.total ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 Last
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default CallbackRequests;



// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getAllCallbacks, updateCallbackStatus, deleteCallback, clearCallbacksError } from '../features/callbacks/callbacksSlice';

// // const CallbackRequests = () => {
// //     const dispatch = useDispatch();

// //     // Redux state
// //     const { callbacks, pagination, isLoading, isError, message } = useSelector(state => state.callbacks);
// //     const { user } = useSelector(state => state.auth);

// //     console.log("callbacks", callbacks)

// //     // Local state
// //     const [status, setStatus] = useState('');
// //     const [page, setPage] = useState(1);
// //     const [limit, setLimit] = useState(10);

// //     // Get builder ID from user
// //     const builderId = user?.id;

// //     useEffect(() => {
// //         if (builderId) {
// //             fetchCallbacks();
// //         }
// //     }, [builderId, status, page, limit]);

// //     useEffect(() => {
// //         // Clear error when component unmounts
// //         return () => {
// //             if (isError) {
// //                 dispatch(clearCallbacksError());
// //             }
// //         };
// //     }, []);

// //     const fetchCallbacks = () => {
// //         if (builderId) {
// //             dispatch(getAllCallbacks({ builderId, status, page, limit }));
// //         }
// //     };

// //     const handleStatusChange = (e) => {
// //         setStatus(e.target.value);
// //         setPage(1);
// //     };

// //     const handlePageChange = (newPage) => {
// //         if (newPage > 0 && newPage <= pagination.total) {
// //             setPage(newPage);
// //         }
// //     };

// //     const handleUpdateStatus = async (callbackId, newStatus) => {
// //         try {
// //             await dispatch(updateCallbackStatus({ callbackId, status: newStatus })).unwrap();
// //             // Optionally refresh the data
// //             fetchCallbacks();
// //         } catch (error) {
// //             console.error('Error updating callback status:', error);
// //         }
// //     };

// //     const handleDeleteCallback = async (callbackId) => {
// //         if (window.confirm('Are you sure you want to delete this callback request?')) {
// //             try {
// //                 await dispatch(deleteCallback(callbackId)).unwrap();
// //                 // If we're on the last page and it becomes empty, go to previous page
// //                 if (callbacks.length === 1 && page > 1) {
// //                     setPage(page - 1);
// //                 } else {
// //                     fetchCallbacks();
// //                 }
// //             } catch (error) {
// //                 console.error('Error deleting callback:', error);
// //             }
// //         }
// //     };

// //     const handleCallDialer = (phoneNumber) => {
// //         if (!phoneNumber) {
// //             return;
// //         }

// //         // Clean the phone number (remove spaces, dashes, etc.)
// //         const cleanedNumber = phoneNumber.replace(/[^\d+]/g, '');

// //         // Directly initiate call using tel: protocol
// //         window.location.href = `tel:${cleanedNumber}`;
// //     };

// //     const formatDate = (dateString) => {
// //         const options = {
// //             year: 'numeric',
// //             month: 'short',
// //             day: 'numeric',
// //             hour: '2-digit',
// //             minute: '2-digit'
// //         };
// //         return new Date(dateString).toLocaleDateString('en-US', options);
// //     };

// //     const getStatusClass = (status) => {
// //         switch (status) {
// //             case 'PENDING':
// //                 return 'bg-yellow-100 text-yellow-800';
// //             case 'COMPLETED':
// //                 return 'bg-green-100 text-green-800';
// //             case 'CANCELLED':
// //                 return 'bg-red-100 text-red-800';
// //             default:
// //                 return 'bg-gray-100 text-gray-800';
// //         }
// //     };

// //     // Show error message if no user or builder ID
// //     if (!user || !builderId) {
// //         return (
// //             <div className="w-full p-4 rounded-lg shadow-md bg-white text-black">
// //                 <div className="text-center py-10 text-red-500">
// //                     Please log in to view callback requests
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="w-full p-4 rounded-lg shadow-md bg-white text-black">
// //             <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
// //                 <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-blue-900">Callback Requests</h2>

// //                 <div className="flex flex-col sm:flex-row gap-3">
// //                     <select
// //                         value={status}
// //                         onChange={handleStatusChange}
// //                         className="rounded-md px-3 py-2 text-sm bg-gray-50 border border-stroke focus:outline-none focus:ring-1 focus:ring-primary"
// //                     >
// //                         <option value="">All Status</option>
// //                         <option value="PENDING">Pending</option>
// //                         <option value="COMPLETED">Completed</option>
// //                         <option value="CANCELLED">Cancelled</option>
// //                     </select>

// //                     <select
// //                         value={limit}
// //                         onChange={(e) => setLimit(Number(e.target.value))}
// //                         className="rounded-md px-3 py-2 text-sm bg-gray-50 border border-stroke focus:outline-none focus:ring-1 focus:ring-primary"
// //                     >
// //                         <option value={5}>5 per page</option>
// //                         <option value={10}>10 per page</option>
// //                         <option value={25}>25 per page</option>
// //                         <option value={50}>50 per page</option>
// //                     </select>
// //                 </div>
// //             </div>

// //             {/* Error Message */}
// //             {isError && message && (
// //                 <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
// //                     {message}
// //                 </div>
// //             )}

// //             {isLoading ? (
// //                 <div className="flex justify-center items-center py-10">
// //                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
// //                 </div>
// //             ) : callbacks.length === 0 ? (
// //                 <div className="text-center py-10 text-gray-500">
// //                     No callback requests found
// //                 </div>
// //             ) : (
// //                 <>
// //                     <div className="overflow-x-auto">
// //                         <table className="w-full min-w-full text-black">
// //                             <thead className="text-xs uppercase bg-gray-50 text-gray-700">
// //                                 <tr>
// //                                     <th className="px-6 py-3 text-left">Name</th>
// //                                     <th className="px-6 py-3 text-left">Phone Number</th>
// //                                     <th className="px-6 py-3 text-left">Requested Time</th>
// //                                     <th className="px-6 py-3 text-left">Status</th>
// //                                     <th className="px-6 py-3 text-left">Created At</th>
// //                                     <th className="px-6 py-3 text-left">Actions</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody className="divide-y divide-gray-200">
// //                                 {callbacks.map((callback) => (
// //                                     <tr
// //                                         key={callback._id}
// //                                         className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
// //                                     >
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {callback.userName}
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {callback.phoneNumber}
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {callback.requestedTime}
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(callback.status)}`}>
// //                                                 {callback.status}
// //                                             </span>
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             {formatDate(callback.createdAt)}
// //                                         </td>
// //                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                                             <button
// //                                                 onClick={() => handleCallDialer(callback.phoneNumber)}
// //                                                 className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-1"
// //                                                 title="Call"
// //                                             >
// //                                                 <svg
// //                                                     className="w-3 h-3"
// //                                                     fill="none"
// //                                                     stroke="currentColor"
// //                                                     viewBox="0 0 24 24"
// //                                                 >
// //                                                     <path
// //                                                         strokeLinecap="round"
// //                                                         strokeLinejoin="round"
// //                                                         strokeWidth={2}
// //                                                         d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
// //                                                     />
// //                                                 </svg>
// //                                                 <span>Call</span>
// //                                             </button>
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>

// //                     {/* Pagination */}
// //                     <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4">
// //                         <div className="text-sm text-gray-700 mb-4 sm:mb-0">
// //                             Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, pagination.totalRecords)} of {pagination.totalRecords} results
// //                         </div>

// //                         <div className="flex space-x-1">
// //                             <button
// //                                 onClick={() => handlePageChange(1)}
// //                                 disabled={page === 1}
// //                                 className={`px-3 py-1 rounded ${page === 1 ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 First
// //                             </button>
// //                             <button
// //                                 onClick={() => handlePageChange(page - 1)}
// //                                 disabled={page === 1}
// //                                 className={`px-3 py-1 rounded ${page === 1 ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 Prev
// //                             </button>

// //                             {Array.from({ length: Math.min(5, pagination.total) }, (_, i) => {
// //                                 let pageNumber;

// //                                 if (pagination.total <= 5) {
// //                                     pageNumber = i + 1;
// //                                 } else if (page <= 3) {
// //                                     pageNumber = i + 1;
// //                                 } else if (page >= pagination.total - 2) {
// //                                     pageNumber = pagination.total - 4 + i;
// //                                 } else {
// //                                     pageNumber = page - 2 + i;
// //                                 }

// //                                 return (
// //                                     <button
// //                                         key={i}
// //                                         onClick={() => handlePageChange(pageNumber)}
// //                                         className={`px-3 py-1 rounded ${page === pageNumber ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                                     >
// //                                         {pageNumber}
// //                                     </button>
// //                                 );
// //                             })}

// //                             <button
// //                                 onClick={() => handlePageChange(page + 1)}
// //                                 disabled={page === pagination.total}
// //                                 className={`px-3 py-1 rounded ${page === pagination.total ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 Next
// //                             </button>
// //                             <button
// //                                 onClick={() => handlePageChange(pagination.total)}
// //                                 disabled={page === pagination.total}
// //                                 className={`px-3 py-1 rounded ${page === pagination.total ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
// //                             >
// //                                 Last
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default CallbackRequests;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllCallbacks, updateCallbackStatus, deleteCallback, clearCallbacksError } from '../features/callbacks/callbacksSlice';

// const CallbackRequests = () => {
//     const dispatch = useDispatch();

//     // Redux state
//     const { callbacks, pagination, isLoading, isError, message } = useSelector(state => state.callbacks);
//     const { user } = useSelector(state => state.auth);

//     console.log("callbacks", callbacks)

//     // Local state
//     const [status, setStatus] = useState('');
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [showStatusModal, setShowStatusModal] = useState(false);
//     const [selectedCallback, setSelectedCallback] = useState(null);
//     const [newStatus, setNewStatus] = useState('');

//     // Get builder ID from user
//     const builderId = user?.id;

//     useEffect(() => {
//         if (builderId) {
//             fetchCallbacks();
//         }
//     }, [builderId]);

//     useEffect(() => {
//         // Clear error when component unmounts
//         return () => {
//             if (isError) {
//                 dispatch(clearCallbacksError());
//             }
//         };
//     }, []);

//     const fetchCallbacks = () => {
//         if (builderId) {
//             dispatch(getAllCallbacks({ builderId, status, page, limit }));
//         }
//     };

//     const handleStatusChange = (e) => {
//         setStatus(e.target.value);
//         setPage(1);
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage > 0 && newPage <= pagination.total) {
//             setPage(newPage);
//         }
//     };

//     const handleUpdateStatus = async (callbackId, newStatus) => {
//         try {
//             await dispatch(updateCallbackStatus({ callbackId, status: newStatus })).unwrap();
//             // Optionally refresh the data
//             fetchCallbacks();
//         } catch (error) {
//             console.error('Error updating callback status:', error);
//         }
//     };

//     const handleCallDialer = (phoneNumber) => {
//         if (!phoneNumber) {
//             return;
//         }

//         // Clean the phone number (remove spaces, dashes, etc.)
//         const cleanedNumber = phoneNumber.replace(/[^\d+]/g, '');

//         // Directly initiate call using tel: protocol
//         window.location.href = `tel:${cleanedNumber}`;
//     };

//     const openStatusModal = (callback) => {
//         setSelectedCallback(callback);
//         setNewStatus(callback.status);
//         setShowStatusModal(true);
//     };

//     const closeStatusModal = () => {
//         setShowStatusModal(false);
//         setSelectedCallback(null);
//         setNewStatus('');
//     };

//     const handleStatusUpdate = async () => {
//         if (selectedCallback && newStatus) {
//             try {
//                 await handleUpdateStatus(selectedCallback._id, newStatus);
//                 closeStatusModal();
//             } catch (error) {
//                 console.error('Error updating status:', error);
//             }
//         }
//     };

//     const formatDate = (dateString) => {
//         const options = {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         };
//         return new Date(dateString).toLocaleDateString('en-US', options);
//     };

//     const getStatusClass = (status) => {
//         switch (status) {
//             case 'PENDING':
//                 return 'bg-yellow-100 text-yellow-800';
//             case 'COMPLETED':
//                 return 'bg-green-100 text-green-800';
//             case 'CANCELLED':
//                 return 'bg-red-100 text-red-800';
//             default:
//                 return 'bg-gray-100 text-gray-800';
//         }
//     };

//     // Show error message if no user or builder ID
//     if (!user || !builderId) {
//         return (
//             <div className="w-full p-4 rounded-lg shadow-md bg-white text-black">
//                 <div className="text-center py-10 text-red-500">
//                     Please log in to view callback requests
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full p-4 rounded-lg shadow-md bg-white text-black">
//             <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
//                 <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-blue-900">Callback Requests</h2>

//                 <div className="flex flex-col sm:flex-row gap-3">
//                     <select
//                         value={status}
//                         onChange={handleStatusChange}
//                         className="rounded-md px-3 py-2 text-sm bg-gray-50 border border-stroke focus:outline-none focus:ring-1 focus:ring-primary"
//                     >
//                         <option value="">All Status</option>
//                         <option value="PENDING">Pending</option>
//                         <option value="COMPLETED">Completed</option>
//                         <option value="CANCELLED">Cancelled</option>
//                     </select>

//                     <select
//                         value={limit}
//                         onChange={(e) => setLimit(Number(e.target.value))}
//                         className="rounded-md px-3 py-2 text-sm bg-gray-50 border border-stroke focus:outline-none focus:ring-1 focus:ring-primary"
//                     >
//                         <option value={5}>5 per page</option>
//                         <option value={10}>10 per page</option>
//                         <option value={25}>25 per page</option>
//                         <option value={50}>50 per page</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Error Message */}
//             {isError && message && (
//                 <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//                     {message}
//                 </div>
//             )}

//             {isLoading ? (
//                 <div className="flex justify-center items-center py-10">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//                 </div>
//             ) : callbacks.length === 0 ? (
//                 <div className="text-center py-10 text-gray-500">
//                     No callback requests found
//                 </div>
//             ) : (
//                 <>
//                     <div className="overflow-hidden">
//                         <table className="w-full min-w-full text-black">
//                             <thead className="text-xs uppercase bg-gray-50 text-gray-700">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left">Name</th>
//                                     <th className="px-6 py-3 text-left">Phone Number</th>
//                                     <th className="px-6 py-3 text-left">Requested Time</th>
//                                     <th className="px-6 py-3 text-left">Status</th>
//                                     <th className="px-6 py-3 text-left">Created At</th>
//                                     <th className="px-6 py-3 text-left">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {callbacks.map((callback) => (
//                                     <tr
//                                         key={callback._id}
//                                         className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
//                                     >
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                             {callback.userName}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                             {callback.phoneNumber}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                             {callback.requestedTime}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(callback.status)}`}>
//                                                 {callback.status}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                             {formatDate(callback.createdAt)}
//                                         </td>
//                                         <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
//                                             <button
//                                                 onClick={() => handleCallDialer(callback.phoneNumber)}
//                                                 className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 inline-flex items-center space-x-1"
//                                                 title="Call"
//                                             >
//                                                 <svg
//                                                     className="w-3 h-3"
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                 >
//                                                     <path
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                         strokeWidth={2}
//                                                         d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                                                     />
//                                                 </svg>
//                                                 <span>Call</span>
//                                             </button>
//                                             <button
//                                                 onClick={() => openStatusModal(callback)}
//                                                 className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 inline-flex items-center space-x-1"
//                                                 title="Update Status"
//                                             >
//                                                 <svg
//                                                     className="w-3 h-3"
//                                                     fill="none"
//                                                     stroke="currentColor"
//                                                     viewBox="0 0 24 24"
//                                                 >
//                                                     <path
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                         strokeWidth={2}
//                                                         d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                                                     />
//                                                 </svg>
//                                                 <span>Update</span>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Status Update Modal */}
//                     {showStatusModal && (
//                         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                             <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
//                                 <h3 className="text-lg font-semibold mb-4 text-gray-900">
//                                     Update Status
//                                 </h3>
//                                 <div className="mb-4">
//                                     <p className="text-sm text-gray-600 mb-2">
//                                         <strong>Name:</strong> {selectedCallback?.userName}
//                                     </p>
//                                     <p className="text-sm text-gray-600 mb-4">
//                                         <strong>Phone:</strong> {selectedCallback?.phoneNumber}
//                                     </p>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Status
//                                     </label>
//                                     <select
//                                         value={newStatus}
//                                         onChange={(e) => setNewStatus(e.target.value)}
//                                         className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                                     >
//                                         <option value="PENDING">Pending</option>
//                                         <option value="COMPLETED">Completed</option>
//                                         <option value="CANCELLED">Cancelled</option>
//                                     </select>
//                                 </div>
//                                 <div className="flex justify-end space-x-3">
//                                     <button
//                                         onClick={closeStatusModal}
//                                         className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={handleStatusUpdate}
//                                         className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//                                     >
//                                         Update Status
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Pagination */}
//                     <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4">
//                         <div className="text-sm text-gray-700 mb-4 sm:mb-0">
//                             Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, pagination.totalRecords)} of {pagination.totalRecords} results
//                         </div>

//                         <div className="flex space-x-1">
//                             <button
//                                 onClick={() => handlePageChange(1)}
//                                 disabled={page === 1}
//                                 className={`px-3 py-1 rounded ${page === 1 ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
//                             >
//                                 First
//                             </button>
//                             <button
//                                 onClick={() => handlePageChange(page - 1)}
//                                 disabled={page === 1}
//                                 className={`px-3 py-1 rounded ${page === 1 ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
//                             >
//                                 Prev
//                             </button>

//                             {Array.from({ length: Math.min(5, pagination.total) }, (_, i) => {
//                                 let pageNumber;

//                                 if (pagination.total <= 5) {
//                                     pageNumber = i + 1;
//                                 } else if (page <= 3) {
//                                     pageNumber = i + 1;
//                                 } else if (page >= pagination.total - 2) {
//                                     pageNumber = pagination.total - 4 + i;
//                                 } else {
//                                     pageNumber = page - 2 + i;
//                                 }

//                                 return (
//                                     <button
//                                         key={i}
//                                         onClick={() => handlePageChange(pageNumber)}
//                                         className={`px-3 py-1 rounded ${page === pageNumber ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
//                                     >
//                                         {pageNumber}
//                                     </button>
//                                 );
//                             })}

//                             <button
//                                 onClick={() => handlePageChange(page + 1)}
//                                 disabled={page === pagination.total}
//                                 className={`px-3 py-1 rounded ${page === pagination.total ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
//                             >
//                                 Next
//                             </button>
//                             <button
//                                 onClick={() => handlePageChange(pagination.total)}
//                                 disabled={page === pagination.total}
//                                 className={`px-3 py-1 rounded ${page === pagination.total ? 'cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
//                             >
//                                 Last
//                             </button>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default CallbackRequests;


import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCallbacks, updateCallbackStatus, deleteCallback, clearCallbacksError } from '../features/callbacks/callbacksSlice';

const CallbackRequests = () => {
    const dispatch = useDispatch();

    // Redux state
    const { callbacks, pagination, isLoading, isError, message } = useSelector(state => state.callbacks);
    const { user } = useSelector(state => state.auth);

    console.log("callbacks", callbacks)

    // Local state
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedCallback, setSelectedCallback] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    // Get builder ID from user
    const builderId = user?.id;

    // Memoized fetch function to prevent unnecessary re-renders
    const fetchCallbacks = useCallback(() => {
        if (builderId) {
            dispatch(getAllCallbacks({ builderId, status, page, limit }));
        }
    }, [dispatch, builderId, status, page, limit]);

    // Fetch callbacks when dependencies change
    useEffect(() => {
        fetchCallbacks();
    }, [fetchCallbacks]);

    // Clear error when component unmounts
    useEffect(() => {
        return () => {
            if (isError) {
                dispatch(clearCallbacksError());
            }
        };
    }, [dispatch, isError]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setPage(1); // Reset to first page when filtering
    };

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setPage(1); // Reset to first page when changing limit
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.total) {
            setPage(newPage);
        }
    };

    const handleUpdateStatus = async (callbackId, newStatus) => {
        try {
            await dispatch(updateCallbackStatus({ callbackId, status: newStatus })).unwrap();
            // Refresh data after successful update
            fetchCallbacks();
        } catch (error) {
            console.error('Error updating callback status:', error);
        }
    };

    const handleCallDialer = (phoneNumber) => {
        if (!phoneNumber) {
            alert('Phone number not available');
            return;
        }

        // Clean the phone number (remove spaces, dashes, etc.)
        const cleanedNumber = phoneNumber.replace(/[^\d+]/g, '');

        if (!cleanedNumber) {
            alert('Invalid phone number');
            return;
        }

        // Directly initiate call using tel: protocol
        window.location.href = `tel:${cleanedNumber}`;
    };

    const openStatusModal = (callback) => {
        setSelectedCallback(callback);
        setNewStatus(callback.status);
        setShowStatusModal(true);
    };

    const closeStatusModal = () => {
        setShowStatusModal(false);
        setSelectedCallback(null);
        setNewStatus('');
    };

    const handleStatusUpdate = async () => {
        if (selectedCallback && newStatus) {
            try {
                await handleUpdateStatus(selectedCallback._id, newStatus);
                closeStatusModal();
            } catch (error) {
                console.error('Error updating status:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const formatRequestedTime = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Helper function to get user name from callback
    const getUserName = (callback) => {
        return callback.user?.name || callback.userName || 'N/A';
    };

    // Helper function to get phone number from callback
    const getPhoneNumber = (callback) => {
        return callback.user?.phone || callback.phoneNumber || 'N/A';
    };

    // Show error message if no user or builder ID
    if (!user || !builderId) {
        return (
            <div className="w-full p-4 rounded-lg shadow-md bg-white text-black">
                <div className="text-center py-10 text-red-500">
                    Please log in to view callback requests
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-4 rounded-lg shadow-md bg-white text-black">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-blue-900">Callback Requests</h2>

                <div className="flex flex-col sm:flex-row gap-3">
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="rounded-md px-3 py-2 text-sm bg-gray-50 border border-stroke focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>

                    <select
                        value={limit}
                        onChange={handleLimitChange}
                        className="rounded-md px-3 py-2 text-sm bg-gray-50 border border-stroke focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={25}>25 per page</option>
                        <option value={50}>50 per page</option>
                    </select>
                </div>
            </div>

            {/* Error Message */}
            {isError && message && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {message}
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : callbacks.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No callback requests found
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full text-black">
                            <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left">Name</th>
                                    <th className="px-6 py-3 text-left">Phone Number</th>
                                    <th className="px-6 py-3 text-left">Requested Time</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Created At</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {callbacks.map((callback) => (
                                    <tr
                                        key={callback._id}
                                        className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {getUserName(callback)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {getPhoneNumber(callback)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {callback.requestedTime ? formatRequestedTime(callback.requestedTime) : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(callback.status)}`}>
                                                {callback.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {formatDate(callback.createdAt)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => handleCallDialer(getPhoneNumber(callback))}
                                                    className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 inline-flex items-center space-x-1"
                                                    title="Call"
                                                    disabled={!getPhoneNumber(callback) || getPhoneNumber(callback) === 'N/A'}
                                                >
                                                    <svg
                                                        className="w-3 h-3"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        />
                                                    </svg>
                                                    <span>Call</span>
                                                </button>
                                                <button
                                                    onClick={() => openStatusModal(callback)}
                                                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 inline-flex items-center space-x-1"
                                                    title="Update Status"
                                                >
                                                    <svg
                                                        className="w-3 h-3"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                    <span>Update</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Status Update Modal */}
                    {showStatusModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
                                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                                    Update Status
                                </h3>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">
                                        <strong>Name:</strong> {getUserName(selectedCallback)}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-4">
                                        <strong>Phone:</strong> {getPhoneNumber(selectedCallback)}
                                    </p>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={closeStatusModal}
                                        className="px-4 py-2 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleStatusUpdate}
                                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination && pagination.total > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4">
                            <div className="text-sm text-gray-700 mb-4 sm:mb-0">
                                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, pagination.totalRecords || 0)} of {pagination.totalRecords || 0} results
                            </div>

                            <div className="flex space-x-1">
                                <button
                                    onClick={() => handlePageChange(1)}
                                    disabled={page === 1}
                                    className={`px-3 py-1 rounded text-sm ${page === 1 ? 'cursor-not-allowed opacity-50 bg-gray-200' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
                                >
                                    First
                                </button>
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className={`px-3 py-1 rounded text-sm ${page === 1 ? 'cursor-not-allowed opacity-50 bg-gray-200' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
                                >
                                    Prev
                                </button>

                                {Array.from({ length: Math.min(5, pagination.total) }, (_, i) => {
                                    let pageNumber;

                                    if (pagination.total <= 5) {
                                        pageNumber = i + 1;
                                    } else if (page <= 3) {
                                        pageNumber = i + 1;
                                    } else if (page >= pagination.total - 2) {
                                        pageNumber = pagination.total - 4 + i;
                                    } else {
                                        pageNumber = page - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`px-3 py-1 rounded text-sm ${page === pageNumber ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === pagination.total}
                                    className={`px-3 py-1 rounded text-sm ${page === pagination.total ? 'cursor-not-allowed opacity-50 bg-gray-200' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
                                >
                                    Next
                                </button>
                                <button
                                    onClick={() => handlePageChange(pagination.total)}
                                    disabled={page === pagination.total}
                                    className={`px-3 py-1 rounded text-sm ${page === pagination.total ? 'cursor-not-allowed opacity-50 bg-gray-200' : 'bg-gray-100 hover:bg-primary hover:text-white'}`}
                                >
                                    Last
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CallbackRequests;