// import React, { useState, useEffect } from 'react';
// import { Plus, CreditCard as Edit2, Trash2, Eye, Search, Filter, Calendar, TrendingUp, Users, Package, Link2, Unlink, X, Check, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
// import { base_url } from '@/utils/baseurl';
// import { getConfig } from '@/utils/config';
// import axios from 'axios';
// import { useSelector } from 'react-redux';


// const BuilderOfferManagement = () => {
//     const [offers, setOffers] = useState([]);
//     // const [properties, setProperties] = useState([]);
//     const { properties } = useSelector(state => state.properties)

//     const [loading, setLoading] = useState(true);
//     const [stats, setStats] = useState(null);
//     const [selectedOffer, setSelectedOffer] = useState(null);
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showAttachModal, setShowAttachModal] = useState(false);
//     const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
//     const [filterStatus, setFilterStatus] = useState('all');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [notification, setNotification] = useState(null);
//     const [expandedOfferId, setExpandedOfferId] = useState(null);

//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         discountType: 'PERCENTAGE',
//         discountValue: '',
//         validFrom: '',
//         validUntil: '',
//         maxUsageCount: 1,
//         minTokenAmount: '',
//         isGlobalOffer: false,
//         applicableForNewBookingsOnly: true,
//         autoAttachToNewBookings: true,
//         notificationTitle: '',
//         notificationMessage: '',
//         offerImage: ''
//     });

//     useEffect(() => {
//         fetchOffers();
//         // fetchProperties();
//     }, [filterStatus]);

//     const getAuthToken = () => {
//         return localStorage.getItem('user') && JSON.parse(localStorage.getItem('user').token);
//     };

//     const fetchOffers = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(
//                 `${base_url}/api/booking/offers/builder/my-offers?status=${filterStatus}`, getConfig()
//             );
//             const data = await response.json();

//             if (data.success) {
//                 setOffers(data.data.offers);
//                 setStats(data.data.statistics);
//             }
//         } catch (error) {
//             showNotification('Failed to fetch offers', 'error');
//             console.error('Fetch offers error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // const fetchProperties = async () => {
//     //     try {
//     //         const response = await fetch(`${base_url}/properties/builder/my-properties`, getConfig());
//     //         const data = await response.json();

//     //         if (data.success) {
//     //             setProperties(data.data.properties || []);
//     //         }
//     //     } catch (error) {
//     //         console.error('Fetch properties error:', error);
//     //     }
//     // };

//     const handleCreateOffer = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(
//                 `${base_url}/api/booking/offers/create`,
//                 {
//                     ...formData,
//                     discountValue: Number(formData.discountValue),
//                     maxUsageCount: Number(formData.maxUsageCount),
//                     minTokenAmount: formData.minTokenAmount
//                         ? Number(formData.minTokenAmount)
//                         : undefined,
//                 },
//                 getConfig()
//             );

//             const data = response.data;

//             if (data.success) {
//                 showNotification("Offer created successfully!", "success");
//                 setShowCreateModal(false);
//                 resetForm();
//                 fetchOffers();
//             } else {
//                 showNotification(data.message || "Failed to create offer", "error");
//             }
//         } catch (error) {
//             showNotification("Failed to create offer", "error");
//             console.error(
//                 "Create offer error:",
//                 error.response?.data || error.message
//             );
//         }
//     };


//     const handleUpdateOffer = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.patch(
//                 `${base_url}/api/booking/offers/${selectedOffer._id}`,
//                 {
//                     ...formData,
//                 },
//                 getConfig()
//             );

//             const data = response.data;

//             if (data.success) {
//                 showNotification("Offer updated successfully!", "success");
//                 setShowEditModal(false);
//                 setSelectedOffer(null);
//                 resetForm();
//                 fetchOffers();
//             } else {
//                 showNotification(data.message || "Failed to update offer", "error");
//             }
//         } catch (error) {
//             showNotification("Failed to update offer", "error");
//             console.error(
//                 "Update offer error:",
//                 error.response?.data || error.message
//             );
//         }
//     };


//     const handleDeactivateOffer = async (offerId) => {
//         if (!window.confirm("Are you sure you want to deactivate this offer?")) return;

//         try {
//             const response = await axios.patch(
//                 `${base_url}/api/booking/offers/${offerId}/deactivate`,
//                 {
//                     reason: "Deactivated by builder",
//                 },
//                 getConfig()
//             );

//             const data = response.data;

//             if (data.success) {
//                 showNotification("Offer deactivated successfully!", "success");
//                 fetchOffers();
//             } else {
//                 showNotification(data.message || "Failed to deactivate offer", "error");
//             }
//         } catch (error) {
//             showNotification("Failed to deactivate offer", "error");
//             console.error(
//                 "Deactivate offer error:",
//                 error.response?.data || error.message
//             );
//         }
//     };


//     const handleAttachToProperty = async (propertyId) => {
//         try {
//             const response = await axios.post(
//                 `${base_url}/api/booking/offers/${selectedOffer._id}/attach-to-property`,
//                 { propertyId },
//                 getConfig()
//             );

//             const data = response.data;

//             if (data.success) {
//                 showNotification("Offer attached to property successfully!", "success");
//                 fetchOffers();
//             } else {
//                 showNotification(data.message || "Failed to attach offer", "error");
//             }
//         } catch (error) {
//             showNotification("Failed to attach offer", "error");
//             console.error(
//                 "Attach offer error:",
//                 error.response?.data || error.message
//             );
//         }
//     };


//     const handleDetachFromProperty = async (offerId, propertyId) => {
//         if (!window.confirm("Are you sure you want to detach this offer from the property?")) return;

//         try {
//             const response = await axios.delete(
//                 `${base_url}/api/booking/offers/${offerId}/detach-from-property/${propertyId}`,
//                 getConfig()
//             );

//             const data = response.data;

//             if (data.success) {
//                 showNotification("Offer detached successfully!", "success");
//                 fetchOffers();
//             } else {
//                 showNotification(data.message || "Failed to detach offer", "error");
//             }
//         } catch (error) {
//             showNotification("Failed to detach offer", "error");
//             console.error(
//                 "Detach offer error:",
//                 error.response?.data || error.message
//             );
//         }
//     };


//     const fetchOfferAnalytics = async (offerId) => {
//         try {
//             const response = await fetch(`${base_url}/api/booking/offers/${offerId}/analytics`, getConfig());

//             const data = await response.json();

//             if (data.success) {
//                 setSelectedOffer(data.data);
//                 setShowAnalyticsModal(true);
//             }
//         } catch (error) {
//             showNotification('Failed to fetch analytics', 'error');
//             console.error('Fetch analytics error:', error);
//         }
//     };

