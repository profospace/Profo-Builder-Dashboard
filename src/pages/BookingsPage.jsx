// import React, { useState, useEffect } from 'react';
// import { MapPin, Bed, Bath, Square, Eye, Users, Calendar, CreditCard, Phone, Mail } from 'lucide-react';
// import { useSelector } from 'react-redux';

// function BookingsPage() {
//     const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//     const { properties } = useSelector(state => state.properties)

//     // Set first property as selected by default
//     useEffect(() => {
//         if (properties && properties.length > 0 && selectedPropertyId === null) {
//             setSelectedPropertyId(properties[0]._id);
//         }
//     }, [properties, selectedPropertyId]);

//     const formatPrice = (price, priceUnit) => {
//         if (priceUnit === 'lakh') {
//             return `₹${price} Lakh`;
//         }
//         return `₹${price?.toLocaleString()}`;
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     const getStatusColor = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'paid':
//                 return 'bg-green-100 text-green-800';
//             case 'pending':
//                 return 'bg-orange-100 text-orange-800';
//             default:
//                 return 'bg-gray-100 text-gray-800';
//         }
//     };

//     const handleCardClick = (propertyId) => {
//         setSelectedPropertyId(propertyId);
//     };

//     const getUniqueAmenities = (amenities) => {
//         return [...new Set(amenities)];
//     };

//     // Get selected property for display
//     const selectedProperty = properties.find(property => property._id === selectedPropertyId);

//     return (
//         <div className="min-h-screen bg-gray-50 py-8 px-4">
//             <div className="max-w-7xl mx-auto">
//                 {/* Properties Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
//                     {properties.map((property) => (
//                         <div
//                             key={property._id}
//                             onClick={() => handleCardClick(property._id)}
//                             className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden ${selectedPropertyId === property._id ? 'ring-2 ring-blue-500' : ''
//                                 }`}
//                         >
//                             {/* Property Image */}
//                             <div className="relative h-40 ">
//                                 {property.post_images?.[0] ? (
//                                     <img
//                                         src={property.post_images[0].url}
//                                         alt={property.post_title}
//                                         className="w-full h-full object-cover"
//                                         onError={(e) => (e.target.style.display = 'none')}
//                                     />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center text-white">
//                                         <Square size={40} className="opacity-70 mb-2" />
//                                         <p className="text-base font-medium">No Image</p>
//                                     </div>
//                                 )}

//                                 {/* Price Badge */}
//                                 <div className="absolute top-3 right-3 bg-white border border-gray-200 rounded-md px-2 py-1">
//                                     <p className="text-xs font-semibold text-gray-900">
//                                         {formatPrice(property.price, property.priceUnit)}
//                                     </p>
//                                 </div>

//                                 {/* Views Badge */}
//                                 <div className="absolute top-3 left-3 bg-black/30 rounded-md px-2.5 py-1.5 flex items-center text-white text-xs">
//                                     <Eye size={14} className="mr-1.5" />
//                                     {property.total_views || 0} views
//                                 </div>

//                                 {/* Selected Indicator */}
//                                 {selectedPropertyId === property._id && (
//                                     <div className="absolute bottom-3 left-3 bg-blue-600 text-white rounded-md px-2 py-1 text-xs font-medium">
//                                         Selected
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Property Details */}
//                             <div className="p-3">
//                                 <h3 className="text-sm font-semibold text-gray-900 mb-1">{property.post_title}</h3>
//                                 <div className="flex items-center text-gray-500 text-sm mb-3">
//                                     <MapPin size={16} className="mr-1.5" />
//                                     {property.address}, {property.city}
//                                 </div>

//                                 {/* Booking Count */}
//                                 <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                                     <div className="flex items-center text-gray-500 text-sm">
//                                         <Users size={16} className="mr-1.5" />
//                                         {property.bookings?.length || 0} Booking
//                                         {(property.bookings?.length || 0) !== 1 ? 's' : ''}
//                                     </div>
//                                     <span className="text-sm text-blue-600 font-medium">
//                                         {selectedPropertyId === property._id ? 'Selected' : 'Select →'}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Full Width Bookings Table */}
//                 {selectedProperty && (
//                     <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-in fade-in duration-200">
//                         <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-4">
//                             <h3 className="text-xl font-semibold text-white flex items-center">
//                                 <Calendar className="mr-3" size={24} />
//                                 Bookings for "{selectedProperty.post_title}" ({selectedProperty.bookings?.length || 0})
//                             </h3>
//                         </div>

//                         <div className="">
//                             {selectedProperty.bookings?.length > 0 ? (
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
//                                         <thead className="bg-gray-100 text-gray-700">
//                                             <tr>
//                                                 <th className="px-4 py-3 text-left font-semibold">Customer</th>
//                                                 <th className="px-4 py-3 text-left font-semibold">Email</th>
//                                                 <th className="px-4 py-3 text-left font-semibold">Phone</th>
//                                                 <th className="px-4 py-3 text-left font-semibold">Token Amount</th>
//                                                 <th className="px-4 py-3 text-left font-semibold">Booking Date</th>
//                                                 <th className="px-4 py-3 text-left font-semibold">Lock Status</th>
//                                                 <th className="px-4 py-3 text-left font-semibold">Token Status</th>
//                                                 <th className="px-4 py-3 text-left font-semibold">Final Status</th>
//                                                 <th className="px-4 py-3 text-left font-semibold">Confirmation</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {selectedProperty.bookings.map((booking, index) => (
//                                                 <tr
//                                                     key={booking._id}
//                                                     className={`border-t hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
//                                                         }`}
//                                                 >
//                                                     {/* Customer */}
//                                                     <td className="px-4 py-3 font-medium text-gray-900">
//                                                         {booking.tokenPaidBy?.name || 'N/A'}
//                                                     </td>
//                                                     <td className="px-4 py-3 text-gray-700">
//                                                         {booking.tokenPaidBy?.email || 'N/A'}
//                                                     </td>
//                                                     <td className="px-4 py-3 text-gray-700">
//                                                         {booking.tokenPaidBy?.phone || 'N/A'}
//                                                     </td>

