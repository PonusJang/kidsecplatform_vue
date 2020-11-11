<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.param"
        placeholder="Search"
        style="width: 500px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="dateValue"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="handleFilterByDate"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
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

      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="IP" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.system }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="uptime" label="uptime">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.uptime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Data" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.data }}</span>
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

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { analysis } from '@/api/hids'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination/index'
import { flterByDate } from '@/api/result' // secondary package based on el-pagination
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
        param: undefined
      },
      list: null,
      listLoading: false,
      dateValue: null,
      downloadLoading: false,
      temp: {
        param: undefined
      }
    }
  },
  created() {

  },
  inject: ['reload'],
  methods: {
    fresh() {
      this.reload()
    },
    minDate: '',
    maxDate: '',
    pickerOptions: {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }],
      onPick: ({ maxDate, minDate }) => {
        this.minDate = minDate
        this.maxDate = maxDate
      },
      disabledDate: time => {
        if (this.minDate) {
          return time.getTime() < Date.now() - 30 * 24 * 60 * 60 * 1000 || time > new Date(this.minDate.getTime() + 90 * 24 * 60 * 60 * 1000)
        }
        return time.getTime() < Date.now() - 30 * 24 * 60 * 60 * 1000
      }
    },
    getList() {
      this.listLoading = false

      analysis(this.listQuery.page, this.listQuery.limit, this.param).then(response => {
        this.total = response.data.count
        this.list = response.data.docs
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        param: undefined
      }
    },
    handleFilterByDate(e) {
      if (e === null) {
        this.minDate = ''
        this.maxDate = ''
        this.pickerOptions = {
          disabledDate: time => { // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            if (this.minDate) {
              return time.getTime() < Date.now() - 24 * 60 * 60 * 1000 || time > new Date(this.minDate.getTime() + 90 * 24 * 60 * 60 * 1000)
            }
            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
          }
        }
      } else {
        flterByDate(this.listQuery.page, this.listQuery.limit, this.minDate, this.maxDate).then(response => {
          this.total = response.data.count
          this.list = response.data.docs
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['uptime', 'hostname', 'ip', 'system']
        const filterVal = ['uptime', 'hostname', 'ip', 'system']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'HIDS数据分析结果'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'uptime') {
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
