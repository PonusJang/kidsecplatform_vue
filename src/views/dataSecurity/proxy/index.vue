<template>

  <div class="app-container">

    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="资产名称"
        style="width: 120px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.ip"
        placeholder="IP地址"
        style="width: 120px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新建检查
      </el-button>
    </div>
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
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="代理IP" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.risk }}</span>
        </template>
      </el-table-column>
      <el-table-column label="监听端口" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.risk }}</span>
        </template>
      </el-table-column>
      <el-table-column label="代理IP" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.risk }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据库IP" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.risk }}</span>
        </template>
      </el-table-column>
      <el-table-column align="Created" prop="Created" label="Created">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" align="center" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-dropdown split-button type="primary" @command="handleCommand">
            操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'detail')">编辑</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'check')">状态检测</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'del')">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {add, del, update, check, stop, restart, getList, getProxyList} from "@/api/dataSecProxy"
  import Pagination from "@/components/Pagination/index";
  import waves from "@/directive/waves";
  import {parseTime} from "@/utils";
  import {findByIP, findByName} from "@/api/dataSec";

  export default {
    name: 'ProxyIndex',
    components: {Pagination},
    directives: {waves},
    filters: {
      parseTime: parseTime
    },
    data() {
      return {
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          name: undefined,
          ip: undefined,
        },
        list: null,
        listLoading: false,
        dialogFormVisible: false,
        dialogUploadVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: '新增'
        },
        dialogPvVisible: false,
        rules: {},
        downloadLoading: false,
        UploadLoading: false,
        temp: {
          id: undefined,
          username: '',
          ip: '',
          type: '',
          name: '',
          manager: ''
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
      }
    },

    handleUpdate(row) {
    },
    handleCheck(row) {
    },
    handleDelete(row) {
    },
    handleStop(row) {
    },
    handleRestart(row) {
    },

    update(data) {
      update(data).then(() => {

      })
    },
    check(id) {
      check(id).then(() => {

      })
    },
    stop(id) {
      stop(id).then(() => {

      })
    },
    restart(id) {
      restart(id).then(() => {

      })
    },
    beforeHandleCommand(index, row, command) {
      return {
        'index': index,
        'row': row,
        'command': command
      }
    },
    handleCommand(command) {
      switch (command.command) {
        case "update":
          this.handleUpdate(command.row);
          break;
        case "check":
          this.handleCheck(command.row);
          break;
        case "delete":
          this.handleDelete(command.row);
          break;
        case "stop":
          this.handleStop(command.row);
          break;
        case "restart":
          this.handleRestart(command.row);
          break;
      }
    }
  }
</script>

<style scoped>

</style>
