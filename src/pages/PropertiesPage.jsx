// // // import React, { useEffect, useState, useRef } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';
// // // import { base_url } from '../utils/baseurl';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { fetchPropertyInteractions } from '../features/properties/propertiesSlice';

// // // const PropertiesInteractions = () => {
// // //   // State for properties and selection
// // //   // const [properties, setProperties] = useState([]);
// // //   const { properties, propertyInteraction ,isLoading, isError, message } = useSelector((state) => state.properties);

// // //   console.log("propertyInteraction", propertyInteraction)

// // //   const navigate = useNavigate()
// // //   const [builderId, setBuilderId] = useState('');

// // //   const dispatch = useDispatch()


// // //   // State for interactions
// // //   // const [interactions, setInteractions] = useState([]);
// // //   const [allActivities, setAllActivities] = useState([]);

// // //   // Builder ID from localStorage
// // //   // const [builderId, setBuilderId] = useState('');

// // //   // console.log("interactions", interactions)


// // //   // ✅ Load builder ID from localStorage once
// // //   useEffect(() => {
// // //     const data = localStorage.getItem('builder-id');
// // //     if (data) {
// // //       const parsed = JSON.parse(data);
// // //       if (parsed?.id) {
// // //         setBuilderId(parsed.id);
// // //         console.log('builder-id loaded:', parsed.id);
// // //       } else {
// // //         console.warn('No builder ID found in localStorage');
// // //       }
// // //     }
// // //   }, []);

// // //   // handleGetAllInteractions of selected Property
// // //   // const handleGetAllInteractions = () => {

// // //   //   // dispatch(fetchPropertyInteractions({builderId , propertyId}))
// // //   //   navigate('/enquiries')

// // //   // }





// // //   // const getInteractionCount = (propertyId) => {
// // //   //   return allActivities.filter(activity =>
// // //   //     activity.entityTitle === properties.find(p => p.post_id === propertyId)?.post_title
// // //   //   ).length;
// // //   // };

// // //   // const getLatestInteraction = (propertyId) => {
// // //   //   const propertyTitle = properties.find(p => p.post_id === propertyId)?.post_title;
// // //   //   const propertyInteractions = allActivities.filter(activity =>
// // //   //     activity.entityTitle === propertyTitle
// // //   //   );

// // //   //   if (propertyInteractions.length === 0) return null;

// // //   //   return propertyInteractions.sort((a, b) =>
// // //   //     new Date(b.timestamp) - new Date(a.timestamp)
// // //   //   )[0];
// // //   // };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
// // //         <div className="w-full flex items-center justify-center py-20">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className=" min-h-screen">
// // //       {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
// // //         Property Interactions
// // //       </h1> */}

// // //       {properties.length === 0 ? (
// // //         <div className="bg-white rounded-lg shadow-md text-center">
// // //           <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// // //           </svg>
// // //           <h2 className="mt-4 text-lg font-semibold text-gray-700">No Properties Found</h2>
// // //           <p className="mt-2 text-gray-500">There are no properties associated with this builder.</p>
// // //         </div>
// // //       ) : (
// // //         <div className="grid gap-6">
// // //           {properties.map((property) => {
// // //             {/* const interactionCount = getInteractionCount(property.post_id);
// // //             const latestInteraction = getLatestInteraction(property.post_id); */}

// // //             return (
// // //               <div key={property.post_id} className="bg-white rounded-xl shadow-sm border border-gray-200">
// // //                 {/* Property Header */}
// // //                 <div className="py-3 px-4 border-b border-gray-100">
// // //                   <div className="flex items-start justify-between">
// // //                     <div className="flex items-start space-x-4">
// // //                       {/* Status Badge */}
// // //                       <div className="flex items-center space-x-2">
// // //                         <div className="flex items-center space-x-1">
// // //                           <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
// // //                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// // //                             ACTIVE
// // //                           </div>
// // //                         </div>
// // //                         {/* <span className="text-sm bg-red-50 text-red-600 px-2 py-1 rounded">
// // //                           Free Plan
// // //                         </span> */}
// // //                       </div>
// // //                     </div>

