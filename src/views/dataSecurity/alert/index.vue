<template>

  <div class="app-container">

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户端" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务器" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QUERY" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="AlertBy" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-dropdown split-button type="primary" @command="handleCommand">
            操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'tagFalse')">标记误报
              </el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'push')">推送</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getList, push, tagFalse} from "@/api/dataSecAlert"
  import Pagination from "@/components/Pagination/index";
  import waves from "@/directive/waves";
  import {parseTime} from "@/utils";

  export default {
    name: 'AlertIndex',
    components: {Pagination},
    directives: {waves},
    filters: {
      parseTime: parseTime
    },
    data() {
      return {
        total: 0,
        listQuery: {
          name: undefined
        },
        list: null,
        listLoading: false,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: '新增'
        },
        dialogPvVisible: false,
        rules: {},
        downloadLoading: false,
        temp: {
          id: undefined,
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      getList() {
        this.listLoading = false
        getList(this.listQuery.page, this.listQuery.limit).then(response => {
          this.total = response.data.count
          this.list = response.data.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      },
      beforeHandleCommand(index, row, command) {
        return {
          'index': index,
          'row': row,
          'command': command
        }
      },
      handlePush(row){

      },
      push(id){
        push(id).then(()=>{

        })
      },
      handleTagFalse(row){
      },
      tagFalse(id){
        tagFalse(id).then(()=>{

        })
      },
      handleCommand(command) {
        switch (command.command) {
          case "push":
            this.handlePush(command.row);
            break;
          case "tagFalse":
            this.handleTagFalse(command.row);
            break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
