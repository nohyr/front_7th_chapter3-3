import axios from 'axios'

const getBaseURL = () => {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return 'https://dummyjson.com'
  }
  return '/api'
}

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
})
