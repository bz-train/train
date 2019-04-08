import axios from 'axios';
var instance = axios.create({
    baseURL: '/rest',
    timeout: 1000,
    headers: { 'X-XXX-XXXX': 'XXXX' }
});
instance.interceptors.request.use(function (config) {
    return config;
}, function (err) {
    return Promise.reject(err);
});
export default instance;
//# sourceMappingURL=axios.js.map