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
      <div class="block" style="display: inline">
        <el-date-picker
          v-model="listQuery.selectMonth"
          type="month"
          placeholder="选择月"
        />
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :cell-style="changeCellColor"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <div v-if="true" style="display: inline">
        <el-table-column label="IP" align="center" width="130">
          <template slot-scope="scope">
            <span class="link-type">{{ scope.row.ip }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备名称" align="center" width="170">
          <template slot-scope="scope">
            <span class="link-type"> {{ scope.row.assets }}</span>
          </template>
        </el-table-column>
      </div>
      <div v-if="show_before" style="display: inline">
        <el-table-column label="1" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day1)" />
          </template>
        </el-table-column>
        <el-table-column label="2" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day2)" />
          </template>
        </el-table-column>
        <el-table-column label="3" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day3)" />
          </template>
        </el-table-column>
        <el-table-column label="4" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day4)" />
          </template>
        </el-table-column>
        <el-table-column label="5" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day5)" />
          </template>
        </el-table-column>
        <el-table-column label="6" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day6)" />
          </template>
        </el-table-column>
        <el-table-column label="7" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day7)" />
          </template>
        </el-table-column>
        <el-table-column label="8" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day8)" />
          </template>
        </el-table-column>
        <el-table-column label="9" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day9)" />
          </template>
        </el-table-column>
        <el-table-column label="10" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day10)" />
          </template>
        </el-table-column>
        <el-table-column label="11" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day11)" />
          </template>
        </el-table-column>
        <el-table-column label="12" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day12)" />
          </template>
        </el-table-column>
        <el-table-column label="13" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day13)" />
          </template>
        </el-table-column>
        <el-table-column label="14" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day14)" />
          </template>
        </el-table-column>
        <el-table-column label="15" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day15)" />
          </template>
        </el-table-column>
      </div>
      <div v-if="show_after" style="display: inline">
        <el-table-column label="16" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day16)" />
          </template>
        </el-table-column>
        <el-table-column label="17" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day17)" />
          </template>
        </el-table-column>
        <el-table-column label="18" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day18)" />
          </template>
        </el-table-column>
        <el-table-column label="19" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day19)" />
          </template>
        </el-table-column>
        <el-table-column label="20" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope, scope.row.day20)" />
          </template>
        </el-table-column>
        <el-table-column label="21" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html=" resultFormat(scope,scope.row.day21)" />
          </template>
        </el-table-column>
        <el-table-column label="22" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html=" resultFormat(scope,scope.row.day22 )" />
          </template>
        </el-table-column>
        <el-table-column label="23" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope,scope.row.day23 )" />
          </template>
        </el-table-column>
        <el-table-column label="24" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html=" resultFormat(scope,scope.row.day24)" />
          </template>
        </el-table-column>
        <el-table-column label="25" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html=" resultFormat(scope,scope.row.day25)" />
          </template>
        </el-table-column>
        <el-table-column label="26" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html=" resultFormat(scope,scope.row.day26)" />
          </template>
        </el-table-column>
        <el-table-column label="27" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html=" resultFormat(scope,scope.row.day27)" />
          </template>
        </el-table-column>
        <el-table-column label="28" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html=" resultFormat(scope,scope.row.day28 )" />
          </template>
        </el-table-column>
        <el-table-column label="29" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html=" resultFormat(scope,scope.row.day29)" />
          </template>
        </el-table-column>
        <el-table-column label="30" align="center">
          <template slot-scope="scope">
            <span class="link-type" v-html="resultFormat(scope,scope.row.day30)" />
          </template>
        </el-table-column>
        <div v-if="false" style="display:inline;">
          <el-table-column label="31" align="center">
            <template slot-scope="scope">
              <span class="link-type" v-html=" resultFormat(scope,scope.row.day31)" />
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
import { findByAssets, findByMonth, getList } from '@/api/result2'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'Result2List',
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
        assets: undefined,
        selectMonth: null
      },
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
      if (this.listQuery.assets !== undefined && this.listQuery.assets !== '') {
        findByAssets(this.listQuery.page, this.listQuery.limit, this.listQuery.assets).then(response => {
          this.total = response.data.count
          this.list = response.data.docs
          console.log(this.list)
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.month !== undefined && this.listQuery.month !== '') {
        findByMonth(this.listQuery.page, this.listQuery.limit, this.listQuery.selectMonth).then(response => {
          this.total = response.data.count
          this.list = response.data.docs
          console.log(this.list)
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        getList(this.listQuery.page, this.listQuery.limit).then(response => {
          this.total = response.data.count
          this.list = response.data.docs
          console.log(this.list)
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
    changeCellColor({ row, column, rowIndex, columnIndex }) {
      if (this.show_before === true) {
        if (row.day1 === true && columnIndex === 2) {
          return { background: '#4ce23b' }
        } else if (row.day1 === false && columnIndex === 2) {
          return { background: '#e53535' }
        }
        if (row.day2 === true && columnIndex === 3) {
          return { background: '#4ce23b' }
        } else if (row.day2 === false && columnIndex === 3) {
          return { background: '#e53535' }
        }
        if (row.day3 === true && columnIndex === 4) {
          return { background: '#4ce23b' }
        } else if (row.day3 === false && columnIndex === 4) {
          return { background: '#e53535' }
        }
        if (row.day4 === true && columnIndex === 5) {
          return { background: '#4ce23b' }
        } else if (row.day4 === false && columnIndex === 5) {
          return { background: '#e53535' }
        }
        if (row.day5 === true && columnIndex === 6) {
          return { background: '#4ce23b' }
        } else if (row.day5 === false && columnIndex === 6) {
          return { background: '#e53535' }
        }
        if (row.day6 === true && columnIndex === 7) {
          return { background: '#4ce23b' }
        } else if (row.day6 === false && columnIndex === 7) {
          return { background: '#e53535' }
        }
        if (row.day7 === true && columnIndex === 8) {
          return { background: '#4ce23b' }
        } else if (row.day7 === false && columnIndex === 8) {
          return { background: '#e53535' }
        }
        if (row.day8 === true && columnIndex === 9) {
          return { background: '#4ce23b' }
        } else if (row.day8 === false && columnIndex === 9) {
          return { background: '#e53535' }
        }
        if (row.day9 === true && columnIndex === 10) {
          return { background: '#4ce23b' }
        } else if (row.day9 === false && columnIndex === 10) {
          return { background: '#e53535' }
        }
        if (row.day10 === true && columnIndex === 11) {
          return { background: '#4ce23b' }
        } else if (row.day10 === false && columnIndex === 11) {
          return { background: '#e53535' }
        }
        if (row.day11 === true && columnIndex === 12) {
          return { background: '#4ce23b' }
        } else if (row.day11 === false && columnIndex === 12) {
          return { background: '#e53535' }
        }
        if (row.day12 === true && columnIndex === 13) {
          return { background: '#4ce23b' }
        } else if (row.day12 === false && columnIndex === 13) {
          return { background: '#e53535' }
        }
        if (row.day13 === true && columnIndex === 14) {
          return { background: '#4ce23b' }
        } else if (row.day13 === false && columnIndex === 14) {
          return { background: '#e53535' }
        }
        if (row.day14 === true && columnIndex === 15) {
          return { background: '#4ce23b' }
        } else if (row.day14 === false && columnIndex === 15) {
          return { background: '#e53535' }
        }
        if (row.day15 === true && columnIndex === 16) {
          return { background: '#4ce23b' }
        } else if (row.day15 === false && columnIndex === 16) {
          return { background: '#e53535' }
        }
      } else {
        if (row.day16 === true && columnIndex === 2) {
          return { background: '#4ce23b' }
        } else if (row.day16 === false && columnIndex === 2) {
          return { background: '#e53535' }
        }
        if (row.day17 === true && columnIndex === 3) {
          return { background: '#4ce23b' }
        } else if (row.day17 === false && columnIndex === 3) {
          return { background: '#e53535' }
        }
        if (row.day18 === true && columnIndex === 4) {
          return { background: '#4ce23b' }
        } else if (row.day18 === false && columnIndex === 4) {
          return { background: '#e53535' }
        }
        if (row.day19 === true && columnIndex === 5) {
          return { background: '#4ce23b' }
        } else if (row.day19 === false && columnIndex === 5) {
          return { background: '#e53535' }
        }
        if (row.day20 === true && columnIndex === 6) {
          return { background: '#4ce23b' }
        } else if (row.day20 === false && columnIndex === 6) {
          return { background: '#e53535' }
        }
        if (row.day21 === true && columnIndex === 7) {
          return { background: '#4ce23b' }
        } else if (row.day21 === false && columnIndex === 7) {
          return { background: '#e53535' }
        }
        if (row.day22 === true && columnIndex === 8) {
          return { background: '#4ce23b' }
        } else if (row.day22 === false && columnIndex === 8) {
          return { background: '#e53535' }
        }
        if (row.day23 === true && columnIndex === 9) {
          return { background: '#4ce23b' }
        } else if (row.day23 === false && columnIndex === 9) {
          return { background: '#e53535' }
        }
        if (row.day24 === true && columnIndex === 10) {
          return { background: '#4ce23b' }
        } else if (row.day24 === false && columnIndex === 10) {
          return { background: '#e53535' }
        }
        if (row.day25 === true && columnIndex === 11) {
          return { background: '#4ce23b' }
        } else if (row.day25 === false && columnIndex === 11) {
          return { background: '#e53535' }
        }
        if (row.day26 === true && columnIndex === 12) {
          return { background: '#4ce23b' }
        } else if (row.day26 === false && columnIndex === 12) {
          return { background: '#e53535' }
        }
        if (row.day27 === true && columnIndex === 13) {
          return { background: '#4ce23b' }
        } else if (row.day27 === false && columnIndex === 13) {
          return { background: '#e53535' }
        }
        if (row.day28 === true && columnIndex === 14) {
          return { background: '#4ce23b' }
        } else if (row.day28 === false && columnIndex === 14) {
          return { background: '#e53535' }
        }
        if (row.day29 === true && columnIndex === 15) {
          return { background: '#4ce23b' }
        } else if (row.day29 === false && columnIndex === 15) {
          return { background: '#e53535' }
        }
        if (row.day30 === true && columnIndex === 16) {
          return { background: '#4ce23b' }
        } else if (row.day30 === false && columnIndex === 16) {
          return { background: '#e53535' }
        }
        if (row.day31 === true && columnIndex === 17) {
          return { background: '#4ce23b' }
        } else if (row.day31 === false && columnIndex === 17) {
          return { background: '#e53535' }
        }
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
      } else {
        this.show_before = true
        this.show_after = false
      }
    },
    resultFormat(scope, value) {
      if (value === false) {
        return '×'
      } else if (value === true) {
        return '√'
      } else {
        return ''
      }
    },
    parserResult(value) {
      if (value === false) {
        return '×'
      } else if (value === true) {
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
        const filterVal = ['assets', 'ip', 'day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9', 'day10', 'day11', 'day12', 'day13', 'day14', 'day15']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: (new Date().getFullYear()).toString() + '-' + (new Date().getMonth()).toString() + '前15日设备可用监控'
        })
        this.downloadLoading = false
      })
    },
    handleDownload_after_15() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['设备名称', 'IP', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        const filterVal = ['assets', 'ip', 'day16', 'day17', 'day18', 'day19', 'day20', 'day21', 'day22', 'day23', 'day24', 'day25', 'day26', 'day27', 'day28', 'day29', 'day30', 'day31']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: (new Date().getFullYear()).toString() + '-' + (new Date().getMonth()).toString() + '后15日设备可用监控'
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
        console.log(v[j])
        if (reg.test(j)) {
          console.log(this.parserResult(v[j]))
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
