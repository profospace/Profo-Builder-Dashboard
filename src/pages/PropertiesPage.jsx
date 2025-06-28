// import React from 'react'
// import SampleDashboardContent from './SampleDashboardContent'

// function PropertiesPage() {
//   return (
//     <div>
//           <h1 className="text-2xl font-bold mb-4">My Properties</h1>
//           <SampleDashboardContent />
//     </div>
//   )
// }

// export default PropertiesPage


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../utils/baseurl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyInteractions } from '../features/properties/propertiesSlice';

const PropertiesInteractions = () => {
  // State for properties and selection
  // const [properties, setProperties] = useState([]);
  const { properties, isLoading, isError, message } = useSelector((state) => state.properties);

  const navigate = useNavigate()
  const [builderId, setBuilderId] = useState('');

  const dispatch = useDispatch()


  // State for interactions
  // const [interactions, setInteractions] = useState([]);
  const [allActivities, setAllActivities] = useState([]);

  // Builder ID from localStorage
  // const [builderId, setBuilderId] = useState('');

  // console.log("interactions", interactions)


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

  // handleGetAllInteractions of selected Property
  // const handleGetAllInteractions = () => {

  //   // dispatch(fetchPropertyInteractions({builderId , propertyId}))
  //   navigate('/enquiries')

  // }





  // const getInteractionCount = (propertyId) => {
  //   return allActivities.filter(activity =>
  //     activity.entityTitle === properties.find(p => p.post_id === propertyId)?.post_title
  //   ).length;
  // };

  // const getLatestInteraction = (propertyId) => {
  //   const propertyTitle = properties.find(p => p.post_id === propertyId)?.post_title;
  //   const propertyInteractions = allActivities.filter(activity =>
  //     activity.entityTitle === propertyTitle
  //   );

  //   if (propertyInteractions.length === 0) return null;

  //   return propertyInteractions.sort((a, b) =>
  //     new Date(b.timestamp) - new Date(a.timestamp)
  //   )[0];
  // };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
        <div className="w-full flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen">
      {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Property Interactions
      </h1> */}

      {properties.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h2 className="mt-4 text-lg font-semibold text-gray-700">No Properties Found</h2>
          <p className="mt-2 text-gray-500">There are no properties associated with this builder.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {properties.map((property) => {
            {/* const interactionCount = getInteractionCount(property.post_id);
            const latestInteraction = getLatestInteraction(property.post_id); */}

            return (
              <div key={property.post_id} className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Property Header */}
                <div className="py-3 px-4 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Status Badge */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            ACTIVE
                          </div>
                        </div>
                        {/* <span className="text-sm bg-red-50 text-red-600 px-2 py-1 rounded">
                          Free Plan
                        </span> */}
                      </div>
                    </div>

                    {/* Responses Count */}
                    {/* <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">{interactionCount}</span>
                        <span className="text-gray-600">Responses</span>
                      </div>
                      <button className="text-red-500 hover:text-red-600 flex items-center space-x-1">
                        <span className="text-sm font-medium">View All</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div> */}
                  </div>

                  {/* Property Details */}
                  <div className="mt-4 flex items-start space-x-6">
                    {/* Property Image Placeholder */}
                    <div className="w-32 h-24 bg-pink-50 rounded-lg flex items-center justify-center border-2 border-dashed border-pink-200">
                      {property.post_images && property.post_images.length > 0 ? (
                        <img
                          src={property.post_images[0].url}
                          alt="Property"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <svg className="w-8 h-8 text-pink-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-gray-400">No Image</p>
                          <p className="text-xs text-gray-400">Available</p>
                          <button className="mt-2 text-xs bg-red-500 text-white px-3 py-1 rounded">
                            Add Photos
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Property Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          {/* <p className="text-sm text-gray-500 mb-1">
                            Property ID: {property.post_id} | Valid Till: Oct 20, 2025
                          </p> */}
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {/* {formatPrice(property.price, property.priceUnit)} {property.bedrooms} BHK Builder Floor Apartment for Sale */}
                            {property?.post_title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{property.area} Sq-ft</span>
                            <span>{property.locality}, {property.city}</span>
                          </div>
                          {/* <button className="mt-2 text-red-500 hover:text-red-600 text-sm flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Check Property Value</span>
                          </button> */}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3 mt-4">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                          Edit
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
                          Refresh
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">
                          Deactivate
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Premium Plan CTA */}
                    <div className="w-auto h-auto bg-pink-50 rounded-lg p-4 border border-pink-200">
                      <div className="flex flex-col gap-4 items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          {/* <span className="text-lg font-semibold text-gray-900">{interactions?.length}</span> */}
                          <span className="text-gray-600">Responses</span>
                        </div>
                        <button className="text-red-500 hover:text-red-600 flex items-center space-x-1">
                          <span className="text-sm font-medium" onClick={() => navigate('/enquiries')}>View All</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Latest Interaction */}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PropertiesInteractions;