<template>

  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-refresh"
        @click="handleStartServer"
      >
        Server端启动
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
      <el-table-column label="AgentIP" align="center">
        <template slot-scope="scope">
          <span class="link-type"> {{ scope.row.agent_ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Agent名称" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.agent_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ElasticSearch" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.es_status === '1'" class="el-icon-success" style="font-size: 25px; color: mediumseagreen" />
          <i v-if="scope.row.es_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red" />
        </template>
      </el-table-column>
      <el-table-column label="Ftp" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.ftp_status === '1'" class="el-icon-success" style="font-size: 25px; color: mediumseagreen" />
          <i v-if="scope.row.ftp_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red" />
        </template>
      </el-table-column>
      <el-table-column label="MySQL" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.mysql_status === '1'" class="el-icon-success" style="font-size: 25px; color: mediumseagreen" />
          <i v-if="scope.row.mysql_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red" />
        </template>
      </el-table-column>
      <el-table-column label="Redis" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.redis_status === '1'" class="el-icon-success" style="font-size: 25px; color: mediumseagreen" />
          <i v-if="scope.row.redis_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red" />
        </template>
      </el-table-column>
      <el-table-column label="SSH" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.ssh_status === '1'" class="el-icon-success" style="font-size: 25px; color: mediumseagreen" />
          <i v-if="scope.row.ssh_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red" />
        </template>
      </el-table-column>
      <el-table-column label="Telnet" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.telnet_status === '1'" class="el-icon-success" style="font-size: 25px; color: mediumseagreen" />
          <i v-if="scope.row.telnet_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red" />
        </template>
      </el-table-column>
      <el-table-column label="Tftp" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.tftp_status === '1'" class="el-icon-success" style="font-size: 25px; color: mediumseagreen" />
          <i v-if="scope.row.tftp_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red" />
        </template>
      </el-table-column>
      <el-table-column label="VNC" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.vnc_status === '1'" class="el-icon-success" style="font-size: 25px; color: mediumseagreen" />
          <i v-if="scope.row.vnc_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red" />
        </template>
      </el-table-column>
      <el-table-column label="上次更新时间" width="150" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.last_update_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="info" @click="hanleStartAgent(row,$index)">
            启动
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="IP" prop="ip">
          <el-input v-model="temp.ip" />
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input v-model="temp.passwd" />
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
// eslint-disable-next-line no-unused-vars
import { getAgentList } from '@/api/honeypot'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'DeployIndex',
  directives: { waves },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      list: null,
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: '新增'
      },
      dialogPvVisible: false,
      rules: {
        ip: [{ required: true, message: 'IP is required', trigger: 'blur' }],
        passwd: [{ required: true, message: '密码 is required', trigger: 'blur' }],
        agent_name: [{ required: true, message: 'Agent名称 is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      temp: {
        id: undefined,
        ip: '',
        passwd: '',
        agent_name: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = false
      getAgentList().then(response => {
        this.list = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        ip: '',
        passwd: '',
        agent_name: ''
      }
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
      del(row.configItem).then(() => {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      })
    },

    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>

<style scoped>
</style>