//                                                     {/* Booking Details */}
//                                                     <td className="px-4 py-3 font-medium text-green-600">
//                                                         ₹{booking.tokenAmount?.toLocaleString() || 0}
//                                                     </td>
//                                                     <td className="px-4 py-3 text-gray-700">
//                                                         {formatDate(booking.bookedAt)}
//                                                     </td>
//                                                     <td className="px-4 py-3">
//                                                         {booking.isLocked ? (
//                                                             <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded">
//                                                                 Locked
//                                                             </span>
//                                                         ) : (
//                                                             <span className="text-gray-500 text-xs bg-gray-50 px-2 py-1 rounded">
//                                                                 Not Locked
//                                                             </span>
//                                                         )}
//                                                     </td>

//                                                     {/* Payment Status */}
//                                                     <td className="px-4 py-3">
//                                                         <span
//                                                             className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
//                                                                 booking.tokenPaymentStatus
//                                                             )}`}
//                                                         >
//                                                             {booking.tokenPaymentStatus || 'N/A'}
//                                                         </span>
//                                                     </td>
//                                                     <td className="px-4 py-3">
//                                                         <span
//                                                             className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
//                                                                 booking.finalPaymentStatus
//                                                             )}`}
//                                                         >
//                                                             {booking.finalPaymentStatus || 'N/A'}
//                                                         </span>
//                                                     </td>
//                                                     <td className="px-4 py-3">
//                                                         <span
//                                                             className={`text-xs px-2 py-1 rounded-full font-medium ${booking.confirmedByDeveloper
//                                                                     ? 'bg-green-100 text-green-700'
//                                                                     : 'bg-orange-100 text-orange-700'
//                                                                 }`}
//                                                         >
//                                                             {booking.confirmedByDeveloper ? 'Confirmed' : 'Pending'}
//                                                         </span>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             ) : (
//                                 <div className="text-center py-12 text-gray-500">
//                                     <Calendar size={48} className="mx-auto text-gray-400 mb-3" />
//                                     <h4 className="text-lg font-medium text-gray-600 mb-2">No bookings yet</h4>
//                                     <p className="text-sm">This property hasn't received any bookings.</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Summary Statistics */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//                     <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//                         <div className="text-3xl font-bold text-blue-600 mb-2">
//                             {properties.length}
//                         </div>
//                         <p className="text-gray-600">Total Properties</p>
//                     </div>
//                     <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//                         <div className="text-3xl font-bold text-green-600 mb-2">
//                             {properties.reduce((total, property) => total + (property.bookings?.length || 0), 0)}
//                         </div>
//                         <p className="text-gray-600">Total Bookings</p>
//                     </div>
//                     <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//                         <div className="text-3xl font-bold text-purple-600 mb-2">
//                             {properties.length > 0
//                                 ? Math.round(properties.reduce((total, property) => total + (property.total_views || 0), 0) / properties.length)
//                                 : 0
//                             }
//                         </div>
//                         <p className="text-gray-600">Avg. Views</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default BookingsPage;

// import React, { useState, useEffect } from 'react';
// import { MapPin, Eye, Users, Calendar, Square } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';

// function BookingsPage() {
//     const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//     const [activeTab, setActiveTab] = useState('bookings');
//     const { properties } = useSelector(state => state.properties)

//     // console.log("properties", properties)

//     // Set first property as selected by default
//     useEffect(() => {
//         if (properties && properties.length > 0 && selectedPropertyId === null) {
//             setSelectedPropertyId(properties[0]._id);
//         }
//     }, [properties, selectedPropertyId]);

//     const formatPrice = (price, priceUnit) => {
//         if (priceUnit === 'lakh') {
//             return `₹${price} Lakh`;
//         }
//         return `₹${price?.toLocaleString()}`;
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     const getStatusColor = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'paid':
//                 return 'bg-green-100 text-green-800 border-green-200';
//             case 'pending':
//                 return 'bg-orange-100 text-orange-800 border-orange-200';
//             default:
//                 return 'bg-gray-100 text-gray-800 border-gray-200';
//         }
//     };

//     const handleCardClick = (propertyId) => {
//         setSelectedPropertyId(propertyId);
//     };

//     // Get selected property for display
//     const selectedProperty = properties.find(property => property._id === selectedPropertyId);

//     // Get all bookings
//     // const allBookings = properties.flatMap(property =>
//     //     (property.bookings || []).map(booking => ({
//     //         ...booking,
//     //         propertyTitle: property.post_title,
//     //         propertyId: property._id
//     //     }))
//     // );

//     const allBookings = properties
//         .flatMap(property =>
//             (property.bookings || []).map(booking => ({
//                 ...booking,
//                 propertyTitle: property.post_title,
//                 propertyId: property._id,
//             }))
//         )
//         // Sort by most recent booking first
//         .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));


//     // Calculate weekly bookings data
//     const getWeeklyBookingsData = () => {
//         const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//         return days.map(day => ({
//             day,
//             confirmed: Math.floor(Math.random() * 5) + 1,
//             pending: Math.floor(Math.random() * 3) + 1
//         }));
//     };

//     const weeklyBookings = getWeeklyBookingsData();

//     // Calculate property performance data
//     const propertyPerformanceData = properties.map(property => ({
//         title: property.post_title.length > 20 ? property.post_title.substring(0, 20) + '...' : property.post_title,
//         views: property.total_views || 0,
//         bookings: property.bookings?.length || 0
//     }));

//     const navigate = useNavigate()
//     const handleViewBookings = (id) => {
//         // console.log("ID" , id)
//         // if(id){
//         navigate(`/view/property/booking/${id}`)
//         // }


