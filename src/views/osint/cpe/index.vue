<template>

  <div class="app-container">

    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="CVE/CNVD编号"
        style="width: 220px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.ip"
        placeholder="关键词"
        style="width: 120px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button v-waves class="filter-item" type="warning" icon="el-icon-info">
        今日更新 : 100条CVE , 100条CNVD
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
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.risk }}</span>
        </template>
      </el-table-column>
      <el-table-column label="监听端口" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.risk }}</span>
        </template>
      </el-table-column>
      <el-table-column label="危害" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.risk }}</span>
        </template>
      </el-table-column>
      <el-table-column label="影响组件" align="center">
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
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'detail')">自查</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'check')">推送</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {getList, check, push} from "@/api/cpe"
  import Pagination from "@/components/Pagination/index";
  import waves from "@/directive/waves";
  import {parseTime} from "@/utils";

  export default {
    name: 'CpeIndex',
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
      },
      handleCheck(row) {
      },
      handlePush(row) {
      },
      check(id) {
        check(id).then(() => {
        })
      },
      push(id) {
        push(id).then(() => {
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
          case "check"://
            this.handleCheck(command.row);
            break;
          case "push"://
            this.handlePush(command.row);
            break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
