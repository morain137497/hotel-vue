import http from '@/http'

export default {
    create(params){
        return http.post("/admin/join", params)
    },
    update(params){
        return http.put("/admin/join", params)
    },
    list(params){
        return http.get("/admin/join", {params: params})
    },
    content(joinId){
        return http.get("/admin/join-content/" + joinId)
    }
}