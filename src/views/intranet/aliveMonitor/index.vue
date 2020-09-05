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
      <el-table-column label="Server" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.param }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Alive" align="center">
        <template slot-scope="scope">
          <span class="link-type" v-html="resultFormat(scope, scope.row.result)" />
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
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        param: undefined,
        result: undefined
      },
      list: null,
      listLoading: false,
      downloadLoading: false,
      temp: {
        id: undefined,
        configItem: '',
        configValue: ''
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
    resultFormat(scope, value) {
      console.log(value)
      if (value === 'false') {
        return '×'
      } else if (value === 'true') {
        return '√'
      } else {
        return 'unknown'
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
