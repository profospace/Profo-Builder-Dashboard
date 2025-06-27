// import React, { useState } from 'react';

// const Sidebar = ({ activeRoute, onRouteChange }) => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
//             route: '/enquiries',
//             hasArrow: true,
//             badge: '2',
//             badgeColor: 'bg-red-500'
//         },
//         {
//             title: 'Matching Buyers',
//             icon: '👥',
//             route: 'buyers',
//             hasArrow: true,
//             badge: '100',
//             badgeColor: 'bg-gray-500'
//         },
//         {
//             title: 'Property Performance',
//             icon: '📊',
//             route: 'performance',
//             hasArrow: true,
//             isNew: true
//         },
//         {
//             title: 'Property Management',
//             icon: '⚙️',
//             route: 'management',
//             hasArrow: true
//         },
//         {
//             title: 'Help & Support',
//             icon: '❓',
//             route: 'support',
//             hasArrow: false
//         }
//     ];

//     const handleRouteClick = (route) => {
//         onRouteChange(route);
//         setIsMobileMenuOpen(false);
//     };

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
//             <aside className={`
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
//                   ${activeRoute === item.route
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

// Sidebar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ activeRoute }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            title: 'My Properties',
            icon: '🏠',
            route: 'properties',
            hasArrow: true
        },
        {
            title: 'My Enquiries',
            icon: '❓',
            route: 'enquiries',
            hasArrow: true,
            badge: '2',
            badgeColor: 'bg-red-500'
        },
        // {
        //     title: 'Matching Buyers',
        //     icon: '👥',
        //     route: 'buyers',
        //     hasArrow: true,
        //     badge: '100',
        //     badgeColor: 'bg-gray-500'
        // },
        // {
        //     title: 'Property Performance',
        //     icon: '📊',
        //     route: 'performance',
        //     hasArrow: true,
        //     isNew: true
        // },
        // {
        //     title: 'Property Management',
        //     icon: '⚙️',
        //     route: 'management',
        //     hasArrow: true
        // },
        // {
        //     title: 'Help & Support',
        //     icon: '❓',
        //     route: 'support',
        //     hasArrow: false
        // }
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
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={` min-h-screen
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Close button for mobile */}
                    <div className="lg:hidden flex justify-end p-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-md hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.route}
                                onClick={() => handleRouteClick(item.route)}
                                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors
                  ${currentRoute === item.route
                                        ? 'bg-red-50 text-red-600 border-l-4 border-red-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }
                `}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-lg">{item.icon}</span>
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
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;