//     }

//     const handleViewBookingDetail = (booking_id) => {
//         navigate(`/view/booking/info/${booking_id}`)
//     }

//     console.log("oooopo", properties)

//     return (
//         <div className="min-h-screen bg-gray-50 p-3">
//             <div className="max-w-7xl mx-auto">
//                 {/* Tabs */}
//                 <div className="mb-3 flex justify-center">
//                     <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
//                         <button
//                             onClick={() => setActiveTab('bookings')}
//                             className={`rounded-md px-3 py-1 text-sm transition-colors ${activeTab === 'bookings'
//                                 ? 'bg-white text-gray-900 shadow-sm font-medium'
//                                 : 'text-gray-600 hover:text-gray-900'
//                                 }`}
//                         >
//                             Bookings
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('properties')}
//                             className={`rounded-md px-3 py-1 text-sm transition-colors ${activeTab === 'properties'
//                                 ? 'bg-white text-gray-900 shadow-sm font-medium'
//                                 : 'text-gray-600 hover:text-gray-900'
//                                 }`}
//                         >
//                             Properties
//                         </button>

//                         <button
//                             onClick={() => setActiveTab('analytics')}
//                             className={`rounded-md px-3 py-1 text-sm transition-colors ${activeTab === 'analytics'
//                                 ? 'bg-white text-gray-900 shadow-sm font-medium'
//                                 : 'text-gray-600 hover:text-gray-900'
//                                 }`}
//                         >
//                             Analytics
//                         </button>
//                     </div>
//                 </div>

//                 {/* Properties Tab */}
//                 {activeTab === 'properties' && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                         {properties.map((property) => (
//                             <div
//                                 key={property._id}
//                                 onClick={() => handleCardClick(property._id)}
//                                 className={`bg-white rounded-lg shadow-sm hover:shadow-md transition border p-2 cursor-pointer ${selectedPropertyId === property._id ? 'ring-2 ring-blue-500' : ''
//                                     }`}
//                             >
//                                 <div className="p-1">
//                                     <h3 className="text-base font-semibold text-gray-900 mb-1">{property.post_title}</h3>
//                                     <p className="text-xs text-gray-500 mb-2">{property.address}, {property.city}</p>
//                                     <div className='flex justify-between '>
//                                         <div className='flex flex-col'>
//                                             {/* <p className="font-semibold text-sm mb-2">{formatPrice(property.price, property.priceUnit)}</p> */}
//                                             {
//                                                 property.bookings?.length > 0 && <p className="bg-orange-500 text-white px-2 py-1 rounded-md font-semibold text-sm mb-2">{(property.bookings?.length)} Bookings Done</p>
//                                             }
//                                         </div>
//                                         <Button onClick={() => handleViewBookings(property?.post_id)}>View</Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* Bookings Tab */}
//                 {activeTab === 'bookings' && (
//                     <div>
//                         {/* Bookings Table */}
//                         <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all">
//                             <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//                                 <h3 className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">Bookings Overview</h3>
//                                 <span className="text-xs text-gray-500">{allBookings.length} total</span>
//                             </div>

//                             {allBookings.length > 0 ? (
//                                 <div className="overflow-x-auto">
//                                     <table className="min-w-full text-[13px] text-gray-700">
//                                         <thead>
//                                             <tr className="text-[11px] md:text-xs text-gray-500 uppercase bg-gray-50">
//                                                 <th className="px-3 py-2 text-left font-medium whitespace-nowrap">Property</th>
//                                                 <th className="px-3 py-2 text-left font-medium whitespace-nowrap">Customer</th>
//                                                 <th className="px-3 py-2 text-left font-medium whitespace-nowrap">Contact</th>
//                                                 {/* <th className="px-3 py-2 text-left font-medium whitespace-nowrap">Token</th> */}
//                                                 <th className="px-3 py-2 text-left font-medium whitespace-nowrap">Date</th>
//                                                 <th className="px-3 py-2 text-left font-medium whitespace-nowrap">Status</th>
//                                                 <th className="px-3 py-2 text-center font-medium whitespace-nowrap">Action</th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {allBookings.map((booking, index) => (
//                                                 <tr
//                                                     key={booking._id}
//                                                     className={`transition-colors duration-200 hover:bg-gray-50 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
//                                                         }`}
//                                                 >
//                                                     {/* Property */}
//                                                     <td className="px-3 py-2 font-medium text-gray-900 truncate max-w-[150px]">
//                                                         {booking.propertyTitle}
//                                                     </td>

//                                                     {/* Customer */}
//                                                     <td className="px-3 py-2 truncate max-w-[120px]">
//                                                         {booking.tokenPaidBy?.name || 'N/A'}
//                                                     </td>

//                                                     {/* Contact */}
//                                                     <td className="px-3 py-2">
//                                                         <div className="truncate max-w-[150px]">{booking.tokenPaidBy?.email || 'N/A'}</div>
//                                                         <div className="text-[10px] text-gray-400 truncate">{booking.tokenPaidBy?.phone || 'N/A'}</div>
//                                                     </td>

//                                                     {/* Token */}
//                                                     {/* <td className="px-3 py-2 text-green-600 font-semibold whitespace-nowrap">
//                                                         ₹{booking.tokenAmount?.toLocaleString() || 0}
//                                                     </td> */}

//                                                     {/* Date */}
//                                                     <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
//                                                         {formatDate(booking.bookedAt)}
//                                                     </td>

