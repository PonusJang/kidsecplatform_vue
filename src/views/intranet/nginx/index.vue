<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.owner"
        placeholder="归属企业"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.domain"
        placeholder="域名"
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

      <el-upload
        ref="upload"
        style="display: inline"
        :show-file-list="false"
        :on-success="handleSuccess"
        accept="*"
        action="#"
        :http-request="uploadConf"
        :on-change="handleChange"
        :file-list="fileList"
        name="file"
      >
        <el-button
          v-waves
          type="primary"
          style="margin-left: 10px;"
          class="filter-item"
          icon="el-icon-upload"
          :disabled="!enableUploadBtn"
        >
          导入Nginx配置
        </el-button>
      </el-upload>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        style="margin-left: 10px;"
        @click="handleDownload"
      >
        导出Nginx配置
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
      <el-table-column label="服务器" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.local_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本地端口" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.local_port }}</span>
        </template>
      </el-table-column>
      <el-table-column label="转发IP" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.proxy_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="转发端口" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.proxy_port }}</span>
        </template>
      </el-table-column>
      <el-table-column label="域名" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.domain }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="添加时间"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.add_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
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
        <el-form-item label="服务器" prop="title">
          <el-input v-model="temp.local_ip" />
        </el-form-item>
        <el-form-item label="域名" prop="title">
          <el-input v-model="temp.domain" />
        </el-form-item>
        <el-form-item label="本地端口" prop="title">
          <el-input v-model="temp.local_port" />
        </el-form-item>
        <el-form-item label="转发IP" prop="title">
          <el-input v-model="temp.proxy_ip" />
        </el-form-item>
        <el-form-item label="转发端口" prop="title">
          <el-input v-model="temp.proxy_port" />
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

    <!--    <el-dialog :visible.sync="dialogUploadVisible">-->
    <!--      <el-upload-->
    <!--        class="upload-demo"-->
    <!--        drag-->
    <!--        action="#"-->
    <!--        auto-upload="true"-->
    <!--        multiple-->
    <!--        :on-success="handleSuccess"-->
    <!--        :http-request="uploadNginxConf"-->
    <!--      >-->
    <!--        <i class="el-icon-upload" />-->
    <!--        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
    <!--        &lt;!&ndash;        <div slot="tip" class="el-upload__tip">只能上传conf文件</div>&ndash;&gt;-->
    <!--      </el-upload>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getList, update, add, del, findByDomain, findByOwner, uploadNginxConf } from '@/api/nginx'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'NginxList',
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
        local_ip: undefined,
        domain: undefined
      },
      list: null,
      listLoading: false,
      dialogFormVisible: false,
      enableUploadBtn: true,
      file: '',
      fileList: [],
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: '新增'
      },
      dialogPvVisible: false,
      rules: {
        local_ip: [{ required: true, message: '服务器 is required', trigger: 'blur' }],
        domain: [{ required: true, message: '域名 is required', trigger: 'blur' }],
        proxy_ip: [{ required: true, message: '转发IP is required', trigger: 'blur' }],
        proxy_port: [{ required: true, message: '转发端口 is required', trigger: 'blur' }],
        local_port: [{ required: true, message: '本地端口 is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      uploadLoading: false,
      temp: {
        id: undefined,
        local_ip: '',
        domain: '',
        proxy_ip: '',
        proxy_port: '',
        local_port: ''
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
          this.list = response.data.docs
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.domain !== undefined && this.listQuery.domain !== '') {
        findByDomain(this.listQuery.page, this.listQuery.limit, this.listQuery.domain).then(response => {
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
        owner: '',
        domain: ''
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
      del(row._id).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    handleUpload() {
      this.dialogUploadVisible = true
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
        const tHeader = ['add_time', 'owner', 'domain']
        const filterVal = ['add_time', 'owner', 'domain']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'Nginx映射列表'
        })
        this.downloadLoading = false
      })
    },
    uploadConf(file) {
      this.enableUploadBtn = false
      console.log(file)
      console.log(this.fileList)
      const formData = new FormData()
      formData.append('file', this.file)
      uploadNginxConf(formData).then(() => {
        this.enableUploadBtn = true
      })
    },
    handleChange(file, fileList) {
      this.fileList = [fileList[fileList.length - 1]] // 覆盖
      console.log(fileList[0])
      this.file = file.raw
    },
    handleSuccess() {
      this.enableUploadBtn = true
      this.$notify({
        title: 'Success',
        message: 'Created Successfully',
        type: 'success',
        duration: 2000
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
