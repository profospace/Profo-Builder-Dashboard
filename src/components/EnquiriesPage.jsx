import React, { useState, useMemo } from 'react';
import { Phone, MapPin, Clock, Eye, Heart, Filter, Calendar, Search, X } from 'lucide-react';

const Responses = () => {
    // Enhanced property data
    const propertiesData = [
        {
            id: "01",
            title: "3BHK Sector 18",
            location: "Noida",
            price: "₹65L",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
            stats: { visits: 12, contacts: 3, saves: 2 },
            interactions: [
                {
                    type: "contact",
                    user: "Rahul Sharma",
                    phone: "+91 98765 43210",
                    email: "rahul@gmail.com",
                    time: "2h ago",
                    timestamp: "2025-06-26T10:15:00Z",
                    budget: "₹50-60L",
                    location: "Gurgaon"
                },
                {
                    type: "visit",
                    user: "Priya Singh",
                    phone: "+91 87654 32109",
                    email: "priya@gmail.com",
                    time: "5h ago",
                    timestamp: "2025-06-26T07:15:00Z",
                    location: "Delhi"
                },
                {
                    type: "save",
                    user: "Amit Kumar",
                    phone: "+91 76543 21098",
                    email: "amit@gmail.com",
                    time: "1d ago",
                    timestamp: "2025-06-25T12:15:00Z",
                    location: "Noida"
                },
                {
                    type: "contact",
                    user: "Neha Gupta",
                    phone: "+91 65432 10987",
                    email: "neha@gmail.com",
                    time: "2d ago",
                    timestamp: "2025-06-24T15:30:00Z",
                    budget: "₹60-70L",
                    location: "Faridabad"
                }
            ]
        },
        {
            id: "02",
            title: "2BHK Sector 62",
            location: "Noida",
            price: "₹45L",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
            stats: { visits: 8, contacts: 2, saves: 1 },
            interactions: [
                {
                    type: "contact",
                    user: "Neha Gupta",
                    phone: "+91 65432 10987",
                    email: "neha@gmail.com",
                    time: "3h ago",
                    timestamp: "2025-06-26T09:15:00Z",
                    budget: "₹40-50L",
                    location: "Ghaziabad"
                },
                {
                    type: "visit",
                    user: "Rajesh Patel",
                    phone: "+91 54321 09876",
                    email: "rajesh@gmail.com",
                    time: "6h ago",
                    timestamp: "2025-06-26T06:15:00Z",
                    location: "Noida"
                }
            ]
        },
        {
            id: "03",
            title: "4BHK Villa",
            location: "Greater Noida",
            price: "₹1.2Cr",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
            stats: { visits: 5, contacts: 1, saves: 3 },
            interactions: [
                {
                    type: "save",
                    user: "Deepak Agarwal",
                    phone: "+91 43210 98765",
                    email: "deepak@gmail.com",
                    time: "1h ago",
                    timestamp: "2025-06-26T11:15:00Z",
                    budget: "₹1-1.5Cr",
                    location: "Delhi"
                },
                {
                    type: "visit",
                    user: "Sunita Sharma",
                    phone: "+91 32109 87654",
                    email: "sunita@gmail.com",
                    time: "4h ago",
                    timestamp: "2025-06-26T08:15:00Z",
                    location: "Greater Noida"
                }
            ]
        }
    ];

    const [selectedProperty, setSelectedProperty] = useState(propertiesData[0]);
    const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [dateFilter, setDateFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('contact');
    const [searchQuery, setSearchQuery] = useState('');

    // Chip filter options
    const filterChips = [
        { id: 'contact', label: 'Contacts', icon: Phone, color: 'bg-green-100 text-green-700 border-green-200' },
        { id: 'all', label: 'All', icon: Eye, color: 'bg-gray-100 text-gray-700 border-gray-200' },
        { id: 'visit', label: 'Visits', icon: Eye, color: 'bg-blue-100 text-blue-700 border-blue-200' },
        { id: 'save', label: 'Saves', icon: Heart, color: 'bg-red-100 text-red-700 border-red-200' }
    ];

    // Filter interactions
    const filteredInteractions = useMemo(() => {
        let filtered = selectedProperty.interactions;

        if (dateFilter) {
            const filterDate = new Date(dateFilter).toDateString();
            filtered = filtered.filter(interaction => {
                const interactionDate = new Date(interaction.timestamp).toDateString();
                return interactionDate === filterDate;
            });
        }

        if (typeFilter !== 'all') {
            filtered = filtered.filter(interaction =>
                interaction.type.toLowerCase() === typeFilter.toLowerCase()
            );
        }

        if (searchQuery) {
            filtered = filtered.filter(interaction =>
                interaction.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                interaction.phone.includes(searchQuery) ||
                (interaction.location && interaction.location.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        return filtered;
    }, [selectedProperty, dateFilter, typeFilter, searchQuery]);

    const getInteractionIcon = (type) => {
        switch (type) {
            case 'contact':
                return <Phone className="w-4 h-4" />;
            case 'save':
                return <Heart className="w-4 h-4" />;
            default:
                return <Eye className="w-4 h-4" />;
        }
    };

    const getInteractionColor = (type) => {
        switch (type) {
            case 'contact':
                return 'text-green-600 bg-green-50';
            case 'save':
                return 'text-red-500 bg-red-50';
            default:
                return 'text-blue-600 bg-blue-50';
        }
    };

    const clearFilters = () => {
        setDateFilter('');
        setTypeFilter('contact');
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Responsive Container */}
            <div className="max-w-md mx-auto lg:max-w-4xl xl:max-w-6xl">

                {/* Header */}
                {/* <div className="bg-white border-b border-gray-100">
                    <div className="px-4 lg:px-8 py-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Properties
                        </h1>
                    </div>
                </div> */}

                {/* Main Content */}
                <div className="px-4 lg:px-8 py-6">

                    {/* Property Tab Selector */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Select Property</h2>
                            <span className="text-sm text-gray-500">{propertiesData.length} properties</span>
                        </div>

                        {/* Property Tabs */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {propertiesData.map((property, index) => (
                                <button
                                    key={property.id}
                                    onClick={() => {
                                        setCurrentPropertyIndex(index);
                                        setSelectedProperty(property);
                                    }}
                                    className={`flex-shrink-0 group relative ${selectedProperty.id === property.id
                                        ? 'ring-2 ring-blue-500'
                                        : 'hover:ring-2 hover:ring-gray-300'
                                        } rounded-xl transition-all duration-200`}
                                >
                                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden w-80 shadow-sm">
                                        <div className="flex">
                                            {/* Property Image */}
                                            <div className="relative flex-shrink-0">
                                                <img
                                                    src={property.image}
                                                    alt={property.title}
                                                    className="w-24 h-20 object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
                                            </div>

                                            {/* Property Info */}
                                            <div className="flex-1 p-3 min-w-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                                                            {property.title}
                                                        </h3>
                                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                                            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                                            <span className="truncate">{property.location}</span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-2 flex-shrink-0">
                                                        <span className="text-sm font-bold text-gray-900">
                                                            {property.price}
                                                        </span>
                                                        <div className="text-xs text-gray-400 text-right">
                                                            #{property.id}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Quick Stats */}
                                                <div className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="flex items-center text-blue-600">
                                                            <Eye className="w-3 h-3 mr-1" />
                                                            {property.stats.visits}
                                                        </span>
                                                        <span className="flex items-center text-green-600">
                                                            <Phone className="w-3 h-3 mr-1" />
                                                            {property.stats.contacts}
                                                        </span>
                                                        <span className="flex items-center text-red-500">
                                                            <Heart className="w-3 h-3 mr-1" />
                                                            {property.stats.saves}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Active Indicator */}
                                    {selectedProperty.id === property.id && (
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interactions */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                                    Recent Activity
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {filteredInteractions.length} interactions
                                </p>
                            </div>

                            {/* Advanced Options Toggle */}
                            <button
                                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${showAdvancedOptions ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <Filter className="w-4 h-4" />
                                <span className="hidden sm:inline">Filters</span>
                            </button>
                        </div>

                        {/* Advanced Options Panel */}
                        {showAdvancedOptions && (
                            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Search */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Search
                                        </label>
                                        <div className="relative">
                                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Name, phone, location..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Date Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date
                                        </label>
                                        <div className="relative">
                                            <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="date"
                                                value={dateFilter}
                                                onChange={(e) => setDateFilter(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Type Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Type
                                        </label>
                                        <select
                                            value={typeFilter}
                                            onChange={(e) => setTypeFilter(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="contact">Contacts</option>
                                            <option value="all">All Types</option>
                                            <option value="visit">Visits</option>
                                            <option value="save">Saves</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Filter Actions */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500">
                                        {filteredInteractions.length} results
                                    </span>
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Chip Filters */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {filterChips.map((chip) => {
                                const IconComponent = chip.icon;
                                const isActive = typeFilter === chip.id;
                                const interactionCount = chip.id === 'all'
                                    ? selectedProperty.interactions.length
                                    : selectedProperty.interactions.filter(i => i.type === chip.id).length;

                                return (
                                    <button
                                        key={chip.id}
                                        onClick={() => setTypeFilter(chip.id)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border transition-all ${isActive
                                            ? chip.color + ' shadow-sm'
                                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <IconComponent className="w-4 h-4" />
                                        {chip.label}
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive
                                            ? 'bg-white/80 text-gray-700'
                                            : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {interactionCount}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="space-y-3">
                            {filteredInteractions.map((interaction, index) => (
                                <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3 flex-1">
                                            {/* Icon */}
                                            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${getInteractionColor(interaction.type)}`}>
                                                {getInteractionIcon(interaction.type)}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm lg:text-base font-medium text-gray-900">
                                                    {interaction.user}
                                                </p>
                                                <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4 text-xs lg:text-sm text-gray-500 mt-1">
                                                    <div className="flex items-center">
                                                        <Phone className="w-3 h-3 mr-1" />
                                                        {interaction.phone}
                                                    </div>
                                                    {interaction.location && (
                                                        <div className="flex items-center">
                                                            <MapPin className="w-3 h-3 mr-1" />
                                                            {interaction.location}
                                                        </div>
                                                    )}
                                                </div>
                                                {interaction.budget && (
                                                    <div className="mt-2">
                                                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                            {interaction.budget}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Time */}
                                        <div className="flex items-center text-xs text-gray-400 ml-4">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {interaction.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredInteractions.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-6 h-6 text-gray-400" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 mb-1">No interactions found</h3>
                                <p className="text-sm text-gray-500">Try adjusting your filters to see more results.</p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}

                        {/* Call to Action */}
                        {filteredInteractions.length > 0 && (
                            <div className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 lg:p-6 text-white">
                                <div className="text-center">
                                    <p className="text-sm opacity-90 mb-2">Ready to connect with leads?</p>
                                    <button className="bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                                        Export Contact List
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Responses;