import http from '@/http'

export default {
    sendCode(params){
        return http.post("/1000/auth/sendcode", params)
    },
    checkCode(params){
        return http.post("/1000/auth/checkcode", params)
    },
    logout(){
        return http.post("/1000/auth/logout")
    }
}
