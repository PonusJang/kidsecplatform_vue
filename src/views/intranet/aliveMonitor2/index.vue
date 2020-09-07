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
        @click="handleDownload_before_15"
      >
        导出上半月
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload_after_15"
      >
        导出下半月
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-refresh"
        @click="switchDays"
      >
        切换
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
      <div v-if="true" style="display: inline">
        <el-table-column label="IP" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备名称" align="center">
          <template slot-scope="scope">
            <span class="link-type"> {{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </div>
      <div v-if="show_before" style="display: inline">
        <el-table-column label="1" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day1) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="2" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="3" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day3 ) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="4" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat( scope.row.day4 ) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="5" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day5 ) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="6" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day6 ) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="7" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day7 ) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="8" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day8) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="9" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day9) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="10" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day10) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="11" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day11) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="12" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day12) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="13" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day13) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="14" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day14) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="15" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day15) }}</span>
          </template>
        </el-table-column>
      </div>
      <div v-if="show_after" style="display: inline">
        <el-table-column label="16" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day16) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="17" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day17) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="18" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day18) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="19" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day19) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="20" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day20) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="21" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day21) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="22" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day22 ) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="23" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day23 ) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="24" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day24) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="25" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day25 ) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="26" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day26) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="27" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day27) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="28" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day28 ) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="29" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day29) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="30" align="center">
          <template slot-scope="scope">
            <span class="link-type">{{ resultFormat(scope.row.day30) }}</span>
          </template>
        </el-table-column>
        <div v-if="false" style="display:inline;">
          <el-table-column label="31" align="center">
            <template slot-scope="scope">
              <span class="link-type">{{ resultFormat(scope.row.day31) }}</span>
            </template>
          </el-table-column>
        </div>
      </div>
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
import { findByParam, getList } from '@/api/result'
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
      show_before: false,
      show_after: true,
      show_31: false,
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
      }
    }
  },
  created() {
    this.getList()
    const today = new Date()
    if (Number(today.getDay()) < 15) {
      this.show_before = true
      this.show_after = false
      this.show_31 = false
    }
  },
  methods: {
    getList() {
      this.listLoading = false
      if (this.listQuery.param !== undefined && this.listQuery.param !== '') {
        findByParam(this.listQuery.page, this.listQuery.limit, this.listQuery.param).then(response => {
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
        param: '',
        result: ''
      }
    },
    switchDays() {
      if (this.show_before === true && this.show_after === false) {
        this.show_before = false
        this.show_after = true
        const month = Number((new Date()).getMonth())
        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
          this.show_31 = true
        }
      }
    },
    resultFormat(scope, value) {
      if (value === 'false') {
        return '×'
      } else if (value === 'true') {
        return '√'
      } else {
        return ''
      }
    },
    parserResult(value) {
      if (value === 'false') {
        return '×'
      } else if (value === 'true') {
        return '√'
      } else {
        return ''
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload_before_15() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['设备名称', 'IP', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
        const filterVal = ['name', 'ip', 'day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10', 'day11', 'day12', 'day13', 'day14', 'day15']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '服务器可用监控'
        })
        this.downloadLoading = false
      })
    },
    handleDownload_after_15() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['设备名称', 'IP', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        const filterVal = ['name', 'ip', 'day16', 'day17', 'day18', 'day19', 'day20', 'day21', 'day22', 'day23', 'day24', 'day25', 'day26', 'day27', 'day28', 'day29', 'day30', 'day31']
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
        }
        const reg = /day/
        if (reg.test(j)) {
          return this.parserResult(v[j])
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
