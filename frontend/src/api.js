import axios from 'axios'

const api = axios.create({
  baseURL: 'http://https://restaurant-backend-83r8.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rd_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error)

    if (error.response?.status === 401) {
      localStorage.removeItem('rd_token')
      localStorage.removeItem('rd_user')
    }

    return Promise.reject(error)
  }
)

export default api