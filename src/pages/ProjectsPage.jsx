// // import React from 'react'
// // import { useSelector } from 'react-redux'
// // import { MapPin, Calendar, Home, Users, Star, Car, Zap, Shield, Waves } from 'lucide-react'

// // function ProjectsPage() {
// //     const { projects, isLoading, isError, isSuccess, message } = useSelector(state => state.projects)

// //     if (isLoading) {
// //         return (
// //             <div className="flex justify-center items-center min-h-screen">
// //                 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
// //             </div>
// //         )
// //     }

// //     if (isError) {
// //         return (
// //             <div className="flex justify-center items-center min-h-screen">
// //                 <div className="text-red-500 text-xl">{message}</div>
// //             </div>
// //         )
// //     }

// //     const formatPrice = (price) => {
// //         if (price >= 10000000) {
// //             return `₹${(price / 10000000).toFixed(1)} Cr`
// //         } else if (price >= 100000) {
// //             return `₹${(price / 100000).toFixed(1)} L`
// //         }
// //         return `₹${price.toLocaleString()}`
// //     }

// //     const getStatusColor = (status) => {
// //         switch (status) {
// //             case 'UNDER_CONSTRUCTION':
// //                 return 'bg-orange-100 text-orange-800'
// //             case 'COMPLETED':
// //                 return 'bg-green-100 text-green-800'
// //             case 'COMING_SOON':
// //                 return 'bg-blue-100 text-blue-800'
// //             default:
// //                 return 'bg-gray-100 text-gray-800'
// //         }
// //     }

// //     return (
// //         <div className="min-h-screen bg-gray-50 py-8 px-4">
// //             <div className="max-w-7xl mx-auto">
// //                 <div className="mb-8">
// //                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Projects</h1>
// //                     <p className="text-gray-600">Discover your dream home from our premium collection</p>
// //                 </div>

// //                 {projects && projects.length > 0 ? (
// //                     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
// //                         {projects.map((project) => (
// //                             <div key={project._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
// //                                 {/* Image Section */}
// //                                 <div className="relative h-64 overflow-hidden">
// //                                     {project.galleryNow && project.galleryNow[0] ? (
// //                                         <img
// //                                             src={project.galleryNow[0]}
// //                                             alt={project.name}
// //                                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //                                         />
// //                                     ) : (
// //                                         <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
// //                                             <Home className="h-16 w-16 text-white opacity-50" />
// //                                         </div>
// //                                     )}

// //                                     {/* Status Badge */}
// //                                     <div className="absolute top-4 left-4">
// //                                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
// //                                             {project.status.replace('_', ' ')}
// //                                         </span>
// //                                     </div>

// //                                     {/* RERA Badge */}
// //                                     {project.reraNumber && (
// //                                         <div className="absolute top-4 right-4">
// //                                             <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
// //                                                 RERA: {project.reraNumber}
// //                                             </span>
// //                                         </div>
// //                                     )}

// //                                     {/* Offers Badge */}
// //                                     {project.offer && project.offer.length > 0 && (
// //                                         <div className="absolute bottom-4 left-4">
// //                                             <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
// //                                                 🎉 {project.offer[0]}
// //                                             </span>
// //                                         </div>
// //                                     )}
// //                                 </div>

// //                                 {/* Content Section */}
// //                                 <div className="p-6">
// //                                     {/* Project Name & Location */}
// //                                     <div className="mb-4">
// //                                         <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
// //                                             {project.name}
// //                                         </h3>
// //                                         <div className="flex items-center text-gray-600 text-sm">
// //                                             <MapPin className="h-4 w-4 mr-1" />
// //                                             <span>{project.location.address}, {project.location.city}</span>
// //                                         </div>
// //                                     </div>

// //                                     {/* Price Range */}
// //                                     <div className="mb-4">
// //                                         <div className="flex items-center justify-between">
// //                                             <div>
// //                                                 <span className="text-2xl font-bold text-green-600">
// //                                                     {formatPrice(project.overview.priceRange.min)}
// //                                                 </span>
// //                                                 {project.overview.priceRange.min !== project.overview.priceRange.max && (
// //                                                     <span className="text-lg text-gray-500 ml-1">
// //                                                         - {formatPrice(project.overview.priceRange.max)}
// //                                                     </span>
// //                                                 )}
// //                                             </div>
// //                                             <div className="text-right">
// //                                                 <div className="text-sm text-gray-500">Per sq ft</div>
// //                                                 <div className="font-semibold">₹{project.overview.pricePerSqFt?.toLocaleString()}</div>
// //                                             </div>
// //                                         </div>
// //                                     </div>

// //                                     {/* Floor Plans */}
// //                                     {project.floorPlans && project.floorPlans.length > 0 && (
// //                                         <div className="mb-4">
// //                                             <div className="flex flex-wrap gap-2">
// //                                                 {project.floorPlans.slice(0, 3).map((plan, index) => (
// //                                                     <div key={index} className="bg-blue-50 px-3 py-1 rounded-full">
// //                                                         <span className="text-blue-700 text-xs font-medium">
// //                                                             {plan.bedrooms}BHK - {plan.superArea} sq ft
// //                                                         </span>
// //                                                     </div>
// //                                                 ))}
// //                                             </div>
// //                                         </div>
// //                                     )}

// //                                     {/* Key Highlights */}
// //                                     {project.highlights && project.highlights.length > 0 && (
// //                                         <div className="mb-4">
// //                                             <div className="space-y-2">
// //                                                 {project.highlights.slice(0, 2).map((highlight, index) => (
// //                                                     <div key={index} className="flex items-start">
// //                                                         <Star className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
// //                                                         <div>
// //                                                             <span className="font-medium text-sm">{highlight.title}: </span>
// //                                                             <span className="text-gray-600 text-sm">{highlight.description}</span>
// //                                                         </div>
// //                                                     </div>
// //                                                 ))}
// //                                             </div>
// //                                         </div>
// //                                     )}

// //                                     {/* Amenities Preview */}
// //                                     {project.amenities && project.amenities.length > 0 && (
// //                                         <div className="mb-4">
// //                                             <div className="flex flex-wrap gap-2">
// //                                                 {project.amenities[0]?.items.slice(0, 4).map((amenity, index) => {
// //                                                     let icon = <Shield className="h-3 w-3" />
// //                                                     if (amenity.toLowerCase().includes('parking')) icon = <Car className="h-3 w-3" />
// //                                                     if (amenity.toLowerCase().includes('power')) icon = <Zap className="h-3 w-3" />
// //                                                     if (amenity.toLowerCase().includes('water')) icon = <Waves className="h-3 w-3" />

// //                                                     return (
// //                                                         <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded">
// //                                                             {icon}
// //                                                             <span className="text-xs text-gray-600 ml-1">{amenity}</span>
// //                                                         </div>
// //                                                     )
// //                                                 })}
// //                                             </div>
// //                                         </div>
// //                                     )}

// //                                     {/* Project Stats */}
// //                                     <div className="grid grid-cols-3 gap-4 mb-4 text-center">
// //                                         <div className="bg-gray-50 rounded-lg p-2">
// //                                             <div className="font-bold text-lg">{project.overview.totalUnits}</div>
// //                                             <div className="text-xs text-gray-600">Total Units</div>
// //                                         </div>
// //                                         <div className="bg-gray-50 rounded-lg p-2">
// //                                             <div className="font-bold text-lg">{project.overview.totalTowers}</div>
// //                                             <div className="text-xs text-gray-600">Towers</div>
// //                                         </div>
// //                                         <div className="bg-gray-50 rounded-lg p-2">
// //                                             <div className="font-bold text-lg">{project.formattedPossessionDate}</div>
// //                                             <div className="text-xs text-gray-600">Possession</div>
// //                                         </div>
// //                                     </div>

// //                                     {/* Action Buttons */}
// //                                     <div className="flex gap-2">
// //                                         <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
// //                                             View Details →
// //                                         </button>
// //                                         <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
// //                                             Share
// //                                         </button>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 ) : (
// //                     <div className="text-center py-12">
// //                         <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
// //                         <h3 className="text-xl font-medium text-gray-900 mb-2">No Projects Found</h3>
// //                         <p className="text-gray-600">Check back later for new projects.</p>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     )
// // }

// // export default ProjectsPage

// import React from 'react'
// import { useSelector } from 'react-redux'
// import { MapPin, Calendar, Home, Users, Star, Car, Zap, Shield, Waves } from 'lucide-react'

// function ProjectsPage() {
//     const { projects, isLoading, isError, isSuccess, message } = useSelector(state => state.projects)

//     if (isLoading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
//             </div>
//         )
//     }

//     if (isError) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="text-red-500 text-xl">{message}</div>
//             </div>
//         )
//     }

//     const formatPrice = (price) => {
//         if (price >= 10000000) {
//             return `₹${(price / 10000000).toFixed(1)} Cr`
//         } else if (price >= 100000) {
//             return `₹${(price / 100000).toFixed(1)} L`
//         }
//         return `₹${price.toLocaleString()}`
//     }

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'UNDER_CONSTRUCTION':
//                 return 'bg-orange-100 text-orange-800'
//             case 'COMPLETED':
//                 return 'bg-green-100 text-green-800'
//             case 'COMING_SOON':
//                 return 'bg-blue-100 text-blue-800'
//             default:
//                 return 'bg-gray-100 text-gray-800'
//         }
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8 px-4">
//             <div className="max-w-7xl mx-auto">
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Projects</h1>
//                     <p className="text-gray-600">Discover your dream home from our premium collection</p>
//                 </div>

