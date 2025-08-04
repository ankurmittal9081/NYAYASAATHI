// // // // import axios from "axios"

// // // // // Use environment variable or fallback to development URL
// // // // const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5001/api"

// // // // const apiClient = axios.create({
// // // //   baseURL,
// // // //   withCredentials: true,
// // // //   timeout: 10000,
// // // //   headers: {
// // // //     "Content-Type": "application/json",
// // // //   },
// // // // })

// // // // let isRefreshing = false
// // // // let failedQueue = []

// // // // const processQueue = (error) => {
// // // //   failedQueue.forEach((prom) => {
// // // //     if (error) {
// // // //       prom.reject(error)
// // // //     } else {
// // // //       prom.resolve()
// // // //     }
// // // //   })
// // // //   failedQueue = []
// // // // }

// // // // export const setupInterceptors = (logoutCallback) => {
// // // //   // Request interceptor
// // // //   apiClient.interceptors.request.use(
// // // //     (config) => {
// // // //       console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
// // // //       return config
// // // //     },
// // // //     (error) => {
// // // //       console.error("❌ Request Error:", error)
// // // //       return Promise.reject(error)
// // // //     },
// // // //   )

// // // //   // Response interceptor
// // // //   apiClient.interceptors.response.use(
// // // //     (response) => {
// // // //       console.log(
// // // //         `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`,
// // // //       )
// // // //       return response
// // // //     },
// // // //     async (error) => {
// // // //       console.error(
// // // //         `❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`,
// // // //       )

// // // //       const originalRequest = error.config

// // // //       if (error.response?.status === 401 && !originalRequest._retry) {
// // // //         if (isRefreshing) {
// // // //           return new Promise((resolve, reject) => {
// // // //             failedQueue.push({ resolve, reject })
// // // //           })
// // // //             .then(() => {
// // // //               return apiClient(originalRequest)
// // // //             })
// // // //             .catch((err) => {
// // // //               return Promise.reject(err)
// // // //             })
// // // //         }

// // // //         originalRequest._retry = true
// // // //         isRefreshing = true

// // // //         try {
// // // //           console.log("🔄 Attempting to refresh token...")
// // // //           await apiClient.post("/auth/refresh-token")
// // // //           console.log("✅ Token refreshed successfully")
// // // //           processQueue(null)
// // // //           return apiClient(originalRequest)
// // // //         } catch (refreshError) {
// // // //           console.error("❌ Token refresh failed:", refreshError)
// // // //           processQueue(refreshError)
// // // //           logoutCallback()
// // // //           return Promise.reject(refreshError)
// // // //         } finally {
// // // //           isRefreshing = false
// // // //         }
// // // //       }

// // // //       return Promise.reject(error.response?.data || error)
// // // //     },
// // // //   )
// // // // }

// // // // export default apiClient
// // // // axiosConfig.js
// // // import axios from "axios"

// // // const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5001/api"

// // // const apiClient = axios.create({
// // //   baseURL,
// // //   withCredentials: true,
// // //   timeout: 10000,
// // //   headers: {
// // //     "Content-Type": "application/json",
// // //   },
// // // })

// // // let isRefreshing = false
// // // let failedQueue = []

// // // const processQueue = (error) => {
// // //   failedQueue.forEach((prom) => {
// // //     if (error) {
// // //       prom.reject(error)
// // //     } else {
// // //       prom.resolve()
// // //     }
// // //   })
// // //   failedQueue = []
// // // }

// // // export const setupInterceptors = (logoutCallback) => {
// // //   // Request Interceptor
// // //   apiClient.interceptors.request.use(
// // //     (config) => {
// // //       console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
// // //       return config
// // //     },
// // //     (error) => {
// // //       console.error("❌ Request Error:", error.message)
// // //       return Promise.reject(error)
// // //     }
// // //   )

// // //   // Response Interceptor
// // //   apiClient.interceptors.response.use(
// // //     (response) => {
// // //       console.log(
// // //         `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`
// // //       )
// // //       return response
// // //     },
// // //     async (error) => {
// // //       const originalRequest = error.config

// // //       console.error("❌ API Error:", {
// // //         method: error.config?.method,
// // //         url: error.config?.url,
// // //         status: error.response?.status || "NO RESPONSE",
// // //         message: error.message,
// // //         data: error.response?.data,
// // //       })

// // //       // Token refresh logic
// // //       if (error.response?.status === 401 && !originalRequest._retry) {
// // //         if (isRefreshing) {
// // //           return new Promise((resolve, reject) => {
// // //             failedQueue.push({ resolve, reject })
// // //           })
// // //             .then(() => apiClient(originalRequest))
// // //             .catch((err) => Promise.reject(err))
// // //         }

// // //         originalRequest._retry = true
// // //         isRefreshing = true

// // //         try {
// // //           console.log("🔄 Attempting to refresh token...")
// // //           await apiClient.post("/auth/refresh-token")
// // //           console.log("✅ Token refreshed successfully")
// // //           processQueue(null)
// // //           return apiClient(originalRequest)
// // //         } catch (refreshError) {
// // //           console.error("❌ Token refresh failed:", refreshError.message)
// // //           processQueue(refreshError)
// // //           logoutCallback?.() // optional logout
// // //           return Promise.reject(refreshError)
// // //         } finally {
// // //           isRefreshing = false
// // //         }
// // //       }

