// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import authService from './authService'
// import { toast, Bounce } from "react-toastify";

// const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null



// const initialState = {
// user : getUserFromLocalStorage,
// isLoading:false,
// isError : false,
// isSuccess : false,
// message: ""
// }

// export const login = createAsyncThunk('auth/login' , async(user,thunkAPI) =>{
//     try {
//         return await authService.login(user)
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error)
        
//     }
// })




// export const signOut = createAsyncThunk('auth/signOut' , async(_,thunkAPI) =>{
//     try {
//         return await authService.signOut()
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error)
        
//     }
// })



// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
    
//   },
//   extraReducers:(builder)=>{
//     builder
//     .addCase(login.pending,(state)=>{
//         state.isLoading = true
//     })
//     .addCase(login.fulfilled,(state,action)=>{
//         console.log("action" , action.payload)
//         state.isLoading = false
//         state.isSuccess = true
//         state.user = action.payload.payload
//     })
//     .addCase(login.rejected,(state,action)=>{
//         state.isLoading = false
//         state.isError = true
//         state.isSuccess = false
//         state.user = null
//         state.message = action.payload.response.data.error
//     })
   
//     .addCase(signOut.pending,(state)=>{
//         state.isLoading = true
//     })
//     .addCase(signOut.fulfilled,(state,action)=>{
//         state.isLoading = false
//         state.isSuccess = true
//         state.user = null
        
//     })
//     .addCase(signOut.rejected,(state,action)=>{
//         state.isLoading = false
//         state.isError = true
//         state.isSuccess = false
//         state.user = null
//         state.message = action.payload.message
//     })
   
//   }
// })

// // export const { increment, decrement, incrementByAmount } = counterSlice.actions
// export default authSlice.reducer


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
const initialState = {
  user: getUserFromLocalStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  // OTP-specific states
  otpSent: false,
  phoneVerified: false,
  currentPhoneNumber: null
}
// Send OTP async thunk
export const sendOTP = createAsyncThunk('auth/sendOTP', async (otpData, thunkAPI) => {
  try {
    return await authService.sendOTP(otpData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
// Verify OTP and login async thunk
export const verifyOTP = createAsyncThunk('auth/verifyOTP', async (verifyData, thunkAPI) => {
    console.log("verifyData" , verifyData)

  try {
    return await authService.verifyOTP(verifyData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
// Resend OTP async thunk
export const resendOTP = createAsyncThunk('auth/resendOTP', async (phoneData, thunkAPI) => {
  try {
    return await authService.resendOTP(phoneData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
// Legacy login thunk (kept for backward compatibility if needed)
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
// Sign out async thunk
export const signOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  try {
    return await authService.signOut()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reset auth state
    resetAuthState: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
    // Clear OTP state
    clearOTPState: (state) => {
      state.otpSent = false
      state.phoneVerified = false
      state.currentPhoneNumber = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Send OTP cases
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.message = ""
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.otpSent = true
        state.currentPhoneNumber = action.payload.data?.phoneNumber || null
        state.phoneNumber = action.meta.arg.phoneNumber; // ✅ keep phone in Redux
        state.message = action.payload.message || "OTP sent successfully"
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.otpSent = false
        state.message = action.payload?.message || action.payload?.response?.data?.message || "Failed to send OTP"
      })
      // Verify OTP cases
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.message = ""
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.phoneVerified = true
        state.user = action.payload.payload
        state.message = action.payload.message || "Login successful"
        // Clear OTP states after successful login
        state.otpSent = false
        state.currentPhoneNumber = null
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.phoneVerified = false
        state.user = null
        state.message = action.payload?.message || action.payload?.response?.data?.message || "OTP verification failed"
      })
      // Resend OTP cases
      .addCase(resendOTP.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.message = ""
      })
      .addCase(resendOTP.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload.message || "OTP resent successfully"
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload?.message || action.payload?.response?.data?.message || "Failed to resend OTP"
      })
      // Legacy login cases (kept for backward compatibility)
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("action", action.payload)
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.user = null
        state.message = action.payload.response.data.error
      })
      // Sign out cases
      .addCase(signOut.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
        // Clear OTP states on logout
        state.otpSent = false
        state.phoneVerified = false
        state.currentPhoneNumber = null
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.user = null
        state.message = action.payload.message
      })
  }
})
export const { resetAuthState, clearOTPState } = authSlice.actions
export default authSlice.reducer