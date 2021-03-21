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
    }
}
