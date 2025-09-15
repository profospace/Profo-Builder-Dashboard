// // authService.js
// import axios from "axios";
// import { base_url } from "../../utils/baseurl";

// const login = async (userData) => {
//     const response = await axios.post(`${base_url}/builder/login`, userData);
//     console.log("response", response)
//     if (response.data) {
//         localStorage.setItem('user', JSON.stringify(response.data.payload))
//     }
//     return response.data;
// }

// const signOut = async () => {
//     // Clear localStorage
//     if (localStorage.getItem('user')) {
//         localStorage.clear()
//     }

//     // Return a success response since we're not making an API call
//     return { success: true, message: "Logged out successfully" };
// }

// const authService = {
//     login,
//     signOut
// }

// export default authService;

// // authService.js
// import axios from "axios";
// import { base_url } from "../../utils/baseurl";
// // Create axios instance with default config
// const api = axios.create({
//   baseURL: base_url,
//   timeout: 10000, // 10 second timeout
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });
// // Add request interceptor for auth token
// api.interceptors.request.use(
//   (config) => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (user && user.token) {
//       config.headers.Authorization = `Bearer ${user.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// // Add response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid, clear localStorage
//       localStorage.removeItem('user');
//       window.location.href = '/signin';
//     }
//     return Promise.reject(error);
//   }
// );
// // Send OTP to phone number
// const sendOTP = async (otpData) => {
//   try {
//     const response = await api.post('/builder/send-otp', otpData);
//     console.log("Send OTP response:", response);
//     return response.data;
//   } catch (error) {
//     console.error("Send OTP error:", error);
//     throw error.response?.data || error;
//   }
// };
// // Verify OTP and login
// const verifyOTP = async (verifyData) => {
//     console.log("verifyData" , verifyData)
//   try {
//     const response = await api.post('/builder/verify-otp', verifyData);
//     console.log("Verify OTP response:", response);
    
//     if (response.data && response.data.payload && response.data.token) {
//       // Store user data with token in localStorage
//       const userData = {
//         ...response.data.payload,
//         token: response.data.token
//       };
//       localStorage.setItem('user', JSON.stringify(userData));
//     }
    
//     return response.data;
//   } catch (error) {
//     console.error("Verify OTP error:", error);
//     throw error.response?.data || error;
//   }
// };
// // Resend OTP
// const resendOTP = async (phoneData) => {
//   try {
//     const response = await api.post('/builder/resend-otp', phoneData);
//     console.log("Resend OTP response:", response);
//     return response.data;
//   } catch (error) {
//     console.error("Resend OTP error:", error);
//     throw error.response?.data || error;
//   }
// };
// // Legacy login method (kept for backward compatibility)
// const login = async (userData) => {
//   try {
//     const response = await api.post('/builder/login', userData);
//     console.log("Legacy login response:", response);
    
//     if (response.data && response.data.payload) {
//       localStorage.setItem('user', JSON.stringify(response.data.payload));
//     }
    
//     return response.data;
//   } catch (error) {
//     console.error("Legacy login error:", error);
//     throw error.response?.data || error;
//   }
// };
// // Sign out
// const signOut = async () => {
//   try {
//     // Clear localStorage
//     if (localStorage.getItem('user')) {
//       localStorage.clear();
//     }
//     // Return a success response since we're not making an API call
//     return { success: true, message: "Logged out successfully" };
//   } catch (error) {
//     console.error("Sign out error:", error);
//     throw error;
//   }
// };
// // Get current user from localStorage
// const getCurrentUser = () => {
//   try {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   } catch (error) {
//     console.error("Error getting current user:", error);
//     localStorage.removeItem('user'); // Remove corrupted data
//     return null;
//   }
// };
// // Check if user is authenticated
// const isAuthenticated = () => {
//   const user = getCurrentUser();
//   return !!(user && user.token);
// };
// // Refresh token if needed (placeholder for future implementation)
// const refreshToken = async () => {
//   try {
//     const user = getCurrentUser();
//     if (!user || !user.token) {
//       throw new Error('No token available');
//     }
//     // This would be implemented when you add refresh token endpoint to backend
//     // const response = await api.post('/builder/refresh-token', { token: user.token });
//     // return response.data;
    
//     return user; // For now, just return current user
//   } catch (error) {
//     console.error("Token refresh error:", error);
//     throw error;
//   }
// };
// // Validate phone number format
// const validatePhoneNumber = (phoneNumber) => {
//   const phoneRegex = /^[6-9]\d{9}$/;
//   return phoneRegex.test(phoneNumber);
// };
// // Format phone number (remove any formatting, keep only digits)
// const formatPhoneNumber = (phoneNumber) => {
//   return phoneNumber.replace(/\D/g, '').slice(-10); // Keep last 10 digits
// };
// const authService = {
//   // OTP methods
//   sendOTP,
//   verifyOTP,
//   resendOTP,
  
//   // Legacy methods
//   login,
//   signOut,
  
//   // Utility methods
//   getCurrentUser,
//   isAuthenticated,
//   refreshToken,
//   validatePhoneNumber,
//   formatPhoneNumber
// };
// export default authService;         










// authService.js
import axios from "axios";
import { base_url } from "../../utils/baseurl";

// Send OTP to phone number
const sendOTP = async (otpData) => {
  try {
    const response = await axios.post(`${base_url}/builder/send-otp`, otpData, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("Send OTP response:", response);
    return response.data;
  } catch (error) {
    console.error("Send OTP error:", error);
    throw error.response?.data || error;
  }
};

// Verify OTP and login
const verifyOTP = async (verifyData) => {
  console.log("verifyData", verifyData);
  try {
    const response = await axios.post(`${base_url}/builder/verify-otp`, verifyData, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log("Verify OTP response:", response);

    if (response.data && response.data.payload && response.data.token) {
      // Store user data with token in localStorage
      const userData = {
        ...response.data.payload,
        token: response.data.token
      };
      localStorage.setItem('user', JSON.stringify(userData));
    }

    return response.data;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error.response?.data || error;
  }
};

// Resend OTP
const resendOTP = async (phoneData) => {
  try {
    const response = await axios.post(`${base_url}/builder/resend-otp`, phoneData, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("Resend OTP response:", response);
    return response.data;
  } catch (error) {
    console.error("Resend OTP error:", error);
    throw error.response?.data || error;
  }
};

// Legacy login method
const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}/builder/login`, userData, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log("Legacy login response:", response);

    if (response.data && response.data.payload) {
      localStorage.setItem('user', JSON.stringify(response.data.payload));
    }

    return response.data;
  } catch (error) {
    console.error("Legacy login error:", error);
    throw error.response?.data || error;
  }
};

// Sign out
const signOut = () => {
  try {
    localStorage.removeItem('user');
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

// Get current user from localStorage
const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    localStorage.removeItem('user');
    return null;
  }
};

// Check if user is authenticated
const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!(user && user.token);
};

// Refresh token (placeholder for future use)
const refreshToken = async () => {
  try {
    const user = getCurrentUser();
    if (!user || !user.token) {
      throw new Error('No token available');
    }
    // Placeholder for backend refresh endpoint
    return user;
  } catch (error) {
    console.error("Token refresh error:", error);
    throw error;
  }
};

// Validate phone number format
const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phoneNumber);
};

// Format phone number
const formatPhoneNumber = (phoneNumber) => {
  return phoneNumber.replace(/\D/g, '').slice(-10); // Keep last 10 digits
};

const authService = {
  sendOTP,
  verifyOTP,
  resendOTP,
  login,
  signOut,
  getCurrentUser,
  isAuthenticated,
  refreshToken,
  validatePhoneNumber,
  formatPhoneNumber
};

export default authService;
