import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, User, MapPin, Phone, Mail, Clock, Filter, Search, Download, Eye, X } from 'lucide-react';
import { base_url } from '@/utils/baseurl';
import { getConfig } from '@/utils/config';

function ViewPropertyBookingPage() {
    const { id } = useParams(); // post_id
    const navigate = useNavigate()

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statistics, setStatistics] = useState(null);
    const [propertyInfo, setPropertyInfo] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalBookings, setTotalBookings] = useState(0);

    // Filter state
    const [filters, setFilters] = useState({
        status: '',
        visitStatus: '',
        fromDate: '',
        toDate: '',
        searchTerm: ''
    });

    const [showFilters, setShowFilters] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Fetch bookings
    const fetchBookings = async (page = 1) => {
        setLoading(true);
        try {
            // const token = localStorage.getItem('user'); // Adjust based on your storage

            // Build query params
            const params = new URLSearchParams({
                page: page,
                limit: 10
            });

            if (filters.status) params.append('status', filters.status);
            if (filters.visitStatus) params.append('visitStatus', filters.visitStatus);
            if (filters.fromDate) params.append('fromDate', filters.fromDate);
            if (filters.toDate) params.append('toDate', filters.toDate);

            const response = await fetch(
                `${base_url}/bookings/properties/${id}/bookings?${params.toString()}`, getConfig()
            );

            const data = await response.json();

            if (data.status) {
                setBookings(data.data.bookings);
                setPropertyInfo(data.data.property);
                setStatistics(data.data.statistics);
                setCurrentPage(data.data.pagination.currentPage);
                setTotalPages(data.data.pagination.totalPages);
                setTotalBookings(data.data.pagination.totalBookings);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to fetch bookings: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch booking details
    // const fetchBookingDetails = async (bookingId) => {
    //     try {
    //         // const token = localStorage.getItem('builderToken');
    //         const response = await fetch(
    //             `${base_url}/view/booking/info/${bookingId}`, getConfig()
    //         );

    //         const data = await response.json();
    //         if (data.status) {
    //             setSelectedBooking(data.data);
    //             setShowDetailsModal(true);
    //         }
    //     } catch (err) {
    //         console.error('Failed to fetch booking details:', err);
    //     }
    // };

    const handleViewBookings = (id) => {
        // console.log("ID" , id)
        // if(id){
        navigate(`/view/booking/info/${id}`)

        // }


    }

    useEffect(() => {
        fetchBookings(currentPage);
    }, [id, currentPage]);

    // Apply filters
    const handleApplyFilters = () => {
        setCurrentPage(1);
        fetchBookings(1);
        setShowFilters(false);
    };

    // Reset filters
    const handleResetFilters = () => {
        setFilters({
            status: '',
            visitStatus: '',
            fromDate: '',
            toDate: '',
            searchTerm: ''
        });
        setCurrentPage(1);
        fetchBookings(1);
    };

    // Filter bookings by search term (client-side)
    const filteredBookings = bookings.filter(booking => {
        if (!filters.searchTerm) return true;
        const searchLower = filters.searchTerm.toLowerCase();
        return (
            booking.tokenPaidBy?.name?.toLowerCase().includes(searchLower) ||
            booking.tokenPaidBy?.email?.toLowerCase().includes(searchLower) ||
            booking.tokenPaidBy?.phone?.includes(searchLower) ||
            booking.assignedRM?.name?.toLowerCase().includes(searchLower)
        );
    });

    // Status badge colors
    const getStatusColor = (status) => {
        const colors = {
            'ACTIVE': 'bg-green-100 text-green-800',
            'COMPLETED': 'bg-blue-100 text-blue-800',
            'CANCELLED': 'bg-red-100 text-red-800',
            'RESCHEDULED': 'bg-yellow-100 text-yellow-800',
            'REBOOK': 'bg-purple-100 text-purple-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getVisitStatusColor = (status) => {
        const colors = {
            'SCHEDULED': 'bg-blue-100 text-blue-800',
            'COMPLETED': 'bg-green-100 text-green-800',
            'MISSED': 'bg-red-100 text-red-800',
            'CANCELLED': 'bg-gray-100 text-gray-800',
            'IN_PROGRESS': 'bg-yellow-100 text-yellow-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading && bookings.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading bookings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center bg-red-50 p-6 rounded-lg">
                    <p className="text-red-600 font-semibold">Error: {error}</p>
                    <button
                        onClick={() => fetchBookings(currentPage)}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className='flex items-start justify-between'>
                {/* Header */}
                <div className="mb-6 ">
                    <h1 className="text-3xl font-bold text-gray-800">Property Bookings</h1>
                    <p className="text-gray-600 ">
                        {propertyInfo?.title}
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="">
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Search */}
                        <div className="flex-1 min-w-96">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by customer name, email, or phone..."
                                    value={filters.searchTerm}
                                    onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                            <Filter className="w-5 h-5" />
                            Filters
                        </button>
                    </div>

                </div>
            </div>
            {/* Expanded Filters */}
            {showFilters && (
                <div className="mb-4 border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Booking Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="ACTIVE">Active</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                                <option value="RESCHEDULED">Rescheduled</option>
                                <option value="REBOOK">Rebook</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Visit Status
                            </label>
                            <select
                                value={filters.visitStatus}
                                onChange={(e) => setFilters({ ...filters, visitStatus: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Visits</option>
                                <option value="SCHEDULED">Scheduled</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="MISSED">Missed</option>
                                <option value="CANCELLED">Cancelled</option>
                                <option value="IN_PROGRESS">In Progress</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                From Date
                            </label>
                            <input
                                type="date"
                                value={filters.fromDate}
                                onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                To Date
                            </label>
                            <input
                                type="date"
                                value={filters.toDate}
                                onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleApplyFilters}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Apply Filters
                        </button>
                        <button
                            onClick={handleResetFilters}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}

            {/* Statistics Cards */}
            {statistics && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Bookings</p>
                                <p className="text-2xl font-bold text-gray-800">{statistics.totalBookings || 0}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Active</p>
                                <p className="text-2xl font-bold text-green-600">{statistics.activeBookings || 0}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <Clock className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-blue-600">{statistics.completedBookings || 0}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Revenue</p>
                                <p className="text-2xl font-bold text-purple-600">₹{statistics.totalRevenue || 0}</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <Download className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>
            )}



            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No bookings found</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Booking Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Visit Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Assigned RM
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Booked At
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Token Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredBookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <User className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {booking.tokenPaidBy?.name || 'N/A'}
                                                        </div>
                                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Mail className="w-3 h-3" />
                                                            {booking.tokenPaidBy?.email || 'N/A'}
                                                        </div>
                                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Phone className="w-3 h-3" />
                                                            {booking.tokenPaidBy?.phone || 'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.bookingStatus)}`}>
                                                    {booking.bookingStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getVisitStatusColor(booking.visitStatus)}`}>
                                                    {booking.visitStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {booking.assignedRM ? (
                                                    <div className="text-sm">
                                                        <div className="font-medium text-gray-900">
                                                            {booking.assignedRM.name}
                                                        </div>
                                                        <div className="text-gray-500">
                                                            {booking.assignedRM.email}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">Not Assigned</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(booking.bookedAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    ₹{booking.tokenAmount}
                                                </div>
                                                <span className={`text-xs ${booking.tokenPaymentStatus === 'PAID' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                    {booking.tokenPaymentStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button
                                                    onClick={() => handleViewBookings(booking._id)}
                                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="bg-white px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                                    <span className="font-medium">
                                        {Math.min(currentPage * 10, totalBookings)}
                                    </span>{' '}
                                    of <span className="font-medium">{totalBookings}</span> results
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Booking Details Modal */}
            {showDetailsModal && selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Customer Info */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Name</p>
                                        <p className="font-medium">{selectedBooking.tokenPaidBy?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium">{selectedBooking.tokenPaidBy?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <p className="font-medium">{selectedBooking.tokenPaidBy?.phone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Info */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-3">Booking Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Booking Status</p>
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.bookingStatus)}`}>
                                            {selectedBooking.bookingStatus}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Visit Status</p>
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getVisitStatusColor(selectedBooking.visitStatus)}`}>
                                            {selectedBooking.visitStatus}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Token Amount</p>
                                        <p className="font-medium">₹{selectedBooking.tokenAmount}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Payment Status</p>
                                        <p className="font-medium">{selectedBooking.tokenPaymentStatus}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Booked At</p>
                                        <p className="font-medium">{formatDate(selectedBooking.bookedAt)}</p>
                                    </div>
                                    {selectedBooking.siteVisitScheduledAt && (
                                        <div>
                                            <p className="text-sm text-gray-600">Visit Scheduled</p>
                                            <p className="font-medium">{formatDate(selectedBooking.siteVisitScheduledAt)}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* RM Info */}
                            {selectedBooking.assignedRM && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-3">Assigned RM</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Name</p>
                                            <p className="font-medium">{selectedBooking.assignedRM.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="font-medium">{selectedBooking.assignedRM.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Phone</p>
                                            <p className="font-medium">{selectedBooking.assignedRM.phone}</p>
                                        </div>
                                        {selectedBooking.assignedAt && (
                                            <div>
                                                <p className="text-sm text-gray-600">Assigned At</p>
                                                <p className="font-medium">{formatDate(selectedBooking.assignedAt)}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Visit Details */}
                            {selectedBooking.visitDetails && Object.keys(selectedBooking.visitDetails).length > 0 && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-3">Visit Details</h3>
                                    <div className="space-y-2">
                                        {selectedBooking.visitDetails.customerInterest && (
                                            <div>
                                                <p className="text-sm text-gray-600">Customer Interest</p>
                                                <p className="font-medium">{selectedBooking.visitDetails.customerInterest}</p>
                                            </div>
                                        )}
                                        {selectedBooking.visitDetails.visitNotes && (
                                            <div>
                                                <p className="text-sm text-gray-600">Notes</p>
                                                <p className="font-medium">{selectedBooking.visitDetails.visitNotes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewPropertyBookingPage;