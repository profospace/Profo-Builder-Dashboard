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
//       <div className="p-4 bg-gray-50 min-h-screen">
//         <div className="w-full flex items-center justify-center py-16">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-6xl mx-auto">
//         {properties.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//             <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
//               <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <h2 className="text-lg font-semibold text-gray-900 mb-1">No Properties Found</h2>
//             <p className="text-gray-500 text-sm">There are no properties associated with this builder.</p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {properties.map((property) => {
//               const interactionCount = getInteractionCount(property.post_title);
//               const latestInteraction = getLatestInteraction(property.post_title);
//               const propertyStats = getPropertyStats(property.post_title);

//               return (
//                 <div key={property.post_id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
//                   <div className="p-4">
//                     <div className="flex items-start gap-4">
//                       {/* Property Image */}
//                       <div className="flex-shrink-0">
//                         <div className=" rounded-lg overflow-hidden bg-gray-100">
//                           {property.post_images && property.post_images.length > 0 ? (
//                             <img
//                               src={property.post_images[0].url}
//                               alt="Property"
//                               className="w-44 h-auto max-h-44 object-cover"
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center">
//                               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                               </svg>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Property Details */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex flex-col gap-4 items-start justify-between">
//                           <div className="min-w-0 flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <h3 className="text-lg font-semibold text-gray-900 truncate">
//                                 {property?.post_title}
//                               </h3>
//                               <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
//                                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//                                 ACTIVE
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-4 text-sm text-gray-600">
//                               <span className="flex items-center gap-1">
//                                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
//                                 </svg>
//                                 {property.area} Sq-ft
//                               </span>
//                               <span className="flex items-center gap-1">
//                                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                 </svg>
//                                 {property.locality}, {property.city}
//                               </span>
//                             </div>
//                           </div>

//                           {/* Action Buttons - Compact */}
//                           <div className="flex items-center gap-1 ml-4">
//                             <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors">
//                               Edit
//                             </button>
//                             <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
//                               Refresh
//                             </button>
//                             <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Compact Interactions Stats */}
//                       <div className="flex-shrink-0 ml-4">
//                         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100 min-w-[180px]">
//                           <div className="flex items-center justify-between mb-2">
//                             <div className="flex items-center gap-2">
//                               <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center">
//                                 <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                                 </svg>
//                               </div>
//                               <span className="text-sm font-medium text-gray-700">Interactions</span>
//                             </div>
//                             <span className="text-xl font-bold text-blue-600">{interactionCount}</span>
//                           </div>

//                           <div className="grid grid-cols-4 gap-2 mb-2">
//                             <div className="text-center">
//                               <div className="text-sm font-semibold text-gray-900">{propertyStats.visits}</div>
//                               <div className="text-xs text-gray-600">Visits</div>
//                             </div>
//                             <div className="text-center">
//                               <div className="text-sm font-semibold text-gray-900">{propertyStats.saves}</div>
//                               <div className="text-xs text-gray-600">Saves</div>
//                             </div>
//                             <div className="text-center">
//                               <div className="text-sm font-semibold text-gray-900">{propertyStats.contacts}</div>
//                               <div className="text-xs text-gray-600">Contacts</div>
//                             </div>
//                             <div className="text-center">
//                               <div className="text-sm font-semibold text-gray-900">{propertyStats.callbacks}</div>
//                               <div className="text-xs text-gray-600">Calls</div>
//                             </div>
//                           </div>

//                           <button
//                             className="w-full bg-blue-600 text-white rounded-md py-1.5 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
//                             onClick={() => navigate('/enquiries')}
//                           >
//                             View Details
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                             </svg>
//                           </button>

