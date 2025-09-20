// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//     Home,
//     MessageSquare,
//     BarChart3,
//     Phone,
//     User,
//     Settings,
//     LogIn,
//     Menu,
//     X,
//     ChevronRight,
//     User2
// } from 'lucide-react';


// const Sidebar = ({ activeRoute }) => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const menuItems = [
//         {
//             title: 'My Properties',
//             icon: Home,
//             route: 'properties',
//             hasArrow: true
//         },
//         // {
//         //     title: 'My Projects',
//         //     icon: Home,
//         //     route: 'projects',
//         //     hasArrow: true
//         // },
//         {
//             title: 'My Enquiries',
//             icon: MessageSquare,
//             route: 'enquiries',
//             hasArrow: true,
//             badge: '2',
//             badgeColor: 'bg-red-500'
//         },
//         {
//             title: 'Property Performance',
//             icon: BarChart3,
//             route: 'performance',
//             hasArrow: true,
//             isNew: true
//         },
//         {
//             title: 'Bookings',
//             icon: BarChart3,
//             route: 'bookings',
//             hasArrow: true,
//             isNew: true
//         },
//         {
//             title: 'Callbacks',
//             icon: Phone,
//             route: 'callbacks',
//             hasArrow: true,
//             isNew: true
//         },
//         {
//             title: 'RM',
//             icon: User2,
//             route: 'rm-manager',
//             hasArrow: true,
//             isNew: true
//         },
//         {
//             title: 'Profile',
//             icon: User,
//             route: 'profile',
//             hasArrow: true
//         },
//         {
//             title: 'Settings',
//             icon: Settings,
//             route: 'settings',
//             hasArrow: true
//         }
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
//                 className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//                 <Menu size={24} />
//             </button>

//             {/* Mobile Overlay */}
//             {isMobileMenuOpen && (
//                 <div
//                     className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                 />
//             )}

//             {/* Sidebar */}
//             <aside className={`min-h-screen
//         fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg
//         transform transition-transform duration-300 ease-in-out
//         ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>
//                 <div className="flex flex-col h-full">
//                     {/* Close button for mobile */}
//                     <div className="lg:hidden flex justify-end p-4">
//                         <button
//                             onClick={() => setIsMobileMenuOpen(false)}
//                             className="p-2 rounded-md hover:bg-gray-100 transition-colors"
//                         >
//                             <X size={24} />
//                         </button>
//                     </div>

//                     {/* Menu Items */}
//                     <nav className="flex-1 px-4 py-6 space-y-2">
//                         {menuItems.map((item) => {
//                             const IconComponent = item.icon;
//                             return (
//                                 <button
//                                     key={item.route}
//                                     onClick={() => handleRouteClick(item.route)}
//                                     className={`
//                     w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-all duration-200
//                     ${currentRoute === item.route
//                                             ? 'bg-red-50 text-red-600 border-l-4 border-red-600 shadow-sm'
//                                             : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
//                                         }
//                   `}
//                                 >
//                                     <div className="flex items-center space-x-3">
//                                         <IconComponent size={20} />
//                                         <span className="font-medium">{item.title}</span>
//                                         {item.isNew && (
//                                             <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
//                                                 New
//                                             </span>
//                                         )}
//                                     </div>

//                                     <div className="flex items-center space-x-2">
//                                         {item.badge && (
//                                             <span className={`
//                         ${item.badgeColor} text-white text-xs px-2 py-1 rounded-full font-medium
//                       `}>
//                                                 {item.badge}
//                                             </span>
//                                         )}
//                                         {item.hasArrow && (
//                                             <ChevronRight size={16} className="text-gray-400" />
//                                         )}
//                                     </div>
//                                 </button>
//                             );
//                         })}
//                     </nav>

//                     {/* Sign Out Button at bottom */}
//                     <div className="px-4 pb-6">
//                         <button
//                             onClick={() => navigate('/signin')}
//                             className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-50 hover:text-red-600"
//                         >
//                             <LogIn size={20} />
//                             <span className="font-medium">Sign Out</span>
//                         </button>
//                     </div>
//                 </div>
//             </aside>
//         </>
//     );
// };

