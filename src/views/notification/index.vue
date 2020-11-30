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
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模块" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.module }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === false" class="link-type">未读</span>
          <span v-if="scope.row.status === true" class="link-type">已读</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="通告时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.add_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleRead(row, $index)">
            查看
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

    <el-dialog center :title="temp.module" :visible.sync="dialogFormVisible" width="800px">
      <div class="editor-content" v-html="temp.info" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="gotoDetail()">
          查看
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import {getList, read} from '@/api/notification'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination/index' // secondary package based on el-pagination

  export default {
    name: 'Index',
    components: {Pagination},
    directives: {waves},
    filters: {
      parseTime: parseTime
    },
    data() {
      return {
        total: 0,
        list: null,
        listQuery: {
          page: 1,
          limit: 10
        },
        dialogFormVisible: false,
        listLoading: false,
        temp: {
          host:undefined,
          module: undefined,
          info: undefined
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getList(this.listQuery.page, this.listQuery.limit).then(res => {
          this.list = res.data.docs
          this.total = res.data.count
          this.listLoading = false
        })
      },
      gotoDetail() {
        if (temp.module === 'PortScan') {
          this.$router.push({
            name: 'Describe',
            params: {
              type: id,
              host : this.temp.host
            }
          })
        } else if (temp.module === 'GetWebInfo') {
          this.$router.push({
            name: 'Describe',
            params: {
              type: id,
              host : this.temp.host
            }
          })
        } else if (temp.module === 'HostScan') {
          this.$router.push({
            name: 'Describe',
            params: {
              type: id,
              host : this.temp.host
            }
          })
        }
      },
      handleRead(row, index) {
        read(row._id)
        this.dialogFormVisible = true
        this.temp.host = row.title
        this.temp.module = row.module
        this.temp.info = row.info
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
