<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.rolename"
        placeholder="角色名"
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
      <el-table-column label="角色名" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.roleName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑权限
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
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
        style="width: 500px; margin-left:50px;"
      >
        <el-form-item label="角色名" prop="title">
          <el-input v-model="temp.roleName"/>
        </el-form-item>
        <el-form-item label="描述" prop="title">
          <el-input v-model="temp.description"/>
        </el-form-item>
        <el-row><el-col :span="12">
        <el-form-item label="菜单权限" prop="title">
          <el-tree
            :data="menu"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        </el-col><el-col :span="12" >
        <el-form-item label="API权限" prop="title">
          <el-tree
            :data="api"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree2"
            highlight-current
            :props="defaultProps2">
          </el-tree>
        </el-form-item>
      </el-col></el-row>
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
  import {add, del, findByRole, getList, update} from '@/api/role'
  import {getMenu} from '@/api/menu'
  import {getApiMenu} from '@/api/user'

  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  export default {
    name: 'SystemList',
    components: {Pagination},
    directives: {waves},
    filters: {
      parseTime: parseTime
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultProps2: {
          children: 'apis',
          label: 'name'
        },
        menu: undefined,
        api:undefined,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
          roleName: undefined
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
        rules: {
          roleName: [{required: true, message: '角色名 is required', trigger: 'blur'}]
        },
        downloadLoading: false,
        temp: {
          id: undefined,
          roleName: '',
          description: '',
          privilege: [],
          api_privilege:[]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getMenu().then(res => {
          console.log(res.data)
          this.menu = res.data
        })
        getApiMenu().then(res => {
          console.log(res.data)
          this.api = res.data
        })
        this.listLoading = false
        if (this.listQuery.roleName !== undefined && this.listQuery.roleName !== '') {
          findByRole(this.listQuery.page, this.listQuery.limit, this.listQuery.roleName).then(response => {
            this.total = response.data.count
            this.list = response.data.docs
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        } else {
          getList(this.listQuery.page, this.listQuery.limit).then(response => {
            this.total = response.data.count
            this.list = response.data.docs
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        }
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          roleName: ''
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
        del(row.roleName).then(() => {
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
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        console.log(row.configItem)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
          this.$refs.tree.setCheckedKeys(row.privilege);
          this.$refs.tree2.setCheckedKeys(row.api_privilege);
        })
      },
      updateData() {
        this.temp.privilege = this.$refs.tree.getCheckedKeys()
        this.temp.api_privilege = this.$refs.tree2.getCheckedKeys()
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
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['roleName']
          const filterVal = ['roleName']
          const data = this.formatJson(filterVal)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '角色列表'
          })
          this.downloadLoading = false
        })
      }
    }
  }
</script>

<style scoped>
</style>