// export default Sidebar;



// import React from 'react';
// import {
//     LayoutDashboard,
//     BookOpen,
//     GraduationCap,
//     MessageCircle,
//     Bell,
//     Calendar,
//     Users2,
//     Settings,
//     ArrowUpRight
// } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//     const navigate = useNavigate()
//     const location = useLocation();
//     const menuItems = [
//         { name: 'My Properties', icon: LayoutDashboard, route: '/properties', active: true },
//         { name: 'My Enquiries', icon: BookOpen, route: '/enquiries', active: false },
//         { name: 'Property Performance', icon: GraduationCap, route: '/performance', active: false },
//         { name: 'Bookings', icon: MessageCircle, route: '/bookings', active: false },
//         { name: 'Callbacks', icon: Bell, route: '/callbacks', active: false, badge: '2' },
//         { name: 'RM Bookings', icon: Calendar, route: '/rm-manager', active: false },
//         { name: 'Profile', icon: Users2, route: '/profile', active: false },
//         { name: 'Settings', icon: Settings, route: '/settings', active: false },
//     ];

//     return (
//         // <div className='flex justify-center'>
//         <div className="w-56 h-[96vh] bg-[#1E1E30] flex flex-col rounded-2xl">
//             {/* Logo Section */}
//             {/* <div className="p-6 flex items-center gap-">
//                     <img src='https://wityysaver.s3.ap-south-1.amazonaws.com/1758194017476-logo.png' className='w-11 h-auto'/>
//                     <span className="text-[#D8F375] text-4xl font-bold">PROFO</span>
//                 </div> */}

//             <div className="p-6 flex items-center">
//                 <img
//                     src="https://wityysaver.s3.ap-south-1.amazonaws.com/1758194017476-logo.png"
//                     className="w-11 h-auto"
//                 />
//                 <span className="relative text-[#D8F375] text-3xl font-bold">
//                     PROFO
//                     <span className="absolute -top-0 -right-7 bg-[#D8F375] text-black text-[8px] font-semibold rounded-full px-2 py-0.5">
//                         IQ
//                     </span>
//                 </span>
//             </div>


//             {/* Navigation Menu */}
//             <nav className="flex-1 px-4">
//                 <ul className="space-y-0.5">
//                     {menuItems.map((item, index) => {
//                         const isActive = location.pathname === item.route;
//                         return (
//                             <li key={index}>
//                                 <a
//                                     href="#"
//                                     onClick={() => navigate(`${item.route}`)}
//                                     className={`
//                   flex items-center gap-3 px-4 py-3 rounded-3xl text-xs font-medium transition-all duration-200 relative
//                   ${isActive
//                                             ? 'bg-[#D8F375] text-[#2D3748]'
//                                             : 'text-white hover:bg-white/5'
//                                         }
//                 `}
//                                 >
//                                     <item.icon size={18} />
//                                     <span className="flex-1">{item.name}</span>
//                                     {item.badge && (
//                                         <div className="w-5 h-5 bg-[#F8CDB7] text-black text-xs font-medium rounded-full flex items-center justify-center">
//                                             {item.badge}
//                                         </div>
//                                     )}
//                                 </a>
//                             </li>
//                         )
//                     })}
//                 </ul>
//             </nav>

//             {/* Bottom Promotional Card */}
//             <div className="p-4 mx-auto">
//                 <img src='https://wityysaver.s3.ap-south-1.amazonaws.com/1758193627053-Screenshot%202025-09-18%20163610.png' className='h-36' />
//             </div>
//         </div>
//         // </div>
//     );
// };

// export default Sidebar;



