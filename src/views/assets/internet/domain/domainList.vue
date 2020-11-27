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
            :data="scope.row.subdomains"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="add_time"
              label="CreatedTime"
              align="center"
            />
            <el-table-column
              prop="ip"
              label="IP"
              :formatter="set_ip"
              align="center"
            />
            <el-table-column
              prop="subdomain"
              label="子域名"
              align="center"
            />
            <el-table-column
              prop="web_title"
              label="网站标题"
              :formatter="set_webtitle"
              align="center"
            />
            <el-table-column
              prop="web_tag"
              label="网站指纹"
              :formatter="set_webtag"
              align="center"
            />

            <el-table-column
              width="200px"
              label="操作"
              align="center"
            ><template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleWebScan(row)">
                Web漏扫
              </el-button>
              <el-button type="primary" size="mini" @click="handleGetWebInfo(row)">
                获取指纹
              </el-button>
            </template>
            </el-table-column>

          </el-table>

        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="归属企业" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="域名" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.domain }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="添加时间">
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
          <el-button size="mini" type="danger" @click="handleDeleteAll(row,$index)">
            删除全部
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
import { getList, update, add, del, delAll, findByDomain, findByOwner, getWebInfo, webScan } from '@/api/domain'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
export default {
  name: 'DomainList',
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
        domain: undefined
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
        domain: ''
      }
    }
  },
  created() {
    this.getList()
  },
  inject: ['reload'],
  methods: {
    fresh() {
      this.reload()
    },
    getList() {
      if(this.$route.params.type && this.$route.params.domain){
        this.listQuery.domain =  this.$route.params.domain
      }
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
    set_webtag(row, column) {
      const arr = new Array(row.web_tag)
      return arr.join('<br>').replaceAll('[null]', '')
    },
    set_webtitle(row, column) {
      const arr = new Array(row.web_title)
      return arr.join('<br>')
        .replaceAll(',,', '')
        .replace(/^,/, '')
        .replace(/,$/, '')
    },
    set_ip(row, column) {
      const arr = new Array(row.ip)
      return arr.join('<br>')
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
      // console.log(row.domain)
      del(row.domain).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    handleDeleteAll(row, index) {
      // console.log(row.domain)
      delAll(row.domain, 'delete_all_ip').then(() => {
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
    handleGetWebInfo(row) {
      getWebInfo(row.subdomain).then(res => {
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
    handleWebScan(row) {
      webScan(row.subdomain).then(res => {
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
    }
  }
}
</script>

<style scoped>
</style>
