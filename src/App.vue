<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
  margin: 0;
  padding: 0;
  background: #f4f4f4;
}
.table-column-action{
  button{
    margin: 2px !important;
    padding: 4px 10px;
  }
}
ul{
  list-style: none;
}
</style>