// // //                     {/* Responses Count */}
// // //                     {/* <div className="flex items-center space-x-4">
// // //                       <div className="flex items-center space-x-2">
// // //                         <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
// // //                           <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// // //                           </svg>
// // //                         </div>
// // //                         <span className="text-lg font-semibold text-gray-900">{interactionCount}</span>
// // //                         <span className="text-gray-600">Responses</span>
// // //                       </div>
// // //                       <button className="text-red-500 hover:text-red-600 flex items-center space-x-1">
// // //                         <span className="text-sm font-medium">View All</span>
// // //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// // //                         </svg>
// // //                       </button>
// // //                     </div> */}
// // //                   </div>

// // //                   {/* Property Details */}
// // //                   <div className="mt-4 flex items-start space-x-6">
// // //                     {/* Property Image Placeholder */}
// // //                     <div className="w-32 h-24 bg-pink-50 rounded-lg flex items-center justify-center border-2 border-dashed border-pink-200">
// // //                       {property.post_images && property.post_images.length > 0 ? (
// // //                         <img
// // //                           src={property.post_images[0].url}
// // //                           alt="Property"
// // //                           className="w-full h-full object-cover rounded-lg"
// // //                         />
// // //                       ) : (
// // //                         <div className="text-center">
// // //                           <svg className="w-8 h-8 text-pink-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                           </svg>
// // //                           <p className="text-xs text-gray-400">No Image</p>
// // //                           <p className="text-xs text-gray-400">Available</p>
// // //                           <button className="mt-2 text-xs bg-red-500 text-white px-3 py-1 rounded">
// // //                             Add Photos
// // //                           </button>
// // //                         </div>
// // //                       )}
// // //                     </div>

// // //                     {/* Property Info */}
// // //                     <div className="flex-1">
// // //                       <div className="flex items-start justify-between">
// // //                         <div>
// // //                           {/* <p className="text-sm text-gray-500 mb-1">
// // //                             Property ID: {property.post_id} | Valid Till: Oct 20, 2025
// // //                           </p> */}
// // //                           <h3 className="text-xl font-semibold text-gray-900 mb-2">
// // //                             {/* {formatPrice(property.price, property.priceUnit)} {property.bedrooms} BHK Builder Floor Apartment for Sale */}
// // //                             {property?.post_title}
// // //                           </h3>
// // //                           <div className="flex items-center space-x-4 text-sm text-gray-600">
// // //                             <span>{property.area} Sq-ft</span>
// // //                             <span>{property.locality}, {property.city}</span>
// // //                           </div>
// // //                           {/* <button className="mt-2 text-red-500 hover:text-red-600 text-sm flex items-center space-x-1">
// // //                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //                             </svg>
// // //                             <span>Check Property Value</span>
// // //                           </button> */}
// // //                         </div>
// // //                       </div>

// // //                       {/* Action Buttons */}
// // //                       <div className="flex items-center space-x-3 mt-4">
// // //                         <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
// // //                           Edit
// // //                         </button>
// // //                         <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
// // //                           Refresh
// // //                         </button>
// // //                         <button className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">
// // //                           Deactivate
// // //                         </button>
// // //                         <button className="p-2 text-gray-400 hover:text-gray-600">
// // //                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
// // //                           </svg>
// // //                         </button>
// // //                       </div>
// // //                     </div>

// // //                     {/* Premium Plan CTA */}
// // //                     <div className="w-auto h-auto bg-pink-50 rounded-lg p-4 border border-pink-200">
// // //                       <div className="flex flex-col gap-4 items-center space-x-4">
// // //                         <div className="flex items-center space-x-2">
// // //                           <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
// // //                             <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// // //                             </svg>
// // //                           </div>
// // //                           {/* <span className="text-lg font-semibold text-gray-900">{interactions?.length}</span> */}
// // //                           <span className="text-gray-600">Responses</span>
// // //                         </div>
// // //                         <button className="text-red-500 hover:text-red-600 flex items-center space-x-1">
// // //                           <span className="text-sm font-medium" onClick={() => navigate('/enquiries')}>View All</span>
// // //                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// // //                           </svg>
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Latest Interaction */}

// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default PropertiesInteractions;

// // import React, { useEffect, useState, useRef } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { base_url } from '../utils/baseurl';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchPropertyInteractions } from '../features/properties/propertiesSlice';

// // const PropertiesInteractions = () => {
// //   // State for properties and selection
// //   const { properties, propertyInteraction, isLoading, isError, message } = useSelector((state) => state.properties);

// //   const navigate = useNavigate()
// //   const [builderId, setBuilderId] = useState('');
// //   const dispatch = useDispatch()

// //   // State for interactions
// //   const [allActivities, setAllActivities] = useState([]);

// //   // ✅ Load builder ID from localStorage once
// //   useEffect(() => {
// //     const data = localStorage.getItem('builder-id');
// //     if (data) {
// //       const parsed = JSON.parse(data);
// //       if (parsed?.id) {
// //         setBuilderId(parsed.id);
// //         console.log('builder-id loaded:', parsed.id);
// //       } else {
// //         console.warn('No builder ID found in localStorage');
// //       }
// //     }
// //   }, []);

// //   // Function to get interaction count for a specific property
// //   const getInteractionCount = (propertyTitle) => {
// //     if (!propertyInteraction || !Array.isArray(propertyInteraction)) return 0;

// //     return propertyInteraction.reduce((total, interaction) => {
// //       if (interaction.entityTitle === propertyTitle) {
// //         return total + (interaction.stats?.visits || 0) +
// //           (interaction.stats?.saves || 0) +
// //           (interaction.stats?.contacts || 0) +
// //           (interaction.stats?.callbacks || 0);
// //       }
// //       return total;
// //     }, 0);
// //   };

// //   // Function to get latest interaction for a property
// //   const getLatestInteraction = (propertyTitle) => {
// //     if (!propertyInteraction || !Array.isArray(propertyInteraction)) return null;

// //     const propertyInteractions = propertyInteraction.filter(interaction =>
// //       interaction.entityTitle === propertyTitle
// //     );

// //     if (propertyInteractions.length === 0) return null;

// //     // Get the most recent interaction by date
// //     const latestInteraction = propertyInteractions.sort((a, b) =>
// //       new Date(b.date) - new Date(a.date)
// //     )[0];

// //     return latestInteraction;
// //   };

// //   // Function to get detailed stats for a property
// //   const getPropertyStats = (propertyTitle) => {
// //     if (!propertyInteraction || !Array.isArray(propertyInteraction)) {
// //       return { visits: 0, saves: 0, contacts: 0, callbacks: 0 };
// //     }

// //     return propertyInteraction.reduce((totalStats, interaction) => {
// //       if (interaction.entityTitle === propertyTitle) {
// //         return {
// //           visits: totalStats.visits + (interaction.stats?.visits || 0),
// //           saves: totalStats.saves + (interaction.stats?.saves || 0),
// //           contacts: totalStats.contacts + (interaction.stats?.contacts || 0),
// //           callbacks: totalStats.callbacks + (interaction.stats?.callbacks || 0)
// //         };
// //       }
// //       return totalStats;
// //     }, { visits: 0, saves: 0, contacts: 0, callbacks: 0 });
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
// //         <div className="w-full flex items-center justify-center py-20">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className=" min-h-screen">
// //       {properties.length === 0 ? (
// //         <div className="bg-white rounded-lg shadow-md text-center">
// //           <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// //           </svg>
// //           <h2 className="mt-4 text-lg font-semibold text-gray-700">No Properties Found</h2>
// //           <p className="mt-2 text-gray-500">There are no properties associated with this builder.</p>
// //         </div>
// //       ) : (
// //         <div className="grid gap-6">
// //           {properties.map((property) => {
// //             const interactionCount = getInteractionCount(property.post_title);
// //             const latestInteraction = getLatestInteraction(property.post_title);
// //             const propertyStats = getPropertyStats(property.post_title);

// //             return (
// //               <div key={property.post_id} className="bg-white rounded-xl shadow-sm border border-gray-200">
// //                 {/* Property Header */}
// //                 <div className="py-3 px-4 border-b border-gray-100">
// //                   <div className="flex items-start justify-between">
// //                     <div className="flex items-start space-x-4">
// //                       {/* Status Badge */}
// //                       <div className="flex items-center space-x-2">
// //                         <div className="flex items-center space-x-1">
// //                           <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
// //                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //                             ACTIVE
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Property Details */}
// //                   <div className="mt-4 flex items-start space-x-6">
// //                     {/* Property Image Placeholder */}
// //                     <div className="w-32 h-24 bg-pink-50 rounded-lg flex items-center justify-center border-2 border-dashed border-pink-200">
// //                       {property.post_images && property.post_images.length > 0 ? (
// //                         <img
// //                           src={property.post_images[0].url}
// //                           alt="Property"
// //                           className="w-full h-full object-cover rounded-lg"
// //                         />
// //                       ) : (
// //                         <div className="text-center">
// //                           <svg className="w-8 h-8 text-pink-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                           </svg>
// //                           <p className="text-xs text-gray-400">No Image</p>
// //                           <p className="text-xs text-gray-400">Available</p>
// //                           <button className="mt-2 text-xs bg-red-500 text-white px-3 py-1 rounded">
// //                             Add Photos
// //                           </button>
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Property Info */}
// //                     <div className="flex-1">
// //                       <div className="flex items-start justify-between">
// //                         <div>
// //                           <h3 className="text-xl font-semibold text-gray-900 mb-2">
// //                             {property?.post_title}
// //                           </h3>
// //                           <div className="flex items-center space-x-4 text-sm text-gray-600">
// //                             <span>{property.area} Sq-ft</span>
// //                             <span>{property.locality}, {property.city}</span>
// //                           </div>
// //                         </div>
// //                       </div>

// //                       {/* Interaction Stats */}
// //                       {interactionCount > 0 && (
// //                         <div className="mt-3 p-3 bg-gray-50 rounded-lg">
// //                           <div className="flex items-center justify-between">
// //                             <div className="text-sm text-gray-600">
// //                               <span className="font-medium">Total Interactions: </span>
// //                               <span className="text-blue-600 font-semibold">{interactionCount}</span>
// //                             </div>
// //                             {latestInteraction && (
// //                               <div className="text-xs text-gray-500">
// //                                 Last activity: {new Date(latestInteraction.date).toLocaleDateString()}
// //                               </div>
// //                             )}
// //                           </div>
// //                           <div className="mt-2 flex items-center space-x-4 text-xs text-gray-600">
// //                             <span>Visits: <span className="font-medium text-gray-800">{propertyStats.visits}</span></span>
// //                             <span>Saves: <span className="font-medium text-gray-800">{propertyStats.saves}</span></span>
// //                             <span>Contacts: <span className="font-medium text-gray-800">{propertyStats.contacts}</span></span>
// //                             <span>Callbacks: <span className="font-medium text-gray-800">{propertyStats.callbacks}</span></span>
// //                           </div>
// //                         </div>
// //                       )}

// //                       {/* Action Buttons */}
// //                       <div className="flex items-center space-x-3 mt-4">
// //                         <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
// //                           Edit
// //                         </button>
// //                         <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
// //                           Refresh
// //                         </button>
// //                         <button className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">
// //                           Deactivate
// //                         </button>
// //                         <button className="p-2 text-gray-400 hover:text-gray-600">
// //                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
// //                           </svg>
// //                         </button>
// //                       </div>
// //                     </div>

// //                     {/* Interaction Summary CTA */}
// //                     <div className="w-auto h-auto bg-pink-50 rounded-lg p-4 border border-pink-200">
// //                       <div className="flex flex-col gap-4 items-center">
// //                         <div className="flex items-center space-x-2">
// //                           <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
// //                             <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //                             </svg>
// //                           </div>
// //                           <span className="text-lg font-semibold text-gray-900">{interactionCount}</span>
// //                           <span className="text-gray-600">Responses</span>
// //                         </div>
// //                         <button
// //                           className="text-red-500 hover:text-red-600 flex items-center space-x-1"
// //                           onClick={() => navigate('/enquiries')}
// //                         >
// //                           <span className="text-sm font-medium">View All</span>
// //                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                           </svg>
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PropertiesInteractions;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { base_url } from '../utils/baseurl';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPropertyInteractions } from '../features/properties/propertiesSlice';

// const PropertiesInteractions = () => {
//   // State for properties and selection
//   const { properties, propertyInteraction, isLoading, isError, message } = useSelector((state) => state.properties);

//   const navigate = useNavigate()
//   const [builderId, setBuilderId] = useState('');
//   const dispatch = useDispatch()

//   // State for interactions
//   const [allActivities, setAllActivities] = useState([]);

//   // ✅ Load builder ID from localStorage once
//   useEffect(() => {
//     const data = localStorage.getItem('builder-id');
//     if (data) {
//       const parsed = JSON.parse(data);
//       if (parsed?.id) {
//         setBuilderId(parsed.id);
//         console.log('builder-id loaded:', parsed.id);
//       } else {
//         console.warn('No builder ID found in localStorage');
//       }
//     }
//   }, []);

//   // Function to get interaction count for a specific property
//   const getInteractionCount = (propertyTitle) => {
//     if (!propertyInteraction || !Array.isArray(propertyInteraction)) return 0;

//     return propertyInteraction.reduce((total, interaction) => {
//       if (interaction.entityTitle === propertyTitle) {
//         return total + (interaction.stats?.visits || 0) +
//           (interaction.stats?.saves || 0) +
//           (interaction.stats?.contacts || 0) +
//           (interaction.stats?.callbacks || 0);
//       }
//       return total;
//     }, 0);
//   };

//   // Function to get latest interaction for a property
//   const getLatestInteraction = (propertyTitle) => {
//     if (!propertyInteraction || !Array.isArray(propertyInteraction)) return null;

//     const propertyInteractions = propertyInteraction.filter(interaction =>
//       interaction.entityTitle === propertyTitle
//     );

//     if (propertyInteractions.length === 0) return null;

//     // Get the most recent interaction by date
//     const latestInteraction = propertyInteractions.sort((a, b) =>
//       new Date(b.date) - new Date(a.date)
//     )[0];

//     return latestInteraction;
//   };

//   // Function to get detailed stats for a property
//   const getPropertyStats = (propertyTitle) => {
//     if (!propertyInteraction || !Array.isArray(propertyInteraction)) {
//       return { visits: 0, saves: 0, contacts: 0, callbacks: 0 };
//     }

//     return propertyInteraction.reduce((totalStats, interaction) => {
//       if (interaction.entityTitle === propertyTitle) {
//         return {
//           visits: totalStats.visits + (interaction.stats?.visits || 0),
//           saves: totalStats.saves + (interaction.stats?.saves || 0),
//           contacts: totalStats.contacts + (interaction.stats?.contacts || 0),
//           callbacks: totalStats.callbacks + (interaction.stats?.callbacks || 0)
//         };
//       }
//       return totalStats;
//     }, { visits: 0, saves: 0, contacts: 0, callbacks: 0 });
//   };

//   if (isLoading) {
//     return (
//       <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
//         <div className="w-full flex items-center justify-center py-20">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className=" min-h-screen">
//       {properties.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md text-center">
//           <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//           </svg>
//           <h2 className="mt-4 text-lg font-semibold text-gray-700">No Properties Found</h2>
//           <p className="mt-2 text-gray-500">There are no properties associated with this builder.</p>
//         </div>
//       ) : (
//         <div className="grid gap-6">
//           {properties.map((property) => {
//             const interactionCount = getInteractionCount(property.post_title);
//             const latestInteraction = getLatestInteraction(property.post_title);
//             const propertyStats = getPropertyStats(property.post_title);

//             return (
//               <div key={property.post_id} className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 {/* Property Header */}
//                 <div className="py-3 px-4 border-b border-gray-100">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4">
//                       {/* Status Badge */}
//                       <div className="flex items-center space-x-2">
//                         <div className="flex items-center space-x-1">
//                           <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
//                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                             ACTIVE
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Property Details */}
//                   <div className="mt-4 flex items-start space-x-6">
//                     {/* Property Image Placeholder */}
//                     <div className="w-32 h-24 bg-pink-50 rounded-lg flex items-center justify-center border-2 border-dashed border-pink-200">
//                       {property.post_images && property.post_images.length > 0 ? (
//                         <img
//                           src={property.post_images[0].url}
//                           alt="Property"
//                           className="w-full h-full object-cover rounded-lg"
//                         />
//                       ) : (
//                         <div className="text-center">
//                           <svg className="w-8 h-8 text-pink-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <p className="text-xs text-gray-400">No Image</p>
//                           <p className="text-xs text-gray-400">Available</p>
//                           <button className="mt-2 text-xs bg-red-500 text-white px-3 py-1 rounded">
//                             Add Photos
//                           </button>
//                         </div>
//                       )}
//                     </div>

