// Overwrite in local dev with localStorage.setItem('BASE_URL', 'http://localhost:5000')
export const BASE_URL: string = localStorage.getItem('BASE_URL')
  || window.location.origin
  || 'http://localhost:5000'
