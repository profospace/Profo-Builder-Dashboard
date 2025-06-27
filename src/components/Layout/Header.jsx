import React from 'react';

const Header = () => {
    return (
        <header className="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
                <div className="text-4xl font-bold">
                    PROFO
                </div>
            </div>

            {/* Right Side - User Actions */}
            <div className="flex items-center space-x-4">
                {/* User Profile */}
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-medium">
                        A
                    </div>
                    <span className="text-sm hidden md:block">Hi, anit cha...</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* Post Property Button */}
                <button className="bg-white text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                    Post Another Property
                </button>
            </div>
        </header>
    );
};

export default Header;