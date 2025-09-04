// // import React from 'react';

// // const Header = () => {
// //     return (
// //         <header className="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
// //             {/* Logo and Brand */}
// //             <div className="flex items-center space-x-2">
// //                 <div className="text-4xl font-bold">
// //                     PROFO
// //                 </div>
// //             </div>

// //             {/* Right Side - User Actions */}
// //             <div className="flex items-center space-x-4">
// //                 {/* User Profile */}
// //                 <div className="flex items-center space-x-2">
// //                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-medium">
// //                         A
// //                     </div>
// //                     <span className="text-sm hidden md:block">Hi, anit cha...</span>
// //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //                     </svg>
// //                 </div>

// //                 {/* Post Property Button */}
// //                 <button className="bg-white text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
// //                     Post Another Property
// //                 </button>
// //             </div>
// //         </header>
// //     );
// // };

// // export default Header;


// import React from 'react';
// import { ChevronDown, User } from 'lucide-react';
// import { signOut } from '../../features/auth/authSlice';
// import { useDispatch } from 'react-redux';

// const Header = () => {
//     const dispatch = useDispatch()
//     return (
//         <header className="bg-red-600 text-white px-4 py-3 flex items-center justify-between shadow-lg">
//             {/* Logo and Brand */}
//             <div className="flex items-center space-x-2">
//                 <div className="text-4xl font-bold tracking-tight">
//                     PROFO
//                 </div>
//             </div>

//             {/* Right Side - User Actions */}
//             <div className="flex items-center space-x-4">
//                 {/* User Profile */}
//                 <div className="flex items-center space-x-2 cursor-pointer hover:bg-red-700 rounded-lg px-3 py-2 transition-colors">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-medium">
//                         <User size={16} />
//                     </div>
//                     <span className="text-sm hidden md:block">Hi, anit cha...</span>
//                     <ChevronDown size={16} />
//                 </div>

//                 {/* Post Property Button */}
//                 <button className="bg-white text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
//                     Post Another Property
//                 </button>
//                 {/* Logout Button */}
//                 <button onClick={() => dispatch(signOut())} className="bg-white text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
//                     Logout
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default Header;


// Header.jsx
import React from 'react';
import { ChevronDown, User } from 'lucide-react';
import { signOut } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetProperties } from '../../features/properties/propertiesSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth)


    const handleLogout = async () => {
        try {
            await dispatch(signOut()).unwrap();
            dispatch(resetProperties())
            // Navigate to signin page after successful logout
            navigate('/signin');
        } catch (error) {
            console.error('Logout error:', error);
            // Even if there's an error, navigate to signin since we're clearing local storage
            navigate('/signin');
        }
    };

    return (
        <header className="bg-[#000] text-white px-4 py-3 flex items-center justify-between shadow-lg">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
                <div className="text-4xl font-bold tracking-tight">
                    PROFO
                </div>
            </div>

            {/* Right Side - User Actions */}
            {/* Right Side - User Actions */}
            <div className="flex items-center space-x-4">
                {/* User Profile */}
                <div className="flex items-center space-x-3 cursor-pointer hover:bg-red-700 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md">
                    {/* Circular Profile Image Container */}
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg hover:border-red-200 transition-all duration-200 hover:scale-105">
                            {user?.logo ? (
                                <img
                                    src={user.logo}
                                    alt="Profile"
                                    className="w-full h-full object-cover object-center"
                                />
                            ) : (
                                // Fallback when no image
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <User size={20} className="text-white" />
                                </div>
                            )}
                        </div>
                        {/* Online Status Indicator (optional) */}
                        {/* <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div> */}
                    </div>

                    {/* User Info */}
                    <div className="hidden md:block">
                        <span className="text-sm font-medium text-white truncate max-w-24">
                            Hi! {user?.name?.split(' ')[0]}
                        </span>
                    </div>

                    {/* Dropdown Arrow */}
                    {/* <ChevronDown size={16} className="text-white opacity-75 hover:opacity-100 transition-opacity" /> */}
                </div>

                {/* Post Property Button */}
                <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                    Post Another Property
                </button>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;