//                                                     {/* Status */}
//                                                     <td className="px-3 py-2 whitespace-nowrap">
//                                                         <span
//                                                             className={`inline-flex items-center px-2.5 py-0.5 text-[10px] md:text-[11px] font-medium rounded-full capitalize
//                     ${booking.finalPaymentStatus?.toLowerCase() === 'active'
//                                                                     ? 'bg-green-100 text-green-700'
//                                                                     : booking.finalPaymentStatus?.toLowerCase() === 'inactive'
//                                                                         ? 'bg-red-100 text-red-700'
//                                                                         : booking.finalPaymentStatus?.toLowerCase() === 'pending'
//                                                                             ? 'bg-orange-100 text-orange-700'
//                                                                             : booking.finalPaymentStatus?.toLowerCase() === 'bouncing'
//                                                                                 ? 'bg-purple-100 text-purple-700'
//                                                                                 : booking.finalPaymentStatus?.toLowerCase() === 'on sale'
//                                                                                     ? 'bg-blue-100 text-blue-700'
//                                                                                     : 'bg-yellow-100 text-yellow-700'
//                                                                 }`}
//                                                         >
//                                                             {booking.finalPaymentStatus || 'Pending'}
//                                                         </span>
//                                                     </td>

//                                                     {/* Actions */}
//                                                     <td className="px-3 py-2 text-center">
//                                                         <div className="flex items-center justify-center gap-1.5">
//                                                             <button onClick={() => handleViewBookingDetail(booking?._id)} className="px-2.5 py-1 text-[11px] font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
//                                                                 View
//                                                             </button>
//                                                             <button className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
//                                                                 Confirm
//                                                             </button>
//                                                             <button className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-red-500 text-white hover:bg-red-600 transition">
//                                                                 Cancel
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>

//                                     {/* Pagination */}
//                                     {/* <div className="flex items-center justify-center gap-1.5 py-3 border-t border-gray-100 text-[11px] md:text-xs text-gray-600">
//                                         <button className="px-2.5 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition">
//                                             Previous
//                                         </button>
//                                         <div className="flex items-center gap-1">
//                                             {[1, 2, 3, 4, 5].map((page) => (
//                                                 <button
//                                                     key={page}
//                                                     className={`px-2.5 py-1 rounded-md ${page === 3
//                                                         ? 'bg-blue-600 text-white'
//                                                         : 'border border-gray-300 hover:bg-gray-100'
//                                                         }`}
//                                                 >
//                                                     {page.toString().padStart(2, '0')}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                         <button className="px-2.5 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition">
//                                             Next
//                                         </button>
//                                     </div> */}
//                                 </div>
//                             ) : (
//                                 <div className="flex flex-col items-center justify-center py-10 text-gray-500">
//                                     <div className="bg-gray-100 p-4 rounded-full mb-2">
//                                         <Calendar size={28} className="text-gray-400" />
//                                     </div>
//                                     <h4 className="text-sm font-medium text-gray-700 mb-1">No bookings yet</h4>
//                                     <p className="text-xs text-gray-500">No properties have received bookings.</p>
//                                 </div>
//                             )}
//                         </div>



//                     </div>
//                 )}

//                 {/* Analytics Tab */}
//                 {activeTab === 'analytics' && (
//                     <div>
//                         {/* Summary Stats */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
//                             <div className="bg-white rounded-lg shadow-sm border text-center p-3">
//                                 <div className="text-lg font-bold">{properties.length}</div>
//                                 <div className="text-xs text-gray-600">Properties</div>
//                             </div>
//                             <div className="bg-white rounded-lg shadow-sm border text-center p-3">
//                                 <div className="text-lg font-bold">
//                                     {properties.reduce((total, property) => total + (property.bookings?.length || 0), 0)}
//                                 </div>
//                                 <div className="text-xs text-gray-600">Bookings</div>
//                             </div>
//                             <div className="bg-white rounded-lg shadow-sm border text-center p-3">
//                                 <div className="text-lg font-bold">
//                                     {properties.length > 0
//                                         ? Math.round(properties.reduce((total, property) => total + (property.total_views || 0), 0) / properties.length)
//                                         : 0
//                                     }
//                                 </div>
//                                 <div className="text-xs text-gray-600">Avg. Views</div>
//                             </div>
//                         </div>

//                         {/* Property Performance Chart */}
//                         <div className="bg-white rounded-lg shadow-sm border p-3">
//                             <h3 className="text-sm font-semibold mb-2">Property Performance</h3>
//                             <ResponsiveContainer width="100%" height={200}>
//                                 <BarChart data={propertyPerformanceData}>
//                                     <XAxis
//                                         dataKey="title"
//                                         tick={{ fontSize: 10 }}
//                                         interval={0}
//                                         angle={-15}
//                                         textAnchor="end"
//                                         height={60}
//                                     />
//                                     <YAxis tick={{ fontSize: 10 }} />
//                                     <Tooltip />
//                                     <Bar dataKey="views" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Views" />
//                                     <Bar dataKey="bookings" fill="#22c55e" radius={[4, 4, 0, 0]} name="Bookings" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default BookingsPage;

// import React, { useState, useEffect } from 'react';
// import { MapPin, Eye, Users, Calendar, Square } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';

// function BookingsPage() {
//     const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//     const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'bookings');
//     const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//     const { properties } = useSelector(state => state.properties);
//     const navigate = useNavigate();

//     // Set first property as selected by default
//     useEffect(() => {
//         if (properties && properties.length > 0 && selectedPropertyId === null) {
//             setSelectedPropertyId(properties[0]._id);
//         }
//     }, [properties, selectedPropertyId]);

//     // Save activeTab to localStorage whenever it changes
//     useEffect(() => {
//         localStorage.setItem('activeTab', activeTab);
//     }, [activeTab]);

//     const formatPrice = (price, priceUnit) => {
//         if (priceUnit === 'lakh') return `₹${price} Lakh`;
//         return `₹${price?.toLocaleString()}`;
//     };

//     const formatDate = (dateString) =>
//         new Date(dateString).toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//         });

//     const handleCardClick = (propertyId) => setSelectedPropertyId(propertyId);

//     const selectedProperty = properties.find(property => property._id === selectedPropertyId);

