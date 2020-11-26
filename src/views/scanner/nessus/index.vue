<template>
  <div class="app-container">
    <el-tabs :tab-position="tabPosition" style="height: 900px;">
      <el-tab-pane label="Dashboard" name="Dashboard">
        <div class="dashboard-container">
          <componentsPanel @handleSetLineChartData="handleSetLineChartData"/>

          <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:2px;">
            <componentsLine :chart-data="lineChartData"/>
          </el-row>

        </div>
      </el-tab-pane>

      <el-tab-pane label="扫描管理" name="scansManger">
        <div class="filter-container">
          <el-input
            v-model="scanListQuery.configItem"
            placeholder="IP"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleScanFilter"
          />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleScanFilter">
            搜索
          </el-button>

          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            icon="el-icon-edit"
            @click="handleScanCreate"
          >
            新增
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
          <el-table-column label="ip" align="center">
            <template slot-scope="scope">
              <span class="link-type"> {{ scope.row.param }}</span>
            </template>
          </el-table-column>
          <el-table-column label="scan_id" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.result }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{ scope.row.status }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">

              <el-button v-show="row.status !== 'running'" type="primary" size="mini" @click="handleStartScan(row)">
                启动
              </el-button>
              <el-button v-show="row.status === 'running'" type="primary" size="mini" @click="handleResumeScan(row)">
                暂停
              </el-button>
              <el-button v-show="row.status === 'running'" type="primary" size="mini" @click="handleStopScan(row)">
                停止
              </el-button>
              <router-link :to="{path :'hostVulnsInfo/'+ row.result , query:{sid :row.result}}">
                <el-button v-show="row.status === 'completed'" type="primary" size="mini">
                  查看结果
                </el-button>
              </router-link>
              <el-button
                v-show="row.status !== 'running'"
                size="mini"
                type="danger"
                @click="handleScanDelete(row,$index)"
              >
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

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form
            ref="dataForm"
            :model="temp"
            label-position="left"
            label-width="70px"
            style="width: 400px; margin-left:50px;"
          >
            <el-form-item label="任务名称" prop="title" placeholder="IP">
              <el-input v-model="temp.name" />
            </el-form-item>

            <el-form-item label="IP" prop="title" placeholder="IP">
              <el-input v-model="temp.targets" />
            </el-form-item>

            <el-form-item label="策略 " prop="title">
              <el-select
                v-model="temp.uuid"
                placeholder="Policy"
                clearable
                class="filter-item"
                style="width: 330px"
              >
                <el-option
                  v-for="item in policies"
                  :key="item.uuid"
                  :label="item.title"
                  :value="item.uuid"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="createData">
              确认
            </el-button>
          </div>

        </el-dialog>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>

  const lineChartData = {
    intranet_IP: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    intranet_port: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    internet_site: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    internet_IP: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }

  import componentsPanel from './components/panel'
  import componentsLine from './components/line'
  import {mapGetters} from 'vuex'

import {
  getPolicies,
  getStatics,
  getScanList,
  add,
  launch,
  del, filterByIP
} from '@/api/nessus'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'

export default {
  name: 'NessusIndex',
  components: {
    Pagination,
    componentsPanel, componentsLine
  },
  directives: { waves },
  filters: {
    parseTime: parseTime
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      policies: [],
      show: true,
      staticsData: undefined,
      activePane: 'Dashboard',
      scanTotal: 0,
      scanListQuery: {
        page: 1,
        limit: 10,
        param: undefined
      },
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
        name: undefined,
        targets: undefined,
        uuid: undefined
      },
      tabPosition: 'left'
    }
  },
  created() {
    // this.getStatics()
    this.getScanList()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getStatics() {
      getStatics().then(res => {
        this.staticsData = res.data
        console.log(this.staticsData)
      })
    },
    getScanList() {
      this.listLoading = true
      if (this.scanListQuery.param !== undefined && this.scanListQuery.param !== '') {
        filterByIP(this.scanListQuery.page, this.scanListQuery.limit, this.scanListQuery.param).then(response => {
          this.scanTotal = response.data.count
          this.scanList = response.data.docs
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        getScanList(this.scanListQuery.page, this.scanListQuery.limit).then(response => {
          this.scanTotal = response.data.count
          this.scanList = response.data.docs
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: undefined,
        targets: undefined,
        uuid: undefined
      }
    },
    handleScanCreate() {
      getPolicies().then(res => {
        this.policies = res.data.data
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    handleTargetUpdate() {
    },
    handleScanDownload() {
    },
    handleStopScan() {
    },
    handleResumeScan() {
    },
    handleStartScan(row) {
      launch(row.result).then(res => {
        if (res.data) {
          this.$notify({
            title: 'Success',
            message: '扫描任务启动',
            type: 'success',
            duration: 2000
          })
          this.getScanList()
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
          add(this.temp).then(() => {
            this.getScanList()
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
    handleScanDelete(row, index) {
      del(row.result).then(res => {
        if (res.data.data === 'falied') {
          this.$notify({
            title: 'Failed',
            message: 'Delete Failed',
            type: 'failure',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.list.splice(index, 1)
        }
      })
    }
  }
}
</script>
