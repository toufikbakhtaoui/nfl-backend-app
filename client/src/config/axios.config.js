const instance = require('axios')
const axios = instance.create({
    baseURL: 'http://localhost:3400/api',
})
export default axios
