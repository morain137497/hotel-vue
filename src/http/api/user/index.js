import http from '@/http'

export default {
    login(code){
        let params = new FormData()
        params.append("code", code)
        return http.post("/front/user-wechat-login", params)
    }
}