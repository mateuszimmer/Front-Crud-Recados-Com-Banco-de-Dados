import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'https://api-crud-recados-com-banco-de-dados.vercel.app',
    headers: {
        "Content-type": "application/json"
    },
})

export { api }