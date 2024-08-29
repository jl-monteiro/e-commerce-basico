import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3003/sistema/"
})

export default api