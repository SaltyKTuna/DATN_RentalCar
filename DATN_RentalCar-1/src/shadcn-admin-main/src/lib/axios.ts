import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    if (error.response?.status === 500) {
      // Xử lý lỗi server
      console.error('Server error:', error.response.data)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance 