<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.owner"
        placeholder="所属部门"
        style="width: 120px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.name"
        placeholder="资产名称"
        style="width: 120px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.type"
        placeholder="资产类别"
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
      <el-button
        v-waves
        :loading="UploadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-upload"
        @click="handleUpload"
      >
        导入EXCEL
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownloadTemplate"
      >
        下载模板
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
              prop="add_time"
              label="CreatedTime"
            />
            <el-table-column
              prop="port"
              label="端口"
              :formatter="set_ip"
            />
            <el-table-column
              prop="service"
              label="服务"
            />
          </el-table>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="资产编号" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资产名称" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人员" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.manager }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资产类别" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP地址" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.add_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleDetail(row)">
            详情
          </el-button>
          <el-button type="primary" size="mini" @click="handleHostScan(row)">
            主机扫描
          </el-button>
          <el-button type="primary" size="mini" @click="handlePortScan(row)">
            端口扫描
          </el-button>
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
    <el-dialog :visible.sync="dialogUploadVisible">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
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
        <el-form-item label="归属部门" prop="title">
          <el-input v-model="temp.owner" />
        </el-form-item>
        <el-form-item label="资产编号" prop="title">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item label="资产名称" prop="title">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="资产类别" prop="title">
          <el-input v-model="temp.type" />
        </el-form-item>
        <el-form-item label="IP地址" prop="title">
          <el-input v-model="temp.ip" />
        </el-form-item>
        <el-form-item label="负责人员" prop="title">
          <el-input v-model="temp.manager" />
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
  add,
  addFromExcel,
  del,
  findByIP,
  findByOwner,
  findByType,
  findByName,
  getList,
  update,
  hostScan,
  portScan,
  getDetail
} from '@/api/assest'
import { parseTime } from '@/utils'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'AssestList',
  components: { Pagination, UploadExcelComponent },
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
        name: undefined,
        owner: undefined,
        ip: undefined,
        type: undefined,
        manager: undefined
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
        owner: [{ required: true, message: '归属单位 is required', trigger: 'blur' }],
        ip: [{ required: true, message: 'IP is required', trigger: 'blur' }],
        type: [{ required: true, message: '资产类型 is required', trigger: 'blur' }],
        name: [{ required: true, message: '资产名称 is required', trigger: 'blur' }],
        manager: [{ required: true, message: '负责人员 is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      UploadLoading: false,
      temp: {
        id: undefined,
        owner: '',
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
    getList() {
      this.listLoading = false
      if (this.listQuery.owner !== undefined && this.listQuery.owner !== '') {
        findByOwner(this.listQuery.page, this.listQuery.limit, this.listQuery.owner).then(response => {
          this.total = response.data.count
          this.list = response.data.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.type !== undefined && this.listQuery.type !== '') {
        findByType(this.listQuery.page, this.listQuery.limit, this.listQuery.type).then(response => {
          this.total = response.data.count
          this.list = response.data.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.ip !== undefined && this.listQuery.ip !== '') {
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
    handleFilter() {
      // this.listQuery.page = 1
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
      console.log(row._id)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleHostScan(row) {
      hostScan(row.ip).then(res => {
        if (res.code === 200 && res.data === true) {
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
        if (res.code === 200 && res.data === true) {
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
    handleUpload() {
      this.dialogUploadVisible = true
    },
    beforeUpload(file) {
      if (file) {
        return true
      }
      this.$message({
        message: '请参照模板上传文件',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      addFromExcel({ results, header }).then(response => {
        getList()
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleDownloadTemplate() {
      const aTag = document.createElement('a')
      aTag.href = '/api/assets/getAssetsTemplate'
      aTag.click()
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
