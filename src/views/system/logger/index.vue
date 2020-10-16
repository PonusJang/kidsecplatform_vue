<template>

  <div class="app-container">
    <div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          style="width: 250px;"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleRead">
        查询
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
      <el-table-column label="INFO" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.log }}</span>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars

import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import { getList, getLast50 } from '@/api/log'
export default {
  name: 'Logger',
  directives: { waves },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      listLoading: false,
      value: undefined,
      options: null,
      listQuery: {
        logFile: 1
      },
      list: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getList().then(res => {
        this.options = res.data.list
      })
    },

    handleRead() {
      if (this.value !== null && this.value !== undefined && this.value !== '') {
        getLast50(this.value).then(res => {
          this.list = res.data.list
          this.listLoading = false
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
