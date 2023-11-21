import axios from 'axios'
const api = axios.create({
    baseURL:'https://methan-plastic.onrender.com/api'
})
export default api;
