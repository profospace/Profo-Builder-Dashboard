// export const getConfig = () => {
//     const getTokenFromLocalStorage = localStorage.getItem("user")
//         ? localStorage.getItem("user")
//         : "";

//     console.log("getTokenFromLocalStorage", getTokenFromLocalStorage)


//     return {
//         header: {
//             Authorization: `Bearer ${getTokenFromLocalStorage}`,
//             Accept: "application/json",
//         },
//     };
// };

// config/auth.config.js

export const getConfig = () => {
    const getTokenFromLocalStorage = localStorage.getItem("user") && JSON.parse(localStorage.getItem('user')).token;

    return {
        headers: {  // Changed from header to headers
            'Authorization': getTokenFromLocalStorage ? `Bearer ${getTokenFromLocalStorage}` : '',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
};

// Helper functions for token management
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem("user", token);
    }
};

export const removeAuthToken = () => {
    localStorage.removeItem("user");
};

export const getAuthToken = () => {
    return localStorage.getItem("user");
};