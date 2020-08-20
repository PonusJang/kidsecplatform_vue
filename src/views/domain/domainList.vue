<template>

  <div class="app-container">
    <div class="filter-container">

      <div class="filter-container">


        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          新增
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          导出EXCEL
        </el-button>

      </div>
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
      <el-table-column label="归属企业" align="center" >
        <template slot-scope="scope" >
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="域名"  align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.domain }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.add_time  | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>



    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="归属企业" prop="title">
          <el-input v-model="temp.owner" />
        </el-form-item>
        <el-form-item label="域名" prop="title">
          <el-input v-model="temp.domain" />
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
import { getList,update } from '@/api/domain'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'DomainList',
  components: { Pagination },
  directives: { waves },

  filters:{
    parseTime : parseTime,
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
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
        owner: [{ required: true, message: '归属企业 is required', trigger: 'blur' }],
        domain: [{ required: true, message: '域名 is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      temp: {
        id: undefined,
        owner: '',
        domain: '',
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(){
      this.listLoading = false
      getList().then(response => {
        this.list = response.data.count
        this.list = response.data.docs
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },


    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
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
          console.log(tempData)
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
        const tHeader = ['add_time', 'owner', 'domain']
        const filterVal = ['add_time', 'owner', 'domain']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '域名列表'
        })
        this.downloadLoading = false
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

  }
}

</script>

<style scoped>

</style>
