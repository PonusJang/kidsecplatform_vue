<template>
  <div class="app-container">
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
      <el-table-column label="用户" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求路径" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="响应值" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.param }}</span>
        </template>
      </el-table-column>
      <el-table-column label="错误信息" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.error }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户端IP" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.clientIP }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Time" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.add_time }}</span>
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
  import Pagination from '@/components/Pagination/index'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import {getList} from '@/api/actionLog'

  export default {
    name: 'actionLog',
    components: {Pagination},
    directives: {waves},
    filters: {
      parseTime: parseTime
    },
    data() {
      return {
        total: 0,
        listLoading: false,
        value: undefined,
        options: null,
        listQuery: {
          limit: 10,
          page: 1
        },
        list: null
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getList(this.listQuery.page, this.listQuery.limit).then(res => {
          this.list = res.data.docs
          this.total = res.data.count
        })
      }
    }
  }
</script>

<style scoped>
</style>
