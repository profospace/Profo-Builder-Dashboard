import axios from "axios";
import { base_url } from "../../utils/baseurl";

const login = async (userData) => {
    const response = await axios.post(`${base_url}/builder/login`, userData);
    console.log("response" , response)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data.payload))
    }
    return response.data; 
}

const signOut = async ()=>{
    const response = await axios.put(`${base_url}/logout`,{}, getConfig())
    if(response.data){
        if(localStorage.getItem('user')) {
            // localStorage.removeItem('user')
            localStorage.clear()
          }

    }
    return response.data
    
}

// const register = async (data)=>{
//     const response = await axios.post(`${auth_base_url}/auth/register`, data ,{
//         headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data.result


// }

// const getWishlist = async ()=>{
//     const response = await axios.get(`${auth_base_url}/wishlist` , getConfig())
//     return response.data
// }

// const forgotPassword = async (data)=>{
//     const response = await axios.post(`${auth_base_url}/auth/forgot-password` , data)
//     return response.data
// }

// const resetPassword = async (data)=>{
//     try {
//         const {password ,token} = data
//     const response = await axios.put(`${auth_base_url}/auth/reset-password/${token}` , {password})
//     console.log(response)
//     return response.data
//     } catch (error) {
//         return error.message
        
//     }
// }


const authService = {
    login,signOut
}

export default authService;
