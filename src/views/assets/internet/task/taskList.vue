<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.owner"
        placeholder="任务名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option
          v-for="item in statusOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
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
            :data="scope.row.result"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="add_time"
              label="CreatedTime"
              align="center"
            />
            <el-table-column
              prop="ip"
              label="IP"
              align="center"
            />
            <el-table-column
              prop="port"
              label="端口"
              align="center"
            />
            <el-table-column
              :formatter="stateFormat"
              prop="vuln"
              label="vulnable"
              align="center"
            />
            <el-table-column
              label="操作"
              align="center"
            >
              <el-button type="primary" size="mini" @click="handleUpdate(row)">
                验证
              </el-button>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column label="任务名称" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="插件" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.plugin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.service }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.add_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="完成时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.finished_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
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

    <link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">
    <el-dialog title="新增任务" :visible.sync="dialogFormVisible">
      <el-form
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <div>
          <label class="typo__label" for="ajax">插件</label>
          <multiselect
            id="ajax_plugin"
            v-model="plugin_value"
            label="name"
            track-by="name"
            placeholder="Type to search"
            open-direction="bottom"
            :options="plugin_options"
            :multiple="true"
            :searchable="true"
            :loading="isLoadingPlugin"
            :internal-search="false"
            :clear-on-select="false"
            :close-on-select="false"
            :options-limit="300"
            :limit="3"
            :limit-text="limitTextPlugin"
            :max-height="600"
            :show-no-results="false"
            :hide-selected="true"
            @search-change="asyncFindPlugin"
          >
            <template slot="tag" slot-scope="{ option, remove }"><span
              class="custom__tag"
            ><span>{{ option.name }}</span><span
              class="custom__remove"
              @click="remove(option)"
            >❌</span></span></template>
            <template slot="clear" slot-scope="props">
              <div
                v-if="plugin_value.length"
                class="multiselect__clear"
                @mousedown.prevent.stop="clearAllPlugin(props.search)"
              />
            </template>
            <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
          </multiselect>
          <!--          <pre class="language-json"><code>{{ plugin_value }}</code></pre>-->
        </div>
        <div><br></div>
        <div>
          <label class="typo__label" for="ajax">主机</label>
          <multiselect
            id="ajax_host"
            v-model="host_value"
            label="ip"
            track-by="ip"
            placeholder="Type to search"
            open-direction="bottom"
            :options="host_options"
            :multiple="true"
            :searchable="true"
            :loading="isLoadingHost"
            :internal-search="false"
            :clear-on-select="false"
            :close-on-select="false"
            :options-limit="300"
            :limit="3"
            :limit-text="limitTextHost"
            :max-height="600"
            :show-no-results="false"
            :hide-selected="true"
            @search-change="asyncFindHost"
          >
            <template slot="tag" slot-scope="{ option, remove }"><span
              class="custom__tag"
            ><span>{{ option.ip }}</span><span
              class="custom__remove"
              @click="remove(option)"
            >❌</span></span></template>
            <template slot="clear" slot-scope="props">
              <div
                v-if="host_value.length"
                class="multiselect__clear"
                @mousedown.prevent.stop="clearAllHost(props.search)"
              />
            </template>
            <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
          </multiselect>
          <!--          <pre class="language-json"><code>{{ host_value }}</code></pre>-->
        </div>
        <div><br></div>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="resetAll()">
            重置
          </el-button>
          <el-button type="primary" @click="postTask()">
            确认
          </el-button>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getList, add, del, findByName, findByService } from '@/api/task'
import { searchIP } from '@/api/ip'
import { searchPlugin } from '@/api/plugin'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination
import Multiselect from 'vue-multiselect'

const statusOptions = [
  { key: 'START', display_name: '运行中' },
  { key: 'FINISHED', display_name: '完成' }
]

export default {
  name: 'DomainList',
  components: { Pagination, Multiselect },
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
      statusOptions,
      list: null,
      listLoading: false,
      dialogFormVisible: false,
      dialogPvVisible: false,
      downloadLoading: false,
      plugin_options: [],
      plugin_value: [],
      host_options: [],
      host_value: [],
      isLoadingPlugin: false,
      isLoadingHost: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = false
      if (this.listQuery.name !== undefined && this.listQuery.name !== '') {
        findByName(this.listQuery.page, this.listQuery.limit, this.listQuery.name).then(response => {
          this.total = response.data.count
          this.list = response.data.data
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else if (this.listQuery.service !== undefined && this.listQuery.service !== '') {
        findByService(this.listQuery.page, this.listQuery.limit, this.listQuery.domain).then(response => {
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
    stateFormat(row, column) {
      if (row.state === true) {
        return '存在'
      } else {
        return '不存在'
      }
    },
    resetAll() {
      this.host_value = [],
      this.host_options = [],
      this.plugin_value = [],
      this.plugin_options = []
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          add(this.temp).then(() => {
            this.list.unshift(this.temp)
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
    handleDelete(row, index) {
      // console.log(row.domain)
      del(row.name).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.resetAll()
      this.dialogStatus = ''
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    postTask() {
      const data = { plugin: this.plugin_value, host: this.host_value }
      add(data).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      })
    },
    limitTextPlugin(count) {
      return `and ${count} other plugin`
    },
    asyncFindPlugin(query) {
      this.isLoadingPlugin = true
      searchPlugin({ searchkey: query }).then(response => {
        this.plugin_options = response.data.data
        this.isLoadingPlugin = false
      })
    },
    clearAllPlugin() {
      this.plugin_options = []
    },
    limitTextHost(count) {
      return `and ${count} other host`
    },
    asyncFindHost(query) {
      this.isLoadingHost = true
      searchIP({ searchkey: query }).then(response => {
        this.host_options = response.data.data
        this.isLoadingHost = false
      })
    },
    clearAllHost() {
      this.host_options = []
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['add_time', 'owner', 'domain']
        const filterVal = ['add_time', 'owner', 'domain']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '域名列表'
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
