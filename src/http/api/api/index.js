import http from '@/http'

export default {
    modifyPhone(params){
        return http.post("/auth/modifyphone", params)
    }
    ,




    cAuArticle(params){
        return http.post("/article/setdetail", params)
    },
    articleInfo(params){
        return http.post("/article/getdetail", params)
    },
    delArticle(params){
        return http.post("/article/deldetail", params)
    },
    articleList(params){
        return http.post("/article/getlist", params)
    },



    delComment(params){
        return http.post("comment/deldetail", params)
    },


    cAuTrack(params){
        return http.post("/track/setdetail", params)
    },
    trackList(params){
        return http.post("/track/list", params)
    },
    trackInfo(params){
        return http.post("/track/getdetail", params)
    },
    delTrack(params){
        return http.post("/track/deldetail", params)
    },
}
