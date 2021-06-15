<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.ip"
        placeholder="IP"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.port"
        placeholder="端口"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.owner"
        placeholder="归属企业"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.service"
        placeholder="服务"
        style="width: 150px;"
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

      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table
            class="demo-table-expand"
            :data="scope.row.open_ports"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="port"
              label="端口"
              align="center"
            />
            <el-table-column
              prop="service"
              label="服务"
              align="center"
            />
            <el-table-column
              prop="add_time"
              label="AddTime"
              align="center"
            />
          </el-table>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="IP" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归属企业" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.add_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>

          <el-button type="primary" size="mini" @click="handleHostScan(row)">
            主机漏扫
          </el-button>

          <el-button type="primary" size="mini" @click="handlePortScan(row)">
            端口扫描
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
        <el-form-item label="IP" prop="title">
          <el-input v-model="temp.ip" />
        </el-form-item>
        <el-form-item label="owner" prop="title">
          <el-input v-model="temp.owner" />
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
import {
  getList,
  update,
  add,
  del,
  findByIP,
  findByOwner,
  findByPort,
  findByService,
  portScan,
  hostScan
} from '@/api/ip'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination/index'

export default {
  name: 'IpList',
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
        owner: undefined,
        ip: undefined,
        port: undefined,
        service: undefined
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
        ip: [{ required: true, message: 'IP is required', trigger: 'blur' }],
        owner: [{ required: true, message: '归属企业 is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      temp: {
        id: undefined,
        ip: '',
        owner: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      if(this.$route.params.type && this.$route.params.ip){
        this.listQuery.ip =  this.$route.params.ip
      }
      this.listLoading = false

      if (this.listQuery.ip !== undefined && this.listQuery.ip !== '') {
        findByIP(this.listQuery.page, this.listQuery.limit, this.listQuery.ip).then(response => {

          this.total = response.data.count
          this.list = response.data.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.owner !== undefined && this.listQuery.owner !== '') {
        findByOwner(this.listQuery.page, this.listQuery.limit, this.listQuery.owner).then(response => {

          this.total = response.data.count
          this.list = response.data.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.port !== undefined && this.listQuery.port !== '') {
        findByPort(this.listQuery.page, this.listQuery.limit, this.listQuery.port).then(response => {

          this.total = response.data.count
          this.list = response.data.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.service !== undefined && this.listQuery.service != '') {
        findByService(this.listQuery.page, this.listQuery.limit, this.listQuery.service).then(response => {

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
        ip: '',
        owner: ''
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
      console.log(row)
      del(row.ip).then(() => {
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
        const tHeader = ['add_time', 'ip']
        const filterVal = ['add_time', 'ip']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'IP列表'
        })
        this.downloadLoading = false
      })
    },
    handleHostScan(row) {
      hostScan(row.ip).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: 'Success',
            message: 'Successfully',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Failure',
            message: 'Task Failed',
            type: 'failure',
            duration: 2000
          })
        }
      })
    },
    handlePortScan(row) {
      portScan(row.ip).then(res => {
        if (res.code === 200 ) {
          this.$notify({
            title: 'Success',
            message: 'Successfully',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Failure',
            message: 'Task Failed',
            type: 'failure',
            duration: 2000
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
    }
  }
}
</script>

<style scoped>
</style>