//     const resetForm = () => {
//         setFormData({
//             title: '',
//             description: '',
//             discountType: 'PERCENTAGE',
//             discountValue: '',
//             validFrom: '',
//             validUntil: '',
//             maxUsageCount: 1,
//             minTokenAmount: '',
//             isGlobalOffer: false,
//             applicableForNewBookingsOnly: true,
//             autoAttachToNewBookings: true,
//             notificationTitle: '',
//             notificationMessage: '',
//             offerImage: ''
//         });
//     };

//     const openEditModal = (offer) => {
//         setSelectedOffer(offer);
//         setFormData({
//             title: offer.title,
//             description: offer.description,
//             discountType: offer.discountType,
//             discountValue: offer.discountValue,
//             validFrom: new Date(offer.validFrom).toISOString().split('T')[0],
//             validUntil: new Date(offer.validUntil).toISOString().split('T')[0],
//             maxUsageCount: offer.maxUsageCount,
//             minTokenAmount: offer.minTokenAmount || '',
//             isGlobalOffer: offer.isGlobalOffer,
//             applicableForNewBookingsOnly: offer.applicableForNewBookingsOnly,
//             autoAttachToNewBookings: offer.autoAttachToNewBookings,
//             notificationTitle: offer.notificationTitle || '',
//             notificationMessage: offer.notificationMessage || '',
//             offerImage: offer.offerImage || ''
//         });
//         setShowEditModal(true);
//     };

//     const showNotification = (message, type = 'info') => {
//         setNotification({ message, type });
//         setTimeout(() => setNotification(null), 4000);
//     };

//     const filteredOffers = offers.filter(offer => {
//         const matchesSearch = offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             offer.description.toLowerCase().includes(searchQuery.toLowerCase());
//         return matchesSearch;
//     });

//     const getOfferStatus = (offer) => {
//         const now = new Date();
//         if (!offer.isActive) return 'Inactive';
//         if (now < new Date(offer.validFrom)) return 'Scheduled';
//         if (now > new Date(offer.validUntil)) return 'Expired';
//         if (offer.currentUsageCount >= offer.maxUsageCount) return 'Fully Used';
//         return 'Active';
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'Active': return 'bg-green-100 text-green-800 border-green-200';
//             case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
//             case 'Expired': return 'bg-gray-100 text-gray-800 border-gray-200';
//             case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
//             case 'Fully Used': return 'bg-orange-100 text-orange-800 border-orange-200';
//             default: return 'bg-gray-100 text-gray-800 border-gray-200';
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//             {notification && (
//                 <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
//                     } text-white animate-slide-in`}>
//                     {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
//                     <span className="font-medium">{notification.message}</span>
//                 </div>
//             )}

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="flex items-center justify-between mb-8">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900">Offer Management</h1>
//                         <p className="text-gray-600 mt-1">Create and manage promotional offers for your properties</p>
//                     </div>
//                     <button
//                         onClick={() => setShowCreateModal(true)}
//                         className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
//                     >
//                         <Plus size={20} />
//                         Create Offer
//                     </button>
//                 </div>

//                 {stats && (
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                         <StatCard
//                             icon={<Package className="text-blue-600" size={24} />}
//                             title="Total Offers"
//                             value={stats.totalOffers}
//                             bgColor="bg-blue-50"
//                         />
//                         <StatCard
//                             icon={<TrendingUp className="text-green-600" size={24} />}
//                             title="Active Offers"
//                             value={stats.activeOffers}
//                             bgColor="bg-green-50"
//                         />
//                         <StatCard
//                             icon={<Users className="text-purple-600" size={24} />}
//                             title="Total Usage"
//                             value={stats.totalUsage}
//                             bgColor="bg-purple-50"
//                         />
//                         <StatCard
//                             icon={<Calendar className="text-orange-600" size={24} />}
//                             title="Usage Rate"
//                             value={`${stats.totalPossibleUsage > 0 ? Math.round((stats.totalUsage / stats.totalPossibleUsage) * 100) : 0}%`}
//                             bgColor="bg-orange-50"
//                         />
//                     </div>
//                 )}

