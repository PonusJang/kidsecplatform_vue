<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="targetListQuery.configItem"
        placeholder="域名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleTargetFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleTargetFilter">
        搜索
      </el-button>

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleTargetCreate"
      >
        新增
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleTargetDownload"
      >
        导出EXCEL
      </el-button>

    </div>
    <el-table
      v-loading="listLoading"
      :data="targetList"
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
      <el-table-column label="网址URL" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.param }}</span>
        </template>
      </el-table-column>
      <el-table-column label="TargetID" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.result }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleTargetScan(row)">
            扫描
          </el-button>

          <el-button size="mini" type="danger" @click="handleTargetDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination
      v-show="targetTotal>0"
      :total="targetTotal"
      :page.sync="targetListQuery.page"
      :limit.sync="targetListQuery.limit"
      @pagination="getTargetList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="网址URL" prop="title">
          <el-input v-model="temp.url"/>
        </el-form-item>
        <el-form-item label="描述" prop="title">
          <el-input v-model="temp.desc"/>
        </el-form-item>
        <el-form-item label="危险程度" prop="title">
          <el-input v-model="temp.criticality"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {getTargetList, addTarget, filterTarget, startScan} from '@/api/acunetix'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination'

  export default {
    name: 'targetManager',
    components: {
      Pagination,
    },
    directives: {waves},
    filters: {
      parseTime: parseTime
    },
    data() {
      return {
        targetTotal: 0,
        targetListQuery: {
          page: 1,
          limit: 10,
          param: undefined
        },
        targetList: null,
        listLoading: false,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          create: '新增',
          update: '更新'
        },
        dialogPvVisible: false,
        downloadLoading: false,
        temp: {
          id: undefined,
          url: '',
          desc: '',
          param: '',
          criticality: ''
        },
        tabPosition: 'left'
      }
    },
    created() {
      this.getTargetList()

    },
    methods: {
      getTargetList() {




        this.listLoading = true
        if (this.targetListQuery.param !== undefined && this.targetListQuery.param !== '') {
          filterTarget(this.targetListQuery.page, this.targetListQuery.limit, this.targetListQuery.param).then(response => {
            this.targetTotal = response.data.count
            this.targetList = response.data.docs
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        } else {
          getTargetList(this.targetListQuery.page, this.targetListQuery.limit).then(response => {
            this.targetTotal = response.data.count
            this.targetList = response.data.docs
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        }
      },

      handleTargetFilter() {
        this.targetList.page = 1
        this.getTargetList()
      },
      handleTargetDownload() {
      },
      handleTargetDelete() {
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          url: '',
          desc: '',
          criticality: ''
        }
      },
      handleTargetCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleTargetUpdate() {
      },
      handleTargetScan(row) {
        startScan(row.result).then(res => {
          if (res.data === true) {
            this.$notify({
              title: 'Success',
              message: '扫描任务启动',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: '扫描任务失败',
              type: 'failure',
              duration: 2000
            })
          }
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            addTarget(this.temp).then(() => {
              this.getTargetList()
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
      }
    }
  }
</script>

