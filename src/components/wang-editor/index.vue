<template>
  <div id="index">
    <div id="edit">
      <p v-html="defaultContent"></p>
    </div>
  </div>
</template>

<script>
import fileUtils from "@/utils/file";
import user from "@/utils/user";
import http from '@/http'
export default {
  name: "index",
  props: {
    content: {
      type: String,
      default(){
        return ''
      }
    },
    defaultContent: {
      type: String,
      default(){
        return ''
      }
    },
  },
  model: {
    prop: 'content',
    event: 'change'
  },
  data(){
    return{
      MetaData: {
        size: '',
        object: '',
        md5sum: ''
      }
    }
  },
  mounted() {
    let _this = this
    const E = window.wangEditor
    const editor = new E('#edit')
    editor.config.uploadImgShowBase64 = true
    editor.config.uploadImgMaxSize = 2 * 1024 * 1024
    editor.config.uploadImgServer = 'http://service.qunju.cn/5000/file/upload'
    editor.config.debug = true
    editor.config.zIndex = 1
    editor.config.uploadFileName = 'file_name'
    editor.config.menus = [
      "head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor",
      "backColor","link","list","justify","quote","emoticon","image","table"
    ]
    // editor.config.uploadImgHooks = {
    //   before:  async (xhr, editor, files) => {
    //     let md5 =  await fileUtils.md5(files[0])
    //     this.MetaData = {
    //       size: files[0].size.toString(),
    //       object: files[0].name,
    //       md5sum: md5
    //     }
    //   },
    //   customInsert: function (insertImg, result){
    //     let url = result.data
    //     insertImg(url)
    //   }
    // }
    // editor.config.uploadImgHeaders = {
    //   'X-Token': user.getToken(),
    //   'X-MetaData': JSON.stringify(this.MetaData)
    // }

    editor.config.customUploadImg = async (files, insert) => {
      const file = files[0]
      let md5 = await fileUtils.md5(file)
          this.MetaData = {
            size: file.size.toString(),
            object: file.name,
            md5sum: md5
          }
      const result = await http.post("http://service.qunju.cn/5000/file/upload",{file_name: file}, {
        headers: {
          'X-Token': user.getToken(),
          'X-MetaData': JSON.stringify(this.MetaData)
        }
      })
      if(result.code === 0){
        insert(result.data.Furl)
      }
    }
    editor.config.onchange = function (data) {
      _this.$emit('change', data)
    }
    editor.create()
  }
}
</script>

<style scoped>

</style>