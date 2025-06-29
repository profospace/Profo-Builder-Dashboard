// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { base_url } from '../utils/baseurl';


// // Import icons from a common icon library
// import {
//   User,
//   Lock,
//   AlertCircle,
//   CheckCircle,
//   X,
//   Loader as LoaderIcon
// } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../features/auth/authSlice';

// const SignIn = () => {
//   // State management
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState({ show: false, message: '', type: '' });
//   const navigate = useNavigate();
//   const dispatch = useDispatch()
//   // Function to handle notifications
//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: '', type: '' });
//     }, 5000); // Hide notification after 5 seconds
//   };

//   // Form validation
//   const validateForm = () => {
//     if (!username.trim()) {
//       showNotification('Username is required', 'error');
//       return false;
//     }
//     if (!password.trim()) {
//       showNotification('Password is required', 'error');
//       return false;
//     }
//     return true;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Validate form before proceeding
//     if (!validateForm()) return;

//     setLoading(true);
//     setError('');

//     try {

//       const authPromise = dispatch(login({ username, password })).unwrap()

//       authPromise.then(async () => {
//         // Perform post-login actions
//         navigate('/properties');
//       })

     
//     } catch (error) {
//       // Handle login errors
//       console.error('Login error:', error);

//       if (error.response) {
//         // Server responded with an error
//         setError(error.response.data.message || 'Login failed');
//         showNotification(error.response.data.message || 'Login failed', 'error');
//       } else if (error.request) {
//         // Request was made but no response
//         setError('Network error. Please check your connection.');
//         showNotification('Network error. Please check your connection.', 'error');
//       } else {
//         // Something else caused the error
//         setError('An unexpected error occurred');
//         showNotification('An unexpected error occurred', 'error');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };


//   const { user } = useSelector((state) => state.auth)
//   // console.log("state", user)

//   useEffect(
//     () => {
//       if (user) {
//         navigate('/')
//       }
//     }, []
//   )

//   // Notification component
//   const Notification = () => {
//     if (!notification.show) return null;

//     const bgColor = notification.type === 'success' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
//     const textColor = notification.type === 'success' ? 'text-green-700' : 'text-red-700';
//     const Icon = notification.type === 'success' ? CheckCircle : AlertCircle;

//     return (
//       <div className={`fixed top-4 inset-x-0 max-w-sm mx-auto p-4 rounded-lg border-l-4 ${bgColor} shadow-md z-50 animate-fade-in-down md:top-6 md:right-6 md:mx-0 md:inset-x-auto md:right-6`}>
//         <div className="flex items-start">
//           <div className={`flex-shrink-0 ${textColor}`}>
//             <Icon size={20} />
//           </div>
//           <div className="ml-3 flex-1">
//             <p className={`text-sm font-medium ${textColor}`}>{notification.message}</p>
//           </div>
//           <button
//             onClick={() => setNotification({ ...notification, show: false })}
//             className={`ml-4 flex-shrink-0 ${textColor} focus:outline-none`}
//           >
//             <X size={16} />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Loader component
//   const Loader = () => {
//     if (!loading) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white p-5 rounded-lg flex flex-col items-center mx-auto max-w-xs">
//           <LoaderIcon className="animate-spin text-primary h-10 w-10 mb-3" />
//           <p className="text-gray-700">Signing in...</p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Notification />
//       <Loader />

//       <div className="min-h-[100vh] flex flex-col md:flex-row rounded-sm border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark overflow-auto">
//         {/* Left side - Illustration */}
//         <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-primary-light justify-center items-center p-8">
//           <div className="max-w-md text-center">
//             <h1 className="text-4xl font-bold text-white mb-6">ProfoIQ Builder Portal</h1>
//             <p className="text-white/90 mb-8 text-lg">Manage your projects, buildings, and properties in one place</p>

//             {/* SVG illustration */}
//             <div className="w-full max-w-sm mx-auto">
//               <svg
//                 className="w-full h-auto"
//                 viewBox="0 0 350 350"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M33.5825 294.844L30.5069 282.723C25.0538 280.414 19.4747 278.414 13.7961 276.732L13.4079 282.365L11.8335 276.159C4.79107 274.148 0 273.263 0 273.263C0 273.263 6.46998 297.853 20.0448 316.653L35.8606 319.429L23.5737 321.2C25.2813 323.253 27.1164 325.196 29.0681 327.019C48.8132 345.333 70.8061 353.736 78.1898 345.787C85.5736 337.838 75.5526 316.547 55.8074 298.235C49.6862 292.557 41.9968 288.001 34.2994 284.415L33.5825 294.844Z"
//                   fill="#ffffff"
//                 />
//                 <path
//                   d="M62.8332 281.679L66.4705 269.714C62.9973 264.921 59.2562 260.327 55.2652 255.954L52.019 260.576L53.8812 254.45C48.8923 249.092 45.2489 245.86 45.2489 245.86C45.2489 245.86 38.0686 270.253 39.9627 293.358L52.0658 303.903L40.6299 299.072C41.0301 301.712 41.596 304.324 42.3243 306.893C49.7535 332.77 64.2336 351.323 74.6663 348.332C85.0989 345.341 87.534 321.939 80.1048 296.063C77.8019 288.041 73.5758 280.169 68.8419 273.123L62.8332 281.679Z"
//                   fill="#ffffff"
//                 />
//                 <path
//                   d="M243.681 82.9153H241.762V30.3972C241.762 26.4054 240.975 22.4527 239.447 18.7647C237.918 15.0768 235.677 11.7258 232.853 8.90314C230.028 6.0805 226.674 3.84145 222.984 2.31385C219.293 0.786245 215.337 0 211.343 0H99.99C91.9222 0 84.1848 3.20256 78.48 8.90314C72.7752 14.6037 69.5703 22.3354 69.5703 30.3972V318.52C69.5703 322.512 70.3571 326.465 71.8859 330.153C73.4146 333.841 75.6553 337.192 78.48 340.015C81.3048 342.837 84.6582 345.076 88.3489 346.604C92.0396 348.131 95.9952 348.918 99.99 348.918H211.343C219.41 348.918 227.148 345.715 232.852 340.014C238.557 334.314 241.762 326.582 241.762 318.52V120.299H243.68L243.681 82.9153Z"
//                   fill="#ffffff"
//                   fillOpacity="0.5"
//                 />
//                 <path
//                   d="M212.567 7.9054H198.033C198.701 9.54305 198.957 11.3199 198.776 13.0793C198.595 14.8387 197.984 16.5267 196.997 17.9946C196.01 19.4625 194.676 20.6652 193.114 21.4967C191.552 22.3283 189.809 22.7632 188.039 22.7632H124.247C122.477 22.7631 120.734 22.3281 119.172 21.4964C117.61 20.6648 116.277 19.462 115.289 17.9942C114.302 16.5263 113.691 14.8384 113.511 13.079C113.33 11.3197 113.585 9.54298 114.254 7.9054H100.678C94.6531 7.9054 88.8749 10.297 84.6146 14.5542C80.3543 18.8113 77.9609 24.5852 77.9609 30.6057V318.31C77.9609 324.331 80.3543 330.105 84.6146 334.362C88.8749 338.619 94.6531 341.011 100.678 341.011H212.567C218.592 341.011 224.37 338.619 228.63 334.362C232.891 330.105 235.284 324.331 235.284 318.31V30.6053C235.284 24.5848 232.891 18.811 228.63 14.554C224.37 10.297 218.592 7.9054 212.567 7.9054Z"
//                   fill="white"
//                 />
//                 <path
//                   d="M142.368 122.512C142.368 120.501 142.898 118.526 143.904 116.784C144.911 115.043 146.359 113.597 148.102 112.592C146.36 111.587 144.383 111.057 142.371 111.057C140.358 111.057 138.381 111.586 136.639 112.591C134.896 113.596 133.448 115.042 132.442 116.784C131.436 118.525 130.906 120.501 130.906 122.512C130.906 124.522 131.436 126.498 132.442 128.239C133.448 129.981 134.896 131.427 136.639 132.432C138.381 133.437 140.358 133.966 142.371 133.966C144.383 133.966 146.36 133.436 148.102 132.431C146.359 131.426 144.911 129.981 143.905 128.24C142.898 126.499 142.368 124.523 142.368 122.512Z"
//                   fill="#CCCCCC"
//                 />
//                 <path
//                   d="M156.779 122.512C156.778 120.501 157.308 118.526 158.315 116.784C159.321 115.043 160.769 113.597 162.513 112.592C160.77 111.587 158.793 111.057 156.781 111.057C154.769 111.057 152.792 111.586 151.049 112.591C149.306 113.596 147.859 115.042 146.852 116.784C145.846 118.525 145.316 120.501 145.316 122.512C145.316 124.522 145.846 126.498 146.852 128.239C147.859 129.981 149.306 131.427 151.049 132.432C152.792 133.437 154.769 133.966 156.781 133.966C158.793 133.966 160.77 133.436 162.513 132.431C160.769 131.426 159.322 129.981 158.315 128.24C157.308 126.499 156.779 124.523 156.779 122.512Z"
//                   fill="#CCCCCC"
//                 />
//                 <path
//                   d="M170.862 133.966C177.192 133.966 182.325 128.838 182.325 122.512C182.325 116.186 177.192 111.057 170.862 111.057C164.531 111.057 159.398 116.186 159.398 122.512C159.398 128.838 164.531 133.966 170.862 133.966Z"
//                   fill="#3056D3"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Right side - Login form */}
//         <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex items-center justify-center min-h-screen">
//           <div className="w-full max-w-md mx-auto my-auto py-4 sm:py-6">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h1>
//               <p className="mt-2 text-gray-600 dark:text-gray-400">
//                 Welcome back! Please enter your credentials
//               </p>
//             </div>

