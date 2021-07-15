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
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'check')">状态检测 </el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'del')">删除 </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import Pagination from "@/components/Pagination/index";
  import waves from "@/directive/waves";
  import {parseTime} from "@/utils";

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
        rules: {
        },
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
      beforeHandleCommand(index, row, command) {
        return {
          'index': index,
          'row': row,
          'command': command
        }
      },
      handleCommand(command) {
        switch (command.command) {
          case "check"://分配角色
            this.handleUpdate(command.row);
            break;
          case "push"://分配角色
            this.handleUpdate(command.row, command.index);
            break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