import React from 'react';
import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    MessageCircle,
    Bell,
    Calendar,
    Users2,
    Settings,
    ArrowUpRight
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const menuItems = [
        { name: 'My Properties', icon: LayoutDashboard, route: '/properties', active: true },
        { name: 'My Enquiries', icon: BookOpen, route: '/enquiries', active: false },
        { name: 'Property Performance', icon: GraduationCap, route: '/performance', active: false },
        { name: 'Bookings', icon: MessageCircle, route: '/bookings', active: false },
        { name: 'Callbacks', icon: Bell, route: '/callbacks', active: false, badge: '2' },
        { name: 'RM Bookings', icon: Calendar, route: '/rm-manager', active: false },
        { name: 'Profile', icon: Users2, route: '/profile', active: false },
        { name: 'Settings', icon: Settings, route: '/settings', active: false },
    ];

    return (
        // <div className='flex justify-center'>
        // <div className="w-56 h-[96vh] bg-[#1E1E30] flex flex-col rounded-2xl">
        //     {/* Logo Section */}

        //     <div className="p-6 flex items-center">
        //         <img
        //             src="https://wityysaver.s3.ap-south-1.amazonaws.com/1758194017476-logo.png"
        //             className="w-11 h-auto"
        //         />
        //         <span className="relative text-[#D8F375] text-3xl font-bold">
        //             PROFO
        //             <span className="absolute -top-0 -right-7 bg-[#D8F375] text-black text-[8px] font-semibold rounded-full px-2 py-0.5">
        //                 IQ
        //             </span>
        //         </span>
        //     </div>


        //     {/* Navigation Menu */}
        //     <nav className="flex-1 px-4">
        //         <ul className="space-y-0.5">
        //             {menuItems.map((item, index) => {
        //                 const isActive = location.pathname === item.route;
        //                 return (
        //                     <li key={index}>
        //                         <a
        //                             href="#"
        //                             onClick={() => navigate(`${item.route}`)}
        //                             className={`
        //           flex items-center gap-3 px-4 py-3 rounded-3xl text-xs font-medium transition-all duration-200 relative
        //           ${isActive
        //                                     ? 'bg-[#D8F375] text-[#2D3748]'
        //                                     : 'text-white hover:bg-white/5'
        //                                 }
        //         `}
        //                         >
        //                             <item.icon size={18} />
        //                             <span className="flex-1">{item.name}</span>
        //                             {item.badge && (
        //                                 <div className="w-5 h-5 bg-[#F8CDB7] text-black text-xs font-medium rounded-full flex items-center justify-center">
        //                                     {item.badge}
        //                                 </div>
        //                             )}
        //                         </a>
        //                     </li>
        //                 )
        //             })}
        //         </ul>
        //     </nav>

        //     {/* Bottom Promotional Card */}
        //     <div className="p-4 mx-auto">
        //         <img src='https://wityysaver.s3.ap-south-1.amazonaws.com/1758193627053-Screenshot%202025-09-18%20163610.png' className='h-36' />
        //     </div>
        // </div>
        <div className="w-56 h-[96vh] bg-white flex flex-col rounded-2xl shadow">
            {/* Logo */}
            <div className="p-6 flex items-center">
                <img src="https://wityysaver.s3.ap-south-1.amazonaws.com/1758194017476-logo.png" className="w-11 h-auto" />
                <span className="relative text-gray-900 text-3xl font-bold">
                    PROFO
                    <span className="absolute -top-0 -right-7 bg-blue-600 text-white text-[8px] font-semibold rounded-full px-2 py-0.5">
                        IQ
                    </span>
                </span>
            </div>

            <nav className="flex-1 px-4">
                <ul className="space-y-0.5">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.route;
                        return (
                            <li key={index}>
                                <a
                                    href="#"
                                    onClick={() => navigate(`${item.route}`)}
                                    className={`
                                flex items-center gap-3 px-4 py-3 rounded-3xl text-xs font-medium transition-all duration-200 relative
                                ${isActive
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                            `}
                                >
                                    <item.icon size={18} />
                                    <span className="flex-1">{item.name}</span>
                                    {item.badge && (
                                        <div className="w-5 h-5 bg-yellow-400 text-black text-xs font-medium rounded-full flex items-center justify-center">
                                            {item.badge}
                                        </div>
                                    )}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="p-4 mx-auto">
                <img src="https://wityysaver.s3.ap-south-1.amazonaws.com/1758193627053-Screenshot%202025-09-18%20163610.png" className="h-36" />
            </div>
        </div>

        // </div>
    );
};

export default Sidebar;