//                 <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
//                     <div className="p-6 border-b border-gray-200">
//                         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//                             <div className="flex-1 relative w-full md:w-auto">
//                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                                 <input
//                                     type="text"
//                                     placeholder="Search offers..."
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 />
//                             </div>
//                             <div className="flex gap-2">
//                                 {['all', 'active', 'expired', 'inactive'].map((status) => (
//                                     <button
//                                         key={status}
//                                         onClick={() => setFilterStatus(status)}
//                                         className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${filterStatus === status
//                                             ? 'bg-blue-600 text-white'
//                                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                             }`}
//                                     >
//                                         {status}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="overflow-x-auto">
//                         {loading ? (
//                             <div className="flex items-center justify-center py-12">
//                                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//                             </div>
//                         ) : filteredOffers.length === 0 ? (
//                             <div className="text-center py-12">
//                                 <Package className="mx-auto text-gray-400 mb-4" size={48} />
//                                 <p className="text-gray-600 text-lg">No offers found</p>
//                                 <p className="text-gray-500 mt-2">Create your first offer to get started</p>
//                             </div>
//                         ) : (
//                             <table className="w-full">
//                                 <thead className="bg-gray-50">
//                                     <tr>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Offer Details
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Discount
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Validity
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Usage
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Status
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Actions
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {filteredOffers.map((offer) => (
//                                         <React.Fragment key={offer._id}>
//                                             <tr className="hover:bg-gray-50 transition-colors">
//                                                 <td className="px-6 py-4">
//                                                     <div className="flex items-start gap-3">
//                                                         <div className="flex-1">
//                                                             <h3 className="font-semibold text-gray-900">{offer.title}</h3>
//                                                             <p className="text-sm text-gray-600 mt-1 line-clamp-2">{offer.description}</p>
//                                                             {offer.attachedToProperties && offer.attachedToProperties.length > 0 && (
//                                                                 <button
//                                                                     onClick={() => setExpandedOfferId(expandedOfferId === offer._id ? null : offer._id)}
//                                                                     className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-2"
//                                                                 >
//                                                                     <Link2 size={12} />
//                                                                     {offer.attachedToProperties.length} {offer.attachedToProperties.length === 1 ? 'Property' : 'Properties'}
//                                                                     {expandedOfferId === offer._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                                                                 </button>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <div className="font-semibold text-lg text-gray-900">
//                                                         {offer.discountType === 'PERCENTAGE' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
//                                                     </div>
//                                                     <div className="text-xs text-gray-500 capitalize">{offer.discountType.toLowerCase()}</div>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <div className="text-sm">
//                                                         <div className="text-gray-600">
//                                                             {new Date(offer.validFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
//                                                         </div>
//                                                         <div className="text-gray-400">to</div>
//                                                         <div className="text-gray-600">
//                                                             {new Date(offer.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <div className="flex items-center gap-2">
//                                                         <div className="flex-1 bg-gray-200 rounded-full h-2">
//                                                             <div
//                                                                 className="bg-blue-600 h-2 rounded-full transition-all"
//                                                                 style={{ width: `${(offer.currentUsageCount / offer.maxUsageCount) * 100}%` }}
//                                                             ></div>
//                                                         </div>
//                                                         <span className="text-sm font-medium text-gray-700">
//                                                             {offer.currentUsageCount}/{offer.maxUsageCount}
//                                                         </span>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(getOfferStatus(offer))}`}>
//                                                         {getOfferStatus(offer)}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <div className="flex items-center gap-2">
//                                                         <button
//                                                             onClick={() => {
//                                                                 setSelectedOffer(offer);
//                                                                 setShowAttachModal(true);
//                                                             }}
//                                                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                                             title="Attach to Property"
//                                                         >
//                                                             <Link2 size={18} />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => fetchOfferAnalytics(offer._id)}
//                                                             className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                                                             title="View Analytics"
//                                                         >
//                                                             <Eye size={18} />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => openEditModal(offer)}
//                                                             className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
//                                                             title="Edit"
//                                                         >
//                                                             <Edit2 size={18} />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleDeactivateOffer(offer._id)}
//                                                             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                                             title="Deactivate"
//                                                         >
//                                                             <Trash2 size={18} />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                             {expandedOfferId === offer._id && offer.attachedToProperties && (
//                                                 <tr>
//                                                     <td colSpan="6" className="px-6 py-4 bg-gray-50">
//                                                         <div className="space-y-2">
//                                                             <h4 className="font-medium text-gray-900 text-sm mb-3">Attached Properties:</h4>
//                                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                                                 {offer.attachedToProperties.map((ap) => (
//                                                                     <div key={ap.propertyId._id || ap.propertyId} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
//                                                                         <div className="flex-1">
//                                                                             <p className="font-medium text-gray-900 text-sm">
//                                                                                 {ap.propertyId?.title || ap.propertyId?.post_title || 'Property'}
//                                                                             </p>
//                                                                             <img src={`${ap.propertyId?.post_images?.[0]?.url}`} className='w-12 h-12 object-contain' />
//                                                                             <p className="text-xs text-gray-500 mt-1">
//                                                                                 Attached: {new Date(ap.attachedAt).toLocaleDateString('en-IN')}
//                                                                             </p>
//                                                                         </div>
//                                                                         <button
//                                                                             onClick={() => handleDetachFromProperty(offer._id, ap.propertyId._id || ap.propertyId)}
//                                                                             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                                                                             title="Detach"
//                                                                         >
//                                                                             <Unlink size={16} />
//                                                                         </button>
//                                                                     </div>
//                                                                 ))}
//                                                             </div>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </React.Fragment>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {showCreateModal && (
//                 <OfferModal
//                     title="Create New Offer"
//                     formData={formData}
//                     setFormData={setFormData}
//                     onSubmit={handleCreateOffer}
//                     onClose={() => {
//                         setShowCreateModal(false);
//                         resetForm();
//                     }}
//                 />
//             )}

//             {showEditModal && (
//                 <OfferModal
//                     title="Edit Offer"
//                     formData={formData}
//                     setFormData={setFormData}
//                     onSubmit={handleUpdateOffer}
//                     onClose={() => {
//                         setShowEditModal(false);
//                         setSelectedOffer(null);
//                         resetForm();
//                     }}
//                     isEdit={true}
//                 />
//             )}

//             {showAttachModal && selectedOffer && (
//                 <AttachPropertyModal
//                     offer={selectedOffer}
//                     properties={properties}
//                     onAttach={handleAttachToProperty}
//                     onClose={() => {
//                         setShowAttachModal(false);
//                         setSelectedOffer(null);
//                     }}
//                 />
//             )}

//             {showAnalyticsModal && selectedOffer && (
//                 <AnalyticsModal
//                     data={selectedOffer}
//                     onClose={() => {
//                         setShowAnalyticsModal(false);
//                         setSelectedOffer(null);
//                     }}
//                 />
//             )}
//         </div>
//     );
// };

// const StatCard = ({ icon, title, value, bgColor }) => (
//     <div className={`${bgColor} rounded-xl p-6 border border-gray-200`}>
//         <div className="flex items-center justify-between">
//             <div>
//                 <p className="text-gray-600 text-sm font-medium">{title}</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
//             </div>
//             <div className="p-3 bg-white rounded-lg shadow-sm">
//                 {icon}
//             </div>
//         </div>
//     </div>
// );

// const OfferModal = ({ title, formData, setFormData, onSubmit, onClose, isEdit = false }) => {
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                 <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                     <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
//                     <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                         <X size={24} />
//                     </button>
//                 </div>

//                 <form onSubmit={onSubmit} className="p-6 space-y-6">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Offer Title *
//                         </label>
//                         <input
//                             type="text"
//                             required
//                             value={formData.title}
//                             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="e.g., New Year Special Discount"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Description *
//                         </label>
//                         <textarea
//                             required
//                             value={formData.description}
//                             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                             rows="3"
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             placeholder="Describe your offer..."
//                         />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Discount Type *
//                             </label>
//                             <select
//                                 value={formData.discountType}
//                                 onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             >
//                                 <option value="PERCENTAGE">Percentage (%)</option>
//                                 <option value="FLAT">Flat Amount (₹)</option>
//                                 <option value="FREE_SERVICE">Free Service</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Discount Value *
//                             </label>
//                             <input
//                                 type="number"
//                                 required
//                                 value={formData.discountValue}
//                                 onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder={formData.discountType === 'PERCENTAGE' ? '10' : '1000'}
//                                 min="0"
//                             />
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Valid From *
//                             </label>
//                             <input
//                                 type="date"
//                                 required
//                                 value={formData.validFrom}
//                                 onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Valid Until *
//                             </label>
//                             <input
//                                 type="date"
//                                 required
//                                 value={formData.validUntil}
//                                 onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Max Usage Count *
//                             </label>
//                             <input
//                                 type="number"
//                                 required
//                                 value={formData.maxUsageCount}
//                                 onChange={(e) => setFormData({ ...formData, maxUsageCount: e.target.value })}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 min="1"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Min Token Amount
//                             </label>
//                             <input
//                                 type="number"
//                                 value={formData.minTokenAmount}
//                                 onChange={(e) => setFormData({ ...formData, minTokenAmount: e.target.value })}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                 placeholder="Optional"
//                                 min="0"
//                             />
//                         </div>
//                     </div>

//                     <div className="space-y-3">
//                         <label className="flex items-center gap-3">
//                             <input
//                                 type="checkbox"
//                                 checked={formData.isGlobalOffer}
//                                 onChange={(e) => setFormData({ ...formData, isGlobalOffer: e.target.checked })}
//                                 className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                             />
//                             <span className="text-sm text-gray-700">
//                                 Make this a global offer (available to all users)
//                             </span>
//                         </label>

//                         <label className="flex items-center gap-3">
//                             <input
//                                 type="checkbox"
//                                 checked={formData.autoAttachToNewBookings}
//                                 onChange={(e) => setFormData({ ...formData, autoAttachToNewBookings: e.target.checked })}
//                                 className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                             />
//                             <span className="text-sm text-gray-700">
//                                 Auto-attach to new bookings on attached properties
//                             </span>
//                         </label>

//                         <label className="flex items-center gap-3">
//                             <input
//                                 type="checkbox"
//                                 checked={formData.applicableForNewBookingsOnly}
//                                 onChange={(e) => setFormData({ ...formData, applicableForNewBookingsOnly: e.target.checked })}
//                                 className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                             />
//                             <span className="text-sm text-gray-700">
//                                 Applicable for new bookings only
//                             </span>
//                         </label>
//                     </div>

//                     <div className="flex gap-4 pt-4 border-t border-gray-200">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                         >
//                             {isEdit ? 'Update Offer' : 'Create Offer'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// const AttachPropertyModal = ({ offer, properties, onAttach, onClose }) => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [selectedProperties, setSelectedProperties] = useState([]);

//     const attachedPropertyIds = offer.attachedToProperties?.map(ap =>
//         ap.propertyId?._id || ap.propertyId
//     ) || [];

//     const availableProperties = properties.filter(p =>
//         !attachedPropertyIds.includes(p._id)
//     );

//     const filteredProperties = availableProperties.filter(property =>
//         property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         property.post_title?.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleAttach = async () => {
//         for (const propertyId of selectedProperties) {
//             await onAttach(propertyId);
//         }
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
//                 <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//                     <div>
//                         <h2 className="text-xl font-bold text-gray-900">Attach to Properties</h2>
//                         <p className="text-sm text-gray-600 mt-1">{offer.title}</p>
//                     </div>
//                     <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                         <X size={24} />
//                     </button>
//                 </div>

//                 <div className="p-6 border-b border-gray-200">
//                     <div className="relative">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                         <input
//                             type="text"
//                             placeholder="Search properties..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                     </div>
//                 </div>

//                 <div className="flex-1 overflow-y-auto p-6">
//                     {filteredProperties.length === 0 ? (
//                         <div className="text-center py-8">
//                             <Package className="mx-auto text-gray-400 mb-3" size={48} />
//                             <p className="text-gray-600">No properties available to attach</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-3">
//                             {filteredProperties.map((property) => (
//                                 <label
//                                     key={property._id}
//                                     className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
//                                 >
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedProperties.includes(property._id)}
//                                         onChange={(e) => {
//                                             if (e.target.checked) {
//                                                 setSelectedProperties([...selectedProperties, property._id]);
//                                             } else {
//                                                 setSelectedProperties(selectedProperties.filter(id => id !== property._id));
//                                             }
//                                         }}
//                                         className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                                     />
//                                     <div className="flex-1">
//                                         <h3 className="font-medium text-gray-900">
//                                             {property.title || property.post_title}
//                                         </h3>
//                                         {property.address && (
//                                             <p className="text-sm text-gray-600 mt-1">{property.address}</p>
//                                         )}
//                                     </div>
//                                 </label>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 <div className="px-6 py-4 border-t border-gray-200 flex gap-4">
//                     <button
//                         onClick={onClose}
//                         className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleAttach}
//                         disabled={selectedProperties.length === 0}
//                         className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//                     >
//                         Attach ({selectedProperties.length})
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const AnalyticsModal = ({ data, onClose }) => {
//     const { offer, analytics } = data;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                 <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                     <h2 className="text-2xl font-bold text-gray-900">Offer Analytics</h2>
//                     <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                         <X size={24} />
//                     </button>
//                 </div>

//                 <div className="p-6 space-y-6">
//                     <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
//                         <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
//                         <p className="text-gray-700">{offer.description}</p>
//                     </div>

//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <div className="bg-green-50 rounded-lg p-4 border border-green-200">
//                             <p className="text-sm text-green-700 font-medium">Total Uses</p>
//                             <p className="text-2xl font-bold text-green-900 mt-1">{analytics.totalUses}</p>
//                         </div>
//                         <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//                             <p className="text-sm text-blue-700 font-medium">Max Uses</p>
//                             <p className="text-2xl font-bold text-blue-900 mt-1">{analytics.maxUses}</p>
//                         </div>
//                         <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
//                             <p className="text-sm text-purple-700 font-medium">Usage Rate</p>
//                             <p className="text-2xl font-bold text-purple-900 mt-1">{analytics.usageRate.toFixed(1)}%</p>
//                         </div>
//                         <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
//                             <p className="text-sm text-orange-700 font-medium">Remaining</p>
//                             <p className="text-2xl font-bold text-orange-900 mt-1">{analytics.remainingUses}</p>
//                         </div>
//                     </div>

//                     {analytics.usageHistory && analytics.usageHistory.length > 0 && (
//                         <div>
//                             <h3 className="text-lg font-bold text-gray-900 mb-4">Usage History</h3>
//                             <div className="space-y-3 max-h-96 overflow-y-auto">
//                                 {analytics.usageHistory.map((usage, index) => (
//                                     <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                                         <div className="flex items-start justify-between">
//                                             <div>
//                                                 <p className="font-medium text-gray-900">
//                                                     {usage.user?.name || 'Unknown User'}
//                                                 </p>
//                                                 <p className="text-sm text-gray-600 mt-1">{usage.user?.email}</p>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className="text-sm text-gray-600">
//                                                     {new Date(usage.usedAt).toLocaleDateString('en-IN', {
//                                                         day: 'numeric',
//                                                         month: 'short',
//                                                         year: 'numeric'
//                                                     })}
//                                                 </p>
//                                                 <p className="text-xs text-gray-500 mt-1">
//                                                     {new Date(usage.usedAt).toLocaleTimeString('en-IN', {
//                                                         hour: '2-digit',
//                                                         minute: '2-digit'
//                                                     })}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <div className="px-6 py-4 border-t border-gray-200">
//                     <button
//                         onClick={onClose}
//                         className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//                     >
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BuilderOfferManagement;


import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Search, Calendar, TrendingUp, Users, Package, Link2, Unlink, X, Check, AlertCircle, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { base_url } from '../utils/baseurl';
import { getConfig } from '../utils/config';
import axios from 'axios';
import { useSelector } from 'react-redux';


const BuilderOfferManagement = () => {
    const [offers, setOffers] = useState([]);
    const { properties } = useSelector(state => state.properties);

    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAttachModal, setShowAttachModal] = useState(false);
    const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
    const [showMaxOffersModal, setShowMaxOffersModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null);
    const [expandedOfferId, setExpandedOfferId] = useState(null);
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [maxOffersValue, setMaxOffersValue] = useState(1);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        discountType: 'PERCENTAGE',
        discountValue: '',
        validFrom: '',
        validUntil: '',
        maxUsageCount: 1,
        minTokenAmount: '',
        isGlobalOffer: false,
        applicableForNewBookingsOnly: true,
        autoAttachToNewBookings: true,
        notificationTitle: '',
        notificationMessage: '',
        offerImage: ''
    });

    useEffect(() => {
        fetchOffers();
    }, [filterStatus]);

    const fetchOffers = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${base_url}/api/booking/offers/builder/my-offers?status=${filterStatus}`,
                getConfig()
            );
            const data = await response.json();

            if (data.success) {
                setOffers(data.data.offers);
                setStats(data.data.statistics);
            }
        } catch (error) {
            showNotification('Failed to fetch offers', 'error');
            console.error('Fetch offers error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOffer = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${base_url}/api/booking/offers/create`,
                {
                    ...formData,
                    discountValue: Number(formData.discountValue),
                    maxUsageCount: Number(formData.maxUsageCount),
                    minTokenAmount: formData.minTokenAmount
                        ? Number(formData.minTokenAmount)
                        : undefined,
                },
                getConfig()
            );

            const data = response.data;

            if (data.success) {
                showNotification("Offer created successfully!", "success");
                setShowCreateModal(false);
                resetForm();
                fetchOffers();
            } else {
                showNotification(data.message || "Failed to create offer", "error");
            }
        } catch (error) {
            showNotification("Failed to create offer", "error");
            console.error(
                "Create offer error:",
                error.response?.data || error.message
            );
        }
    };

    const handleUpdateOffer = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(
                `${base_url}/api/booking/offers/${selectedOffer._id}`,
                {
                    ...formData,
                },
                getConfig()
            );

            const data = response.data;

            if (data.success) {
                showNotification("Offer updated successfully!", "success");
                setShowEditModal(false);
                setSelectedOffer(null);
                resetForm();
                fetchOffers();
            } else {
                showNotification(data.message || "Failed to update offer", "error");
            }
        } catch (error) {
            showNotification("Failed to update offer", "error");
            console.error(
                "Update offer error:",
                error.response?.data || error.message
            );
        }
    };

    const handleDeactivateOffer = async (offerId) => {
        if (!window.confirm("Are you sure you want to deactivate this offer?")) return;

        try {
            const response = await axios.patch(
                `${base_url}/api/booking/offers/${offerId}/deactivate`,
                {
                    reason: "Deactivated by builder",
                },
                getConfig()
            );

            const data = response.data;

            if (data.success) {
                showNotification("Offer deactivated successfully!", "success");
                fetchOffers();
            } else {
                showNotification(data.message || "Failed to deactivate offer", "error");
            }
        } catch (error) {
            showNotification("Failed to deactivate offer", "error");
            console.error(
                "Deactivate offer error:",
                error.response?.data || error.message
            );
        }
    };

    const handleAttachToProperty = async (propertyId) => {
        try {
            const response = await axios.post(
                `${base_url}/api/booking/offers/${selectedOffer._id}/attach-to-property`,
                { propertyId },
                getConfig()
            );

            const data = response.data;

            if (data.success) {
                showNotification("Offer attached to property successfully!", "success");
                fetchOffers();
            } else {
                showNotification(data.message || "Failed to attach offer", "error");
            }
        } catch (error) {
            showNotification("Failed to attach offer", "error");
            console.error(
                "Attach offer error:",
                error.response?.data || error.message
            );
        }
    };

    const handleDetachFromProperty = async (offerId, propertyId) => {
        if (!window.confirm("Are you sure you want to detach this offer from the property?")) return;

        try {
            const response = await axios.delete(
                `${base_url}/api/booking/offers/${offerId}/detach-from-property/${propertyId}`,
                getConfig()
            );

            const data = response.data;

            if (data.success) {
                showNotification("Offer detached successfully!", "success");
                fetchOffers();
            } else {
                showNotification(data.message || "Failed to detach offer", "error");
            }
        } catch (error) {
            showNotification("Failed to detach offer", "error");
            console.error(
                "Detach offer error:",
                error.response?.data || error.message
            );
        }
    };

    const handleUpdateMaxOffers = async () => {
        if (selectedProperties.length === 0) {
            showNotification("Please select at least one property", "error");
            return;
        }

        try {
            const response = await axios.post(
                `${base_url}/api/offers/admin/update-max-offers-builder`,
                {
                    propertyIds: selectedProperties,
                    maxOfferAvail: maxOffersValue
                },
                getConfig()
            );

            const data = response.data;

            if (data.success) {
                showNotification(
                    `Max offers updated for ${data.data.successCount} ${data.data.successCount === 1 ? 'property' : 'properties'}!`,
                    "success"
                );

                if (data.data.failedCount > 0) {
                    console.warn('Some properties failed to update:', data.data.results.failed);
                }

                setShowMaxOffersModal(false);
                setSelectedProperties([]);
                setMaxOffersValue(1);
            } else {
                showNotification(data.message || "Failed to update max offers", "error");
            }
        } catch (error) {
            showNotification(
                error.response?.data?.message || "Failed to update max offers",
                "error"
            );
            console.error("Update max offers error:", error.response?.data || error.message);
        }
    };

    const fetchOfferAnalytics = async (offerId) => {
        try {
            const response = await fetch(
                `${base_url}/api/booking/offers/${offerId}/analytics`,
                getConfig()
            );

            const data = await response.json();

            if (data.success) {
                setSelectedOffer(data.data);
                setShowAnalyticsModal(true);
            }
        } catch (error) {
            showNotification('Failed to fetch analytics', 'error');
            console.error('Fetch analytics error:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            discountType: 'PERCENTAGE',
            discountValue: '',
            validFrom: '',
            validUntil: '',
            maxUsageCount: 1,
            minTokenAmount: '',
            isGlobalOffer: false,
            applicableForNewBookingsOnly: true,
            autoAttachToNewBookings: true,
            notificationTitle: '',
            notificationMessage: '',
            offerImage: ''
        });
    };

    const openEditModal = (offer) => {
        setSelectedOffer(offer);
        setFormData({
            title: offer.title,
            description: offer.description,
            discountType: offer.discountType,
            discountValue: offer.discountValue,
            validFrom: new Date(offer.validFrom).toISOString().split('T')[0],
            validUntil: new Date(offer.validUntil).toISOString().split('T')[0],
            maxUsageCount: offer.maxUsageCount,
            minTokenAmount: offer.minTokenAmount || '',
            isGlobalOffer: offer.isGlobalOffer,
            applicableForNewBookingsOnly: offer.applicableForNewBookingsOnly,
            autoAttachToNewBookings: offer.autoAttachToNewBookings,
            notificationTitle: offer.notificationTitle || '',
            notificationMessage: offer.notificationMessage || '',
            offerImage: offer.offerImage || ''
        });
        setShowEditModal(true);
    };

    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const filteredOffers = offers.filter(offer => {
        const matchesSearch = offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            offer.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const getOfferStatus = (offer) => {
        const now = new Date();
        if (!offer.isActive) return 'Inactive';
        if (now < new Date(offer.validFrom)) return 'Scheduled';
        if (now > new Date(offer.validUntil)) return 'Expired';
        if (offer.currentUsageCount >= offer.maxUsageCount) return 'Fully Used';
        return 'Active';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800 border-green-200';
            case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Expired': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
            case 'Fully Used': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {notification && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white animate-slide-in`}>
                    {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
                    <span className="font-medium">{notification.message}</span>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Offer Management</h1>
                        <p className="text-gray-600 mt-1">Create and manage promotional offers for your properties</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowMaxOffersModal(true)}
                            className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                        >
                            <Settings size={20} />
                            Set Max Offers
                        </button>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus size={20} />
                            Create Offer
                        </button>
                    </div>
                </div> */}

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4 lg:gap-0">
                    {/* Title & Description */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900">Offer Management</h1>
                        <p className="text-gray-600 mt-1">Create and manage promotional offers for your properties</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-row items-center gap-3">
                        <button
                            onClick={() => setShowMaxOffersModal(true)}
                            className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg  justify-center text-sm md:text-md "
                        >
                            <Settings size={20} />
                            Set Max Offers
                        </button>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg  justify-center text-sm md:text-md"
                        >
                            <Plus size={20} />
                            Create Offer
                        </button>
                    </div>
                </div>


                {/* {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={<Package className="text-blue-600" size={24} />}
                            title="Total Offers"
                            value={stats.totalOffers}
                            bgColor="bg-blue-50"
                        />
                        <StatCard
                            icon={<TrendingUp className="text-green-600" size={24} />}
                            title="Active Offers"
                            value={stats.activeOffers}
                            bgColor="bg-green-50"
                        />
                        <StatCard
                            icon={<Users className="text-purple-600" size={24} />}
                            title="Total Usage"
                            value={stats.totalUsage}
                            bgColor="bg-purple-50"
                        />
                        <StatCard
                            icon={<Calendar className="text-orange-600" size={24} />}
                            title="Usage Rate"
                            value={`${stats.totalPossibleUsage > 0 ? Math.round((stats.totalUsage / stats.totalPossibleUsage) * 100) : 0}%`}
                            bgColor="bg-orange-50"
                        />
                    </div>
                )} */}

                {stats && (
                    <div>
                        {/* Large screens: 4-column grid */}
                        <div className="hidden lg:grid grid-cols-4 gap-6 mb-8">
                            <StatCard
                                icon={<Package className="text-blue-600" size={24} />}
                                title="Total Offers"
                                value={stats.totalOffers}
                                bgColor="bg-blue-50"
                            />
                            <StatCard
                                icon={<TrendingUp className="text-green-600" size={24} />}
                                title="Active Offers"
                                value={stats.activeOffers}
                                bgColor="bg-green-50"
                            />
                            <StatCard
                                icon={<Users className="text-purple-600" size={24} />}
                                title="Total Usage"
                                value={stats.totalUsage}
                                bgColor="bg-purple-50"
                            />
                            <StatCard
                                icon={<Calendar className="text-orange-600" size={24} />}
                                title="Usage Rate"
                                value={`${stats.totalPossibleUsage > 0 ? Math.round((stats.totalUsage / stats.totalPossibleUsage) * 100) : 0}%`}
                                bgColor="bg-orange-50"
                            />
                        </div>

                        {/* Small & medium screens: horizontal carousel */}
                        <div className="lg:hidden flex gap-4 overflow-x-auto pb-2 mb-8 scrollbar-hide">
                            <StatCard
                                icon={<Package className="text-blue-600" size={24} />}
                                title="Total Offers"
                                value={stats.totalOffers}
                                bgColor="bg-blue-50"
                            />
                            <StatCard
                                icon={<TrendingUp className="text-green-600" size={24} />}
                                title="Active Offers"
                                value={stats.activeOffers}
                                bgColor="bg-green-50"
                            />
                            <StatCard
                                icon={<Users className="text-purple-600" size={24} />}
                                title="Total Usage"
                                value={stats.totalUsage}
                                bgColor="bg-purple-50"
                            />
                            <StatCard
                                icon={<Calendar className="text-orange-600" size={24} />}
                                title="Usage Rate"
                                value={`${stats.totalPossibleUsage > 0 ? Math.round((stats.totalUsage / stats.totalPossibleUsage) * 100) : 0}%`}
                                bgColor="bg-orange-50"
                            />
                        </div>
                    </div>
                )

                }


               

                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-10">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Search Input */}
                            <div className="flex-1 relative w-full md:w-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search offers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Status Filters */}
                            <div className="flex gap-2">
                                {['all', 'active', 'expired', 'inactive'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${filterStatus === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Offers Content */}
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : filteredOffers.length === 0 ? (
                            <div className="text-center py-12">
                                <Package className="mx-auto text-gray-400 mb-4" size={48} />
                                <p className="text-gray-600 text-lg">No offers found</p>
                                <p className="text-gray-500 mt-2">Create your first offer to get started</p>
                            </div>
                        ) : (
                            <>
                                {/* --- Table for Large Screens --- */}
                                <table className="hidden lg:table w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Offer Details
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Discount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Validity
                                            </th>
                                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Usage
                                            </th> */}
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredOffers.map((offer) => (
                                            <React.Fragment key={offer._id}>
                                                {/* Table row */}
                                                <tr className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex-1">
                                                                <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{offer.description}</p>
                                                                {offer.attachedToProperties && offer.attachedToProperties.length > 0 && (
                                                                    <button
                                                                        onClick={() => setExpandedOfferId(expandedOfferId === offer._id ? null : offer._id)}
                                                                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-2"
                                                                    >
                                                                        <Link2 size={12} />
                                                                        {offer.attachedToProperties.length} {offer.attachedToProperties.length === 1 ? 'Property' : 'Properties'}
                                                                        {expandedOfferId === offer._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-lg text-gray-900">
                                                            {offer.discountType === 'PERCENTAGE' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
                                                        </div>
                                                        <div className="text-xs text-gray-500 capitalize">{offer.discountType.toLowerCase()}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm">
                                                            <div className="text-gray-600">
                                                                {new Date(offer.validFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                            </div>
                                                            <div className="text-gray-400">to</div>
                                                            <div className="text-gray-600">
                                                                {new Date(offer.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                                                    style={{ width: `${(offer.currentUsageCount / offer.maxUsageCount) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-700">
                                                                {offer.currentUsageCount}/{offer.maxUsageCount}
                                                            </span>
                                                        </div>
                                                    </td> */}
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(getOfferStatus(offer))}`}>
                                                            {getOfferStatus(offer)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedOffer(offer);
                                                                    setShowAttachModal(true);
                                                                }}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="Attach to Property"
                                                            >
                                                                <Link2 size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => fetchOfferAnalytics(offer._id)}
                                                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                                title="View Analytics"
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => openEditModal(offer)}
                                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Edit2 size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeactivateOffer(offer._id)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Deactivate"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Expanded attached properties */}
                                                {expandedOfferId === offer._id && offer.attachedToProperties && (
                                                    <tr>
                                                        <td colSpan="6" className="px-6 py-4 bg-gray-50">
                                                            <div className="space-y-2">
                                                                <h4 className="font-medium text-gray-900 text-sm mb-3">Attached Properties:</h4>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                    {offer.attachedToProperties.map((ap) => (
                                                                        <div key={ap.propertyId._id || ap.propertyId} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                                                                            <div className="flex-1 flex items-center gap-3">
                                                                                {ap.propertyId?.post_images?.[0]?.url && (
                                                                                    <img
                                                                                        src={ap.propertyId.post_images[0].url}
                                                                                        alt={ap.propertyId?.title || 'Property'}
                                                                                        className="w-12 h-12 object-cover rounded"
                                                                                    />
                                                                                )}
                                                                                <div>
                                                                                    <p className="font-medium text-gray-900 text-sm">
                                                                                        {ap.propertyId?.title || ap.propertyId?.post_title || 'Property'}
                                                                                    </p>
                                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                                        Attached: {new Date(ap.attachedAt).toLocaleDateString('en-IN')}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <button
                                                                                onClick={() => handleDetachFromProperty(offer._id, ap.propertyId._id || ap.propertyId)}
                                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                                title="Detach"
                                                                            >
                                                                                <Unlink size={16} />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>

                                {/* --- Card View for Medium & Small Screens --- */}
                                <div className="lg:hidden space-y-4 p-4">
                                    {filteredOffers.map((offer) => (
                                        <div key={offer._id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{offer.description}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(getOfferStatus(offer))}`}>
                                                    {getOfferStatus(offer)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between text-sm text-gray-700">
                                                <span>
                                                    Discount:{' '}
                                                    <span className="font-medium">
                                                        {offer.discountType === 'PERCENTAGE'
                                                            ? `${offer.discountValue}%`
                                                            : `₹${offer.discountValue}`}
                                                    </span>
                                                </span>
                                                <span className="capitalize text-gray-500">{offer.discountType.toLowerCase()}</span>
                                            </div>

                                            <div className="text-sm text-gray-600">
                                                Valid:{' '}
                                                {new Date(offer.validFrom).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} -{' '}
                                                {new Date(offer.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </div>

                                            {/* <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full transition-all"
                                                        style={{ width: `${(offer.currentUsageCount / offer.maxUsageCount) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-medium text-gray-700">
                                                    {offer.currentUsageCount}/{offer.maxUsageCount}
                                                </span>
                                            </div> */}

                                            <div className="flex justify-end gap-3 pt-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedOffer(offer);
                                                        setShowAttachModal(true);
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    title="Attach to Property"
                                                >
                                                    <Link2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => fetchOfferAnalytics(offer._id)}
                                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                                    title="View Analytics"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(offer)}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeactivateOffer(offer._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                    title="Deactivate"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </div>

            {showCreateModal && (
                <OfferModal
                    title="Create New Offer"
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleCreateOffer}
                    onClose={() => {
                        setShowCreateModal(false);
                        resetForm();
                    }}
                />
            )}

            {showEditModal && (
                <OfferModal
                    title="Edit Offer"
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleUpdateOffer}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedOffer(null);
                        resetForm();
                    }}
                    isEdit={true}
                />
            )}

            {showAttachModal && selectedOffer && (
                <AttachPropertyModal
                    offer={selectedOffer}
                    properties={properties}
                    onAttach={handleAttachToProperty}
                    onClose={() => {
                        setShowAttachModal(false);
                        setSelectedOffer(null);
                    }}
                />
            )}

            {showAnalyticsModal && selectedOffer && (
                <AnalyticsModal
                    data={selectedOffer}
                    onClose={() => {
                        setShowAnalyticsModal(false);
                        setSelectedOffer(null);
                    }}
                />
            )}

            {showMaxOffersModal && (
                <MaxOffersModal
                    properties={properties}
                    selectedProperties={selectedProperties}
                    setSelectedProperties={setSelectedProperties}
                    maxOffersValue={maxOffersValue}
                    setMaxOffersValue={setMaxOffersValue}
                    onSubmit={handleUpdateMaxOffers}
                    onClose={() => {
                        setShowMaxOffersModal(false);
                        setSelectedProperties([]);
                        setMaxOffersValue(1);
                    }}
                />
            )}
        </div>
    );
};

// const StatCard = ({ icon, title, value, bgColor }) => (
//     <div className={`${bgColor} rounded-xl p-6 border border-gray-200`}>
//         <div className="flex items-center justify-between">
//             <div>
//                 <p className="text-gray-600 text-sm font-medium">{title}</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
//             </div>
//             <div className="p-3 bg-white rounded-lg shadow-sm">
//                 {icon}
//             </div>
//         </div>
//     </div>
// );

const StatCard = ({ icon, title, value, bgColor }) => (
    <div
        className={`${bgColor} rounded-xl p-6 border border-gray-200 
                min-w-[200px] md:min-w-[240px] flex-shrink-0`}
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-600 text-sm font-medium">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
                {icon}
            </div>
        </div>
    </div>
);


const OfferModal = ({ title, formData, setFormData, onSubmit, onClose, isEdit = false }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Offer Title *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., New Year Special Discount"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Describe your offer..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Discount Type *
                            </label>
                            <select
                                value={formData.discountType}
                                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="PERCENTAGE">Percentage (%)</option>
                                <option value="FLAT">Flat Amount (₹)</option>
                                <option value="FREE_SERVICE">Free Service</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Discount Value *
                            </label>
                            <input
                                type="number"
                                required
                                value={formData.discountValue}
                                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder={formData.discountType === 'PERCENTAGE' ? '10' : '1000'}
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Valid From *
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.validFrom}
                                onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Valid Until *
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.validUntil}
                                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Max Usage Count *
                            </label>
                            <input
                                type="number"
                                required
                                value={formData.maxUsageCount}
                                onChange={(e) => setFormData({ ...formData, maxUsageCount: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                min="1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Min Token Amount
                            </label>
                            <input
                                type="number"
                                value={formData.minTokenAmount}
                                onChange={(e) => setFormData({ ...formData, minTokenAmount: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Optional"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={formData.isGlobalOffer}
                                onChange={(e) => setFormData({ ...formData, isGlobalOffer: e.target.checked })}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                                Make this a global offer (available to all users)
                            </span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={formData.autoAttachToNewBookings}
                                onChange={(e) => setFormData({ ...formData, autoAttachToNewBookings: e.target.checked })}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                                Auto-attach to new bookings on attached properties
                            </span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={formData.applicableForNewBookingsOnly}
                                onChange={(e) => setFormData({ ...formData, applicableForNewBookingsOnly: e.target.checked })}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                                Applicable for new bookings only
                            </span>
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            {isEdit ? 'Update Offer' : 'Create Offer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AttachPropertyModal = ({ offer, properties, onAttach, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProperties, setSelectedProperties] = useState([]);

    const attachedPropertyIds = offer.attachedToProperties?.map(ap =>
        ap.propertyId?._id || ap.propertyId
    ) || [];

    const availableProperties = properties.filter(p =>
        !attachedPropertyIds.includes(p._id)
    );

    const filteredProperties = availableProperties.filter(property =>
        property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.post_title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAttach = async () => {
        for (const propertyId of selectedProperties) {
            await onAttach(propertyId);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Attach to Properties</h2>
                        <p className="text-sm text-gray-600 mt-1">{offer.title}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search properties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {filteredProperties.length === 0 ? (
                        <div className="text-center py-8">
                            <Package className="mx-auto text-gray-400 mb-3" size={48} />
                            <p className="text-gray-600">No properties available to attach</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredProperties.map((property) => (
                                <label
                                    key={property._id}
                                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedProperties.includes(property._id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedProperties([...selectedProperties, property._id]);
                                            } else {
                                                setSelectedProperties(selectedProperties.filter(id => id !== property._id));
                                            }
                                        }}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {property.title || property.post_title}
                                        </h3>
                                        {property.address && (
                                            <p className="text-sm text-gray-600 mt-1">{property.address}</p>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAttach}
                        disabled={selectedProperties.length === 0}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Attach ({selectedProperties.length})
                    </button>
                </div>
            </div>
        </div>
    );
};

const AnalyticsModal = ({ data, onClose }) => {
    const { offer, analytics } = data;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Offer Analytics</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                        <p className="text-gray-700">{offer.description}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <p className="text-sm text-green-700 font-medium">Total Uses</p>
                            <p className="text-2xl font-bold text-green-900 mt-1">{analytics.totalUses}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <p className="text-sm text-blue-700 font-medium">Max Uses</p>
                            <p className="text-2xl font-bold text-blue-900 mt-1">{analytics.maxUses}</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <p className="text-sm text-purple-700 font-medium">Usage Rate</p>
                            <p className="text-2xl font-bold text-purple-900 mt-1">{analytics.usageRate.toFixed(1)}%</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                            <p className="text-sm text-orange-700 font-medium">Remaining</p>
                            <p className="text-2xl font-bold text-orange-900 mt-1">{analytics.remainingUses}</p>
                        </div>
                    </div>

                    {analytics.usageHistory && analytics.usageHistory.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Usage History</h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {analytics.usageHistory.map((usage, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {usage.user?.name || 'Unknown User'}
                                                </p>
                                                <p className="text-sm text-gray-600 mt-1">{usage.user?.email}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">
                                                    {new Date(usage.usedAt).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {new Date(usage.usedAt).toLocaleTimeString('en-IN', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const MaxOffersModal = ({ properties, selectedProperties, setSelectedProperties, maxOffersValue, setMaxOffersValue, onSubmit, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProperties = properties.filter(property =>
        property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.post_title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const togglePropertySelection = (propertyId) => {
        if (selectedProperties.includes(propertyId)) {
            setSelectedProperties(selectedProperties.filter(id => id !== propertyId));
        } else {
            setSelectedProperties([...selectedProperties, propertyId]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedProperties.length === filteredProperties.length) {
            setSelectedProperties([]);
        } else {
            setSelectedProperties(filteredProperties.map(p => p._id));
        }
    };

    const getPropertyActiveOffersCount = (property) => {
        return property.attachedOffers?.filter(o => o.isActive).length || 0;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Set Max Offers for Properties</h2>
                        <p className="text-sm text-gray-600 mt-1">Configure maximum available offers per property</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 border-b border-gray-200 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search properties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Max Offers Available *
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={maxOffersValue}
                                onChange={(e) => setMaxOffersValue(Number(e.target.value))}
                                className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter max offers"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Cannot exceed active offers count for each property
                            </p>
                        </div>
                        <div className="text-sm text-gray-600">
                            <span className="font-medium">{selectedProperties.length}</span> {selectedProperties.length === 1 ? 'property' : 'properties'} selected
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {filteredProperties.length === 0 ? (
                        <div className="text-center py-8">
                            <Package className="mx-auto text-gray-400 mb-3" size={48} />
                            <p className="text-gray-600">No properties found</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between mb-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Select All
                                    </span>
                                </label>
                            </div>
                            {filteredProperties.map((property) => {
                                const activeOffersCount = getPropertyActiveOffersCount(property);
                                return (
                                    <label
                                        key={property._id}
                                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedProperties.includes(property._id)}
                                            onChange={() => togglePropertySelection(property._id)}
                                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                        {property.post_images?.[0]?.url && (
                                            <img
                                                src={property.post_images[0].url}
                                                alt={property.title || 'Property'}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">
                                                {property.title || property.post_title}
                                            </h3>
                                            {property.address && (
                                                <p className="text-sm text-gray-600 mt-1">{property.address}</p>
                                            )}
                                            <div className="flex items-center gap-4 mt-2 text-xs">
                                                <span className="text-gray-500">
                                                    Current Max: <span className="font-medium text-gray-700">{property.maxOfferAvail || 0}</span>
                                                </span>
                                                <span className="text-gray-500">
                                                    Active Offers: <span className="font-medium text-gray-700">{activeOffersCount}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={selectedProperties.length === 0}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Update Max Offers ({selectedProperties.length})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuilderOfferManagement;
