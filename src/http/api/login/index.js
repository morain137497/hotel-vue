import http from '@/http'

export default {
    sendCode(params){
        return http.post("/auth/sendcode", params)
    },
    checkCode(params){
        return http.post("/auth/checkcode", params)
    }
}
