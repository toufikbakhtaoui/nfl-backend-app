const instance = require('axios')
const axios = instance.create({
    baseURL: 'http://localhost:8080/api',
})
export default axios
