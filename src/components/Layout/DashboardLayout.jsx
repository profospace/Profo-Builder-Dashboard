// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Header from './Header';
// import Sidebar from './Sidebar';

// const DashboardLayout = ({ children }) => {
//     const location = useLocation();

//     // Extract the current route from the pathname
//     const getCurrentRoute = () => {
//         const path = location.pathname.replace('/', '');
//         return path || 'properties';
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <Header />

//             {/* Main Content Area */}
//             <div className="flex">
//                 {/* Sidebar */}
//                 <Sidebar activeRoute={getCurrentRoute()} />

//                 {/* Content Area */}
//                 <main className="flex-1 lg:ml-0 p-4 lg:p-6 overflow-auto">
//                     <div className="max-w-7xl mx-auto">
//                         {children}
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;


// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Header from './Header';
// import Sidebar from './Sidebar';


// const DashboardLayout= ({ children }) => {
//     const location = useLocation();

//     // Extract the current route from the pathname
//     const getCurrentRoute = () => {
//         const path = location.pathname.replace('/', '');
//         return path || 'properties';
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <Header />

//             {/* Main Content Area */}
//             <div className="flex">
//                 {/* Sidebar */}
//                 <Sidebar activeRoute={getCurrentRoute()} />

//                 {/* Content Area */}
//                 <main className="flex-1  overflow-auto">
//                     <div className="max-w-7xl mx-auto">
//                         {children}
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;


// import React from 'react'
// import FilterChipsUI from '../../pages/FilterChipsUI'

// function DashboardLayout({ children }) {
//     return (
//         <div className='flex bg-[#F7F8F6]  px-3'>
//             <div className='flex items-center h-screen'>
//                 <FilterChipsUI /> {/* sidebar */}
//             </div>

//             <header className="flex items-start w-full bg-[#fff] mx-6 my-4 shadow-sm">
//                 {/* Greeting */}
//                 <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
//                     Welcome back Taylor <span className="text-2xl">👋</span>
//                 </h1>

//                 {/* Search and Avatar */}
//                 <div className="flex items-center gap-4">
//                     <div className="relative">
//                         <input
//                             type="text"
//                             placeholder="Search courses"
//                             className="pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
//                         </svg>
//                     </div>

//                     {/* Avatar */}
//                     <img
//                         src="https://i.pravatar.cc/40?img=12"
//                         alt="User Avatar"
//                         className="w-10 h-10 rounded-full border border-gray-300"
//                     />
//                 </div>

//             </header>
//                 <div className=' '>
//                     {children}
//                 </div>
//         </div>
//     )
// }

// export default DashboardLayout

// import React from "react";
// import Sidebar from './Sidebar'
// import Header from './Header'

// function DashboardLayout({ children }) {
//     return (
//         <div className="flex h-screen bg-[#F7F8F6]">
//             {/* Sidebar */}
//             <aside className=" text-white flex flex-col justify-center mx-2">
//                 <Sidebar /> {/* Sidebar nav items */}
//             </aside>

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col overflow-hidden">
//                 {/* Header */}
//                 <Header />

//                 {/* Content Area */}
//                 {/* <main className="flex-1 overflow-y-auto p-6 overflow-x-hidden">
//                     {children}
//                 </main> */}


//                 <main className="flex-1  overflow-auto py-1 px-2">
//                     <div className="max-w-7xl mx-auto">
//                     {children}
//                     </div>
//                 </main>


//             </div>

//         </div>
//     );
// }

// export default DashboardLayout;



import React from "react";
import Sidebar from './Sidebar'
import Header from './Header'

function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-[#F7F8F6]">
            {/* Sidebar */}
            <aside className=" text-white flex flex-col justify-center">
                <Sidebar /> {/* Sidebar nav items */}
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />

                {/* Content Area */}
                {/* <main className="flex-1 overflow-y-auto p-6 overflow-x-hidden">
                    {children}
                </main> */}


                <main className="overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>


            </div>

        </div>
    );
}

export default DashboardLayout;
