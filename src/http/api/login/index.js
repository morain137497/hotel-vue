import http from '@/http'

export default {
    login(params){
        return http.post("/admin/admin-login", params)
    }
}