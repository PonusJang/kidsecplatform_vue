
<template>
  <div class="app-container">
    <div class="filter-container" align="right">
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleTargetDownload"
      >
        导出Word
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon=""
        @click="backTo"
      >
        返回
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort="{prop: 'severity', order: 'descending'}"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="漏洞名称" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.plugin_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="漏洞类别" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.plugin_family }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="severity" label="危害程度" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.severity }}</span>
        </template>
      </el-table-column>

      <el-table-column label="" align="center">
        <el-button type="primary" size="mini">
          查看漏洞描述
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getVulnInfo } from '@/api/nessus'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'VulnsInfo',
  directives: { waves },
  data() {
    return {
      list: undefined,
      downloadLoading: false,
      listLoading: false
    }
  },
  created() {
    this.handleScanDetail(this.$route.query.sid)
  },
  methods: {
    formatter: (row, column, scope) => {
      return scope.join(' ')
    },
    backTo() {
      this.$router.go(-1)
    },
    handleScanDetail(sid) {
      this.listLoading = true
      getVulnInfo(sid).then(res => {
        if (res.code === 200) {
          this.list = res.data.data
          this.listLoading = false
        }
      })
    }
  }
}
</script>

