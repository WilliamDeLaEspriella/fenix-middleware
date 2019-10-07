const axios = require('axios');

axios.defaults.baseURL = 'https://reqres.in/api/';
axios.defaults.timeout = 30000;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;

 const PlatformRequest = (url,query) => {
    // return axios.get('users',{params: query})
    return axios.get('users')
};

module.exports = {
    PlatformRequest
}