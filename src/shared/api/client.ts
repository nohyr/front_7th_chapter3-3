import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.PROD ? 'https://dummyjson.com' : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