//                 {projects && projects.length > 0 ? (
//                     <div className="space-y-6">
//                         {projects.map((project) => (
//                             <div key={project._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
//                                 <div className="flex flex-col lg:flex-row">
//                                     {/* Image Section */}
//                                     <div className="relative lg:w-80 h-64 lg:h-auto overflow-hidden flex-shrink-0">
//                                         {project.galleryNow && project.galleryNow[0] ? (
//                                             <img
//                                                 src={project.galleryNow[0]}
//                                                 alt={project.name}
//                                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                                             />
//                                         ) : (
//                                             <div className="w-full h-full bg-gradient-to-br from-pink-400 to-orange-500 flex items-center justify-center">
//                                                 <Home className="h-16 w-16 text-white opacity-50" />
//                                             </div>
//                                         )}

//                                         {/* Status Badge */}
//                                         <div className="absolute top-4 left-4">
//                                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
//                                                 {project.status === 'UNDER_CONSTRUCTION' ? 'Active' : project.status.replace('_', ' ')}
//                                             </span>
//                                         </div>

//                                         {/* Offers Badge */}
//                                         {project.offer && project.offer.length > 0 && (
//                                             <div className="absolute bottom-4 left-4">
//                                                 <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
//                                                     OFFER
//                                                 </span>
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Content Section */}
//                                     <div className="flex-1 p-6 flex flex-col justify-between">
//                                         <div>
//                                             {/* Header */}
//                                             <div className="flex justify-between items-start mb-4">
//                                                 <div className="flex-1">
//                                                     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//                                                         {project.floorPlans && project.floorPlans.length > 0 && (
//                                                             <span>{project.floorPlans[project.floorPlans.length - 1].bedrooms}BHK Apartment for sale in </span>
//                                                         )}
//                                                         {project.location.address.split(',')[0]}
//                                                     </h3>
//                                                     <div className="flex items-center text-gray-600 text-sm mb-2">
//                                                         <span className="text-2xl font-bold text-black mr-2">
//                                                             {formatPrice(project.overview.priceRange.max || project.overview.priceRange.min)}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center ml-4">
//                                                     <div className="text-right mr-4">
//                                                         <div className="text-sm text-gray-500">Enquires</div>
//                                                         <div className="text-2xl font-bold text-blue-600">30</div>
//                                                     </div>
//                                                     <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
//                                                         View Details →
//                                                     </button>
//                                                 </div>
//                                             </div>

//                                             {/* Property Details */}
//                                             <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
//                                                 {project.floorPlans && project.floorPlans.length > 0 && (
//                                                     <>
//                                                         <div className="flex items-center">
//                                                             <span className="font-medium">{project.floorPlans[project.floorPlans.length - 1].superArea} Sq-ft</span>
//                                                         </div>
//                                                         <div className="flex items-center">
//                                                             <MapPin className="h-4 w-4 mr-1" />
//                                                             <span>{project.location.address}, {project.location.city}</span>
//                                                         </div>
//                                                         <div className="flex items-center">
//                                                             <span>Floor: 8 of 15</span>
//                                                         </div>
//                                                     </>
//                                                 )}
//                                             </div>

//                                             {/* Floor Plans and Amenities */}
//                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                                 {/* Floor Plans */}
//                                                 {project.floorPlans && project.floorPlans.length > 0 && (
//                                                     <div>
//                                                         <h4 className="font-semibold text-gray-900 mb-2">Available Configurations</h4>
//                                                         <div className="space-y-1">
//                                                             {project.floorPlans.slice(0, 3).map((plan, index) => (
//                                                                 <div key={index} className="flex justify-between text-sm">
//                                                                     <span>{plan.bedrooms}BHK - {plan.superArea} sq ft</span>
//                                                                     <span className="font-medium text-green-600">{formatPrice(plan.price)}</span>
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     </div>
//                                                 )}

//                                                 {/* Key Amenities */}
//                                                 {project.amenities && project.amenities.length > 0 && (
//                                                     <div>
//                                                         <h4 className="font-semibold text-gray-900 mb-2">Key Amenities</h4>
//                                                         <div className="flex flex-wrap gap-2">
//                                                             {project.amenities[0]?.items.slice(0, 6).map((amenity, index) => {
//                                                                 let icon = <Shield className="h-3 w-3" />
//                                                                 if (amenity.toLowerCase().includes('parking')) icon = <Car className="h-3 w-3" />
//                                                                 if (amenity.toLowerCase().includes('power')) icon = <Zap className="h-3 w-3" />
//                                                                 if (amenity.toLowerCase().includes('water')) icon = <Waves className="h-3 w-3" />