//     const allBookings = properties
//         .flatMap(property =>
//             (property.bookings || []).map(booking => ({
//                 ...booking,
//                 propertyTitle: property.post_title,
//                 propertyId: property._id,
//             }))
//         )
//         .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));

//     // Sorting functionality
//     const handleSort = (key) => {
//         let direction = 'asc';
//         if (sortConfig.key === key && sortConfig.direction === 'asc') {
//             direction = 'desc';
//         }
//         setSortConfig({ key, direction });
//     };

//     const sortedBookings = React.useMemo(() => {
//         if (!sortConfig.key) return allBookings;
//         const sorted = [...allBookings].sort((a, b) => {
//             const aValue =
//                 sortConfig.key === 'propertyTitle'
//                     ? a.propertyTitle?.toLowerCase()
//                     : sortConfig.key === 'name'
//                         ? a.tokenPaidBy?.name?.toLowerCase()
//                         : sortConfig.key === 'email'
//                             ? a.tokenPaidBy?.email?.toLowerCase()
//                             : sortConfig.key === 'date'
//                                 ? new Date(a.bookedAt)
//                                 : a.finalPaymentStatus?.toLowerCase();

//             const bValue =
//                 sortConfig.key === 'propertyTitle'
//                     ? b.propertyTitle?.toLowerCase()
//                     : sortConfig.key === 'name'
//                         ? b.tokenPaidBy?.name?.toLowerCase()
//                         : sortConfig.key === 'email'
//                             ? b.tokenPaidBy?.email?.toLowerCase()
//                             : sortConfig.key === 'date'
//                                 ? new Date(b.bookedAt)
//                                 : b.finalPaymentStatus?.toLowerCase();

//             if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//             if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//             return 0;
//         });
//         return sorted;
//     }, [allBookings, sortConfig]);

//     const getSortIndicator = (key) => {
//         if (sortConfig.key !== key) return '';
//         return sortConfig.direction === 'asc' ? '↑' : '↓';
//     };

//     const getWeeklyBookingsData = () => {
//         const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//         return days.map(day => ({
//             day,
//             confirmed: Math.floor(Math.random() * 5) + 1,
//             pending: Math.floor(Math.random() * 3) + 1,
//         }));
//     };

//     const weeklyBookings = getWeeklyBookingsData();

//     const propertyPerformanceData = properties.map(property => ({
//         title: property.post_title.length > 20 ? property.post_title.substring(0, 20) + '...' : property.post_title,
//         views: property.total_views || 0,
//         bookings: property.bookings?.length || 0,
//     }));

//     const handleViewBookings = (id) => {
//         navigate(`/view/property/booking/${id}`);
//     };

//     const handleViewBookingDetail = (booking_id) => {
//         navigate(`/view/booking/info/${booking_id}`);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-3">
//             <div className="max-w-7xl mx-auto">
//                 {/* Tabs */}
//                 <div className="mb-3 flex justify-center">
//                     <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
//                         {['bookings', 'properties', 'analytics'].map(tab => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setActiveTab(tab)}
//                                 className={`rounded-md px-3 py-1 text-sm transition-colors ${activeTab === tab
//                                     ? 'bg-white text-gray-900 shadow-sm font-medium'
//                                     : 'text-gray-600 hover:text-gray-900'
//                                     }`}
//                             >
//                                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Properties Tab */}
//                 {activeTab === 'properties' && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                         {properties.map((property) => (
//                             <div
//                                 key={property._id}
//                                 onClick={() => handleCardClick(property._id)}
//                                 className={`bg-white rounded-lg shadow-sm hover:shadow-md transition border p-2 cursor-pointer ${selectedPropertyId === property._id ? 'ring-2 ring-blue-500' : ''
//                                     }`}
//                             >
//                                 <div className="p-1">
//                                     <h3 className="text-base font-semibold text-gray-900 mb-1">{property.post_title}</h3>
//                                     <p className="text-xs text-gray-500 mb-2">{property.address}, {property.city}</p>
//                                     <div className='flex justify-between '>
//                                         <div className='flex flex-col'>
//                                             {property.bookings?.length > 0 && (
//                                                 <p className="bg-orange-500 text-white px-2 py-1 rounded-md font-semibold text-sm mb-2">
//                                                     {(property.bookings?.length)} Bookings Done
//                                                 </p>
//                                             )}
//                                         </div>
//                                         <Button onClick={() => handleViewBookings(property?.post_id)}>View</Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* Bookings Tab */}
//                 {activeTab === 'bookings' && (
//                     <div>
//                         <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all">
//                             <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
//                                 <h3 className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">Bookings Overview</h3>
//                                 <span className="text-xs text-gray-500">{sortedBookings.length} total</span>
//                             </div>

