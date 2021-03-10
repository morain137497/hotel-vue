import http from '@/http'

export default {
    uploadImages(params){
        return http.post("/common/upload-images", params)
    }
}