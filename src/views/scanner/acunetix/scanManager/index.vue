<template>
  <div class="app-container">


    <div class="filter-container">
      <el-input
        v-model="scanListQuery.param"
        placeholder="域名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleScanFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleScanFilter">
        搜索
      </el-button>

      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleScanDownload"
      >
        导出EXCEL
      </el-button>

    </div>
    <el-table
      v-loading="listLoading"
      :data="scanList"
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
      <el-table-column label="网址URL" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.target.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ScanID" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.scan_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.current_session.status }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">

        <template slot-scope="{row,$index}">
          <router-link :to="{path :'webVulnsInfo', query:{url:row.target,scan_id: row.scan_id}}">
            <el-button size="mini" type="primary">
              查看
            </el-button>
          </router-link>
          <el-button size="mini" type="warning" @click="handleScanDown(row,$index)">
            下载
          </el-button>
          <el-button size="mini" type="danger" @click="handleScanDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="scanTotal>0"
      :total="scanTotal"
      :page.sync="scanListQuery.page"
      :limit.sync="scanListQuery.limit"
      @pagination="getScanList"
    />
  </div>
</template>

<script>

  import {
    getStatics,
    getTargetList,
    deleteTarget,
    getScanList,
    addTarget,
    stopScan,
    deleteScan,
    getReports,
    filterScan,
    filterTarget, startScan
  } from '@/api/acunetix'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination'

  export default {
    name: "scanManager",
    components: {
      Pagination,
    },
    directives: {waves},
    filters: {
      parseTime: parseTime
    },
    data() {
      return {
        scanTotal: 0,
        scanListQuery: {
          page: 1,
          limit: 10,
          param: undefined
        },
        scanList: null,
        listLoading: false,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          create: '新增',
          update: '更新'
        },
        dialogPvVisible: false,
        downloadLoading: false,
        temp: {
          id: undefined,
          url: '',
          desc: '',
          param: '',
          criticality: ''
        },
        tabPosition: 'left'
      }
    },
    created() {
      this.getScanList()
    },
    methods: {
      getScanList() {

        this.listLoading = true
        if (this.scanListQuery.param !== undefined && this.scanListQuery.param !== '') {
          filterScan(this.scanListQuery.page, this.scanListQuery.limit, this.scanListQuery.param).then(response => {
            this.scanTotal = response.data.count
            this.scanList = response.data.data
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        } else {
          getScanList(this.scanListQuery.page, this.scanListQuery.limit).then(response => {
            this.scanTotal = response.data.count
            this.scanList = response.data.data
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        }
      },

      resetTemp() {
        this.temp = {
          id: undefined,
          url: '',
          desc: '',
          criticality: ''
        }
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            addTarget(this.temp).then(() => {
              this.getTargetList()
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
      handleScanFilter() {
        this.scanListQuery.page = 1
        this.getScanList()
      },
      handleScanDown(row, index) {
        getReports(row.scan_id).then(res => {
        })
      },
      handleScanDelete(row, index) {
        deleteScan(row.scan_id).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.list.splice(dashboard, 1)
        })
      }
    }
  }
</script>