//                             {sortedBookings.length > 0 ? (
//                                 <div className="overflow-x-auto">
//                                     <table className="min-w-full text-[13px] text-gray-700">
//                                         <thead>
//                                             <tr className="text-[11px] md:text-xs text-gray-500 uppercase bg-gray-50">
//                                                 <th className="px-3 py-2 text-left font-medium whitespace-nowrap cursor-pointer"
//                                                     onClick={() => handleSort('propertyTitle')}>
//                                                     Property {getSortIndicator('propertyTitle')}
//                                                 </th>
//                                                 <th className="px-3 py-2 text-left font-medium whitespace-nowrap cursor-pointer"
//                                                     onClick={() => handleSort('name')}>
//                                                     Customer {getSortIndicator('name')}
//                                                 </th>
//                                                 <th className="px-3 py-2 text-left font-medium whitespace-nowrap cursor-pointer"
//                                                     onClick={() => handleSort('email')}>
//                                                     Contact {getSortIndicator('email')}
//                                                 </th>
//                                                 <th className="px-3 py-2 text-left font-medium whitespace-nowrap cursor-pointer"
//                                                     onClick={() => handleSort('date')}>
//                                                     Date {getSortIndicator('date')}
//                                                 </th>
//                                                 <th className="px-3 py-2 text-left font-medium whitespace-nowrap cursor-pointer"
//                                                     onClick={() => handleSort('status')}>
//                                                     Status {getSortIndicator('status')}
//                                                 </th>
//                                                 <th className="px-3 py-2 text-center font-medium whitespace-nowrap">Action</th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {sortedBookings.map((booking, index) => (
//                                                 <tr
//                                                     key={booking._id}
//                                                     className={`transition-colors duration-200 hover:bg-gray-50 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
//                                                         }`}
//                                                 >
//                                                     <td className="px-3 py-2 font-medium text-gray-900 truncate max-w-[150px]">{booking.propertyTitle}</td>
//                                                     <td className="px-3 py-2 truncate max-w-[120px]">{booking.tokenPaidBy?.name || 'N/A'}</td>
//                                                     <td className="px-3 py-2">
//                                                         <div className="truncate max-w-[150px]">{booking.tokenPaidBy?.email || 'N/A'}</div>
//                                                         <div className="text-[10px] text-gray-400 truncate">{booking.tokenPaidBy?.phone || 'N/A'}</div>
//                                                     </td>
//                                                     <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{formatDate(booking.bookedAt)}</td>
//                                                     <td className="px-3 py-2 whitespace-nowrap">
//                                                         <span
//                                                             className={`inline-flex items-center px-2.5 py-0.5 text-[10px] md:text-[11px] font-medium rounded-full capitalize
//                                                                 ${booking.finalPaymentStatus?.toLowerCase() === 'active'
//                                                                     ? 'bg-green-100 text-green-700'
//                                                                     : booking.finalPaymentStatus?.toLowerCase() === 'inactive'
//                                                                         ? 'bg-red-100 text-red-700'
//                                                                         : booking.finalPaymentStatus?.toLowerCase() === 'pending'
//                                                                             ? 'bg-orange-100 text-orange-700'
//                                                                             : booking.finalPaymentStatus?.toLowerCase() === 'bouncing'
//                                                                                 ? 'bg-purple-100 text-purple-700'
//                                                                                 : booking.finalPaymentStatus?.toLowerCase() === 'on sale'
//                                                                                     ? 'bg-blue-100 text-blue-700'
//                                                                                     : 'bg-yellow-100 text-yellow-700'
//                                                                 }`}
//                                                         >
//                                                             {booking.finalPaymentStatus || 'Pending'}
//                                                         </span>
//                                                     </td>
//                                                     <td className="px-3 py-2 text-center">
//                                                         <div className="flex items-center justify-center gap-1.5">
//                                                             <button
//                                                                 onClick={() => handleViewBookingDetail(booking?._id)}
//                                                                 className="px-2.5 py-1 text-[11px] font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//                                                             >
//                                                                 View
//                                                             </button>
//                                                             <button className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
//                                                                 Confirm
//                                                             </button>
//                                                             <button className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-red-500 text-white hover:bg-red-600 transition">
//                                                                 Cancel
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             ) : (
//                                 <div className="flex flex-col items-center justify-center py-10 text-gray-500">
//                                     <div className="bg-gray-100 p-4 rounded-full mb-2">
//                                         <Calendar size={28} className="text-gray-400" />
//                                     </div>
//                                     <h4 className="text-sm font-medium text-gray-700 mb-1">No bookings yet</h4>
//                                     <p className="text-xs text-gray-500">No properties have received bookings.</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Analytics Tab */}
//                 {activeTab === 'analytics' && (
//                     <div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
//                             <div className="bg-white rounded-lg shadow-sm border text-center p-3">
//                                 <div className="text-lg font-bold">{properties.length}</div>
//                                 <div className="text-xs text-gray-600">Properties</div>
//                             </div>
//                             <div className="bg-white rounded-lg shadow-sm border text-center p-3">
//                                 <div className="text-lg font-bold">
//                                     {properties.reduce((total, property) => total + (property.bookings?.length || 0), 0)}
//                                 </div>
//                                 <div className="text-xs text-gray-600">Bookings</div>
//                             </div>
//                             <div className="bg-white rounded-lg shadow-sm border text-center p-3">
//                                 <div className="text-lg font-bold">
//                                     {properties.length > 0
//                                         ? Math.round(properties.reduce((total, property) => total + (property.total_views || 0), 0) / properties.length)
//                                         : 0}
//                                 </div>
//                                 <div className="text-xs text-gray-600">Avg. Views</div>
//                             </div>
//                         </div>

//                         <div className="bg-white rounded-lg shadow-sm border p-3">
//                             <h3 className="text-sm font-semibold mb-2">Property Performance</h3>
//                             <ResponsiveContainer width="100%" height={200}>
//                                 <BarChart data={propertyPerformanceData}>
//                                     <XAxis
//                                         dataKey="title"
//                                         tick={{ fontSize: 10 }}
//                                         interval={0}
//                                         angle={-15}
//                                         textAnchor="end"
//                                         height={60}
//                                     />
//                                     <YAxis tick={{ fontSize: 10 }} />
//                                     <Tooltip />
//                                     <Bar dataKey="views" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Views" />
//                                     <Bar dataKey="bookings" fill="#22c55e" radius={[4, 4, 0, 0]} name="Bookings" />
//                                 </BarChart>
//                             </ResponsiveContainer>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default BookingsPage;

import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function BookingsPage() {
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'bookings');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
    const { properties } = useSelector(state => state.properties);
    const navigate = useNavigate();

    // Set first property as selected by default
    useEffect(() => {
        if (properties && properties.length > 0 && selectedPropertyId === null) {
            setSelectedPropertyId(properties[0]._id);
        }
    }, [properties, selectedPropertyId]);

    // Save activeTab to localStorage
    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    // const formatDate = (dateString) =>
    //     new Date(dateString).toLocaleDateString('en-IN', {
    //         year: 'numeric',
    //         month: 'short',
    //         day: 'numeric',
    //     });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        const isYesterday =
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear();

        if (isToday) return 'Today';
        if (isYesterday) return 'Yesterday';

        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };


    const handleCardClick = (propertyId) => setSelectedPropertyId(propertyId);

    const allBookings = properties
        .flatMap(property =>
            (property.bookings || []).map(booking => ({
                ...booking,
                propertyTitle: property.post_title,
                propertyId: property._id,
            }))
        )
        .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));

    // Sorting
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const sortedBookings = React.useMemo(() => {
        if (!sortConfig.key) return allBookings;
        const sorted = [...allBookings].sort((a, b) => {
            const aValue =
                sortConfig.key === 'propertyTitle'
                    ? a.propertyTitle?.toLowerCase()
                    : sortConfig.key === 'name'
                        ? a.tokenPaidBy?.name?.toLowerCase()
                        : sortConfig.key === 'email'
                            ? a.tokenPaidBy?.email?.toLowerCase()
                            : sortConfig.key === 'date'
                                ? new Date(a.bookedAt)
                                : a.finalPaymentStatus?.toLowerCase();

            const bValue =
                sortConfig.key === 'propertyTitle'
                    ? b.propertyTitle?.toLowerCase()
                    : sortConfig.key === 'name'
                        ? b.tokenPaidBy?.name?.toLowerCase()
                        : sortConfig.key === 'email'
                            ? b.tokenPaidBy?.email?.toLowerCase()
                            : sortConfig.key === 'date'
                                ? new Date(b.bookedAt)
                                : b.finalPaymentStatus?.toLowerCase();

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [allBookings, sortConfig]);

    // Always show an arrow in table header
    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '↑' : '↓';
        }
        return '↕';
    };

    const propertyPerformanceData = properties.map(property => ({
        title: property.post_title.length > 20 ? property.post_title.substring(0, 20) + '...' : property.post_title,
        views: property.total_views || 0,
        bookings: property.bookings?.length || 0,
    }));

    const handleViewBookings = (id) => navigate(`/view/property/booking/${id}`);
    const handleViewBookingDetail = (booking_id) => navigate(`/view/booking/info/${booking_id}`);
    console.log("bookinhgs", sortedBookings)

    return (
        <div className="min-h-screen bg-gray-50 p-3">
            <div className="max-w-7xl mx-auto">
                {/* Tabs */}
                <div className="mb-3 flex justify-center">
                    <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
                        {['bookings', 'properties', 'analytics'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`rounded-md px-3 py-1 text-sm transition-colors ${activeTab === tab
                                    ? 'bg-white text-gray-900 shadow-sm font-medium'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Properties Tab */}
                {activeTab === 'properties' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {properties.map((property) => (
                            <div
                                key={property._id}
                                onClick={() => handleCardClick(property._id)}
                                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition border p-2 cursor-pointer ${selectedPropertyId === property._id ? 'ring-2 ring-blue-500' : ''
                                    }`}
                            >
                                <div className="p-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-1">{property.post_title}</h3>
                                    <p className="text-xs text-gray-500 mb-2">{property.address}, {property.city}</p>
                                    <div className='flex justify-between'>
                                        <div className='flex flex-col'>
                                            {property.bookings?.length > 0 && (
                                                <p className="bg-orange-500 text-white px-2 py-1 rounded-md font-semibold text-sm mb-2">
                                                    {(property.bookings?.length)} Bookings Done
                                                </p>
                                            )}
                                        </div>
                                        <Button onClick={() => handleViewBookings(property?.post_id)}>View</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bookings Tab */}
                {/* {activeTab === 'bookings' && (
                    <div>
                        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                                <h3 className="text-sm md:text-base font-semibold text-gray-900 tracking-tight">Bookings Overview</h3>
                                <span className="text-xs text-gray-500">{sortedBookings.length} total</span>
                            </div>

                            {sortedBookings.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-[13px] text-gray-700">
                                        <thead>
                                            <tr className="text-[11px] md:text-xs text-gray-500 uppercase bg-gray-50">
                                                {[
                                                    { key: 'propertyTitle', label: 'Property' },
                                                    { key: 'name', label: 'Customer' },
                                                    { key: 'email', label: 'Contact' },
                                                    { key: 'date', label: 'Date' },
                                                    { key: 'status', label: 'Status' },
                                                ].map(({ key, label }) => (
                                                    <th
                                                        key={key}
                                                        onClick={() => handleSort(key)}
                                                        className="px-3 py-2 text-left font-medium whitespace-nowrap cursor-pointer select-none"
                                                    >
                                                        <div className="flex items-center gap-1">
                                                            {label}
                                                            <span className="text-gray-400 text-[10px]">{getSortIndicator(key)}</span>
                                                        </div>
                                                    </th>
                                                ))}
                                                <th className="px-3 py-2 text-center font-medium whitespace-nowrap">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {sortedBookings.map((booking, index) => (
                                                <tr
                                                    key={booking._id}
                                                    className={`transition-colors duration-200 hover:bg-gray-50 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'
                                                        }`}
                                                >
                                                    <td className="px-3 py-2 font-medium text-gray-900 truncate max-w-[150px]">{booking.propertyTitle}</td>
                                                    <td className="px-3 py-2 truncate max-w-[120px]">{booking.tokenPaidBy?.name || 'N/A'}</td>
                                                    <td className="px-3 py-2">
                                                        <div className="truncate max-w-[150px]">{booking.tokenPaidBy?.email || 'N/A'}</div>
                                                        <div className="text-[10px] text-gray-400 truncate">{booking.tokenPaidBy?.phone || 'N/A'}</div>
                                                    </td>
                                                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{formatDate(booking.bookedAt)}</td>
                                                    <td className="px-3 py-2 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 text-[10px] md:text-[11px] font-medium rounded-full capitalize
                                                                ${booking.finalPaymentStatus?.toLowerCase() === 'active'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : booking.finalPaymentStatus?.toLowerCase() === 'inactive'
                                                                        ? 'bg-red-100 text-red-700'
                                                                        : booking.finalPaymentStatus?.toLowerCase() === 'pending'
                                                                            ? 'bg-orange-100 text-orange-700'
                                                                            : booking.finalPaymentStatus?.toLowerCase() === 'bouncing'
                                                                                ? 'bg-purple-100 text-purple-700'
                                                                                : booking.finalPaymentStatus?.toLowerCase() === 'on sale'
                                                                                    ? 'bg-blue-100 text-blue-700'
                                                                                    : 'bg-yellow-100 text-yellow-700'
                                                                }`}
                                                        >
                                                            {booking.finalPaymentStatus || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            <button
                                                                onClick={() => handleViewBookingDetail(booking?._id)}
                                                                className="px-2.5 py-1 text-[11px] font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                                            >
                                                                View
                                                            </button>
                                                            <button className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-blue-600 text-white hover:bg-blue-700 transition" onClick={() =>
                                                                navigate("/rm-manager", {
                                                                    state: booking?.assignedRM ? { rmId: booking.assignedRM } : {},
                                                                })
                                                            }>
                                                                {booking?.assignedRM ? 'Assigned' : 'Confirm'}
                                                            </button>
                                                            <button className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-red-500 text-white hover:bg-red-600 transition">
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                                    <div className="bg-gray-100 p-4 rounded-full mb-2">
                                        <Calendar size={28} className="text-gray-400" />
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-1">No bookings yet</h4>
                                    <p className="text-xs text-gray-500">No properties have received bookings.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )} */}

                {activeTab === 'bookings' && (
                    <div className="space-y-4">
                        {sortedBookings.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:hidden"> {/* Mobile only */}
                                {sortedBookings.map((booking) => (
                                    <div
                                        key={booking._id}
                                        className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-4 transition-all hover:shadow-lg"
                                    >
                                        {/* Property & Customer */}
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-gray-900 truncate">{booking.propertyTitle}</h3>
                                                <p className="text-[12px] text-gray-500 truncate">{booking.tokenPaidBy?.name || 'N/A'}</p>
                                            </div>
                                            <span className="text-[10px] text-gray-400">{formatDate(booking.bookedAt)}</span>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex flex-col text-[11px] text-gray-600 truncate">
                                                <span>{booking.tokenPaidBy?.email || 'N/A'}</span>
                                                <span className="text-gray-400">{booking.tokenPaidBy?.phone || 'N/A'}</span>
                                            </div>

                                            {/* Status */}
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-medium rounded-full capitalize
                  ${booking.finalPaymentStatus?.toLowerCase() === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : booking.finalPaymentStatus?.toLowerCase() === 'inactive'
                                                            ? 'bg-red-100 text-red-700'
                                                            : booking.finalPaymentStatus?.toLowerCase() === 'pending'
                                                                ? 'bg-orange-100 text-orange-700'
                                                                : booking.finalPaymentStatus?.toLowerCase() === 'bouncing'
                                                                    ? 'bg-purple-100 text-purple-700'
                                                                    : booking.finalPaymentStatus?.toLowerCase() === 'on sale'
                                                                        ? 'bg-blue-100 text-blue-700'
                                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                            >
                                                {booking.finalPaymentStatus || 'Pending'}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <button
                                                onClick={() => handleViewBookingDetail(booking?._id)}
                                                className="flex-1 px-3 py-1 text-[11px] font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() =>
                                                    navigate("/rm-manager", {
                                                        state: booking?.assignedRM ? { rmId: booking.assignedRM } : {},
                                                    })
                                                }
                                                className={`flex-1 px-3 py-1 text-[11px] font-medium rounded-full text-white transition ${booking?.assignedRM ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-600'
                                                    }`}
                                            >
                                                {booking?.assignedRM ? 'Assigned' : 'Not Assigned'}
                                            </button>
                                            <button className="flex-1 px-3 py-1 text-[11px] font-medium rounded-full bg-red-500 text-white hover:bg-red-600 transition">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                                <div className="bg-gray-100 p-4 rounded-full mb-2">
                                    <Calendar size={28} className="text-gray-400" />
                                </div>
                                <h4 className="text-sm font-medium text-gray-700 mb-1">No bookings yet</h4>
                                <p className="text-xs text-gray-500">No properties have received bookings.</p>
                            </div>
                        )}
                    </div>
                )}


                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                            <div className="bg-white rounded-lg shadow-sm border text-center p-3">
                                <div className="text-lg font-bold">{properties.length}</div>
                                <div className="text-xs text-gray-600">Properties</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm border text-center p-3">
                                <div className="text-lg font-bold">
                                    {properties.reduce((total, property) => total + (property.bookings?.length || 0), 0)}
                                </div>
                                <div className="text-xs text-gray-600">Bookings</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-sm border text-center p-3">
                                <div className="text-lg font-bold">
                                    {properties.length > 0
                                        ? Math.round(properties.reduce((total, property) => total + (property.total_views || 0), 0) / properties.length)
                                        : 0}
                                </div>
                                <div className="text-xs text-gray-600">Avg. Views</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border p-3">
                            <h3 className="text-sm font-semibold mb-2">Property Performance</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={propertyPerformanceData}>
                                    <XAxis
                                        dataKey="title"
                                        tick={{ fontSize: 10 }}
                                        interval={0}
                                        angle={-15}
                                        textAnchor="end"
                                        height={60}
                                    />
                                    <YAxis tick={{ fontSize: 10 }} />
                                    <Tooltip />
                                    <Bar dataKey="views" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Views" />
                                    <Bar dataKey="bookings" fill="#22c55e" radius={[4, 4, 0, 0]} name="Bookings" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookingsPage;

