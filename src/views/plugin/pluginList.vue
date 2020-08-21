<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="插件名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
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
      <el-table-column label="插件" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="脚本名称" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.file_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="危害" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(row)"> {{ scope.row.info }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.add_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getList, del, findByName } from '@/api/plugin'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'PluginList',
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
        name: undefined
      },
      list: null,
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: '新增'
      },
      dialogPvVisible: false,
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = false
      console.log(this.listQuery.ip)
      if (this.listQuery.name != undefined && this.listQuery.name != '') {
        findByName(this.listQuery.page, this.listQuery.limit, this.listQuery.ip).then(response => {
          // console.log(response.data.docs)
          this.total = response.data.count
          this.list = response.data.docs
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        getList(this.listQuery.page, this.listQuery.limit).then(response => {
          // console.log(response.data.docs)
          this.total = response.data.count
          this.list = response.data.docs
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    },
    handleDelete(row, index) {
      console.log(row)
      del(row.ip).then(() => {
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
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
