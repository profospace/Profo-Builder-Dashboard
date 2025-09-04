// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { login } from '../features/auth/authSlice';
// // import {
// //   User,
// //   Lock,
// //   AlertCircle,
// //   CheckCircle,
// //   X,
// //   Loader,
// //   Building2,
// //   Home,
// //   Key,
// //   TrendingUp,
// //   Shield,
// //   Star
// // } from 'lucide-react';

// // const SignIn = () => {
// //   // State management - keeping your original state structure
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [notification, setNotification] = useState({
// //     show: false,
// //     message: '',
// //     type: ''
// //   });

// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   // Your original Redux selector
// //   const { user, isLoading, isError, message } = useSelector((state) => state.auth);

// //   // Your original notification function
// //   const showNotification = (message, type) => {
// //     setNotification({ show: true, message, type });
// //     setTimeout(() => {
// //       setNotification({ show: false, message: '', type: '' });
// //     }, 5000);
// //   };

// //   // Your original form validation
// //   const validateForm = () => {
// //     if (!username.trim()) {
// //       showNotification('Username is required', 'error');
// //       return false;
// //     }
// //     if (!password.trim()) {
// //       showNotification('Password is required', 'error');
// //       return false;
// //     }
// //     return true;
// //   };

// //   // Your original login handler with Redux dispatch
// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     // Validate form before proceeding
// //     if (!validateForm()) return;

// //     setLoading(true);
// //     setError('');

// //     try {
// //       // Dispatch login and wait for the result
// //       const result = await dispatch(login({ username, password })).unwrap();

// //       // If login is successful, navigate to properties
// //       showNotification('Login successful!', 'success');
// //       navigate('/properties');

// //     } catch (error) {
// //       // Handle login errors
// //       console.error('Login error:', error);

// //       // The error structure from your Redux slice
// //       const errorMessage = error?.response?.data?.error ||
// //         error?.response?.data?.message ||
// //         error?.message ||
// //         'Login failed';

// //       setError(errorMessage);
// //       showNotification(errorMessage, 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Your original redirect logic
// //   useEffect(() => {
// //     if (user) {
// //       navigate('/');
// //     }
// //   }, [user, navigate]);

// //   // Enhanced Notification Component
// //   const Notification = () => {
// //     if (!notification.show) return null;

// //     const isSuccess = notification.type === 'success';
// //     const bgColor = isSuccess ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200';
// //     const textColor = isSuccess ? 'text-emerald-800' : 'text-red-800';
// //     const iconColor = isSuccess ? 'text-emerald-600' : 'text-red-600';
// //     const Icon = isSuccess ? CheckCircle : AlertCircle;

// //     return (
// //       <div className={`fixed top-6 right-6 max-w-sm p-4 rounded-xl border ${bgColor} shadow-lg z-50 transform transition-all duration-300 animate-slide-in`}>
// //         <div className="flex items-start space-x-3">
// //           <Icon size={20} className={iconColor} />
// //           <div className="flex-1">
// //             <p className={`text-sm font-medium ${textColor}`}>
// //               {notification.message}
// //             </p>
// //           </div>
// //           <button
// //             onClick={() => setNotification({ ...notification, show: false })}
// //             className={`${textColor} hover:opacity-70 transition-opacity`}
// //           >
// //             <X size={16} />
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Enhanced Loading Overlay
// //   const LoadingOverlay = () => {
// //     if (!loading && !isLoading) return null;

// //     return (
// //       <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
// //         <div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center space-y-4 mx-4">
// //           <Loader className="animate-spin text-blue-600 h-8 w-8" />
// //           <p className="text-gray-700 font-medium">Signing you in...</p>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <Notification />
// //       <LoadingOverlay />

// //       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
// //         <div className="w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">

// //           {/* Main Container */}
// //           <div className="flex flex-col lg:flex-row min-h-[600px]">

// //             {/* Left Side - Branding & Info */}
// //             <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">

// //               {/* Background Pattern */}
// //               <div className="absolute inset-0 opacity-10">
// //                 <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
// //                 <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300 rounded-full blur-xl"></div>
// //                 <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300 rounded-full blur-xl"></div>
// //               </div>

// //               <div className="relative z-10 text-center lg:text-left">

// //                 {/* Logo & Company Name */}
// //                 <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
// //                   <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
// //                     <Home className="w-8 h-8 text-white" />
// //                   </div>
// //                   <div>
// //                     <h1 className="text-3xl lg:text-4xl font-bold text-white">PROFO</h1>
// //                     <p className="text-blue-100 text-sm font-medium">Real Estate Platform</p>
// //                   </div>
// //                 </div>

// //                 {/* Main Headline */}
// //                 <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
// //                   Your Gateway to Premium Real Estate
// //                 </h2>
// //                 <p className="text-blue-100 text-lg mb-8 leading-relaxed">
// //                   Access exclusive properties, market insights, and professional tools designed for real estate success.
// //                 </p>

// //                 {/* Feature Icons - Hidden on mobile to save space */}
// //                 <div className="hidden md:grid grid-cols-2 gap-4 mb-8">
// //                   <div className="flex items-center space-x-3 text-white">
// //                     <div className="bg-white/20 p-2 rounded-lg">
// //                       <Building2 className="w-5 h-5" />
// //                     </div>
// //                     <span className="text-sm font-medium">Premium Properties</span>
// //                   </div>
// //                   <div className="flex items-center space-x-3 text-white">
// //                     <div className="bg-white/20 p-2 rounded-lg">
// //                       <TrendingUp className="w-5 h-5" />
// //                     </div>
// //                     <span className="text-sm font-medium">Market Analytics</span>
// //                   </div>
// //                   <div className="flex items-center space-x-3 text-white">
// //                     <div className="bg-white/20 p-2 rounded-lg">
// //                       <Shield className="w-5 h-5" />
// //                     </div>
// //                     <span className="text-sm font-medium">Secure Platform</span>
// //                   </div>
// //                   <div className="flex items-center space-x-3 text-white">
// //                     <div className="bg-white/20 p-2 rounded-lg">
// //                       <Star className="w-5 h-5" />
// //                     </div>
// //                     <span className="text-sm font-medium">Expert Support</span>
// //                   </div>
// //                 </div>

// //                 {/* Stats - Simplified for mobile */}
// //                 <div className="grid grid-cols-3 gap-4 text-center">
// //                   <div>
// //                     <div className="text-2xl font-bold text-white">10k+</div>
// //                     <div className="text-blue-200 text-xs">Properties</div>
// //                   </div>
// //                   <div>
// //                     <div className="text-2xl font-bold text-white">500+</div>
// //                     <div className="text-blue-200 text-xs">Agents</div>
// //                   </div>
// //                   <div>
// //                     <div className="text-2xl font-bold text-white">50+</div>
// //                     <div className="text-blue-200 text-xs">Cities</div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Right Side - Sign In Form */}
// //             <div className="lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
// //               <div className="w-full max-w-md">

// //                 {/* Form Header */}
// //                 <div className="text-center mb-8">
// //                   <h3 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h3>
// //                   <p className="text-gray-600">Sign in to access your PROFO dashboard</p>
// //                 </div>

// //                 <form onSubmit={handleLogin} className="space-y-6">

// //                   {/* Username Field */}
// //                   <div className="space-y-2">
// //                     <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
// //                       Username
// //                     </label>
// //                     <div className="relative group">
// //                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                         <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
// //                       </div>
// //                       <input
// //                         id="username"
// //                         name="username"
// //                         type="text"
// //                         value={username}
// //                         onChange={(e) => setUsername(e.target.value)}
// //                         className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
// //                         placeholder="Enter your username"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Password Field */}
// //                   <div className="space-y-2">
// //                     <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
// //                       Password
// //                     </label>
// //                     <div className="relative group">
// //                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
// //                         <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
// //                       </div>
// //                       <input
// //                         id="password"
// //                         name="password"
// //                         type="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
// //                         placeholder="Enter your password"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Error Message */}
// //                   {error && (
// //                     <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
// //                       <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
// //                       <p className="text-red-700 text-sm font-medium">{error}</p>
// //                     </div>
// //                   )}

// //                   {/* Remember Me & Forgot Password - Simplified for mobile */}
// //                   <div className="flex items-center justify-between">
// //                     <label className="flex items-center space-x-2 cursor-pointer">
// //                       <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
// //                       <span className="text-sm text-gray-600">Remember me</span>
// //                     </label>
// //                     <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
// //                       Forgot password?
// //                     </a>
// //                   </div>

// //                   {/* Submit Button */}
// //                   <button
// //                     type="submit"
// //                     disabled={loading || isLoading}
// //                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
// //                   >
// //                     {loading || isLoading ? (
// //                       <span className="flex items-center justify-center space-x-2">
// //                         <Loader className="animate-spin h-5 w-5" />
// //                         <span>Signing In...</span>
// //                       </span>
// //                     ) : (
// //                       <span className="flex items-center justify-center space-x-2">
// //                         <Key className="h-5 w-5" />
// //                         <span>Sign In to PROFO</span>
// //                       </span>
// //                     )}
// //                   </button>

// //                   {/* Sign Up Link - Simplified for mobile */}
// //                   <div className="text-center pt-4 border-t border-gray-200">
// //                     <p className="text-gray-600 text-sm">
// //                       Don't have an account?{' '}
// //                       <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
// //                         Join PROFO today
// //                       </a>
// //                     </p>
// //                   </div>
// //                 </form>

// //                 {/* Mobile-only minimal company info */}
// //                 <div className="mt-6 text-center lg:hidden">
// //                   <p className="text-xs text-gray-500">
// //                     Trusted by 500+ real estate professionals
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Custom Styles */}
// //       <style jsx>{`
// //         @keyframes slide-in {
// //           from {
// //             opacity: 0;
// //             transform: translateX(100%) translateY(-50%);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateX(0) translateY(0);
// //           }
// //         }
        
// //         .animate-slide-in {
// //           animation: slide-in 0.3s ease-out;
// //         }

// //         @media (max-height: 700px) {
// //           .min-h-screen {
// //             min-height: 100vh;
// //           }
// //         }

// //         /* Mobile optimizations */
// //         @media (max-width: 768px) {
// //           .lg\\:w-1\\/2 {
// //             width: 100%;
// //           }
          
// //           /* Reduce padding on mobile */
// //           .p-8 {
// //             padding: 1.5rem;
// //           }
          
// //           /* Smaller text on mobile */
// //           .text-3xl {
// //             font-size: 1.75rem;
// //           }
          
// //           .text-2xl {
// //             font-size: 1.5rem;
// //           }
// //         }

// //         @media (max-width: 640px) {
// //           /* Further mobile optimizations */
// //           .p-6 {
// //             padding: 1rem;
// //           }
          
// //           .mb-8 {
// //             margin-bottom: 1.5rem;
// //           }
          
// //           .space-y-6 > * + * {
// //             margin-top: 1rem;
// //           }
// //         }
// //       `}</style>
// //     </>
// //   );
// // };


// // export default SignIn;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { sendOTP, verifyOTP, resendOTP } from '../features/auth/authSlice';
// import {
//   User,
//   Lock,
//   AlertCircle,
//   CheckCircle,
//   X,
//   Loader,
//   Building2,
//   Home,
//   Key,
//   TrendingUp,
//   Shield,
//   Star,
//   Phone,
//   MessageSquare
// } from 'lucide-react';

// const SignIn = () => {
//   // State management for OTP flow
//   const [step, setStep] = useState('phone'); // 'phone' or 'otp'
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [notification, setNotification] = useState({
//     show: false,
//     message: '',
//     type: ''
//   });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Redux selectors
//   const { user, isLoading, isError, message, otpSent, phoneVerified } = useSelector((state) => state.auth);

//   // Countdown timer for resend OTP
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [countdown]);

//   // Show notification function
//   const showNotification = (message, type) => {
//     setNotification({ show: true, message, type });
//     setTimeout(() => {
//       setNotification({ show: false, message: '', type: '' });
//     }, 5000);
//   };

//   // Format phone number for display
//   const formatPhoneForDisplay = (phone) => {
//     if (phone.length === 10) {
//       return `${phone.slice(0, 5)}*****`;
//     }
//     return phone;
//   };

//   // Validate phone number
//   const validatePhoneNumber = (phone) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(phone);
//   };

//   // Handle sending OTP
//   const handleSendOTP = async (e) => {
//     e.preventDefault();
    
//     if (!phoneNumber.trim()) {
//       showNotification('Phone number is required', 'error');
//       return;
//     }

//     if (!validatePhoneNumber(phoneNumber)) {
//       showNotification('Please enter a valid 10-digit mobile number', 'error');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const result = await dispatch(sendOTP({ phoneNumber })).unwrap();
      
//       showNotification('OTP sent successfully to your registered mobile number', 'success');
//       setStep('otp');
//       setCountdown(60); // Start 60-second countdown for resend
      
//     } catch (error) {
//       console.error('Send OTP error:', error);
//       const errorMessage = error?.message || 'Failed to send OTP. Please try again.';
//       setError(errorMessage);
//       showNotification(errorMessage, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle OTP verification
//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
    
//     if (!otp.trim()) {
//       showNotification('OTP is required', 'error');
//       return;
//     }

//     if (!/^\d{6}$/.test(otp)) {
//       showNotification('OTP must be 6 digits', 'error');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const result = await dispatch(verifyOTP({ phoneNumber, otp })).unwrap();
      
//       showNotification('Login successful!', 'success');
//       navigate('/properties');
      
//     } catch (error) {
//       console.error('OTP verification error:', error);
//       const errorMessage = error?.message || 'Invalid OTP. Please try again.';
//       setError(errorMessage);
//       showNotification(errorMessage, 'error');
      
//       // If OTP is invalid, clear the input
//       setOtp('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle resending OTP
//   const handleResendOTP = async () => {
//     if (countdown > 0) return;
    
//     setLoading(true);
//     setError('');

//     try {
//       await dispatch(resendOTP({ phoneNumber })).unwrap();
//       showNotification('OTP resent successfully', 'success');
//       setCountdown(60);
//     } catch (error) {
//       console.error('Resend OTP error:', error);
//       const errorMessage = error?.message || 'Failed to resend OTP. Please try again.';
//       setError(errorMessage);
//       showNotification(errorMessage, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle going back to phone input
//   const handleBackToPhone = () => {
//     setStep('phone');
//     setOtp('');
//     setError('');
//     setCountdown(0);
//   };

//   // Handle OTP input change (auto-format)
//   const handleOTPChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '').slice(0, 6);
//     setOtp(value);
    
//     // Auto-submit when 6 digits are entered
//     if (value.length === 6) {
//       // Small delay to show the completed input
//       setTimeout(() => {
//         handleVerifyOTP({ preventDefault: () => {} });
//       }, 300);
//     }
//   };

//   // Handle phone number change (auto-format)
//   const handlePhoneChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '').slice(0, 10);
//     setPhoneNumber(value);
//   };

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       navigate('/');
//     }
//   }, [user, navigate]);

//   // Enhanced Notification Component
//   const Notification = () => {
//     if (!notification.show) return null;

//     const isSuccess = notification.type === 'success';
//     const bgColor = isSuccess ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200';
//     const textColor = isSuccess ? 'text-emerald-800' : 'text-red-800';
//     const iconColor = isSuccess ? 'text-emerald-600' : 'text-red-600';
//     const Icon = isSuccess ? CheckCircle : AlertCircle;

//     return (
//       <div className={`fixed top-6 right-6 max-w-sm p-4 rounded-xl border ${bgColor} shadow-lg z-50 transform transition-all duration-300 animate-slide-in`}>
//         <div className="flex items-start space-x-3">
//           <Icon size={20} className={iconColor} />
//           <div className="flex-1">
//             <p className={`text-sm font-medium ${textColor}`}>
//               {notification.message}
//             </p>
//           </div>
//           <button
//             onClick={() => setNotification({ ...notification, show: false })}
//             className={`${textColor} hover:opacity-70 transition-opacity`}
//           >
//             <X size={16} />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Enhanced Loading Overlay
//   const LoadingOverlay = () => {
//     if (!loading && !isLoading) return null;

//     return (
//       <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
//         <div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center space-y-4 mx-4">
//           <Loader className="animate-spin text-blue-600 h-8 w-8" />
//           <p className="text-gray-700 font-medium">
//             {step === 'phone' ? 'Sending OTP...' : 'Verifying OTP...'}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Notification />
//       <LoadingOverlay />

//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
//         <div className="w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">

//           {/* Main Container */}
//           <div className="flex flex-col lg:flex-row min-h-[600px]">

//             {/* Left Side - Branding & Info */}
//             <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">

//               {/* Background Pattern */}
//               <div className="absolute inset-0 opacity-10">
//                 <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
//                 <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300 rounded-full blur-xl"></div>
//                 <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300 rounded-full blur-xl"></div>
//               </div>

//               <div className="relative z-10 text-center lg:text-left">

//                 {/* Logo & Company Name */}
//                 <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
//                   <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
//                     <Home className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <h1 className="text-3xl lg:text-4xl font-bold text-white">PROFO</h1>
//                     <p className="text-blue-100 text-sm font-medium">Real Estate Platform</p>
//                   </div>
//                 </div>

//                 {/* Main Headline */}
//                 <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
//                   Your Gateway to Premium Real Estate
//                 </h2>
//                 <p className="text-blue-100 text-lg mb-8 leading-relaxed">
//                   Access exclusive properties with secure OTP-based authentication designed for real estate professionals.
//                 </p>

//                 {/* Feature Icons - Hidden on mobile to save space */}
//                 <div className="hidden md:grid grid-cols-2 gap-4 mb-8">
//                   <div className="flex items-center space-x-3 text-white">
//                     <div className="bg-white/20 p-2 rounded-lg">
//                       <Building2 className="w-5 h-5" />
//                     </div>
//                     <span className="text-sm font-medium">Premium Properties</span>
//                   </div>
//                   <div className="flex items-center space-x-3 text-white">
//                     <div className="bg-white/20 p-2 rounded-lg">
//                       <Shield className="w-5 h-5" />
//                     </div>
//                     <span className="text-sm font-medium">Secure OTP Login</span>
//                   </div>
//                   <div className="flex items-center space-x-3 text-white">
//                     <div className="bg-white/20 p-2 rounded-lg">
//                       <TrendingUp className="w-5 h-5" />
//                     </div>
//                     <span className="text-sm font-medium">Market Analytics</span>
//                   </div>
//                   <div className="flex items-center space-x-3 text-white">
//                     <div className="bg-white/20 p-2 rounded-lg">
//                       <Star className="w-5 h-5" />
//                     </div>
//                     <span className="text-sm font-medium">Expert Support</span>
//                   </div>
//                 </div>

//                 {/* Stats - Simplified for mobile */}
//                 <div className="grid grid-cols-3 gap-4 text-center">
//                   <div>
//                     <div className="text-2xl font-bold text-white">10k+</div>
//                     <div className="text-blue-200 text-xs">Properties</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-white">500+</div>
//                     <div className="text-blue-200 text-xs">Builders</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-white">50+</div>
//                     <div className="text-blue-200 text-xs">Cities</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - OTP Sign In Form */}
//             <div className="lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
//               <div className="w-full max-w-md">

//                 {/* Form Header */}
//                 <div className="text-center mb-8">
//                   <h3 className="text-3xl font-bold text-gray-900 mb-2">
//                     {step === 'phone' ? 'Welcome Back' : 'Verify OTP'}
//                   </h3>
//                   <p className="text-gray-600">
//                     {step === 'phone' 
//                       ? 'Enter your registered mobile number to receive OTP'
//                       : `We've sent a 6-digit OTP to ${formatPhoneForDisplay(phoneNumber)}`
//                     }
//                   </p>
//                 </div>

//                 {/* Step Indicator */}
//                 <div className="flex items-center justify-center mb-8">
//                   <div className="flex items-center space-x-4">
//                     <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
//                       step === 'phone' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
//                     }`}>
//                       {step === 'phone' ? '1' : <CheckCircle className="w-4 h-4" />}
//                     </div>
//                     <div className={`w-12 h-1 rounded-full ${step === 'otp' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
//                     <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
//                       step === 'otp' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
//                     }`}>
//                       2
//                     </div>
//                   </div>
//                 </div>

//                 {/* Phone Number Form */}
//                 {step === 'phone' && (
//                   <form onSubmit={handleSendOTP} className="space-y-6">
//                     <div className="space-y-2">
//                       <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
//                         Mobile Number
//                       </label>
//                       <div className="relative group">
//                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                           <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
//                         </div>
//                         <input
//                           id="phone"
//                           name="phone"
//                           type="tel"
//                           value={phoneNumber}
//                           onChange={handlePhoneChange}
//                           className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
//                           placeholder="Enter 10-digit mobile number"
//                           maxLength="10"
//                         />
//                       </div>
//                       <p className="text-xs text-gray-500">
//                         We'll send a 6-digit OTP to this number
//                       </p>
//                     </div>

//                     {/* Error Message */}
//                     {error && (
//                       <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
//                         <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
//                         <p className="text-red-700 text-sm font-medium">{error}</p>
//                       </div>
//                     )}

//                     <button
//                       type="submit"
//                       disabled={loading || isLoading || !phoneNumber}
//                       className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
//                     >
//                       {loading || isLoading ? (
//                         <span className="flex items-center justify-center space-x-2">
//                           <Loader className="animate-spin h-5 w-5" />
//                           <span>Sending OTP...</span>
//                         </span>
//                       ) : (
//                         <span className="flex items-center justify-center space-x-2">
//                           <MessageSquare className="h-5 w-5" />
//                           <span>Send OTP</span>
//                         </span>
//                       )}
//                     </button>
//                   </form>
//                 )}

//                 {/* OTP Verification Form */}
//                 {step === 'otp' && (
//                   <form onSubmit={handleVerifyOTP} className="space-y-6">
//                     <div className="space-y-2">
//                       <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
//                         Enter OTP
//                       </label>
//                       <div className="relative group">
//                         <input
//                           id="otp"
//                           name="otp"
//                           type="text"
//                           value={otp}
//                           onChange={handleOTPChange}
//                           className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100 text-center text-2xl font-mono tracking-widest"
//                           placeholder="------"
//                           maxLength="6"
//                           autoComplete="one-time-code"
//                         />
//                       </div>
//                       <div className="flex items-center justify-between text-xs text-gray-500">
//                         <span>Valid for 5 minutes</span>
//                         <span>{otp.length}/6</span>
//                       </div>
//                     </div>

//                     {/* Error Message */}
//                     {error && (
//                       <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
//                         <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
//                         <p className="text-red-700 text-sm font-medium">{error}</p>
//                       </div>
//                     )}

//                     <button
//                       type="submit"
//                       disabled={loading || isLoading || otp.length !== 6}
//                       className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
//                     >
//                       {loading || isLoading ? (
//                         <span className="flex items-center justify-center space-x-2">
//                           <Loader className="animate-spin h-5 w-5" />
//                           <span>Verifying...</span>
//                         </span>
//                       ) : (
//                         <span className="flex items-center justify-center space-x-2">
//                           <Key className="h-5 w-5" />
//                           <span>Verify & Sign In</span>
//                         </span>
//                       )}
//                     </button>

//                     {/* Resend OTP */}
//                     <div className="text-center space-y-3">
//                       <p className="text-sm text-gray-600">
//                         Didn't receive the OTP?
//                       </p>
//                       <button
//                         type="button"
//                         onClick={handleResendOTP}
//                         disabled={countdown > 0 || loading}
//                         className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
//                       >
//                         {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
//                       </button>
//                       <div className="border-t pt-3">
//                         <button
//                           type="button"
//                           onClick={handleBackToPhone}
//                           className="text-gray-600 hover:text-gray-700 text-sm"
//                         >
//                           Change phone number
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 )}

//                 {/* Sign Up Link - Simplified for mobile */}
//                 <div className="text-center pt-6 border-t border-gray-200 mt-8">
//                   <p className="text-gray-600 text-sm">
//                     Don't have an account?{' '}
//                     <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
//                       Contact PROFO team
//                     </a>
//                   </p>
//                 </div>

//                 {/* Mobile-only minimal company info */}
//                 <div className="mt-6 text-center lg:hidden">
//                   <p className="text-xs text-gray-500">
//                     Secure OTP authentication for builders
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes slide-in {
//           from {
//             opacity: 0;
//             transform: translateX(100%) translateY(-50%);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0) translateY(0);
//           }
//         }
        
//         .animate-slide-in {
//           animation: slide-in 0.3s ease-out;
//         }

//         @media (max-height: 700px) {
//           .min-h-screen {
//             min-height: 100vh;
//           }
//         }

//         /* Mobile optimizations */
//         @media (max-width: 768px) {
//           .lg\\:w-1\\/2 {
//             width: 100%;
//           }
          
//           .p-8 {
//             padding: 1.5rem;
//           }
          
//           .text-3xl {
//             font-size: 1.75rem;
//           }
          
//           .text-2xl {
//             font-size: 1.5rem;
//           }
//         }

//         @media (max-width: 640px) {
//           .p-6 {
//             padding: 1rem;
//           }
          
//           .mb-8 {
//             margin-bottom: 1.5rem;
//           }
          
//           .space-y-6 > * + * {
//             margin-top: 1rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default SignIn;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP, verifyOTP, resendOTP } from '../features/auth/authSlice';
import {
  AlertCircle,
  CheckCircle,
  X,
  Loader,
  Building2,
  Home,
  Key,
  TrendingUp,
  Shield,
  Star,
  Phone,
  MessageSquare
} from 'lucide-react';

const SignIn = () => {
  // Step state is now synced with Redux (otpSent)
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const { user, isLoading, isError, message, otpSent, phoneVerified , phoneNumber: phoneFromRedux } = useSelector(
    (state) => state.auth
  );

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Sync step state with Redux otpSent
  useEffect(() => {
    if (otpSent) {
      setStep('otp');
      setCountdown(60);
    }
  }, [otpSent]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Notifications
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  // Helpers
  const formatPhoneForDisplay = (phone) =>
    phone.length === 10 ? `${phone.slice(0, 5)}*****` : phone;

  const validatePhoneNumber = (phone) => /^[6-9]\d{9}$/.test(phone);

  // Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      showNotification('Phone number is required', 'error');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      showNotification('Please enter a valid 10-digit mobile number', 'error');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await dispatch(sendOTP({ phoneNumber })).unwrap();
      console.log('Send OTP success:', result);
      showNotification('OTP sent successfully to your registered mobile number', 'success');
    } catch (error) {
      console.error('Send OTP error:', error);
      const errorMessage = error?.message || 'Failed to send OTP. Please try again.';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      showNotification('OTP is required', 'error');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      showNotification('OTP must be 6 digits', 'error');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await dispatch(verifyOTP({ phoneNumber : phoneFromRedux, otp })).unwrap();
      console.log('Verify OTP success:', result);
      showNotification('Login successful!', 'success');
      navigate('/properties');
    } catch (error) {
      console.error('OTP verification error:', error);
      const errorMessage = error?.message || 'Invalid OTP. Please try again.';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setLoading(true);
    setError('');

    try {
      await dispatch(resendOTP({ phoneNumber : phoneFromRedux })).unwrap();
      showNotification('OTP resent successfully', 'success');
      setCountdown(60);
    } catch (error) {
      console.error('Resend OTP error:', error);
      const errorMessage = error?.message || 'Failed to resend OTP. Please try again.';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Back to phone input
  const handleBackToPhone = () => {
    setStep('phone');
    setOtp('');
    setError('');
    setCountdown(0);
  };

  // Input handlers
  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    if (value.length === 6) {
      setTimeout(() => {
        handleVerifyOTP({ preventDefault: () => {} });
      }, 300);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
  };

  // Notification component
  const Notification = () =>
    notification.show && (
      <div
        className={`fixed top-6 right-6 max-w-sm p-4 rounded-xl border ${
          notification.type === 'success'
            ? 'bg-emerald-50 border-emerald-200'
            : 'bg-red-50 border-red-200'
        } shadow-lg z-50 animate-slide-in`}
      >
        <div className="flex items-start space-x-3">
          {notification.type === 'success' ? (
            <CheckCircle size={20} className="text-emerald-600" />
          ) : (
            <AlertCircle size={20} className="text-red-600" />
          )}
          <div className="flex-1">
            <p
              className={`text-sm font-medium ${
                notification.type === 'success' ? 'text-emerald-800' : 'text-red-800'
              }`}
            >
              {notification.message}
            </p>
          </div>
          <button
            onClick={() => setNotification({ ...notification, show: false })}
            className="text-gray-500 hover:opacity-70"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );

  // Loading overlay
  const LoadingOverlay = () =>
    (loading || isLoading) && (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center space-y-4">
          <Loader className="animate-spin text-blue-600 h-8 w-8" />
          <p className="text-gray-700 font-medium">
            {step === 'phone' ? 'Sending OTP...' : 'Verifying OTP...'}
          </p>
        </div>
      </div>
    );

  return (
    <>
      <Notification />
      <LoadingOverlay />

      {/* UI container remains same as your original code */}
      {/* --- keep the same UI code here (branding, form, otp input, etc.) --- */}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
         <div className="w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">

           {/* Main Container */}
           <div className="flex flex-col lg:flex-row min-h-[600px]">

             {/* Left Side - Branding & Info */}
             <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">

               {/* Background Pattern */}
               <div className="absolute inset-0 opacity-10">
                 <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
                 <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300 rounded-full blur-xl"></div>
                 <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300 rounded-full blur-xl"></div>
               </div>

               <div className="relative z-10 text-center lg:text-left">

                 {/* Logo & Company Name */}
                 <div className="flex items-center justify-center lg:justify-start space-x-3 mb-8">
                   <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
                     <Home className="w-8 h-8 text-white" />
                   </div>
                   <div>
                     <h1 className="text-3xl lg:text-4xl font-bold text-white">PROFO</h1>
                     <p className="text-blue-100 text-sm font-medium">Real Estate Platform</p>
                   </div>
                 </div>

                 {/* Main Headline */}
                 <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                   Your Gateway to Premium Real Estate
                 </h2>
                 <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                   Access exclusive properties with secure OTP-based authentication designed for real estate professionals.
                 </p>

                 {/* Feature Icons - Hidden on mobile to save space */}
                 <div className="hidden md:grid grid-cols-2 gap-4 mb-8">
                   <div className="flex items-center space-x-3 text-white">
                     <div className="bg-white/20 p-2 rounded-lg">
                       <Building2 className="w-5 h-5" />
                     </div>
                     <span className="text-sm font-medium">Premium Properties</span>
                   </div>
                   <div className="flex items-center space-x-3 text-white">
                     <div className="bg-white/20 p-2 rounded-lg">
                       <Shield className="w-5 h-5" />
                     </div>
                     <span className="text-sm font-medium">Secure OTP Login</span>
                   </div>
                   <div className="flex items-center space-x-3 text-white">
                     <div className="bg-white/20 p-2 rounded-lg">
                       <TrendingUp className="w-5 h-5" />
                     </div>
                     <span className="text-sm font-medium">Market Analytics</span>
                   </div>
                   <div className="flex items-center space-x-3 text-white">
                     <div className="bg-white/20 p-2 rounded-lg">
                       <Star className="w-5 h-5" />
                     </div>
                     <span className="text-sm font-medium">Expert Support</span>
                   </div>
                 </div>

                 {/* Stats - Simplified for mobile */}
                 <div className="grid grid-cols-3 gap-4 text-center">
                   <div>
                     <div className="text-2xl font-bold text-white">10k+</div>
                     <div className="text-blue-200 text-xs">Properties</div>
                   </div>
                   <div>
                     <div className="text-2xl font-bold text-white">500+</div>
                     <div className="text-blue-200 text-xs">Builders</div>
                   </div>
                   <div>
                     <div className="text-2xl font-bold text-white">50+</div>
                     <div className="text-blue-200 text-xs">Cities</div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Right Side - OTP Sign In Form */}
             <div className="lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
               <div className="w-full max-w-md">

                 {/* Form Header */}
                 <div className="text-center mb-8">
                   <h3 className="text-3xl font-bold text-gray-900 mb-2">
                     {step === 'phone' ? 'Welcome Back' : 'Verify OTP'}
                   </h3>
                   <p className="text-gray-600">
                     {step === 'phone' 
                       ? 'Enter your registered mobile number to receive OTP'
                       : `We've sent a 6-digit OTP to ${formatPhoneForDisplay(phoneNumber)}`
                     }
                   </p>
                 </div>

                 {/* Step Indicator */}
                 <div className="flex items-center justify-center mb-8">
                   <div className="flex items-center space-x-4">
                     <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                       step === 'phone' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                     }`}>
                       {step === 'phone' ? '1' : <CheckCircle className="w-4 h-4" />}
                     </div>
                     <div className={`w-12 h-1 rounded-full ${step === 'otp' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      step === 'otp' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      2
                    </div>
                  </div>
                </div>

                {/* Phone Number Form */}
                {step === 'phone' && (
                  <form onSubmit={handleSendOTP} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                        Mobile Number
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                          placeholder="Enter 10-digit mobile number"
                          maxLength="10"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        We'll send a 6-digit OTP to this number
                      </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || isLoading || !phoneNumber}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                    >
                      {loading || isLoading ? (
                        <span className="flex items-center justify-center space-x-2">
                          <Loader className="animate-spin h-5 w-5" />
                          <span>Sending OTP...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center space-x-2">
                          <MessageSquare className="h-5 w-5" />
                          <span>Send OTP</span>
                        </span>
                      )}
                    </button>
                  </form>
                )}

                {/* OTP Verification Form */}
                {step === 'otp' && (
                  <form onSubmit={handleVerifyOTP} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
                        Enter OTP
                      </label>
                      <div className="relative group">
                        <input
                          id="otp"
                          name="otp"
                          type="text"
                          value={otp}
                          onChange={handleOTPChange}
                          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100 text-center text-2xl font-mono tracking-widest"
                          placeholder="------"
                          maxLength="6"
                          autoComplete="one-time-code"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Valid for 5 minutes</span>
                        <span>{otp.length}/6</span>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || isLoading || otp.length !== 6}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                    >
                      {loading || isLoading ? (
                        <span className="flex items-center justify-center space-x-2">
                          <Loader className="animate-spin h-5 w-5" />
                          <span>Verifying...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center space-x-2">
                          <Key className="h-5 w-5" />
                          <span>Verify & Sign In</span>
                        </span>
                      )}
                    </button>

                    {/* Resend OTP */}
                    <div className="text-center space-y-3">
                      <p className="text-sm text-gray-600">
                        Didn't receive the OTP?
                      </p>
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={countdown > 0 || loading}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                      </button>
                      <div className="border-t pt-3">
                        <button
                          type="button"
                          onClick={handleBackToPhone}
                          className="text-gray-600 hover:text-gray-700 text-sm"
                        >
                          Change phone number
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Sign Up Link - Simplified for mobile */}
                <div className="text-center pt-6 border-t border-gray-200 mt-8">
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                      Contact PROFO team
                    </a>
                  </p>
                </div>

                {/* Mobile-only minimal company info */}
                <div className="mt-6 text-center lg:hidden">
                  <p className="text-xs text-gray-500">
                    Secure OTP authentication for builders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        @media (max-height: 700px) {
          .min-h-screen {
            min-height: 100vh;
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .lg\\:w-1\\/2 {
            width: 100%;
          }
          
          .p-8 {
            padding: 1.5rem;
          }
          
          .text-3xl {
            font-size: 1.75rem;
          }
          
          .text-2xl {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .p-6 {
            padding: 1rem;
          }
          
          .mb-8 {
            margin-bottom: 1.5rem;
          }
          
          .space-y-6 > * + * {
            margin-top: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default SignIn;
