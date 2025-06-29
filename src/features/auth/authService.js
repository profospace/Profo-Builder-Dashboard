// import axios from "axios";
// import { base_url } from "../../utils/baseurl";

// const login = async (userData) => {
//     const response = await axios.post(`${base_url}/builder/login`, userData);
//     console.log("response" , response)
//     if(response.data){
//         localStorage.setItem('user',JSON.stringify(response.data.payload))
//     }
//     return response.data; 
// }

// const signOut = async ()=>{
//     // const response = await axios.put(`${base_url}/logout`,{}, getConfig())
//     // if(response.data){
//         if(localStorage.getItem('user')) {
//             // localStorage.removeItem('user')
//             localStorage.clear()
//           }

//     // }
//     return response.data
    
// }



// const authService = {
//     login,signOut
// }

// export default authService;


// authService.js
import axios from "axios";
import { base_url } from "../../utils/baseurl";

const login = async (userData) => {
    const response = await axios.post(`${base_url}/builder/login`, userData);
    console.log("response", response)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.payload))
    }
    return response.data;
}

const signOut = async () => {
    // Clear localStorage
    if (localStorage.getItem('user')) {
        localStorage.clear()
    }

    // Return a success response since we're not making an API call
    return { success: true, message: "Logged out successfully" };
}

const authService = {
    login,
    signOut
}

export default authService;