//             <form onSubmit={handleLogin} className="space-y-6 w-full">
//               {/* Username field */}
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
//                   Username
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User size={20} className="text-gray-400" />
//                   </div>
//                   <input
//                     id="username"
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Enter your username"
//                     className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   />
//                 </div>
//               </div>

//               {/* Password field */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock size={20} className="text-gray-400" />
//                   </div>
//                   <input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   />
//                 </div>
//               </div>

//               {/* Error message */}
//               {error && (
//                 <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
//                   <div className="flex">
//                     <div className="flex-shrink-0">
//                       <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
//                     </div>
//                     <div className="ml-3">
//                       <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Submit button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <LoaderIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
//                     Signing in...
//                   </span>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>

//               {/* Forgot password link */}
//               <div className="text-center mt-4">
//                 <a href="#" className="text-sm text-primary hover:text-primary-dark">
//                   Forgot your password?
//                 </a>
//               </div>
//             </form>

//             {/* Mobile view logo */}
//             <div className="mt-8 flex justify-center md:hidden">
//               <div className="text-center">
//                 <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">ProfoIQ Builder Portal</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Manage your projects seamlessly</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Add this to your global styles or use an inline style tag */}
//       <style jsx>{`
//         @media (max-height: 640px) {
//           .min-h-screen {
//             min-height: 100%;
//             height: auto;
//           }
//         }
        
//         /* Animation for notification */
//         @keyframes fadeInDown {
//           from {
//             opacity: 0;
//             transform: translate3d(0, -20px, 0);
//           }
//           to {
//             opacity: 1;
//             transform: translate3d(0, 0, 0);
//           }
//         }
        
//         .animate-fade-in-down {
//           animation: fadeInDown 0.5s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default SignIn;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../utils/baseurl';

