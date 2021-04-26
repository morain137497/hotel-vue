import axios from "axios";
import user from "@/utils/user";
import {Message, Loading} from "element-ui";
if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = "http://47.98.45.245:8081"
} else {
    // axios.defaults.baseURL = "http://service.qunju.cn"
    axios.defaults.baseURL = "/api"
}
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
// eslint-disable-next-line no-unused-vars
let loading = null
axios.interceptors.request.use( config => {
    let token = user.getToken()
    if(token != null)
        config.headers['X-Token'] = token
    loading = Loading.service({fullscreen: true, text: '正在加载'})
    return config;
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use( response => {
    if(response.data.code !== 0){
        Message.error(response.data.msg)
    }
    loading.close();
    return response.data
}, error => {
    if( error.response ) {
        // 判断状态码
        switch (error.response.status) {
            case 400:
                // 参数错误
                break
            case 401:
                // 未登录
                // Toast.fail(error.response.data.message)
                break
            case 403:
                // 无权限
                break
            case 404:
                // 找不到
                break
        }
        Message.error(error.response.data.message)
    }else{
        if(!window.navigator.onLine){
            // 断网处理
            return;
        }
    }
    return Promise.resolve(error.response.data)
})
export default axios;


