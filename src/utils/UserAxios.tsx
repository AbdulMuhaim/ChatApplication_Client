// import axios from "axios";

// export const axiosInstance = axios.create({
//     serverURL:'http://localhost:3000'
// })

// axiosInstance.interceptors.request.use(
//     config => {
//         const adminState = store.getState().Admin
//         const userState = store.getState().User

//         const role = config.url.split("/")[1]

//         if (role==='user') {
//             config.headers['Authorization'] = `Bearer ${userState.token}`;
//         }
//         if(role==='admin') {
//             config.headers['Authorization'] = `Bearer ${adminState.token}`;
//         }
        

//         return config;
//     },
//     error => {
//         return Promise.reject(error);

//     }
// )

// export default axiosInstance;





import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});
const accessToken = localStorage.getItem('accessToken');

axiosInstance.interceptors.request.use(
  async (config) => {
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("refresh token codeee");
    

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Use your refresh token to get a new access token
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axiosInstance.post('/refreshToken', { refreshToken });

        if (response.data.accessToken) {
          // Update the original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh error (e.g., redirect to login page)
        console.error('Error refreshing token:', refreshError);
        // You might want to redirect the user to the login page or handle the error accordingly
        // Example: window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
