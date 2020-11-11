<template>

  <div class="app-container">
    <div class="filter-container">

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleDeploy"
      >
        新增规则
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
            :data="scope.row"
            border
            style="width: 100%"
          >
            <el-table-column

              label="规则"
              align="center"
            />

            <el-table-column
              width="200px"
              label="操作"
              align="center"
            ><template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleWebScan(row)">
                编辑
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
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.meta.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="级别" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.meta.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.meta.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.system }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检测源" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column label="启用" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.enabled }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleInfo(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleMonitor(row,$index)">
            删除
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

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getRules } from '@/api/hids'
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
        ip: undefined,
        hostname: undefined,
        system: undefined
      },
      list: null,
      listLoading: false,

      downloadLoading: false,
      temp: {
        id: undefined,
        ip: undefined,
        hostname: undefined,
        system: undefined
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
      this.listLoading = false

      getRules(this.listQuery.page, this.listQuery.limit).then(response => {
        this.total = response.data.count
        this.list = response.data.docs
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        owner: '',
        domain: ''
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
          filename: 'HIDS规则'
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
