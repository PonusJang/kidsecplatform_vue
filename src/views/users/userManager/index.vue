<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        placeholder="用户名"
        style="width: 200px;"
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
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出EXCEL
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
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中文名" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.realname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="岗位" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.job }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QQ" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.qq }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次登录" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.lastLogonIn | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-dropdown split-button type="primary" @command="handleCommand">
            操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'edit')">编辑</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'del')">删除</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'resetPwd')">重置密码</el-dropdown-item>
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

    <el-dialog title="重置密码" :visible.sync="ResetFormVisible">
      <el-form>
        <el-form-item label="ID" prop="id">
          <el-input v-model="uid" />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
           <el-input v-model="newPassword" />
        </el-form-item>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="resetPwd()">
            确认
          </el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="用户名" prop="title">
          <el-input v-model="temp.username" />
        </el-form-item>
        <el-form-item label="密码" prop="title" v-if="passwdDisabled">
          <el-input v-model="temp.password" />
        </el-form-item>
        <el-form-item label="中文名" prop="title">
          <el-input v-model="temp.realname" />
        </el-form-item>
        <el-form-item label="部门" prop="title">
          <el-select
            v-model="temp.department"
            filterable
            default-first-option
            placeholder="请选择部门"
            collapse-tags
            @focus="getDepart"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="岗位" prop="title">
          <el-input v-model="temp.job" />
        </el-form-item>
        <el-form-item label="角色" prop="title">
          <el-select
            v-model="temp.roles"
            multiple
            filterable
            default-first-option
            placeholder="请选择角色"
            collapse-tags
            @focus="getRoles"
          >
            <el-option
              v-for="item in optionRoles"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="QQ" prop="title">
          <el-input v-model="temp.qq" />
        </el-form-item>
        <el-form-item label="邮箱" prop="title">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="手机号码" prop="title">
          <el-input v-model="temp.telephone" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
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
import { getList, update, add, del, findByUsername, resetPwd } from '@/api/user'
import { getDepart } from '@/api/depart'
import { getRoles } from '@/api/role'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
export default {
  name: 'SystemList',
  components: { Pagination },
  directives: { waves },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        username: undefined
      },
      list: null,
      listLoading: false,
      dialogFormVisible: false,
      passwdDisabled: true,
      dialogStatus: '',
      ResetFormVisible: false,
      newPassword: undefined,
      uid: undefined,
      textMap: {
        update: 'Edit',
        create: '新增'
      },
      dialogPvVisible: false,
      rules: {
        username: [{ required: true, message: '用户名 is required', trigger: 'blur' }],
        password: [{ required: true, message: '密码 is required', trigger: 'blur' }],
        realname: [{ required: true, message: '中文名 is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      temp: {
        id: undefined,
        username: '',
        realname: '',
        password: '',
        qq: '',
        email: '',
        telephone: '',
        roles: [],
        department: '',
        job: ''
      },
      options: [],
      optionRoles: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getDepart() {
      getDepart().then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
    },
    getRoles() {
      getRoles().then(res => {
        if (res.code === 200) {
          this.optionRoles = res.data
        }
      })
    },
    getList() {
      this.listLoading = false
      if (this.listQuery.username !== undefined && this.listQuery.username !== '') {
        findByUsername(this.listQuery.page, this.listQuery.limit, this.listQuery.username).then(response => {
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
        username: '',
        password: '',
        realname: '',
        department: '',
        job: '',
        qq: '',
        email: '',
        telephone: ''
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.passwdDisabled = false
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.passwdDisabled = false
      this.temp = Object.assign({}, row) // copy obj
      console.log(row.configItem)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          update(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['username', 'realname', 'department', 'job', 'qq', 'email', 'telephone']
        const filterVal = ['username', 'realname', 'department', 'job', 'qq', 'email', 'telephone']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户列表'
        })
        this.downloadLoading = false
      })
    },



    beforeHandleCommand(index, row, command) {
      return {
        'index': index,
        'row': row,
        'command': command
      }
    },
    handleResetPwd(row,index){
      this.uid = row.id
      this.ResetFormVisible = true
    },
    resetPwd(){
      resetPwd({ id:this.uid, newPwd: this.newPassword}).then(()=>{
        this.ResetFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleCommand(command) {
      switch (command.command) {
        case "edit":
          this.handleUpdate(command.row);
          break;
        case "del":
          this.handleDelete(command.row, command.index);
          break;
        case "resetPwd":
          this.handleResetPwd(command.row, command.index);
          break;
      }
    }

  }
}
</script>

<style scoped>
</style>
