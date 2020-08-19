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
      <el-table-column label="归属企业" align="center">
        <template slot-scope="scope">
          {{ scope.row.owner }}
        </template>
      </el-table-column>
      <el-table-column label="域名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.domain }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="子域名" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.subdomains }}-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.add_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getList } from '@/api/domain'

export default {
  name: 'DomainList',
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList().then(response => {
        console.log(response)
        this.list = response.data.docs
        this.listLoading = true
        this.listLoading = false
      })
    }
  }
}

</script>

<style scoped>

</style>
