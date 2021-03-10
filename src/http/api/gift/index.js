import http from '@/http'

export default {
    create(params){
        return http.post("/admin/gift", params)
    },
    update(params){
        return http.put("/admin/gift", params)
    },
    list(params){
        return http.get("/admin/gift", {params: params})
    },
}