<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
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
      <!--            <el-table-column align="center" label="ID" width="95">-->
      <!--              <template slot-scope="scope">-->
      <!--                {{ scope.$index }}-->
      <!--              </template>-->
      <!--            </el-table-column>-->
      <el-table-column label="菜单ID" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单名称" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="父菜单" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组件" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.component }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重定向" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.redirect }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.meta.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图标" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.meta.icon }}</span>
        </template>
      </el-table-column>

      <el-table-column label="子菜单" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.children }}</span>
        </template>
      </el-table-column>
      <el-table-column label="隐藏" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.hidden">是</span>
          <span v-if="!scope.row.hidden">否</span>
        </template>
      </el-table-column>

      <el-table-column label="" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
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
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="ID" prop="title">
          <el-input v-model="temp.id"/>
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="父菜单" prop="title">
          <el-input v-model="temp.pid"/>
        </el-form-item>
        <el-form-item label="路径" prop="title">
          <el-input v-model="temp.path"/>
        </el-form-item>
        <el-form-item label="组件" prop="title">
          <el-input v-model="temp.component"/>
        </el-form-item>
        <el-form-item label="重定向" prop="title">
          <el-input v-model="temp.redirect"/>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.meta.title"/>
        </el-form-item>
        <el-form-item label="图标" prop="title">
          <el-input v-model="temp.meta.icon"/>
        </el-form-item>
        <el-form-item label="子菜单" prop="title">
          <el-input v-model="temp.children"/>
        </el-form-item>
        <el-form-item label="隐藏" prop="title">
          <el-switch v-model="temp.hidden"></el-switch>
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
  import {getList, add, del,findByID } from '@/api/menu'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  export default {
    name: 'menuList',
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
          id: [{required: true, message: 'ID is required', trigger: 'blur'}]
        },
        downloadLoading: false,
        temp: {
          id: undefined,
          name:'',
          path:'#',
          component:'#',
          redirect:undefined,
          pid:undefined,
          meta:{
            title:'',
            icon:''
          }
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
          meta:{title: '', icon:''}
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
            filename: '菜单列表'
          })
          this.downloadLoading = false
        })
      }
    }
  }
</script>

<style scoped>
</style>
