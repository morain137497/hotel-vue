<template>
  <div id="index">
    <div id="edit">
      <p v-html="defaultContent"></p>
    </div>
  </div>
</template>

<script>
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
  mounted() {
    let _this = this
    const E = window.wangEditor
    const editor = new E('#edit')
    editor.config.uploadImgShowBase64 = true
    editor.config.uploadImgMaxSize = 2 * 1024 * 1024
    editor.config.uploadImgServer = 'http://47.98.45.245:8081/common/upload-images'
    editor.config.debug = true
    editor.config.zIndex = 1
    editor.config.uploadFileName = 'file'
    editor.config.menus = [
      "head","bold","fontSize","fontName","italic","underline","strikeThrough","foreColor",
      "backColor","link","list","justify","quote","emoticon","image","table"
    ]
    editor.config.uploadImgHooks = {
      customInsert: function (insertImg, result){
        let url = result.data
        insertImg(url)
      }
    }
    editor.config.uploadImgHeaders = {
      token: sessionStorage.getItem('token')
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