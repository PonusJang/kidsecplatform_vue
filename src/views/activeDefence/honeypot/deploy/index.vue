<template>

  <div class="app-container">
    <div class="filter-container" style="display: flex;margin-bottom: 10px">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-refresh"
        @click="handleRunServer"
        :disabled="disabled"
      >
        Server端启动
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        :disabled="!disabled"
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
          <i v-if="scope.row.es_status === '1'" class="el-icon-success" style="font-size: 25px; color: mediumseagreen"/>
          <i v-if="scope.row.es_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red"/>
        </template>
      </el-table-column>
      <el-table-column label="Ftp" align="center">
        <template slot-scope="scope">
          <i
            v-if="scope.row.ftp_status === '1'"
            class="el-icon-success"
            style="font-size: 25px; color: mediumseagreen"
          />
          <i v-if="scope.row.ftp_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red"/>
        </template>
      </el-table-column>
      <el-table-column label="MySQL" align="center">
        <template slot-scope="scope">
          <i
            v-if="scope.row.mysql_status === '1'"
            class="el-icon-success"
            style="font-size: 25px; color: mediumseagreen"
          />
          <i v-if="scope.row.mysql_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red"/>
        </template>
      </el-table-column>
      <el-table-column label="Redis" align="center">
        <template slot-scope="scope">
          <i
            v-if="scope.row.redis_status === '1'"
            class="el-icon-success"
            style="font-size: 25px; color: mediumseagreen"
          />
          <i v-if="scope.row.redis_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red"/>
        </template>
      </el-table-column>
      <el-table-column label="SSH" align="center">
        <template slot-scope="scope">
          <i
            v-if="scope.row.ssh_status !== '0'"
            class="el-icon-success"
            style="font-size: 25px; color: mediumseagreen"
          />
          <i v-if="scope.row.ssh_status ==='0'" class="el-icon-error" style="font-size: 25px; color: red"/>
        </template>
      </el-table-column>
      <el-table-column label="Telnet" align="center">
        <template slot-scope="scope">
          <i
            v-if="scope.row.telnet_status === '1'"
            class="el-icon-success"
            style="font-size: 25px; color: mediumseagreen"
          />
          <i v-if="scope.row.telnet_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red"/>
        </template>
      </el-table-column>
      <el-table-column label="Tftp" align="center">
        <template slot-scope="scope">
          <i
            v-if="scope.row.tftp_status === '1'"
            class="el-icon-success"
            style="font-size: 25px; color: mediumseagreen"
          />
          <i v-if="scope.row.tftp_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red"/>
        </template>
      </el-table-column>
      <el-table-column label="VNC" align="center">
        <template slot-scope="scope">
          <i
            v-if="scope.row.vnc_status === '1'"
            class="el-icon-success"
            style="font-size: 25px; color: mediumseagreen"
          />
          <i v-if="scope.row.vnc_status !== '1'" class="el-icon-error" style="font-size: 25px; color: red"/>
        </template>
      </el-table-column>
      <el-table-column label="上次更新时间" width="150" align="center">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.last_update_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center"  class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
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
       <el-input type="hidden" v-model="temp.id"/>

        <el-form-item label="Agent" prop="agent_name">
          <el-input v-model="temp.agent_name"/>
        </el-form-item>
        <el-form-item label="IP" prop="ip">
          <el-input v-model="temp.ip"/>
        </el-form-item>
        <el-form-item label="Port" prop="port">
          <el-input v-model="temp.port"/>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():removeData()">
          确认
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
  import {getAgentList, deployAgent, remove, getServerStatus, runServer} from '@/api/honeypot'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive

  export default {
    name: 'DeployIndex',
    directives: {waves},
    filters: {
      parseTime: parseTime
    },
    data() {
      return {
        disabled: false,
        list: null,
        listLoading: false,
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          delete: '删除',
          create: '新增'
        },
        dialogPvVisible: false,
        rules: {
          ip: [{required: true, message: 'IP is required', trigger: 'blur'}],
          port: [{required: true, message: 'Port is required', trigger: 'blur'}],
          username: [{required: true, message: '用户名 is required', trigger: 'blur'}],
          password: [{required: true, message: '密码 is required', trigger: 'blur'}],
          agent_name: [{required: true, message: 'Agent名称 is required', trigger: 'blur'}]
        },
        downloadLoading: false,
        temp: {
          id: undefined,
          ip: '',
          port: '',
          username: '',
          password: '',
          agent_name: ''
        }
      }
    },
    created() {
        this.getServerStatus()
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
          port: '',
          username: '',
          password: '',
          agent_name: ''
        }
      },
      createData() {
        deployAgent(this.temp).then(() => {
          this.list.unshift(this.temp)
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000
          })
        })
      },
      removeData(){
        remove(this.temp).then(() => {
          this.list.unshift(this.temp)
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Deleted Successfully',
            type: 'success',
            duration: 2000
          })
        })
      },
      handleDelete(row, index) {
        this.dialogStatus = 'delete'
        this.dialogFormVisible = true
        this.temp.id = row.id
      },

      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      getServerStatus() {
        getServerStatus().then(res => {
          if (res.data == 3) {
            getList()
            this.disabled = true
            this.$notify({
              title: 'Success',
              message: '服务端运行正常',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: '服务端未启动',
              type: 'failure',
              duration: 2000
            })
          }
        })
      },
      handleRunServer() {
        runServer().then(res => {
          if (res.data == true) {
            this.getServerStatus()
          }
        })
      }
    }
  }
</script>

<style scoped>
</style>
