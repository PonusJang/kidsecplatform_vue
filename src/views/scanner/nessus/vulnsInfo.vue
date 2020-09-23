
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
      :data="data"
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
      <el-table-column label="漏洞名称" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.vt_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="漏洞URL" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.affects_url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="危害程度" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.severity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可信度" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.confidence }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tags" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.tags | formatter }}</span>
        </template>
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
      url: undefined,
      data: undefined,
      downloadLoading: false,
      listLoading: false
    }
  },
  created() {
    this.url = this.$route.query.target
    this.handleScanDetail(this.$route.query.scan_id)
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
          this.data = res.data
          this.listLoading = false
        }
      })
    }
  }
}
</script>

