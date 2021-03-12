import http from '@/http'

export default {
    modifyPhone(params){
        return http.post("/auth/modifyphone", params)
    }
}
