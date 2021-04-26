import http from '@/http'

export default {
    modifyPhone(params){
        return http.post("/auth/modifyphone", params)
    },


    // 领队
    leaderList(params){
        return http.post("/4000/leader/getlist", params)
    },
    cAuLeader(params){
        return http.post("/4000/leader/setdetail", params)
    },

    // VIP用户
    vipUserList(params){
        return http.post("/4000/vip/getlist", params)
    },
    cAuVipUser(params){
        return http.post("/4000/vip/setdetail", params)
    },
    getUserId(params){
        return http.post("/1000/user/phone", params)
    },


    // 文章
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
    articleSearch(params){
        return http.post("3000/article/search", params)
    },


    // 评论
    delComment(params){
        return http.post("comment/deldetail", params)
    },


    // 路线
    cAuTrack(params){
        return http.post("/2000/track/setdetail", params)
    },
    trackList(params){
        return http.post("/2000/track/getlist", params)
    },
    trackSearch(params){
        return http.post("/2000/track/search", params)
    },
    trackInfo(params){
        return http.post("/2000/track/getdetail", params)
    },
    delTrack(params){
        return http.post("/2000/track/deldetail", params)
    },


    // 活动模板
    cAuTemplate(params){
        return http.post("/4000/template/setdetail", params)
    },
    templateList(params){
        return http.post("/4000/template/search", params)
    },
    templateInfo(params){
        return http.post("/4000/template/getdetail", params)
    },

    // 活动
    cAuActivity(params){
        return http.post("/4000/activity/setdetail", params)
    },
    activityList(params){
        return http.post("/4000/activity/getlist", params)
    },
    activityInfo(params){
        return http.post("/4000/activity/getdetail", params)
    },
    activityCancel(params){
        return http.post("/4000/closing/cancel", params)
    },
    activityOk(params){
        return http.post("/4000/closing/confirm", params)
    },
    activityOkDetails(params){
        return http.post("/4000/closing/getdetail", params)
    },

    // 支付
    paymentList(params){
        return http.post("/6000/payment/getlist", params)
    },


    // 退款
    refundList(params){
        return http.post("/6000/refund/getlist", params)
    },
    refuseRefund(params){
        return http.post("/6000/refund/deldetail", params)
    },
    refuseOk(params){
        return http.post("/6000/refund/order", params)
    },
    refuseOkSetFee(params){
        return http.post("/6000/refund/order", params)
    }

}
