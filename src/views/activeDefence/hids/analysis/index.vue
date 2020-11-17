<template>

  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.type" style="width: 80px;" placeholder="请选择类型">
        <el-option label="置空" value="" />
        <el-option label="进程" value="process" />
        <el-option label="连接" value="connection" />
        <el-option label="文件" value="file" />
        <el-option label="登录日志" value="loginlog" />
      </el-select>

      <el-input
        v-model="listQuery.searchString"
        placeholder="Search"
        style="width: 400px;"
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
      <el-table-column label="IP" align="center" width="180">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row._source.ip }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="uptime" label="Time" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row._source.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Data" align="center">
        <template slot-scope="scope">
          <div v-for="(value, name, index) in scope.row._source.data " style="display: inline-table">
            <el-tag
              v-if="index === 0"
              :key="name"
              type=""
              effect="dark"
            >
              {{ name }}:
            </el-tag>
            <el-tag
              v-if="index === 0"
              :key="value"
              type="info"
              effect="dark"
              color="#6b8acd"
            >
              {{ value }}
            </el-tag>

            <el-tag
              v-if="index === 1"
              :key="name"
              type="info"
              effect="dark"
            >
              {{ name }}:
            </el-tag>
            <el-tag
              v-if="index === 1"
              :key="value"
              type=""
              color="#7c8b69"
              effect="dark"
            >
              {{ value }}
            </el-tag>
            <el-tag
              v-if="index === 2"
              :key="name"
              type="success"
              effect="dark"
            >
              {{ name }}:
            </el-tag>
            <el-tag
              v-if="index === 2"
              :key="value"
              type="success"
              color="#5fac54"
              effect="dark"
            >
              {{ value }}
            </el-tag>
            <el-tag
              v-if="index === 3"
              :key="name"
              type="info"
              effect="dark"
            >
              {{ name }}:
            </el-tag>
            <el-tag
              v-if="index === 3"
              :key="value"
              type="info"
              color="#7c8b69"
              effect="dark"
            >
              {{ value }}
            </el-tag>
            <el-tag
              v-if="index === 4"
              :key="name"
              type="warning"
              effect="dark"
            >
              {{ name }}:
            </el-tag>
            <el-tag
              v-if="index === 4"
              :key="value"
              type="warning"
              color="#e3cb49"
              effect="dark"
            >
              {{ value }}
            </el-tag>
            <el-tag
              v-if="index === 5"
              :key="name"
              type="danger"
              effect="dark"
            >
              {{ name }}:
            </el-tag>
            <el-tag
              v-if="index === 5"
              :key="value"
              type="danger"
              color="#ee5353"
              effect="dark"
            >
              {{ value }}
            </el-tag>
            <el-tag
              v-if="index === 6"
              :key="name"
              type=""
              effect="dark"
            >
              {{ name }}:
            </el-tag>
            <el-tag
              v-if="index === 6"
              :key="value"
              type=""
              color="#FFFF"
              effect="dark"
            >
              {{ value }}
            </el-tag>
          </div>
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
        type: undefined,
        searchString: undefined
      },
      list: null,
      listLoading: false,
      dateValue: null,
      downloadLoading: false,
      temp: {
        type: undefined,
        searchString: undefined
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

  },
  inject: ['reload'],
  methods: {
    fresh() {
      this.reload()
    },

    getList() {
      this.listLoading = false

      analysis({
        type: this.listQuery.type,
        searchString: this.listQuery.searchString,
        page: this.listQuery.page,
        limit: this.listQuery.limit,
        minDate: this.minDate,
        maxDate: this.maxDate
      }).then(response => {
        this.total = response.data.total
        this.list = response.data.hits
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.listQuery = {
        type: undefined,
        searchString: undefined
      }
      this.minDate = undefined
      this.maxDate = undefined
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
        analysis({
          type: this.listQuery.type,
          searchString: this.listQuery.searchString,
          page: this.listQuery.page,
          limit: this.listQuery.limit,
          minDate: this.minDate,
          maxDate: this.maxDate
        }).then(response => {
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
    },
    formatData(row) {
      const arr = new Array(row.data)
      return arr.join('<br>')
    }
  }
}
</script>

<style scoped>
</style>
