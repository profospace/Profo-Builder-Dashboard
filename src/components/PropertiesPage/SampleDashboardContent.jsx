import React from 'react';

// Sample content components for different routes
const PropertyPerformanceCard = () => (
    <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
        <div className="flex items-center justify-between mb-4">
            <div>
                <div className="text-3xl font-bold text-gray-900">8%</div>
                <div className="text-sm text-red-600 font-medium">Property Performance</div>
                <div className="text-sm text-red-600">Low</div>
            </div>
        </div>
        <p className="text-gray-700 mb-4">Take the right steps to</p>
        <p className="font-semibold text-gray-900 mb-4">Improve your Property Performance</p>
        <button className="border border-red-600 text-red-600 px-6 py-2 rounded-full hover:bg-red-50 transition-colors">
            Know How
        </button>
    </div>
);

const PropertyVisibilityCard = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-red-500 rounded-full"></div>
            </div>
            <div>
                <p className="text-gray-700">Your Property's visibility to</p>
                <p className="text-gray-700">Buyers is <span className="text-red-600 font-semibold">low!</span></p>
            </div>
        </div>

        <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Become a Premium member to:</h3>
            <div className="space-y-2">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Increase your Property Visibility to Buyers by <span className="font-semibold">5X</span></span>
                </div>
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Get Guaranteed <span className="font-semibold">10 Enquiries</span></span>
                </div>
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Show your phone number to all interested Buyers</span>
                </div>
            </div>
        </div>

        <div className="flex space-x-3">
            <button className="text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors">
                Not Now
            </button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
                Upgrade to Premium
            </button>
        </div>
    </div>
);

const MatchingBuyersCard = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                    <div className="font-semibold text-gray-900">100 Matching Buyers</div>
                    <div className="text-sm text-gray-600">in Kakadev, Kanpur</div>
                </div>
            </div>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                Excellent Match
            </span>
        </div>

        <div className="space-y-3 mb-4">
            <div className="flex justify-between">
                <span className="text-gray-600">ambujagarwal</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Budget:</span>
                <span className="font-medium">₹ 63 Lac - ₹ 77 Lac</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Last Active On:</span>
                <span className="font-medium">Jun 24, 2025</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Properties Contacted:</span>
                <span className="font-medium">33</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Buyer is looking in:</span>
                <span className="font-medium">Kakadev</span>
            </div>
        </div>

        <div className="flex justify-between">
            <button className="border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors">
                Contact Now
            </button>
            <button className="text-red-600 hover:underline">View Next</button>
        </div>

        <div className="mt-4 text-right">
            <button className="text-red-600 hover:underline font-medium">
                View all Buyers →
            </button>
        </div>
    </div>
);

const StatusTabs = () => (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
        <button className="bg-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium">
            Pending (1) <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs ml-1">1 New</span>
        </button>
        <button className="text-gray-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
            Approved (1)
        </button>
        <button className="text-gray-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
            Denied (0)
        </button>
    </div>
);

const PropertyValueCard = () => (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
                </svg>
            </div>
            <div className="flex-1">
                <p className="text-gray-700 font-medium">
                    <span className="font-semibold">Discover your property's true market value</span> before connecting with buyers. Don't settle for less!
                </p>
                <button className="text-red-600 font-medium hover:underline mt-1">
                    Check Now →
                </button>
            </div>
            <div className="text-right text-sm text-gray-500">
                <div>Powered by</div>
                <div className="font-semibold">PropWorth</div>
            </div>
        </div>
    </div>
);

// Main Dashboard Content Component
const SampleDashboardContent = () => {
    return (
        <div className="space-y-6">
            {/* Property Value Discovery */}
            <PropertyValueCard />

            {/* Status Tabs */}
            <StatusTabs />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-4 space-y-6">
                    <PropertyPerformanceCard />
                </div>

                {/* Middle Column */}
                <div className="lg:col-span-4">
                    <PropertyVisibilityCard />
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4">
                    <MatchingBuyersCard />
                </div>
            </div>

            {/* Bottom Pagination */}
            <div className="flex justify-center mt-8">
                <div className="text-sm text-gray-500">Desktop 4</div>
            </div>
        </div>
    );
};

export default SampleDashboardContent;