//                           {/* {latestInteraction && (
//                             <div className="text-xs text-gray-500 mt-1 text-center">
//                               Last: {new Date(latestInteraction.date).toLocaleDateString()}
//                             </div>
//                           )} */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertiesInteractions;


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
//       <div className="min-h-screen bg-gray-50/30 backdrop-blur-sm">
//         <div className="w-full flex items-center justify-center py-32">
//           <div className="flex flex-col items-center gap-4">
//             <div className="relative">
//               <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//             </div>
//             <p className="text-sm text-gray-500 font-medium">Loading properties...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50/30">
//       <div className="mx-auto px-6 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Property Interactions</h1>
//           <p className="text-gray-500 mt-1">Monitor and analyze your property performance</p>
//         </div>

//         {properties.length === 0 ? (
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm p-12 text-center">
//             <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
//               <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h2>
//             <p className="text-gray-500 max-w-sm mx-auto">There are no properties associated with this builder account.</p>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-6">
//             {properties.map((property) => {
//               const interactionCount = getInteractionCount(property.post_title);
//               const latestInteraction = getLatestInteraction(property.post_title);
//               const propertyStats = getPropertyStats(property.post_title);

//               return (
//                 <div className='flex justify-between items-center w-full gap-4'>
//                   <div key={property.post_id} className="flex items-center justify-between group bg-white rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300/60 transition-all duration-200 overflow-hidden min-w-[55vw]">
//                     <div className="flex flex-col justify-between items-center gap-4  ">
//                       <div className='flex gap-2 p-4'>
//                         {/* Property Image */}
//                         <div className=" ">
//                           <div className="w-24 h-18 rounded-lg overflow-hidden bg-gray-100">
//                             {property.post_images && property.post_images.length > 0 ? (
//                               <img
//                                 src={property.post_images[0].url}
//                                 alt={property.post_title}
//                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
//                               />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center bg-gray-50">
//                                 <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Property Details */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2 mb-1">
//                             <h3 className="text-base font-semibold text-gray-900 truncate">
//                               {property?.post_title}
//                             </h3>
//                             <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
//                               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
//                               Active
//                             </span>
//                           </div>

//                           <div className="flex items-center gap-4 text-sm text-gray-600">
//                             <div className="flex items-center gap-1">
//                               <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
//                               </svg>
//                               <span className="font-medium">{property.area}</span>
//                               <span className="text-gray-500">Sq-ft</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                               </svg>
//                               <span>{property.locality}, {property.city}</span>
//                             </div>
//                           </div>
//                         </div>
//                         {/* Action Buttons */}
//                         <div className="flex items-center justify-end gap-2">
//                           <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
//                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                             </svg>
//                             Edit
//                           </button>
//                           <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
//                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                             </svg>
//                             Refresh
//                           </button>
//                           <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>

//                     </div>
//                   </div>

//                   {/* Compact Stats */}
//                   <div className="">
//                     <div className="bg-blue-50 rounded-lg p-4 border border-blue-100/50 min-w-[180px]">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium text-gray-700">Interactions</span>
//                         <span className="text-lg font-bold text-blue-600">{interactionCount}</span>
//                       </div>


//                       <button
//                         className="w-full bg-blue-600 text-white rounded-lg py-1.5 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
//                         onClick={() => navigate('/enquiries')}
//                       >
//                         View Details
//                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PropertiesInteractions;


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
//       <div className="min-h-screen bg-gray-50/30 backdrop-blur-sm">
//         <div className="w-full flex items-center justify-center py-32">
//           <div className="flex flex-col items-center gap-4">
//             <div className="relative">
//               <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//             </div>
//             <p className="text-sm text-gray-500 font-medium">Loading properties...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         {/* Header */}
//         <div className="mb-6 sm:mb-8">
//           <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">Property Interactions</h1>
//           <p className="text-gray-500 mt-1 text-sm sm:text-base">Monitor and analyze your property performance</p>
//         </div>

//         {properties.length === 0 ? (
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm p-8 sm:p-12 text-center">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
//               <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Properties Found</h2>
//             <p className="text-gray-500 max-w-sm mx-auto text-sm sm:text-base">There are no properties associated with this builder account.</p>
//           </div>
//         ) : (
//           <div className="space-y-4 sm:space-y-6">
//             {properties.map((property) => {
//               const interactionCount = getInteractionCount(property.post_title);
//               const latestInteraction = getLatestInteraction(property.post_title);
//               const propertyStats = getPropertyStats(property.post_title);

//               return (
//                 <div key={property.post_id} className="bg-white rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300/60 transition-all duration-200 overflow-hidden">
//                   {/* Mobile Layout */}
//                   <div className="block lg:hidden">
//                     <div className="p-4 space-y-4">
//                       {/* Property Header */}
//                       <div className="flex gap-3">
//                         {/* Property Image */}
//                         <div className="flex-shrink-0">
//                           <div className="w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden bg-gray-100">
//                             {property.post_images && property.post_images.length > 0 ? (
//                               <img
//                                 src={property.post_images[0].url}
//                                 alt={property.post_title}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center bg-gray-50">
//                                 <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Property Details */}
//                         <div className="flex-1 min-w-0">
//                           <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
//                             <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
//                               {property?.post_title}
//                             </h3>
//                             <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium w-fit">
//                               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
//                               Active
//                             </span>
//                           </div>

//                           <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
//                             <div className="flex items-center gap-1">
//                               <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
//                               </svg>
//                               <span className="font-medium">{property.area}</span>
//                               <span className="text-gray-500">Sq-ft</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                               </svg>
//                               <span className="truncate">{property.locality}, {property.city}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Stats Section */}
//                       <div className="bg-blue-50 rounded-lg p-3 border border-blue-100/50">
//                         <div className="flex items-center justify-between mb-3">
//                           <span className="text-sm font-medium text-gray-700">Total Enquires</span>
//                           <span className="text-xl font-bold text-blue-600">{interactionCount}</span>
//                         </div>
//                         <button
//                           className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
//                           onClick={() => navigate('/enquiries')}
//                         >
//                           View Details
//                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                           </svg>
//                         </button>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="flex gap-2">
//                         <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
//                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                           Edit
//                         </button>
//                         <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
//                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                           </svg>
//                           Refresh
//                         </button>
//                         <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Desktop Layout */}
//                   <div className="hidden lg:block">
//                     <div className="flex items-start justify-between p-4">
//                       {/* Left Section - Property Info */}
//                       <div className="flex items-start gap-4 flex-1 min-w-0">
//                         {/* Property Image */}
//                         <div className="flex-shrink-0">
//                           <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
//                             {property.post_images && property.post_images.length > 0 ? (
//                               <img
//                                 src={property.post_images[0].url}
//                                 alt={property.post_title}
//                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
//                               />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center bg-gray-50">
//                                 <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Property Details */}
//                         <div className="flex-1 min-w-0 ">
//                           <div className="flex items-center gap-2 mb-1">
//                             <h3 className="text-base font-semibold text-gray-900 truncate">
//                               {property?.post_title}
//                             </h3>
//                             <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
//                               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
//                               Active
//                             </span>
//                           </div>

//                           <div className='flex flex-col gap-3'>
//                             <div className='font-semibold'>{property?.price}</div>
//                             <div className="flex items-center gap-4 text-sm text-gray-600">
//                               <div className="flex items-center gap-1">
//                                 <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
//                                 </svg>
//                                 <span className="font-medium">{property.area}</span>
//                                 <span className="text-gray-500">Sq-ft</span>
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                 </svg>
//                                 <span>{property.locality}, {property.city}</span>
//                               </div>
//                               <div className="text-sm text-gray-700">
//                                 <span className="font-medium">Floor:</span> {property.floorNumber} of {property?.totalFloors}
//                               </div>
//                             </div>


//                           </div>
//                         </div>
//                       </div>

//                       {/* Middle Section - Action Buttons */}
//                       <div className="flex items-center gap-2 mx-6">
//                         <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
//                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                           Edit
//                         </button>
//                         <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
//                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                           </svg>
//                           Refresh
//                         </button>
//                         <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//                           </svg>
//                         </button>
//                       </div>

