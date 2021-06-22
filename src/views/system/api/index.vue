<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        placeholder="ID"
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
        新增接口组
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
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table
            class="demo-table-expand"
            :data="scope.row.apis"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="number"
              label="ID"
              align="center"
            />
            <el-table-column
              prop="name"
              label="名称"
              align="center"
            />
            <el-table-column
              prop="path"
              label="路径"
              align="center"
            />
            <el-table-column
              prop="method"
              label="方法"
              align="center"
            />
            <el-table-column
              prop="param"
              label="参数"
              align="center"
            />

            <el-table-column
              width="200px"
              label="操作"
              align="center"
            >
              <template slot-scope="{row}">
                <el-button type="primary" size="mini" @click="handleUpdateSub(row)">
                  修改
                </el-button>
                <el-button type="danger" size="mini" @click="handleDeleteSub(row)">
                  删除
                </el-button>
              </template>
            </el-table-column>

          </el-table>

        </template>
      </el-table-column>

      <el-table-column label="API组" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150"  class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-dropdown split-button type="primary" @command="handleCommand">
            操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'edit')">编辑</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'addApi')">新增接口</el-dropdown-item>
              <el-dropdown-item :command="beforeHandleCommand(scope.$index, scope.row,'del')">删除</el-dropdown-item>
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
        <el-form-item label="API组" prop="title">
          <el-input v-model="temp.number"/>
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="temp.name"/>
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

    <el-dialog :title="textMap[dialogStatus2]" :visible.sync="dialogFormVisible2">
      <el-form
        ref="dataForm2"
        :model="temp2"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item  hidden label="API组" prop="title">
          <el-input type="hidden" v-model="temp2.pid"/>
        </el-form-item>
        <el-form-item label="ID" prop="title">
          <el-input v-model="temp2.number"/>
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="temp2.name"/>
        </el-form-item>
        <el-form-item label="路径" prop="title">
          <el-input v-model="temp2.path"/>
        </el-form-item>
        <el-form-item label="方法" prop="title">
          <el-input v-model="temp2.method"/>
        </el-form-item>
        <el-form-item label="参数" prop="title">
          <el-input v-model="temp2.param"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus2==='create'?createDataSub():updateDataSub()">
          确认
        </el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import {getList, del, delSub, add, addSub, update, updateSub} from '@/api/api'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  export default {
    name: 'apiList',
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
        },
        list: null,
        listLoading: false,
        dialogFormVisible: false,
        dialogFormVisible2:false,
        dialogStatus: '',
        dialogStatus2: '',
        textMap: {
          update: 'Edit',
          create: '新增'
        },
        dialogPvVisible: false,
        dialogPvVisible2: false,
        rules: {
          id: [{required: true, message: 'ID is required', trigger: 'blur'}]
        },
        downloadLoading: false,
        temp: {
          id: undefined,
          name: '',
        },
        temp2: {
          pid:undefined,
          id: undefined,
          name: '',
          path: '',
          method: '',
          param: ''
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = false
        if (this.listQuery.id !== undefined && this.listQuery.id !== '') {
          findByID(this.listQuery.page, this.listQuery.limit, this.listQuery.id).then(response => {
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
          name: ''
        }
        this.temp2 = {
          id: undefined,
          name: '',
          path: '',
          method: '',
          param: ''
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
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleAddSub(row) {
        this.resetTemp()
        this.temp2.pid = row.id
        this.dialogStatus2 = 'create'
        this.dialogFormVisible2 = true
        this.$nextTick(() => {
          this.$refs['dataForm2'].clearValidate()
        })
      },
      handleUpdate(row) {
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
          const tHeader = ['id']
          const filterVal = ['id']
          const data = this.formatJson(filterVal)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'API列表'
          })
          this.downloadLoading = false
        })
      },

      createDataSub() {
        this.$refs['dataForm2'].validate((valid) => {
          if (valid) {
            addSub(this.temp2).then(() => {
              this.list.unshift(this.temp2)
              this.dialogFormVisible2 = false
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
      handleDeleteSub(row, index) {
        delSub(row.id).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.list.splice(index, 1)
        })
      },
      handleCreateSub() {
        this.resetTemp()
        this.dialogStatus2 = 'create'
        this.dialogFormVisible2 = true
        this.$nextTick(() => {
          this.$refs['dataForm2'].clearValidate()
        })
      },
      handleUpdateSub(row) {
        this.temp2 = Object.assign({}, row) // copy obj
        this.dialogStatus2 = 'update'
        this.dialogFormVisible2 = true
        this.$nextTick(() => {
          this.$refs['dataForm2'].clearValidate()
        })
      },
      updateDataSub() {
        this.$refs['dataForm2'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp2)
            updateSub(tempData).then(() => {
              const index = this.list.findIndex(v => v._id === this.temp2._id)
              this.list.splice(index, 1, this.temp2)
              this.dialogFormVisible2 = false
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

      beforeHandleCommand(index, row, command) {
        return {
          'index': index,
          'row': row,
          'command': command
        }
      },
      handleCommand(command) {
        switch (command.command) {

          case "addApi"://分配角色
            this.handleCreateSub(command.row);
            break;
          case "edit"://分配角色
            this.handleUpdate(command.row);
            break;
          case "delete"://分配角色
            this.handleDelete(command.row, command.index);
            break;
        }
      }
    }
  }
</script>

<style scoped>
</style>
