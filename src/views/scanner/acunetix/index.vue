<template>
  <div class="app-container">

    <el-tabs :tab-position="tabPosition" style="height: 900px;">

      <el-tab-pane label="Dashboard" name="Dashboard" />

      <el-tab-pane label="目标管理" name="tagetsManger">

        <div class="filter-container">
          <el-input
            v-model="targetListQuery.configItem"
            placeholder="域名"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleTargetFilter"
          />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleTargetFilter">
            搜索
          </el-button>

          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-edit"
            @click="handleTargetCreate"
          >
            新增
          </el-button>
          <el-button
            v-waves
            :loading="downloadLoading"
            class="filter-item"
            type="primary"
            icon="el-icon-download"
            @click="handleTargetDownload"
          >
            导出EXCEL
          </el-button>

        </div>
        <el-table
          v-loading="listLoading"
          :data="targetList"
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
              <span class="link-type"> {{ scope.row.param }}</span>
            </template>
          </el-table-column>
          <el-table-column label="TargetID" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.result }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" @click="handleTargetScan(row)">
                扫描
              </el-button>

              <el-button size="mini" type="danger" @click="handleTargetDelete(row,$index)">
                删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <pagination
          v-show="targetTotal>0"
          :total="targetTotal"
          :page.sync="targetListQuery.page"
          :limit.sync="targetListQuery.limit"
          @pagination="getTargetList"
        />

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form
            ref="dataForm"
            :model="temp"
            label-position="left"
            label-width="70px"
            style="width: 400px; margin-left:50px;"
          >
            <el-form-item label="网址URL" prop="title">
              <el-input v-model="temp.url" />
            </el-form-item>
            <el-form-item label="描述" prop="title">
              <el-input v-model="temp.desc" />
            </el-form-item>
            <el-form-item label="危险程度" prop="title">
              <el-input v-model="temp.criticality" />
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

      </el-tab-pane>
      <el-tab-pane label="任务管理" name="scansManager">

        <div class="filter-container">
          <el-input
            v-model="targetListQuery.param"
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
              <span class="link-type"> {{ scope.row.target }}</span>
            </template>
          </el-table-column>
          <el-table-column label="ScanID" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.scan_id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.status }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">

            <template slot-scope="{row,$index}">
              <router-link :to="{path :'webVulnsInfo/'+ row.scan_id , query:{url:row.target,scan_id: row.scan_id}}">
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
          :page.sync="targetListQuery.page"
          :limit.sync="targetListQuery.limit"
          @pagination="getScanList"
        />

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from 'echarts'
import VCharts from 'v-charts-v2'
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
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'

export default {
  name: 'Index',
  components: {
    Pagination,
    echarts,
    VCharts
  },
  directives: { waves },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      staticsData: undefined,
      activePane: 'Dashboard',
      targetTotal: 0,
      scanTotal: 0,
      targetListQuery: {
        page: 1,
        limit: 10,
        param: undefined
      },
      scanListQuery: {
        page: 1,
        limit: 10,
        param: undefined
      },
      targetList: null,
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
    this.getStatics()
    this.getTargetList()
    this.getScanList()
    // this.handlePane()
  },
  methods: {
    getStatics() {
      getStatics().then(res => {
        this.staticsData = res.data
        console.log(this.staticsData)
      })
    },
    getTargetList() {
      this.listLoading = true
      if (this.targetListQuery.param !== undefined && this.targetListQuery.param !== '') {
        filterTarget(this.targetListQuery.page, this.targetListQuery.limit, this.targetListQuery.param).then(response => {
          this.targetTotal = response.data.count
          this.targetList = response.data.docs
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        getTargetList(this.targetListQuery.page, this.targetListQuery.limit).then(response => {
          this.targetTotal = response.data.count
          this.targetList = response.data.docs
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    },
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
    handleTargetFilter() {
      this.targetList.page = 1
      this.getTargetList()
    },
    handleTargetDownload() {
    },
    handleTargetDelete() {
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        url: '',
        desc: '',
        criticality: ''
      }
    },
    handleTargetCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleTargetUpdate() {
    },
    handleTargetScan(row) {
      startScan(row.result).then(res => {
        if (res.data === true) {
          this.$notify({
            title: 'Success',
            message: '扫描任务启动',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Failure',
            message: '扫描任务失败',
            type: 'failure',
            duration: 2000
          })
        }
      })
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
        this.list.splice(index, 1)
      })
    }
  }
}
</script>