// Import icons from a common icon library
import {
  User,
  Lock,
  AlertCircle,
  CheckCircle,
  X,
  Loader as LoaderIcon
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

const SignIn = () => {
  // State management
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  // Function to handle notifications
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000); // Hide notification after 5 seconds
  };

  // Form validation
  const validateForm = () => {
    if (!username.trim()) {
      showNotification('Username is required', 'error');
      return false;
    }
    if (!password.trim()) {
      showNotification('Password is required', 'error');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Dispatch login and wait for the result
      const result = await dispatch(login({ username, password })).unwrap();

      // If login is successful, navigate to properties
      showNotification('Login successful!', 'success');
      navigate('/properties');

    } catch (error) {
      // Handle login errors
      console.error('Login error:', error);

      // The error structure from your Redux slice
      const errorMessage = error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        'Login failed';

      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Notification component
  const Notification = () => {
    if (!notification.show) return null;

    const bgColor = notification.type === 'success' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
    const textColor = notification.type === 'success' ? 'text-green-700' : 'text-red-700';
    const Icon = notification.type === 'success' ? CheckCircle : AlertCircle;

    return (
      <div className={`fixed top-4 inset-x-0 max-w-sm mx-auto p-4 rounded-lg border-l-4 ${bgColor} shadow-md z-50 animate-fade-in-down md:top-6 md:right-6 md:mx-0 md:inset-x-auto md:right-6`}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${textColor}`}>
            <Icon size={20} />
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${textColor}`}>{notification.message}</p>
          </div>
          <button
            onClick={() => setNotification({ ...notification, show: false })}
            className={`ml-4 flex-shrink-0 ${textColor} focus:outline-none`}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  };

  // Loader component
  const Loader = () => {
    if (!loading && !isLoading) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-lg flex flex-col items-center mx-auto max-w-xs">
          <LoaderIcon className="animate-spin text-primary h-10 w-10 mb-3" />
          <p className="text-gray-700">Signing in...</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Notification />
      <Loader />

      <div className="min-h-[100vh] flex flex-col md:flex-row rounded-sm border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark overflow-auto">
        {/* Left side - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-primary-light justify-center items-center p-8">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold text-white mb-6">ProfoIQ Builder Portal</h1>
            <p className="text-white/90 mb-8 text-lg">Manage your projects, buildings, and properties in one place</p>

            {/* SVG illustration */}
            <div className="w-full max-w-sm mx-auto">
              <svg
                className="w-full h-auto"
                viewBox="0 0 350 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.5825 294.844L30.5069 282.723C25.0538 280.414 19.4747 278.414 13.7961 276.732L13.4079 282.365L11.8335 276.159C4.79107 274.148 0 273.263 0 273.263C0 273.263 6.46998 297.853 20.0448 316.653L35.8606 319.429L23.5737 321.2C25.2813 323.253 27.1164 325.196 29.0681 327.019C48.8132 345.333 70.8061 353.736 78.1898 345.787C85.5736 337.838 75.5526 316.547 55.8074 298.235C49.6862 292.557 41.9968 288.001 34.2994 284.415L33.5825 294.844Z"
                  fill="#ffffff"
                />
                <path
                  d="M62.8332 281.679L66.4705 269.714C62.9973 264.921 59.2562 260.327 55.2652 255.954L52.019 260.576L53.8812 254.45C48.8923 249.092 45.2489 245.86 45.2489 245.86C45.2489 245.86 38.0686 270.253 39.9627 293.358L52.0658 303.903L40.6299 299.072C41.0301 301.712 41.596 304.324 42.3243 306.893C49.7535 332.77 64.2336 351.323 74.6663 348.332C85.0989 345.341 87.534 321.939 80.1048 296.063C77.8019 288.041 73.5758 280.169 68.8419 273.123L62.8332 281.679Z"
                  fill="#ffffff"
                />
                <path
                  d="M243.681 82.9153H241.762V30.3972C241.762 26.4054 240.975 22.4527 239.447 18.7647C237.918 15.0768 235.677 11.7258 232.853 8.90314C230.028 6.0805 226.674 3.84145 222.984 2.31385C219.293 0.786245 215.337 0 211.343 0H99.99C91.9222 0 84.1848 3.20256 78.48 8.90314C72.7752 14.6037 69.5703 22.3354 69.5703 30.3972V318.52C69.5703 322.512 70.3571 326.465 71.8859 330.153C73.4146 333.841 75.6553 337.192 78.48 340.015C81.3048 342.837 84.6582 345.076 88.3489 346.604C92.0396 348.131 95.9952 348.918 99.99 348.918H211.343C219.41 348.918 227.148 345.715 232.852 340.014C238.557 334.314 241.762 326.582 241.762 318.52V120.299H243.68L243.681 82.9153Z"
                  fill="#ffffff"
                  fillOpacity="0.5"
                />
                <path
                  d="M212.567 7.9054H198.033C198.701 9.54305 198.957 11.3199 198.776 13.0793C198.595 14.8387 197.984 16.5267 196.997 17.9946C196.01 19.4625 194.676 20.6652 193.114 21.4967C191.552 22.3283 189.809 22.7632 188.039 22.7632H124.247C122.477 22.7631 120.734 22.3281 119.172 21.4964C117.61 20.6648 116.277 19.462 115.289 17.9942C114.302 16.5263 113.691 14.8384 113.511 13.079C113.33 11.3197 113.585 9.54298 114.254 7.9054H100.678C94.6531 7.9054 88.8749 10.297 84.6146 14.5542C80.3543 18.8113 77.9609 24.5852 77.9609 30.6057V318.31C77.9609 324.331 80.3543 330.105 84.6146 334.362C88.8749 338.619 94.6531 341.011 100.678 341.011H212.567C218.592 341.011 224.37 338.619 228.63 334.362C232.891 330.105 235.284 324.331 235.284 318.31V30.6053C235.284 24.5848 232.891 18.811 228.63 14.554C224.37 10.297 218.592 7.9054 212.567 7.9054Z"
                  fill="white"
                />
                <path
                  d="M142.368 122.512C142.368 120.501 142.898 118.526 143.904 116.784C144.911 115.043 146.359 113.597 148.102 112.592C146.36 111.587 144.383 111.057 142.371 111.057C140.358 111.057 138.381 111.586 136.639 112.591C134.896 113.596 133.448 115.042 132.442 116.784C131.436 118.525 130.906 120.501 130.906 122.512C130.906 124.522 131.436 126.498 132.442 128.239C133.448 129.981 134.896 131.427 136.639 132.432C138.381 133.437 140.358 133.966 142.371 133.966C144.383 133.966 146.36 133.436 148.102 132.431C146.359 131.426 144.911 129.981 143.905 128.24C142.898 126.499 142.368 124.523 142.368 122.512Z"
                  fill="#CCCCCC"
                />
                <path
                  d="M156.779 122.512C156.778 120.501 157.308 118.526 158.315 116.784C159.321 115.043 160.769 113.597 162.513 112.592C160.77 111.587 158.793 111.057 156.781 111.057C154.769 111.057 152.792 111.586 151.049 112.591C149.306 113.596 147.859 115.042 146.852 116.784C145.846 118.525 145.316 120.501 145.316 122.512C145.316 124.522 145.846 126.498 146.852 128.239C147.859 129.981 149.306 131.427 151.049 132.432C152.792 133.437 154.769 133.966 156.781 133.966C158.793 133.966 160.70 133.436 162.513 132.431C160.769 131.426 159.322 129.981 158.315 128.24C157.308 126.499 156.779 124.523 156.779 122.512Z"
                  fill="#CCCCCC"
                />
                <path
                  d="M170.862 133.966C177.192 133.966 182.325 128.838 182.325 122.512C182.325 116.186 177.192 111.057 170.862 111.057C164.531 111.057 159.398 116.186 159.398 122.512C159.398 128.838 164.531 133.966 170.862 133.966Z"
                  fill="#3056D3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md mx-auto my-auto py-4 sm:py-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Welcome back! Please enter your credentials
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 w-full">
              {/* Username field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || isLoading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70"
              >
                {loading || isLoading ? (
                  <span className="flex items-center justify-center">
                    <LoaderIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Forgot password link */}
              <div className="text-center mt-4">
                <a href="#" className="text-sm text-primary hover:text-primary-dark">
                  Forgot your password?
                </a>
              </div>
            </form>

            {/* Mobile view logo */}
            <div className="mt-8 flex justify-center md:hidden">
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">ProfoIQ Builder Portal</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your projects seamlessly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add this to your global styles or use an inline style tag */}
      <style jsx>{`
        @media (max-height: 640px) {
          .min-h-screen {
            min-height: 100%;
            height: auto;
          }
        }
        
        /* Animation for notification */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default SignIn;