//                     {/* Property Info */}
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                             {property?.post_title}
//                           </h3>
//                           <div className="flex items-center space-x-4 text-sm text-gray-600">
//                             <span>{property.area} Sq-ft</span>
//                             <span>{property.locality}, {property.city}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Interaction Stats */}
//                       {interactionCount > 0 && (
//                         <div className="mt-3 p-3 bg-gray-50 rounded-lg">
//                           <div className="flex items-center justify-between">
//                             <div className="text-sm text-gray-600">
//                               <span className="font-medium">Total Interactions: </span>
//                               <span className="text-blue-600 font-semibold">{interactionCount}</span>
//                             </div>
//                             {latestInteraction && (
//                               <div className="text-xs text-gray-500">
//                                 Last activity: {new Date(latestInteraction.date).toLocaleDateString()}
//                               </div>
//                             )}
//                           </div>
//                           <div className="mt-2 flex items-center space-x-4 text-xs text-gray-600">
//                             <span>Visits: <span className="font-medium text-gray-800">{propertyStats.visits}</span></span>
//                             <span>Saves: <span className="font-medium text-gray-800">{propertyStats.saves}</span></span>
//                             <span>Contacts: <span className="font-medium text-gray-800">{propertyStats.contacts}</span></span>
//                             <span>Callbacks: <span className="font-medium text-gray-800">{propertyStats.callbacks}</span></span>
//                           </div>
//                         </div>
//                       )}

//                       {/* Action Buttons */}
//                       <div className="flex items-center space-x-3 mt-4">
//                         <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
//                           Edit
//                         </button>
//                         <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
//                           Refresh
//                         </button>
//                         <button className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">
//                           Deactivate
//                         </button>
//                         <button className="p-2 text-gray-400 hover:text-gray-600">
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>

//                     {/* Total Interactions Box */}
//                     <div className="w-auto h-auto bg-pink-50 rounded-lg p-4 border border-pink-200">
//                       <div className="flex flex-col items-center">
//                         {/* Header with icon and total count */}
//                         <div className="flex items-center space-x-2 mb-3">
//                           <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
//                             <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                             </svg>
//                           </div>
//                           <div className="text-center">
//                             <div className="text-lg font-semibold text-gray-900">{interactionCount}</div>
//                             <div className="text-xs text-gray-600">Total Interactions</div>
//                           </div>
//                         </div>

//                         {/* Detailed Stats */}
//                         <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
//                           <div className="text-center">
//                             <div className="text-gray-600">Visits:</div>
//                             <div className="font-semibold text-gray-800">{propertyStats.visits}</div>
//                           </div>
//                           <div className="text-center">
//                             <div className="text-gray-600">Saves:</div>
//                             <div className="font-semibold text-gray-800">{propertyStats.saves}</div>
//                           </div>
//                           <div className="text-center">
//                             <div className="text-gray-600">Contacts:</div>
//                             <div className="font-semibold text-gray-800">{propertyStats.contacts}</div>
//                           </div>
//                           <div className="text-center">
//                             <div className="text-gray-600">Callbacks:</div>
//                             <div className="font-semibold text-gray-800">{propertyStats.callbacks}</div>
//                           </div>
//                         </div>

//                         {/* View All Button */}
//                         <button
//                           className="text-red-500 hover:text-red-600 flex items-center space-x-1"
//                           onClick={() => navigate('/enquiries')}
//                         >
//                           <span className="text-sm font-medium">View All</span>
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertiesInteractions;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../utils/baseurl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyInteractions } from '../features/properties/propertiesSlice';

