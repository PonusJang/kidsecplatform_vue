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

      <el-table-column label="风险值" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.risk }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="startTime" label="开始时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="endTime" label="结束时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.endTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-dropdown split-button type="primary" @command="handleCommand">
            操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'detail')">详情</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'check')">再次运行</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'push')">推送</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

  </div>

</template>

<script>
  import Pagination from "@/components/Pagination/index";
  import waves from "@/directive/waves";
  import {parseTime} from "@/utils";
  import {findByIP, findByName, getList, check, update, push, getDetail} from "@/api/dataSecCheck";

  export default {
    name: 'CheckIndex',
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
          ip: undefined
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
        temp: {
          id: undefined,
          ip: '',
          name: ''
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = false
        if (this.listQuery.ip !== undefined && this.listQuery.ip !== '') {
          findByIP(this.listQuery.page, this.listQuery.limit, this.listQuery.ip).then(response => {
            this.total = response.data.count
            this.list = response.data.data
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        } else if (this.listQuery.name !== undefined && this.listQuery.name !== '') {
          findByName(this.listQuery.page, this.listQuery.limit, this.listQuery.name).then(response => {
            this.total = response.data.count
            this.list = response.data.data
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        } else {
          getList(this.listQuery.page, this.listQuery.limit).then(response => {
            this.total = response.data.count
            this.list = response.data.data
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        }
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleCheck() {
      },
      handlePush() {
      },
      handleDetail() {
      },
      push(id) {
        push(id).then(() => {
        })
      },
      check(id) {
        check(id).then(() => {
        })
      },
      getDetail(id) {
        getDetail(id).then(() => {
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
          case "check":
            this.handleCheck(command.row);
            break;
          case "push":
            this.handlePush(command.row);
            break;
          case "detail":
            this.handleDetail(command.row);
            break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
