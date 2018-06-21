export const BASE_URL: string = window.location.host === 'localhost:8080'
? 'http://localhost:5000'
: window.location.origin
