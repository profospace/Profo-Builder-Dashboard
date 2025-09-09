import React, { useState, useEffect } from 'react';
import { MapPin, Bed, Bath, Square, Eye, Users, Calendar, CreditCard, Phone, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';

function BookingsPage() {
    const [selectedPropertyId, setSelectedPropertyId] = useState(null);
    const { properties } = useSelector(state => state.properties)

    // Set first property as selected by default
    useEffect(() => {
        if (properties && properties.length > 0 && selectedPropertyId === null) {
            setSelectedPropertyId(properties[0]._id);
        }
    }, [properties, selectedPropertyId]);

    const formatPrice = (price, priceUnit) => {
        if (priceUnit === 'lakh') {
            return `₹${price} Lakh`;
        }
        return `₹${price?.toLocaleString()}`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleCardClick = (propertyId) => {
        setSelectedPropertyId(propertyId);
    };

    const getUniqueAmenities = (amenities) => {
        return [...new Set(amenities)];
    };

    // Get selected property for display
    const selectedProperty = properties.find(property => property._id === selectedPropertyId);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Properties Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {properties.map((property) => (
                        <div
                            key={property._id}
                            onClick={() => handleCardClick(property._id)}
                            className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden ${selectedPropertyId === property._id ? 'ring-2 ring-blue-500' : ''
                                }`}
                        >
                            {/* Property Image */}
                            <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600">
                                {property.post_images?.[0] ? (
                                    <img
                                        src={property.post_images[0].url}
                                        alt={property.post_title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.target.style.display = 'none')}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white">
                                        <Square size={40} className="opacity-70 mb-2" />
                                        <p className="text-base font-medium">No Image</p>
                                    </div>
                                )}

                                {/* Price Badge */}
                                <div className="absolute top-3 right-3 bg-white border border-gray-200 rounded-md px-2 py-1">
                                    <p className="text-xs font-semibold text-gray-900">
                                        {formatPrice(property.price, property.priceUnit)}
                                    </p>
                                </div>

                                {/* Views Badge */}
                                <div className="absolute top-3 left-3 bg-black/30 rounded-md px-2.5 py-1.5 flex items-center text-white text-xs">
                                    <Eye size={14} className="mr-1.5" />
                                    {property.total_views || 0} views
                                </div>

                                {/* Selected Indicator */}
                                {selectedPropertyId === property._id && (
                                    <div className="absolute bottom-3 left-3 bg-blue-600 text-white rounded-md px-2 py-1 text-xs font-medium">
                                        Selected
                                    </div>
                                )}
                            </div>

                            {/* Property Details */}
                            <div className="p-3">
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">{property.post_title}</h3>
                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                    <MapPin size={16} className="mr-1.5" />
                                    {property.address}, {property.city}
                                </div>

                                {/* Booking Count */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <Users size={16} className="mr-1.5" />
                                        {property.bookings?.length || 0} Booking
                                        {(property.bookings?.length || 0) !== 1 ? 's' : ''}
                                    </div>
                                    <span className="text-sm text-blue-600 font-medium">
                                        {selectedPropertyId === property._id ? 'Selected' : 'Select →'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Full Width Bookings Table */}
                {selectedProperty && (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-in fade-in duration-200">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                            <h3 className="text-xl font-semibold text-white flex items-center">
                                <Calendar className="mr-3" size={24} />
                                Bookings for "{selectedProperty.post_title}" ({selectedProperty.bookings?.length || 0})
                            </h3>
                        </div>

                        <div className="p-6">
                            {selectedProperty.bookings?.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                                        <thead className="bg-gray-100 text-gray-700">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-semibold">Customer</th>
                                                <th className="px-4 py-3 text-left font-semibold">Email</th>
                                                <th className="px-4 py-3 text-left font-semibold">Phone</th>
                                                <th className="px-4 py-3 text-left font-semibold">Token Amount</th>
                                                <th className="px-4 py-3 text-left font-semibold">Booking Date</th>
                                                <th className="px-4 py-3 text-left font-semibold">Lock Status</th>
                                                <th className="px-4 py-3 text-left font-semibold">Token Status</th>
                                                <th className="px-4 py-3 text-left font-semibold">Final Status</th>
                                                <th className="px-4 py-3 text-left font-semibold">Confirmation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedProperty.bookings.map((booking, index) => (
                                                <tr
                                                    key={booking._id}
                                                    className={`border-t hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                                                        }`}
                                                >
                                                    {/* Customer */}
                                                    <td className="px-4 py-3 font-medium text-gray-900">
                                                        {booking.tokenPaidBy?.name || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {booking.tokenPaidBy?.email || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {booking.tokenPaidBy?.phone || 'N/A'}
                                                    </td>

                                                    {/* Booking Details */}
                                                    <td className="px-4 py-3 font-medium text-green-600">
                                                        ₹{booking.tokenAmount?.toLocaleString() || 0}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-700">
                                                        {formatDate(booking.bookedAt)}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {booking.isLocked ? (
                                                            <span className="text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded">
                                                                Locked
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-500 text-xs bg-gray-50 px-2 py-1 rounded">
                                                                Not Locked
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Payment Status */}
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                                                                booking.tokenPaymentStatus
                                                            )}`}
                                                        >
                                                            {booking.tokenPaymentStatus || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                                                                booking.finalPaymentStatus
                                                            )}`}
                                                        >
                                                            {booking.finalPaymentStatus || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded-full font-medium ${booking.confirmedByDeveloper
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-orange-100 text-orange-700'
                                                                }`}
                                                        >
                                                            {booking.confirmedByDeveloper ? 'Confirmed' : 'Pending'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <Calendar size={48} className="mx-auto text-gray-400 mb-3" />
                                    <h4 className="text-lg font-medium text-gray-600 mb-2">No bookings yet</h4>
                                    <p className="text-sm">This property hasn't received any bookings.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Summary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                            {properties.length}
                        </div>
                        <p className="text-gray-600">Total Properties</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                            {properties.reduce((total, property) => total + (property.bookings?.length || 0), 0)}
                        </div>
                        <p className="text-gray-600">Total Bookings</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                            {properties.length > 0
                                ? Math.round(properties.reduce((total, property) => total + (property.total_views || 0), 0) / properties.length)
                                : 0
                            }
                        </div>
                        <p className="text-gray-600">Avg. Views</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingsPage;