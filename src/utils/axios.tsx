/**
 * Created by chenlei on 2018/8/1.
 */
import axios from 'axios';
const instance = axios.create({
    baseURL: '/',
    timeout: 10000,
});
const Message = {
    0: '服务器数据处理成功返回请求的数据。',
    301: '请求次数已经超过本周期设置的最大值',
    302: '请求频率已超过设定的最大值。',
    303: '该接口工作繁忙，产生拥堵，请稍后再试。',
    304: '',
    401: '规定的必传入项没有传入',
    402: '传入的参数项格式不符合规定',
    403: '传入参数项至少有一项超出规定的长度',
    404: '没有查询到符合条件的数据',
    405: '查询到重复数据',
    406: '传入的参数编码格式失效',
    407: '未查询到指定信息',
    408: '用户名参数错误，导致登录失败',
    409: '密码参数错误，导致登录失败',
    501: '服务器内部错误',
    502: '插入操作错误',
    503: '更新操作错误',
    504: 'XMPP服务连接暂时失效',
    600: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    601: '用户没有权限（令牌、用户名、密码错误）。',
    603: '用户得到授权，但是访问是被禁止的。',
    604: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    606: '请求的格式不可得。',
    610: '请求的资源被永久删除，且不会再得到的。',
    622: '当创建一个对象时，发生一个验证错误。',
    700: '服务器发生错误，请检查服务器。',
    702: '网关错误。',
    703: '服务不可用，服务器暂时过载或维护。',
    704: '网关超时。',
};

instance.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    (response:any) => {
        const res = response.data;
        if (res.success === true) {
            return res;
        } else {
            const error = Message[response.status] || res.errorMsg || '未知错误';
            return Promise.reject(error);
        }
    },
    error => {
        console.log('err' + error);
        return Promise.reject(error);
    }
);

export default {
    sources: [],
    //取消请求的方法
    cancel: function() {
        if (this.sources.length > 0) {
            this.sources.forEach((item:any) => {
                item();
            });
            this.sources = [];
        }
    },
    post: function(url:String,data:object) {
        const CancelToken = axios.CancelToken;
        const that = this;
        const token = new CancelToken(function executor(c) {
            that.sources.push(c);
        });
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        };
        return instance.post(url, data, {
            withCredentials: true,
            cancelToken: token,
            headers: Object.assign(instance.defaults.headers, headers),
        });
    }
};