// // //       return Promise.reject(error.response?.data || error)
// // //     }
// // //   )
// // // }

// // // export default apiClient

// // import axios from 'axios';

// // // Use the environment variable for the API URL, with a fallback for local development.
// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// // const apiClient = axios.create({
// //   baseURL: API_URL,
// //   withCredentials: true, // Crucial for handling cookies used in authentication (e.g., refresh tokens).
// // });

// // /**
// //  * Sets up Axios interceptors to automatically manage authentication tokens
// //  * and handle token-related errors globally.
// //  * @param {function} logout - The logout function from AuthContext to clear session on auth failure.
// //  */
// // export const setupInterceptors = (logout) => {
  
// //   // --- REQUEST INTERCEPTOR ---
// //   // This function runs before any request is sent.
// //   apiClient.interceptors.request.use(
// //     (config) => {
// //       // Retrieve the authentication token from local storage.
// //       const token = localStorage.getItem('token');
      
// //       // --- THIS IS THE CRITICAL FIX ---
// //       // Only add the Authorization header if a token exists in storage.
// //       // This prevents sending malformed "Bearer null" headers on public requests,
// //       // which can cause servers to reject the request.
// //       if (token) {
// //         config.headers['Authorization'] = `Bearer ${token}`;
// //       }
      
// //       // The modified config is returned to proceed with the request.
// //       return config;
// //     },
// //     (error) => {
// //       // Handles errors that occur during request setup.
// //       return Promise.reject(error);
// //     }
// //   );

// //   // --- RESPONSE INTERCEPTOR ---
// //   // This function runs after a response is received.
// //   apiClient.interceptors.response.use(
// //     // If the response is successful (status 2xx), just pass it through.
// //     (response) => response,
    
// //     // If the response has an error...
// //     (error) => {
// //       // Check if the error is a 401 Unauthorized, which typically means the token
// //       // is invalid or has expired.
// //       // We also check that this isn't already a request to an auth endpoint to prevent infinite loops.
// //       if (
// //         error.response &&
// //         error.response.status === 401 &&
// //         !error.config.url.includes('/api/auth') // Prevents logout loops on login/register failures
// //       ) {
// //         // If the token is invalid and a logout function is available, call it.
// //         // This will clear the user's session and redirect them to the login page.
// //         if (logout) {
// //           logout();
// //           toast.error("Your session has expired. Please log in again.");
// //         }
// //       }
      
// //       // Return the error to be handled by the specific component's .catch() block.
// //       return Promise.reject(error);
// //     }
// //   );
// // };

// // export default apiClient;
// import axios from 'axios';
// import toast from 'react-hot-toast';

// // --- CRITICAL FIX: The baseURL MUST include '/api' ---
// // This ensures all requests are correctly routed by the backend server.
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// const apiClient = axios.create({
//   baseURL: API_URL,
//   withCredentials: true, // Important for handling auth cookies
// });

// /**
//  * Sets up Axios interceptors for global authentication and error handling.
//  * @param {function} logout - The logout function from AuthContext.
//  */
// export const setupInterceptors = (logout) => {
  
//   // --- Request Interceptor ---
//   // Runs before each request is sent.
//   apiClient.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token');
//       // Only attach the token if it exists.
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   // --- Response Interceptor ---
//   // Runs after each response is received.
//   apiClient.interceptors.response.use(
//     (response) => response, // Pass through successful responses.
//     (error) => {
//       // Handle authentication errors (e.g., expired token).
//       if (
//         error.response &&
//         error.response.status === 401 &&
//         !error.config.url.includes('/auth') // Avoid logout loops
//       ) {
//         if (logout) {
//           logout();
//           toast.error("Your session has expired. Please log in again.");
//         }
//       }
      
//       // Return the error to the calling function's .catch() block.
//       return Promise.reject(error);
//     }
//   );
// };

// export default apiClient;
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Define public routes that should NOT trigger a logout on a 401 error.
const PUBLIC_ROUTES = [
    '/auth/login',
    '/auth/register',
    '/kiosks' // Fetching kiosks is a public action.
];

export const setupInterceptors = (logout) => {
  
  // Request Interceptor: Attaches the token to outgoing requests.
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Handles global errors, especially auth errors.
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { config, response } = error;
      
      // Check if the error is a 401 (Unauthorized).
      if (response && response.status === 401) {
        
        // --- CRITICAL FIX: Smart 401 Error Handling ---
        // Check if the failed request URL ends with one of our defined public routes.
        const isPublicRoute = PUBLIC_ROUTES.some(route => config.url.endsWith(route));

        // If it was a public route, do NOT logout. This is expected for users
        // who are not logged in. We simply let the error continue to the catch block.
        if (isPublicRoute) {
            return Promise.reject(error);
        }

        // If the 401 happened on a PROTECTED route, the session is truly invalid.
        // Now it is safe to call the logout function.
        if (logout) {
          logout();
          toast.error("Your session has expired. Please log in again.");
        }
      }
      
      return Promise.reject(error);
    }
  );
};

export default apiClient;