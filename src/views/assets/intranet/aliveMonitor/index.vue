<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.param"
        placeholder="Server"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
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
      <el-select
        v-model="listQuery.type"
        placeholder="状态"
        clearable
        class="filter-item"
        style="width: 150px"
        @change="handleSelectStatus"
      >
        <el-option value="true">在线</el-option>
        <el-option value="false">离线</el-option>
      </el-select>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :cell-style="changeCellColor"
      :header-cell-style="{background:'#f6c308',color:'#0a0a0a'}"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Server" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.param }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Alive" align="center">
        <template slot-scope="scope">
          <span class="link-type" v-html="resultFormat(scope, scope.row.result) " />
          <!--          <span class="link-type">{{ scope.row.result }}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="Time" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.add_time |parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
import { findByParam, filterByDate, getList, findByStatus } from '@/api/result'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'SystemList',
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
        param: undefined,
        result: undefined
      },
      dateValue: null,
      list: null,
      listLoading: false,
      downloadLoading: false,
      temp: {
        id: undefined,
        param: '',
        result: ''
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = false
      if (this.listQuery.param !== undefined && this.listQuery.param !== '') {
        findByParam(this.listQuery.page, this.listQuery.limit, this.listQuery.param).then(response => {
          this.total = response.data.count
          this.list = response.data.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.type !== undefined && this.listQuery.type !== '') {
        findByStatus(this.listQuery.page, this.listQuery.limit, this.listQuery.type).then(response => {
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
        param: '',
        result: ''
      }
    },
    resultFormat(scope, value) {
      if (value === 'false') {
        return '×'
      } else if (value === 'true') {
        return '√'
      } else {
        return 'unknown'
      }
    },
    handleSelectStatus() {
      this.listQuery.page = 1
      this.getList()
      this.listQuery.type = undefined
    },
    changeCellColor({ row, column, rowIndex, columnIndex }) {
      if (row.result === 'true') {
        return { background: '#62c758', color: '#0a0a0a' }
      } else if (row.result === 'false') {
        return { background: '#db4040', color: '#0a0a0a' }
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
        filterByDate(this.listQuery.page, this.listQuery.limit, this.minDate, this.maxDate).then(response => {
          this.total = response.data.count
          this.list = response.data.data
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
        const tHeader = ['add_time', 'param', 'result']
        const filterVal = ['add_time', 'param', 'result']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '服务器可用监控'
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
    }
  }
}
</script>

<style scoped>
</style>
