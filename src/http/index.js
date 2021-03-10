import axios from "axios";
if (process.env.NODE_ENV === "production") {
    axios.defaults.baseURL = "http://47.98.45.245:8081"
} else {
    axios.defaults.baseURL = "http://127.0.0.1:8081"
}
axios.defaults.timeout = 10000

axios.interceptors.request.use( config => {
    let token = sessionStorage.getItem("token")
    if(token != null)
        config.headers['token'] = token
    return config;
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use( response => {
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
        // Toast.fail(error.response.data.message)
    }else{
        if(!window.navigator.onLine){
            // 断网处理
            return;
        }
    }
    return Promise.resolve(error.response.data)
})
export default axios;