const PropertiesInteractions = () => {
  // State for properties and selection
  const { properties, propertyInteraction, isLoading, isError, message } = useSelector((state) => state.properties);

  const navigate = useNavigate()
  const [builderId, setBuilderId] = useState('');
  const dispatch = useDispatch()

  // State for interactions
  const [allActivities, setAllActivities] = useState([]);

  // ✅ Load builder ID from localStorage once
  useEffect(() => {
    const data = localStorage.getItem('builder-id');
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed?.id) {
        setBuilderId(parsed.id);
        console.log('builder-id loaded:', parsed.id);
      } else {
        console.warn('No builder ID found in localStorage');
      }
    }
  }, []);

  // Function to get interaction count for a specific property
  const getInteractionCount = (propertyTitle) => {
    if (!propertyInteraction || !Array.isArray(propertyInteraction)) return 0;

    return propertyInteraction.reduce((total, interaction) => {
      if (interaction.entityTitle === propertyTitle) {
        return total + (interaction.stats?.visits || 0) +
          (interaction.stats?.saves || 0) +
          (interaction.stats?.contacts || 0) +
          (interaction.stats?.callbacks || 0);
      }
      return total;
    }, 0);
  };

  // Function to get latest interaction for a property
  const getLatestInteraction = (propertyTitle) => {
    if (!propertyInteraction || !Array.isArray(propertyInteraction)) return null;

    const propertyInteractions = propertyInteraction.filter(interaction =>
      interaction.entityTitle === propertyTitle
    );

    if (propertyInteractions.length === 0) return null;

    // Get the most recent interaction by date
    const latestInteraction = propertyInteractions.sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )[0];

    return latestInteraction;
  };

  // Function to get detailed stats for a property
  const getPropertyStats = (propertyTitle) => {
    if (!propertyInteraction || !Array.isArray(propertyInteraction)) {
      return { visits: 0, saves: 0, contacts: 0, callbacks: 0 };
    }

    return propertyInteraction.reduce((totalStats, interaction) => {
      if (interaction.entityTitle === propertyTitle) {
        return {
          visits: totalStats.visits + (interaction.stats?.visits || 0),
          saves: totalStats.saves + (interaction.stats?.saves || 0),
          contacts: totalStats.contacts + (interaction.stats?.contacts || 0),
          callbacks: totalStats.callbacks + (interaction.stats?.callbacks || 0)
        };
      }
      return totalStats;
    }, { visits: 0, saves: 0, contacts: 0, callbacks: 0 });
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="w-full flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">No Properties Found</h2>
            <p className="text-gray-500 text-sm">There are no properties associated with this builder.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {properties.map((property) => {
              const interactionCount = getInteractionCount(property.post_title);
              const latestInteraction = getLatestInteraction(property.post_title);
              const propertyStats = getPropertyStats(property.post_title);

              return (
                <div key={property.post_id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Property Image */}
                      <div className="flex-shrink-0">
                        <div className=" rounded-lg overflow-hidden bg-gray-100">
                          {property.post_images && property.post_images.length > 0 ? (
                            <img
                              src={property.post_images[0].url}
                              alt="Property"
                              className="w-44 h-auto max-h-44 object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-4 items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {property?.post_title}
                              </h3>
                              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                ACTIVE
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                                {property.area} Sq-ft
                              </span>
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                {property.locality}, {property.city}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons - Compact */}
                          <div className="flex items-center gap-1 ml-4">
                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                              Edit
                            </button>
                            <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                              Refresh
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Compact Interactions Stats */}
                      <div className="flex-shrink-0 ml-4">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100 min-w-[180px]">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
                                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-700">Interactions</span>
                            </div>
                            <span className="text-xl font-bold text-blue-600">{interactionCount}</span>
                          </div>

                          <div className="grid grid-cols-4 gap-2 mb-2">
                            <div className="text-center">
                              <div className="text-sm font-semibold text-gray-900">{propertyStats.visits}</div>
                              <div className="text-xs text-gray-600">Visits</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-semibold text-gray-900">{propertyStats.saves}</div>
                              <div className="text-xs text-gray-600">Saves</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-semibold text-gray-900">{propertyStats.contacts}</div>
                              <div className="text-xs text-gray-600">Contacts</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-semibold text-gray-900">{propertyStats.callbacks}</div>
                              <div className="text-xs text-gray-600">Calls</div>
                            </div>
                          </div>

                          <button
                            className="w-full bg-blue-600 text-white rounded-md py-1.5 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                            onClick={() => navigate('/enquiries')}
                          >
                            View Details
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          {/* {latestInteraction && (
                            <div className="text-xs text-gray-500 mt-1 text-center">
                              Last: {new Date(latestInteraction.date).toLocaleDateString()}
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesInteractions;