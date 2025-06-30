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


import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';


const DashboardLayout= ({ children }) => {
    const location = useLocation();

    // Extract the current route from the pathname
    const getCurrentRoute = () => {
        const path = location.pathname.replace('/', '');
        return path || 'properties';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <div className="flex">
                {/* Sidebar */}
                <Sidebar activeRoute={getCurrentRoute()} />

                {/* Content Area */}
                <main className="flex-1  overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;