//                       {/* Right Section - Stats */}
//                       <div className="flex-shrink-0">
//                         <div className="bg-blue-50 rounded-lg p-4 border border-blue-100/50 min-w-[180px]">
//                           <div className="flex items-center justify-between mb-2">
//                             <span className="text-sm font-medium text-gray-700">Enquires</span>
//                             <span className="text-lg font-bold text-blue-600">{interactionCount}</span>
//                           </div>
//                           <button
//                             className="w-full bg-blue-600 text-white rounded-lg py-1.5 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
//                             onClick={() => navigate('/enquiries')}
//                           >
//                             View Details
//                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
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

  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

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

  // Share functionality
  const handleShare = (property) => {
    setSelectedProperty(property);
    setShowShareModal(true);
  };

  const formatPrice = (price, priceUnit = 'lakh') => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    } else {
      return `₹${price}`;
    }
  };

  const generateShareContent = (property) => {
    const propertyImage = property.post_images && property.post_images.length > 0
      ? property.post_images[0].url
      : '';

    const shareText = `🏠 ${property.post_title}

💰 Price: ${formatPrice(property.price, property.priceUnit)}
📐 Area: ${property.area} sq ft
📍 Location: ${property.locality}, ${property.city}
🛏️ ${property.bedrooms}BHK | 🚿 ${property.bathrooms} Bath
🏢 Floor: ${property.floorNumber}/${property.totalFloors}

✨ Key Features:
${property.amenities?.slice(0, 4).map(amenity => `• ${amenity}`).join('\n') || '• Modern amenities'}

${property.usp?.slice(0, 3).map(usp => `🔸 ${usp}`).join('\n') || ''}

📞 Contact: ${property.contactList?.[0] || property.whatsappContact || ''}

#RealEstate #Property #${property.city} #${property.configuration || property.bedrooms + 'BHK'}`;

    return {
      text: shareText,
      url: window.location.href,
      image: propertyImage,
      title: property.post_title,
      description: property.post_description || shareText.slice(0, 200) + '...'
    };
  };

  const shareOnPlatform = (platform, property) => {
    const shareData = generateShareContent(property);
    const encodedText = encodeURIComponent(shareData.text);
    const encodedUrl = encodeURIComponent(shareData.url);
    const encodedTitle = encodeURIComponent(shareData.title);
    const encodedImage = encodeURIComponent(shareData.image);

    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodeURIComponent(shareData.description)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedText}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async (property) => {
    const shareData = generateShareContent(property);
    try {
      await navigator.clipboard.writeText(shareData.text);
      alert('Property details copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareData.text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Property details copied to clipboard!');
    }
  };

  const nativeShare = async (property) => {
    const shareData = generateShareContent(property);

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.description,
          url: shareData.url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard(property);
    }
  };

  const handleEditProperty = (property) => {
    // Navigate to edit page with property ID
    navigate(`/edit-property/${property.post_id}`);
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/30 backdrop-blur-sm">
        <div className="w-full flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">Property Interactions</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">Monitor and analyze your property performance</p>
        </div>

        {properties.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm p-8 sm:p-12 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Properties Found</h2>
            <p className="text-gray-500 max-w-sm mx-auto text-sm sm:text-base">There are no properties associated with this builder account.</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {properties.map((property) => {
              const interactionCount = getInteractionCount(property.post_title);
              const latestInteraction = getLatestInteraction(property.post_title);
              const propertyStats = getPropertyStats(property.post_title);

              return (
                <div key={property.post_id} className="bg-white rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300/60 transition-all duration-200 overflow-hidden">
                  {/* Mobile Layout */}
                  <div className="block lg:hidden">
                    <div className="p-4 space-y-4">
                      {/* Property Header */}
                      <div className="flex gap-3">
                        {/* Property Image */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden bg-gray-100">
                            {property.post_images && property.post_images.length > 0 ? (
                              <img
                                src={property.post_images[0].url}
                                alt={property.post_title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Property Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                              {property?.post_title}
                            </h3>
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium w-fit">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                              Active
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                              </svg>
                              <span className="font-medium">{property.area}</span>
                              <span className="text-gray-500">Sq-ft</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              <span className="truncate">{property.locality}, {property.city}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stats Section */}
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100/50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Total Enquires</span>
                          <span className="text-xl font-bold text-blue-600">{interactionCount}</span>
                        </div>
                        <button
                          className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
                          onClick={() => navigate('/enquiries')}
                        >
                          View Details
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                          onClick={() => handleShare(property)}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          Share
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:block">
                    <div className="flex items-start justify-between p-4">
                      {/* Left Section - Property Info */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Property Image */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                            {property.post_images && property.post_images.length > 0 ? (
                              <img
                                src={property.post_images[0].url}
                                alt={property.post_title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Property Details */}
                        <div className="flex-1 min-w-0 ">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-semibold text-gray-900 truncate">
                              {property?.post_title}
                            </h3>
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                              Active
                            </span>
                          </div>

                          <div className='flex flex-col gap-3'>
                            <div className='font-semibold'>{formatPrice(property.price, property.priceUnit)}</div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                                <span className="font-medium">{property.area}</span>
                                <span className="text-gray-500">Sq-ft</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <span>{property.locality}, {property.city}</span>
                              </div>
                              <div className="text-sm text-gray-700">
                                <span className="font-medium">Floor:</span> {property.floorNumber} of {property?.totalFloors}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Middle Section - Action Buttons */}
                      <div className="flex items-center gap-2 mx-6">
                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          onClick={() => handleEditProperty(property)}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>

                        <button
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                          onClick={() => handleShare(property)}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          Share
                        </button>

                      </div>

                      {/* Right Section - Stats */}
                      <div className="flex-shrink-0">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100/50 min-w-[180px]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Enquires</span>
                            <span className="text-lg font-bold text-blue-600">{interactionCount}</span>
                          </div>
                          <button
                            className="w-full bg-blue-600 text-white rounded-lg py-1.5 text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                            onClick={() => navigate('/enquiries')}
                          >
                            View Details
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </button>
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

      {/* Share Modal */}
      {showShareModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Share Property</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Property Preview */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {selectedProperty.post_images && selectedProperty.post_images.length > 0 ? (
                    <img
                      src={selectedProperty.post_images[0].url}
                      alt={selectedProperty.post_title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{selectedProperty.post_title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{formatPrice(selectedProperty.price, selectedProperty.priceUnit)}</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedProperty.locality}, {selectedProperty.city}</p>
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* WhatsApp */}
                <button
                  onClick={() => shareOnPlatform('whatsapp', selectedProperty)}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => shareOnPlatform('facebook', selectedProperty)}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </button>

                {/* Twitter */}
                <button
                  onClick={() => shareOnPlatform('twitter', selectedProperty)}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Twitter</span>
                </button>

                {/* LinkedIn */}
                <button
                  onClick={() => shareOnPlatform('linkedin', selectedProperty)}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">LinkedIn</span>
                </button>

                {/* Telegram */}
                <button
                  onClick={() => shareOnPlatform('telegram', selectedProperty)}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Telegram</span>
                </button>

                {/* Email */}
                <button
                  onClick={() => shareOnPlatform('email', selectedProperty)}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Email</span>
                </button>
              </div>

              {/* Copy Link and Native Share */}
              <div className="space-y-3">
                <button
                  onClick={() => copyToClipboard(selectedProperty)}
                  className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Copy Details</span>
                </button>

                {navigator.share && (
                  <button
                    onClick={() => nativeShare(selectedProperty)}
                    className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span className="text-sm font-medium">Share via Device</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesInteractions; 