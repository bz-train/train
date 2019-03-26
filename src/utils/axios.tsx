/**
 * Created by chenlei on 2018/8/1.
 */
import axios from 'axios';

const instance = axios.create({
    baseURL: '/rest',
    timeout: 1000,
    headers: {'X-XXX-XXXX': 'XXXX'}
});

// 添加拦截器
instance.interceptors.request.use((config) => {
    return config;
}, (err:any) => {
    return Promise.reject(err);
})

export default instance