<template>

  <div class="app-container">
    <div class="filter-container">

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleAdd"
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
          <span class="link-type">
            <json-editor ref="jsonEditor" v-model="scope.row" />
          </span>
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

          <el-button type="primary" size="mini" @click="handleSave(row)">
            保存
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
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
import JsonEditor from '@/components/JsonEditor'

export default {
  name: 'RuleList',
  components: { Pagination, JsonEditor },
  directives: { waves },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      list: null,
      listLoading: false,

      downloadLoading: false,
      temp: {
        id: undefined
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
        this.list = response.data.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined
      }
    },
    handleAdd() {

    },
    handleDelete() {

    },
    handleSave() {

    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['name', 'level', 'description', 'system', 'source', 'rules']
        const filterVal = ['name', 'level', 'description', 'system', 'source', 'rules']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'HIDS检测规则'
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
