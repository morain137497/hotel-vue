<template>
  <div id="index">
    <my-card title="操作" v-if="searchSwitch || createSwitch || selectionSwitch || slots['action'] !== undefined">
      <template v-slot:content>
        <el-form ref="searchForm" :inline="true" label-position="left">
          <slot name="search"></slot>
        </el-form>
        <el-button type="primary" v-if="searchSwitch" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button type="warning" v-if="createSwitch" icon="el-icon-plus" @click="openDialog()">创建</el-button>
        <el-button type="danger" v-if="selectionSwitch" icon="el-icon-delete" >批量删除</el-button>
        <slot name="action"></slot>
      </template>
    </my-card>
    <my-card title="数据列表">
      <template v-slot:content>
        <el-table :data="tableRows" :row-key="rowKey" :tree-props="{children: 'children',hasChildren: 'child_cnt'}"  lazy :load="load">
          <el-table-column v-if="selectionSwitch" type="selection" width="50"></el-table-column>
          <el-table-column v-for="(item, index) in tableColumns" :key="index" :prop="item.prop" :label="item.label">
            <template slot-scope="scope">
              <my-column v-if="item.render" :render="item.render" :row="scope.row" :column="item" />
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="数据状态" v-if="statusSwitch">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status === 0 ? 'danger' : 'success'">
                {{ scope.row.status === 0 ? "冻结状态" : "正常状态" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column  prop="action" label="操作" class-name="table-column-action" v-if="rowActionSwitch">
            <template slot-scope="scope">
              <el-button type="warning" v-if="updateSwitch" @click="openDialog(scope.$index)">编辑</el-button>
              <el-button v-if="statusSwitch"  :type="scope.row.status === 0 ? 'info' : 'danger'" @click="changeRowStatus(scope.row[rowKey], scope.row.status === 0 ? 1 : 0, scope.$index)">
                {{ scope.row.status === 0 ? "解除冻结" : "数据冻结" }}
              </el-button>
              <el-button  type="danger" v-if="deleteSwitch" @click="delRow(scope.row[rowKey], scope.$index)">删除</el-button>
              <slot name="row-action" :row="scope.row" :index="scope.$index"></slot>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" background layout="prev, pager, next" :total="total" @current-change="currentChange"></el-pagination>
      </template>
    </my-card>
    <my-dialog ref="my-dialog" :title="dialogTitle" @submitDialog="submitDialog" @closeDialog="closeDialog">
      <template v-slot:dialog>
        <slot name="createOrUpdateDialog"></slot>
      </template>
    </my-dialog>
  </div>
</template>

<script>
import MyCard from '@/components/my-card'
import MyDialog from '@/components/my-dialog'
import ele from '@/utils/ele'
// import http from '@/http'
export default {
  name: "index",
  components: {
    MyCard,
    MyDialog,
    myColumn: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object
        }
      },
      render: (h, data) => {
        const params = {
          row: data.props.row,
          index: data.props.index
        }
        if (data.props.column) params.column = data.props.column
        return data.props.render(h, params)
      }
    },
  },
  props:{
    tableColumns: {
      type: Array,
      default(){
        return []
      }
    },
    tableRows: {
      type: Array,
      default(){
        return []
      }
    },
    rowKey: {
      type: String,
      default(){
        return "id"
      }
    },
    total: {
      type: Number,
      default(){
        return 0
      }
    },
    selectionSwitch: {
      type: Boolean,
      default(){
        return false
      }
    },
    deleteSwitch: {
      type: Boolean,
      default(){
        return true
      }
    },
    statusSwitch: {
      type: Boolean,
      default(){
        return true
      }
    },
    searchSwitch: {
      type: Boolean,
      default(){
        return true
      }
    },
    createSwitch: {
      type: Boolean,
      default(){
        return true
      }
    },
    updateSwitch: {
      type: Boolean,
      default(){
        return true
      }
    },
    rowActionSwitch: {
      type: Boolean,
      default(){
        return true
      }
    },
    actionUrl: {
      type: String,
      default(){
        return ''
      }
    }
  },
  data(){
    return{
      dialogTitle: '创建',
      currentRowIndex: -1,
      slots: this.$slots
    }
  },
  mounted() {
    console.log(this.slots['action'])
  },
  methods: {
    load(tree, treeNode, resolve){
      this.$emit("load", tree, treeNode, resolve)
    },
    /**
     * 打开dialog
     * @param index
     */
    openDialog(index = -1){
      index === -1 ? this.dialogTitle = "创建" : this.dialogTitle = "编辑"
      this.$refs['my-dialog'].status = true
      this.currentRowIndex = index
      this.$emit("openDialog", this.currentRowIndex)
    },
    /**
     * 提交创建/修改
     * @param callback
     */
    submitDialog(callback){
      this.$emit("submitDialog", this.currentRowIndex, () => {
        callback("操作成功")
      })
    },
    /**
     * 关闭dialog
     */
    closeDialog(){
      this.currentRowIndex = -1
      this.$emit("closeDialog", this.currentRowIndex)
    },
    /**
     * 搜索
     */
    search(){
      this.$emit("search")
    },
    /**
     * 删除一行
     * @param id
     * @param index
     */
    delRow(id, index){
      ele.confirm({
        callback: (done) => {
          //   http.delete(this.actionUrl + id)
          // .then(res => {
          //   if(res.code === 200)
          //   {
          //     done()
          //     this.$message.success(res.message)
          //     this.tableRows.splice(index, 1)
          //   }
          // })
          this.$emit("delRow", id, index, () => {
            done()
            this.tableRows.splice(index, 1)
            this.$message.success("删除成功")
          })
        }
      })
    },
    /**
     * 改变数据状态
     * @param id
     * @param status
     * @param index
     */
    changeRowStatus(id, status, index){
      ele.confirm({
        callback: (done) => {
          // http.put(this.actionUrl + id + "/" + status)
          // .then(res => {
          //   if(res.code === 200)
          //   {
          //     done()
          //     this.$message.success( res.message)
          //     this.tableRows[index].status = status
          //   }
          // })
          this.$emit("changeRowStatus", id, status, () => {
            done()
            this.$message.success("操作成功")
            this.tableRows[index].status = status
          })
        }
      })
    },
    /**
     * 分页
     * @param currentPage
     */
    currentChange(currentPage){
      this.$emit('currentChange', currentPage)
    }
  }
}
</script>
<style scoped>
.pagination{
  float: right;
  margin: 40px 0;
}
</style>
