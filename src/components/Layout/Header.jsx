// // Header.jsx
// import React from 'react';
// import { ChevronDown, User } from 'lucide-react';
// import { signOut } from '../../features/auth/authSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { resetProperties } from '../../features/properties/propertiesSlice';

// const Header = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { user } = useSelector((state) => state.auth)


//     const handleLogout = async () => {
//         try {
//             await dispatch(signOut()).unwrap();
//             dispatch(resetProperties())
//             // Navigate to signin page after successful logout
//             navigate('/signin');
//         } catch (error) {
//             console.error('Logout error:', error);
//             // Even if there's an error, navigate to signin since we're clearing local storage
//             navigate('/signin');
//         }
//     };

//     return (
//         <header className="bg-[#000] text-white px-4 py-3 flex items-center justify-between shadow-lg">
//             {/* Logo and Brand */}
//             <div className="flex items-center space-x-2">
//                 <div className="text-4xl font-bold tracking-tight">
//                     PROFO
//                 </div>
//             </div>

//             {/* Right Side - User Actions */}
//             {/* Right Side - User Actions */}
//             <div className="flex items-center space-x-4">
//                 {/* User Profile */}
//                 <div className="flex items-center space-x-3 cursor-pointer hover:bg-red-700 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md">
//                     {/* Circular Profile Image Container */}
//                     <div className="relative">
//                         <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg hover:border-red-200 transition-all duration-200 hover:scale-105">
//                             {user?.logo ? (
//                                 <img
//                                     src={user.logo}
//                                     alt="Profile"
//                                     className="w-full h-full object-cover object-center"
//                                 />
//                             ) : (
//                                 // Fallback when no image
//                                 <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//                                     <User size={20} className="text-white" />
//                                 </div>
//                             )}
//                         </div>
//                         {/* Online Status Indicator (optional) */}
//                         {/* <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div> */}
//                     </div>

//                     {/* User Info */}
//                     <div className="hidden md:block">
//                         <span className="text-sm font-medium text-white truncate max-w-24">
//                             Hi! {user?.name?.split(' ')[0]}
//                         </span>
//                     </div>

//                     {/* Dropdown Arrow */}
//                     {/* <ChevronDown size={16} className="text-white opacity-75 hover:opacity-100 transition-opacity" /> */}
//                 </div>

//                 {/* Post Property Button */}
//                 <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
//                     Post Another Property
//                 </button>

//                 {/* Logout Button */}
//                 <button
//                     onClick={handleLogout}
//                     className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
//                 >
//                     Logout
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default Header;

// import React from 'react'

// function Header() {
//     const { name, logo, status } = JSON.parse(localStorage.getItem('user')) 

//   return (
//       <header className="bg-gray-900 rounded-xl flex items-center justify-between px-6 py-4  mt-3 mx-2">
//           <h1 className="text-3xl font-bold text-white flex items-center gap-2">
//               Welcome back <span className="text-[#a1cd00]">{name.split(" ")[0]}</span> <span className="text-2xl">👋</span>
//           </h1>

//           {/* Search + Avatar */}
//           <div className="flex items-center gap-4">
//               <div className="relative">
//                   <input
//                       type="text"
//                       placeholder="Search "
//                       className="pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
//                   />
//                   <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                   >
//                       <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
//                       />
//                   </svg>
//               </div>
//               <div className="relative">
//                   <img
//                       src={logo}
//                       alt="User Avatar"
//                       className="w-10 h-10 rounded-full border border-gray-600"
//                   />
//                   {status === "ACTIVE" ? (
//                       <>
//                           <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#D8F279]">
//                               <span className="absolute inline-flex h-full w-full rounded-full bg-[#D8F279] opacity-75 animate-ping"></span>
//                           </span>
//                       </>
//                   ) : (
//                       <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-400" />
//                   )}
//               </div>
//           </div>
//       </header>
//   )
// }

// export default Header


// import React from 'react'

// function Header() {
//     const { name, logo, status } = JSON.parse(localStorage.getItem('user'))

//     return (
//         //   <header className="bg-gray-900 rounded-xl flex items-center justify-between px-6 py-4  mt-3 mx-2">
//         //       <h1 className="text-3xl font-bold text-white flex items-center gap-2">
//         //           Welcome back <span className="text-[#a1cd00]">{name.split(" ")[0]}</span> <span className="text-2xl">👋</span>
//         //       </h1>

//         //       {/* Search + Avatar */}
//         //       <div className="flex items-center gap-4">
//         //           <div className="relative">
//         //               <input
//         //                   type="text"
//         //                   placeholder="Search "
//         //                   className="pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
//         //               />
//         //               <svg
//         //                   xmlns="http://www.w3.org/2000/svg"
//         //                   className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
//         //                   fill="none"
//         //                   viewBox="0 0 24 24"
//         //                   stroke="currentColor"
//         //               >
//         //                   <path
//         //                       strokeLinecap="round"
//         //                       strokeLinejoin="round"
//         //                       strokeWidth={2}
//         //                       d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
//         //                   />
//         //               </svg>
//         //           </div>
//         //           <div className="relative">
//         //               <img
//         //                   src={logo}
//         //                   alt="User Avatar"
//         //                   className="w-10 h-10 rounded-full border border-gray-600"
//         //               />
//         //               {status === "ACTIVE" ? (
//         //                   <>
//         //                       <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#D8F279]">
//         //                           <span className="absolute inline-flex h-full w-full rounded-full bg-[#D8F279] opacity-75 animate-ping"></span>
//         //                       </span>
//         //                   </>
//         //               ) : (
//         //                   <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-400" />
//         //               )}
//         //           </div>
//         //       </div>
//         //   </header>

//         <header className="bg-white shadow rounded-xl flex items-center justify-between px-6 py-4 mt-3 mx-2">
//             <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//                 Welcome back <span className="text-blue-600">{name.split(" ")[0]}</span> <span className="text-2xl">👋</span>
//             </h1>

//             <div className="flex items-center gap-4">
//                 <div className="relative">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                 </div>
//                 <div className="relative">
//                     <img
//                         src={logo}
//                         alt="User Avatar"
//                         className="w-10 h-10 rounded-full border border-gray-300"
//                     />
//                     {status === "ACTIVE" ? (
//                         <>
//                             <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400">
//                                 <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
//                             </span>
//                         </>
//                     ) : (
//                         <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-400" />
//                     )}
//                 </div>
//             </div>
//         </header>

//     )
// }

// export default Header


// import React from 'react'

// function Header() {
//     const { name, logo, status } = JSON.parse(localStorage.getItem('user'))

//     return (
//         <header className="flex items-center justify-between px-6 py-4 mt-3 mx-2">
//             <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//                 Welcome back <span className="text-blue-600">{name.split(" ")[0]}</span> <span className="text-2xl">👋</span>
//             </h1>

//             <div className="flex items-center gap-4">
//                 <div className="relative">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                 </div>
//                 <div className="relative">
//                     <img
//                         src={logo}
//                         alt="User Avatar"
//                         className="w-10 h-10 rounded-full border border-gray-300"
//                     />
//                     {status === "ACTIVE" ? (
//                         <>
//                             <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400">
//                                 <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
//                             </span>
//                         </>
//                     ) : (
//                         <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-400" />
//                     )}
//                 </div>
//             </div>
//         </header>

//     )
// }

// export default Header

// import React from 'react'

// function Header() {
//     const { name, logo, status } = JSON.parse(localStorage.getItem('user'))

//     return (
//         <header className="flex items-center justify-between px-6 py-4 mt-3 mx-0 md:mx-2">
//             {/* Welcome Text */}
//             <h1 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
//                 Welcome back <span className="text-blue-600">{name.split(" ")[0]}</span> <span className="text-xl md:text-2xl">👋</span>
//             </h1>

//             <div className="flex items-center gap-4">
//                 {/* Search Box - Hidden on small screens */}
//                 <div className="relative hidden md:block">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                 </div>

//                 {/* User Avatar */}
//                 <div className="relative">
//                     <img
//                         src={logo}
//                         alt="User Avatar"
//                         className="w-10 h-10 rounded-full border border-gray-300"
//                     />
//                     {status === "ACTIVE" ? (
//                         <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400">
//                             <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
//                         </span>
//                     ) : (
//                         <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-400" />
//                     )}
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Header


// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from '../../features/auth/authSlice';

// function Header() {
//     // const { name, logo, status } = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
//     const user = localStorage.getItem('user');
//     const { name, logo, status } = user ? JSON.parse(user) : {};

//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch()

//     const handleNavigate = (path) => {
//         navigate(path);
//         setDropdownOpen(false); // Close dropdown after navigation
//     };

//     const handleLogout = () => {
//         // ✅ Manually clear localStorage
//         localStorage.removeItem('user');

//         // ✅ Close dropdown
//         setDropdownOpen(false);

//         // ✅ Force page reload to /signin (this will reset all Redux state)
//         window.location.href = "/signin";
//     };
//     return (
//         <header className="flex items-center justify-between px-6 py-4 mt-3 mx-0 md:mx-2">
//             {/* Welcome Text */}
//             <h1 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
//                 Welcome back <span className="text-blue-600">{name?.split(" ")[0]}</span> <span className="text-xl md:text-2xl">👋</span>
//             </h1>

//             <div className="flex items-center gap-4">
//                 {/* Search Box - Hidden on small screens */}
//                 <div className="relative hidden md:block">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                 </div>

//                 {/* User Avatar with Dropdown */}
//                 <div className="relative">
//                     <img
//                         src={logo}
//                         alt="User Avatar"
//                         className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
//                         onClick={() => setDropdownOpen(!dropdownOpen)}
//                     />
//                     {status === "ACTIVE" ? (
//                         <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400">
//                             <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
//                         </span>
//                     ) : (
//                         <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-400" />
//                     )}

//                     {/* Dropdown Menu */}
//                     {dropdownOpen && (
//                         <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-xl overflow-hidden z-50 border border-gray-200 animate-fadeIn">
//                             <div className="py-1">
//                                 <button
//                                     className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
//                                     onClick={() => handleNavigate('/settings')}
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-5 w-5 mr-2 text-gray-400"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                     </svg>
//                                     Settings
//                                 </button>
//                                 <button
//                                     className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
//                                     onClick={handleLogout}
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-5 w-5 mr-2 text-gray-400"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
//                                     </svg>
//                                     Logout
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Header;


// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { signOut } from '../../features/auth/authSlice';

// function Header() {
//     const user = localStorage.getItem('user');
//     const { name, logo, status } = user ? JSON.parse(user) : {};

//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleNavigate = (path) => {
//         navigate(path);
//         setDropdownOpen(false);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         setDropdownOpen(false);
//         window.location.href = "/signin";
//     };

//     const userInitial = name ? name.charAt(0).toUpperCase() : '?';

//     return (
//         <header className="flex items-center justify-between px-6 py-4 mt-3 mx-0 md:mx-2">
//             {/* Welcome Text */}
//             <h1 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
//                 Welcome back <span className="text-blue-600">{name?.split(" ")[0]}</span> <span className="text-xl md:text-2xl">👋</span>
//             </h1>

//             <div className="flex items-center gap-4">
//                 {/* Search Box - Hidden on small screens */}
//                 {/* <div className="relative hidden md:block">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                 </div> */}

//                 {/* User Avatar with Dropdown */}
//                 <div className="relative">
//                     {logo ? (
//                         <img
//                             src={logo}
//                             alt="User Avatar"
//                             className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer object-cover"
//                             onClick={() => setDropdownOpen(!dropdownOpen)}
//                         />
//                     ) : (
//                         <div
//                             onClick={() => setDropdownOpen(!dropdownOpen)}
//                             className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-full cursor-pointer border border-gray-300 select-none"
//                         >
//                             {userInitial}
//                         </div>
//                     )}

//                     {status === "ACTIVE" ? (
//                         <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400">
//                             <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
//                         </span>
//                     ) : (
//                         <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-400" />
//                     )}

//                     {/* Dropdown Menu */}
//                     {dropdownOpen && (
//                         <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-xl overflow-hidden z-50 border border-gray-200 animate-fadeIn">
//                             <div className="py-1">
//                                 <button
//                                     className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
//                                     onClick={() => handleNavigate('/settings')}
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-5 w-5 mr-2 text-gray-400"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                     </svg>
//                                     Settings
//                                 </button>
//                                 <button
//                                     className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
//                                     onClick={handleLogout}
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-5 w-5 mr-2 text-gray-400"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
//                                     </svg>
//                                     Logout
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// }

// export default Header;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../features/auth/authSlice';

function Header() {
    const user = localStorage.getItem('user');
    const { name, logo, status } = user ? JSON.parse(user) : {};

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (path) => {
        navigate(path);
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setDropdownOpen(false);
        window.location.href = "/signin";
    };

    const userInitial = name ? name.charAt(0).toUpperCase() : '?';

    return (
        <header className="flex items-center justify-between px-6 py-4 mt-3 mx-0 md:mx-2">
            {/* Left Section with Back Button + Welcome */}
            <div className="flex items-center gap-3">
                {/* Back Button (visible only on md and above) */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition-all"
                    title="Go Back"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-700"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Welcome Text */}
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                    Welcome back <span className="text-blue-600">{name?.split(" ")[0]}</span>{' '}
                    <span className="text-xl md:text-2xl">👋</span>
                </h1>
            </div>

            {/* Right Section (Avatar + Dropdown) */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    {logo ? (
                        <img
                            src={logo}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer object-cover"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />
                    ) : (
                        <div
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-full cursor-pointer border border-gray-300 select-none"
                        >
                            {userInitial}
                        </div>
                    )}

                    {status === "ACTIVE" ? (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                        </span>
                    ) : (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-400" />
                    )}

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-xl overflow-hidden z-50 border border-gray-200 animate-fadeIn">
                            <div className="py-1">
                                <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                    onClick={() => handleNavigate('/settings')}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Settings
                                </button>
                                <button
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                                    onClick={handleLogout}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;