//                                                                 return (
//                                                                     <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
//                                                                         {icon}
//                                                                         <span className="text-gray-600 ml-1">{amenity}</span>
//                                                                     </div>
//                                                                 )
//                                                             })}
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>

//                                             {/* Special Offers */}
//                                             {project.offer && project.offer.length > 0 && (
//                                                 <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
//                                                     <h4 className="font-medium text-red-800 mb-1">Special Offers</h4>
//                                                     <div className="flex flex-wrap gap-2">
//                                                         {project.offer.map((offer, index) => (
//                                                             <span key={index} className="text-red-700 text-sm">
//                                                                 • {offer}
//                                                             </span>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>

//                                         {/* Footer */}
//                                         <div className="flex justify-between items-center pt-4 border-t border-gray-100">
//                                             <div className="flex items-center gap-4 text-sm text-gray-600">
//                                                 <span>Launch: {project.formattedLaunchDate}</span>
//                                                 <span>Possession: {project.formattedPossessionDate}</span>
//                                                 {project.reraNumber && (
//                                                     <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
//                                                         RERA: {project.reraNumber}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                             <div className="flex gap-2">
//                                                 <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
//                                                     Share
//                                                 </button>
//                                                 <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
//                                                     Edit
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-12">
//                         <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-xl font-medium text-gray-900 mb-2">No Projects Found</h3>
//                         <p className="text-gray-600">Check back later for new projects.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default ProjectsPage

import React from 'react'
import { useSelector } from 'react-redux'
import { MapPin, Calendar, Home, Users, Star, Car, Zap, Shield, Waves } from 'lucide-react'

function ProjectsPage() {
    const { projects, isLoading, isError, isSuccess, message } = useSelector(state => state.projects)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-xl">{message}</div>
            </div>
        )
    }

    const formatPrice = (price) => {
        if (price >= 10000000) {
            return `₹${(price / 10000000).toFixed(1)} Cr`
        } else if (price >= 100000) {
            return `₹${(price / 100000).toFixed(1)} L`
        }
        return `₹${price.toLocaleString()}`
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'UNDER_CONSTRUCTION':
                return 'bg-orange-100 text-orange-800'
            case 'COMPLETED':
                return 'bg-green-100 text-green-800'
            case 'COMING_SOON':
                return 'bg-blue-100 text-blue-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Projects</h1>
                    <p className="text-gray-600">Discover your dream home from our premium collection</p>
                </div>

                {projects && projects.length > 0 ? (
                    <div className="space-y-6">
                        {projects.map((project) => (
                            <div key={project._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                                <div className="flex flex-col lg:flex-row">
                                    {/* Image Section */}
                                    <div className="relative lg:w-48 h-64 lg:h-auto overflow-hidden flex-shrink-0">
                                        {project.galleryNow && project.galleryNow[0] ? (
                                            <img
                                                src={project.galleryNow[0]}
                                                alt={project.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-orange-500 flex items-center justify-center">
                                                <Home className="h-16 w-16 text-white opacity-50" />
                                            </div>
                                        )}

                                        {/* Status Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                                {project.status === 'UNDER_CONSTRUCTION' ? 'Active' : project.status.replace('_', ' ')}
                                            </span>
                                        </div>

                                        {/* Offers Badge */}
                                        {project.offer && project.offer.length > 0 && (
                                            <div className="absolute bottom-4 left-4">
                                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                    OFFER
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 p-6 flex flex-col justify-between">
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                    {project.floorPlans && project.floorPlans.length > 0 && (
                                                        <span>{project.floorPlans[project.floorPlans.length - 1].bedrooms}BHK Apartment for sale in </span>
                                                    )}
                                                    {project.location.address.split(',')[0]}
                                                </h3>
                                                <div className="text-2xl font-bold text-black mb-3">
                                                    {formatPrice(project.overview.priceRange.max || project.overview.priceRange.min)}
                                                </div>
                                            </div>
                                            <div className="flex items-center ml-4">
                                                <div className="text-right mr-4">
                                                    <div className="text-sm text-gray-500">Enquires</div>
                                                    <div className="text-2xl font-bold text-blue-600">30</div>
                                                </div>
                                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                                                    View Details →
                                                </button>
                                            </div>
                                        </div>

                                        {/* Property Details */}
                                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                                            {project.floorPlans && project.floorPlans.length > 0 && (
                                                <>
                                                    <div className="flex items-center">
                                                        <span className="font-medium">{project.floorPlans[project.floorPlans.length - 1].superArea} Sq-ft</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <MapPin className="h-4 w-4 mr-1" />
                                                        <span>{project.location.address}, {project.location.city}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span>Floor: 8 of 15</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                                                Share
                                            </button>
                                            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No Projects Found</h3>
                        <p className="text-gray-600">Check back later for new projects.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectsPage