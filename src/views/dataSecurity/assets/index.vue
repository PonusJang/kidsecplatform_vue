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
        新增
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
      <el-table-column label="IP" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.host }}</span>
        </template>
      </el-table-column>
      <el-table-column label="端口" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.port }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据库类型" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.created | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-dropdown split-button type="primary" @command="handleCommand">
            操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'detail')">详情</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'check')">安全检查
              </el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'authorizeUser')">授权用户
              </el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'authorizeGroup')">授权组
              </el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'edit')">编辑</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'delete')">删除</el-dropdown-item>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="名称" prop="title">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="IP" prop="title">
          <el-input v-model="temp.ip"/>
        </el-form-item>
        <el-form-item label="端口" prop="title">
          <el-input v-model="temp.port"/>
        </el-form-item>
        <el-form-item label="类型" prop="title">
          <el-input v-model="temp.type"/>
        </el-form-item>
        <el-form-item label="版本" prop="title">
          <el-input v-model="temp.version"/>
        </el-form-item>
        <el-form-item label="用户名" prop="title">
          <el-input v-model="temp.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="title">
          <el-input v-model="temp.password"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button>
          测试
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import {
    add,
    del,
    update,
    findByIP,
    findByName,
    getList,
    getDetail
  } from '@/api/dataSec'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  export default {
    name: 'DataAssestList',
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
          ip: '',
          port: '',
          username: '',
          password: '',
          type: '',
          name: '',
          version: ''
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
      resetTemp() {
        this.temp = {
          id: undefined,
          owner: '',
          ip: '',
          type: '',
          name: ''
        }
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            add(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleDelete(row, index) {
        del(row.id).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.list.splice(index, 1)
        })
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        console.log(row.id)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleDetail(row) {
        getDetail(row.ip).then(() => {
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            update(tempData).then(() => {
              const index = this.list.findIndex(v => v._id === this.temp._id)
              this.list.splice(index, 1, this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: 'Success',
                message: 'Update Successfully',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      formatJson(filterVal) {
        return this.list.map(v => filterVal.map(j => {
          if (j === 'add_time') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      handleAuthorizeGroup() {
      },
      handleAuthorizeUser() {
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
          case "edit":
            this.handleUpdate(command.row);
            break;
          case "authorizeGroup":
            this.handleAuthorizeGroup(command.row, command.index);
            break;
          case "authorizeUser":
            this.handleAuthorizeUser(command.row, command.index);
            break;
          case "check":
            this.handleCheck(command.row, command.index);
            break;
          case "detail":
            this.handleDetail(command.row);
            break;
          case "delete":
            this.handleDelete(command.row, command.index);
            break;
        }
      }
    }
  }
</script>

<style scoped>
</style>
