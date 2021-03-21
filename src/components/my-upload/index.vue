<template>
  <div id="index">
    <ul class="image-list">
      <li v-for="(item, index) in imagesList" :key="index">
        <img :src="item">
        <div class="images-icon">
          <i class="el-icon-delete"  @click="removeImages(index)"></i>
        </div>
      </li>
      <li id="upload"  v-if="imagesList.length < imagesTotal">
        <el-upload
            action="http://service.qunju.cn/file/upload"
            list-type="picture-card"
            name="file_name"
            :accept="imagesType"
            :headers="headers"
            :show-file-list="false"
            :on-success="onSuccess"
            :before-upload="beforeUpload"
          >
          <i class="el-icon-camera-solid"></i>
        </el-upload>
      </li>
    </ul>
    <div class="tag">只能上传{{ imagesType }}类型的图片，大小不超过{{ imagesMaxSize }}M, 您只能上传{{imagesTotal}}张图片</div>
  </div>
</template>

<script>
import user from "@/utils/user";
import fileUtils from "@/utils/file";
export default {
  name: "index",
  props: {
    imagesList: {
      type: Array,
      default() {
        return [];
      }
    },
    imagesTotal: {
      default() {
        return 1;
      }
    },
    imagesMaxSize: {
      default() {
        return 2;
      }
    },
    imagesType: {
      default(){
        return ".jpg,.jpeg,.png";
      }
    },
    label: {
      default(){
        return "图片"
      }
    },
  },
  data(){
    return{
      loading: '',
      headers: {}
    }
  },
  model: {
    prop: 'imagesList',
    event: 'onSuccess'
  },
  methods:{
    removeImages(index){
      this.imagesList.splice(index, 1)
    },
    async beforeUpload(file){
      let MetaData = {
        size:file.size.toString(),
        object:file.name
      }
      let md5 = await fileUtils.md5(file)
      MetaData.md5sum = md5
      this.headers['X-MetaData'] = JSON.stringify(MetaData)
      this.headers['X-Token'] = user.getToken()
      this.loading = this.$loading({
        target: '#upload',
      })
      this.loading.close()
      let isUpload = true
      // 1、判断文件大小
      if(file.size > this.imagesMaxSize * 1024 * 1024){
        this.$message.error("图片超出最大限制...")
        isUpload = false
      }
      return isUpload;
    },
    onSuccess(res){
      if(res.code == 0)
      {
        this.imagesList.push(res.data.Furl)
      }
      this.$emit('uploadSuccess', this.imagesList)
    }
  }
}
</script>
<style scoped lang="less">
.image-list{
  overflow: hidden;
  padding: 0;
  margin: 0;
  li{
    float: left;
    position: relative;
    height: 148px;
    width: 148px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;
    &:hover{
      .images-icon{
        display: block;
      }
    }
    img{
      width: 100%;
      height: 100%;
    }
    .images-icon{
      display: none;
      background: rgba(0,0,0,.4);
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 148px;
      i{
        color: #fff;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
.tag{
  color: #d2d0d0;
  font-size: 10px;
}
</style>
