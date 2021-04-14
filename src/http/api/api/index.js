import http from '@/http'

export default {
    modifyPhone(params){
        return http.post("/auth/modifyphone", params)
    }
    ,




    cAuArticle(params){
        return http.post("/3000/article/setdetail", params)
    },
    articleInfo(params){
        return http.post("/3000/article/getdetail", params)
    },
    delArticle(params){
        return http.post("/3000/article/deldetail", params)
    },
    articleList(params){
        return http.post("/3000/article/getlist", params)
    },



    delComment(params){
        return http.post("comment/deldetail", params)
    },


    cAuTrack(params){
        return http.post("/2000/track/setdetail", params)
    },
    trackList(params){
        return http.post("/2000/track/getlist", params)
    },
    trackInfo(params){
        return http.post("/2000/track/getdetail", params)
    },
    delTrack(params){
        return http.post("/2000/track/deldetail", params)
    },



    cAuTemplate(params){
        return http.post("/4000/template/setdetail", params)
    },
    templateList(params){
        return http.post("/4000/template/search", params)
    },

    cAuActivity(params){
        return http.post("/4000/activity/setdetail", params)
    },
    activityList(params){
        return http.post("/4000/activity/getlist", params)
    },

}
