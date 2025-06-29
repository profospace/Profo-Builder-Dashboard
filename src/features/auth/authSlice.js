import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { toast, Bounce } from "react-toastify";

const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null



const initialState = {
user : getUserFromLocalStorage,
isLoading:false,
isError : false,
isSuccess : false,
message: ""
}

export const login = createAsyncThunk('auth/login' , async(user,thunkAPI) =>{
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
        
    }
})




export const signOut = createAsyncThunk('auth/signOut' , async(_,thunkAPI) =>{
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
    
  },
  extraReducers:(builder)=>{
    builder
    .addCase(login.pending,(state)=>{
        state.isLoading = true
    })
    .addCase(login.fulfilled,(state,action)=>{
        console.log("action" , action.payload)
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.payload
    })
    .addCase(login.rejected,(state,action)=>{
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.user = null
        state.message = action.payload.response.data.error
    })
   
    .addCase(signOut.pending,(state)=>{
        state.isLoading = true
    })
    .addCase(signOut.fulfilled,(state,action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.user = null
        
    })
    .addCase(signOut.rejected,(state,action)=>{
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.user = null
        state.message = action.payload.message
    })
    // .addCase(forgotPassword.pending,(state)=>{
    //     state.isLoading = true
    // })
    // .addCase(forgotPassword.fulfilled,(state,action)=>{
    //     state.isLoading = false
    //     state.isSuccess = true
    //     // state.user = null
    //     if(state.isSuccess) {
    //         toast.success('password reset link send successfully to your email', {
    //             position: "top-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //             transition: Bounce,
    //             });
    //     }
        
    // })
    // .addCase(forgotPassword.rejected,(state,action)=>{
    //     state.isLoading = false
    //     state.isError = true
    //     state.isSuccess = false
    //     state.user = null
    //     state.message = action.payload.message
    // })
    // .addCase(resetPassword.pending,(state)=>{
    //     state.isLoading = true
    // })
    // .addCase(resetPassword.fulfilled,(state,action)=>{
    //     state.isLoading = false
    //     state.isSuccess = true
    //     // state.user = null
    //     if(state.isSuccess){
    //         toast.success('password reset successfully Login now', {
    //             position: "top-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "dark",
    //             transition: Bounce,
    //         });
    //     }
        
    // })
    // .addCase(resetPassword.rejected,(state,action)=>{
    //     state.isLoading = false
    //     state.isError = true
    //     state.isSuccess = false
    //     state.user = null
    //     state.message = action.payload.message
    // })
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default authSlice.reducer