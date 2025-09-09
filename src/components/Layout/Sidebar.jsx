// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Sidebar = ({ activeRoute }) => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const menuItems = [
//         {
//             title: 'My Properties',
//             icon: '🏠',
//             route: 'properties',
//             hasArrow: true
//         },
//         {
//             title: 'My Enquiries',
//             icon: '❓',
//             route: 'enquiries',
//             hasArrow: true,
//             badge: '2',
//             badgeColor: 'bg-red-500'
//         },
//         {
//             title: 'Property Performance',
//             icon: '📊',
//             route: 'performance',
//             hasArrow: true,
//             isNew: true
//         },
//         {
//             title: 'Callbacks',
//             icon: '📊',
//             route: 'callbacks',
//             hasArrow: true,
//             isNew: true
//         },
//         {
//             title: 'Profile',
//             icon: '⚙️',
//             route: 'profile',
//             hasArrow: true
//         },
//         {
//             title: 'Settings',
//             icon: '⚙️',
//             route: 'settings',
//             hasArrow: true
//         },
//         {
//             title: 'SignIn',
//             icon: '⚙️',
//             route: 'signin',
//             hasArrow: true
//         },
//         // {
//         //     title: 'Matching Buyers',
//         //     icon: '👥',
//         //     route: 'buyers',
//         //     hasArrow: true,
//         //     badge: '100',
//         //     badgeColor: 'bg-gray-500'
//         // },
//         // {
//         // {
//         //     title: 'Help & Support',
//         //     icon: '❓',
//         //     route: 'support',
//         //     hasArrow: false
//         // }
//     ];

//     const handleRouteClick = (route) => {
//         navigate(`/${route}`);
//         setIsMobileMenuOpen(false);
//     };

//     // Get current route from location
//     const getCurrentRoute = () => {
//         const path = location.pathname.replace('/', '');
//         return path || 'properties';
//     };

//     const currentRoute = getCurrentRoute();

//     return (
//         <>
//             {/* Mobile Menu Button */}
//             <button
//                 className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//             </button>

//             {/* Mobile Overlay */}
//             {isMobileMenuOpen && (
//                 <div
//                     className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                 />
//             )}

//             {/* Sidebar */}
//             <aside className={` min-h-screen
//         fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
//         transform transition-transform duration-300 ease-in-out
//         ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>
//                 <div className="flex flex-col h-full">
//                     {/* Close button for mobile */}
//                     <div className="lg:hidden flex justify-end p-4">
//                         <button
//                             onClick={() => setIsMobileMenuOpen(false)}
//                             className="p-2 rounded-md hover:bg-gray-100"
//                         >
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>

//                     {/* Menu Items */}
//                     <nav className="flex-1 px-4 py-6 space-y-2">
//                         {menuItems.map((item) => (
//                             <button
//                                 key={item.route}
//                                 onClick={() => handleRouteClick(item.route)}
//                                 className={`
//                   w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors
//                   ${currentRoute === item.route
//                                         ? 'bg-red-50 text-red-600 border-l-4 border-red-600'
//                                         : 'text-gray-700 hover:bg-gray-50'
//                                     }
//                 `}
//                             >
//                                 <div className="flex items-center space-x-3">
//                                     <span className="text-lg">{item.icon}</span>
//                                     <span className="font-medium">{item.title}</span>
//                                     {item.isNew && (
//                                         <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
//                                             New
//                                         </span>
//                                     )}
//                                 </div>

//                                 <div className="flex items-center space-x-2">
//                                     {item.badge && (
//                                         <span className={`
//                       ${item.badgeColor} text-white text-xs px-2 py-1 rounded-full font-medium
//                     `}>
//                                             {item.badge}
//                                         </span>
//                                     )}
//                                     {item.hasArrow && (
//                                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                         </svg>
//                                     )}
//                                 </div>
//                             </button>
//                         ))}
//                     </nav>
//                 </div>
//             </aside>
//         </>
//     );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    MessageSquare,
    BarChart3,
    Phone,
    User,
    Settings,
    LogIn,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';


const Sidebar = ({ activeRoute }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            title: 'My Properties',
            icon: Home,
            route: 'properties',
            hasArrow: true
        },
        // {
        //     title: 'My Projects',
        //     icon: Home,
        //     route: 'projects',
        //     hasArrow: true
        // },
        {
            title: 'My Enquiries',
            icon: MessageSquare,
            route: 'enquiries',
            hasArrow: true,
            badge: '2',
            badgeColor: 'bg-red-500'
        },
        {
            title: 'Property Performance',
            icon: BarChart3,
            route: 'performance',
            hasArrow: true,
            isNew: true
        },
        {
            title: 'Bookings',
            icon: BarChart3,
            route: 'bookings',
            hasArrow: true,
            isNew: true
        },
        {
            title: 'Callbacks',
            icon: Phone,
            route: 'callbacks',
            hasArrow: true,
            isNew: true
        },
        {
            title: 'Profile',
            icon: User,
            route: 'profile',
            hasArrow: true
        },
        {
            title: 'Settings',
            icon: Settings,
            route: 'settings',
            hasArrow: true
        }
    ];

    const handleRouteClick = (route) => {
        navigate(`/${route}`);
        setIsMobileMenuOpen(false);
    };

    // Get current route from location
    const getCurrentRoute = () => {
        const path = location.pathname.replace('/', '');
        return path || 'properties';
    };

    const currentRoute = getCurrentRoute();

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <Menu size={24} />
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`min-h-screen
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Close button for mobile */}
                    <div className="lg:hidden flex justify-end p-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <button
                                    key={item.route}
                                    onClick={() => handleRouteClick(item.route)}
                                    className={`
                    w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-all duration-200
                    ${currentRoute === item.route
                                            ? 'bg-red-50 text-red-600 border-l-4 border-red-600 shadow-sm'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                        }
                  `}
                                >
                                    <div className="flex items-center space-x-3">
                                        <IconComponent size={20} />
                                        <span className="font-medium">{item.title}</span>
                                        {item.isNew && (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                                                New
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {item.badge && (
                                            <span className={`
                        ${item.badgeColor} text-white text-xs px-2 py-1 rounded-full font-medium
                      `}>
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.hasArrow && (
                                            <ChevronRight size={16} className="text-gray-400" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Sign Out Button at bottom */}
                    <div className="px-4 pb-6">
                        <button
                            onClick={() => navigate('/signin')}
                            className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-50 hover:text-red-600"
                        >
                            <LogIn size={20} />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;