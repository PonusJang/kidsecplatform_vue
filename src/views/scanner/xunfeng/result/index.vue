<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.port"
        placeholder="端口"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.ip"
        placeholder="IP"
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
      <el-table-column label="归属企业" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="端口" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.port }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.service }}</span>
        </template>
      </el-table-column>
      <el-table-column label="漏洞插件" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)">{{ scope.row.plugin }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.last_end_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleCheck(row)">
            验证
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
  import {getResultList, findResultByIP, findResultByPort, check} from '@/api/task'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
  export default {
    name: 'DomainList',
    components: {Pagination},
    directives: {waves},
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
          port: undefined
        },
        list: null,
        listLoading: false,

        downloadLoading: false,
        temp: {
          id: undefined,
          ip: '',
          port: ''
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
        if (this.listQuery.ip !== undefined && this.listQuery.ip !== '') {
          findResultByIP(this.listQuery.page, this.listQuery.limit, this.listQuery.ip).then(response => {
            this.total = response.data.count
            this.list = response.data.data
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        } else if (this.listQuery.port !== undefined && this.listQuery.port !== '') {
          findResultByPort(this.listQuery.page, this.listQuery.limit, this.listQuery.port).then(response => {
            this.total = response.data.count
            this.list = response.data.data
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        } else {
          getResultList(this.listQuery.page, this.listQuery.limit).then(response => {
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
          owner: '',
          domain: ''
        }
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleCheck(row) {
        check({ip: row.ip, port: row.port, plugin: row.plugin}).then(res => {
            //TODO
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['add_time', 'owner', 'ip', 'port']
          const filterVal = ['add_time', 'owner', 'ip', 'port']
          const data = this.formatJson(filterVal)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '漏洞列表'
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
