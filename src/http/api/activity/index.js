import http from '@/http'

export default {
    create(params){
        return http.post("/admin/activity", params)
    },
    update(params){
        return http.put("/admin/activity", params)
    },
    list(params){
        return http.get("/admin/activity", {params: params})
    },
    config(activityId){
        return http.get("/admin/activity-config/" + activityId)
    },
    details(activityId){
        return http.get("/admin/activity-details/" + activityId)
    }
}