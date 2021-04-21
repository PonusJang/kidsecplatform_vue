<template>
  <el-container style="margin-top: 10px;margin-left: 20px">
    <el-aside width="300px">

      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree">
      </el-tree>

    </el-aside>
    <el-container>
      <el-header>
        <el-button type="info" icon="el-icon-plus" circle @click="handleCreate"></el-button>
        <el-button type="primary" icon="el-icon-edit" circle @click="handleModify"></el-button>
        <el-button type="success" icon="el-icon-check" circle @click="handleSubmit"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="handleRemove"></el-button>
      </el-header>
      <el-main>
        <div v-if="create">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="请选择类型">
                <el-option label="输入层" value="input"></el-option>
                <el-option label="处理层" value="process"></el-option>
                <el-option label="动作层" value="action"></el-option>
                <el-option label="输出层" value="output"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="名称" v-show="form.type != undefined">
              <el-input v-model="form.name" placeholder="请输入名称" required="true" autosize></el-input>
            </el-form-item>
            <el-form-item label="描述" v-show="form.type != undefined">
              <el-input v-model="form.description" placeholder="" required="true" autosize></el-input>
            </el-form-item>

            <!--      输入层    -->
            <el-form-item label="源" v-show="form.type == 'input'">
              <el-select v-model="form.input_source" placeholder="请选择类型">
                <el-option label="接口" value="api"></el-option>
                <el-option label="数据库" value="database"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接口URL" v-show="form.type == 'input' && form.input_source == 'api'">
              <el-input v-model="form.input_apiUrl" autosize></el-input>
            </el-form-item>
            <el-form-item label="接口方法" v-show="form.type == 'input' && form.input_source == 'api'">
              <el-select v-model="form.input_apiMethod" placeholder="请选择类型">
                <el-option label="GET" value="GET"></el-option>
                <el-option label="POST" value="POST"></el-option>
                <el-option label="PUT" value="PUT"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接口参数" v-show="form.type == 'input' &&form.input_source == 'api'">
              <el-input v-model="form.input_apiParam" autosize></el-input>
            </el-form-item>

            <el-form-item label="数据库类型" v-show="form.type == 'input' && form.input_source == 'database'">
              <el-select v-model="form.input_dbType" placeholder="请选择类型">
                <el-option label="MySQL" value="MySQL"></el-option>
                <el-option label="Oracle" value="Oracle"></el-option>
                <el-option label="SQLServer" value="SQLServer"></el-option>
                <el-option label="ElasticSearch" value="ElasticSearch"></el-option>
                <el-option label="Mongo" value="Mongo"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据库IP" v-show="form.type == 'input' && form.input_source == 'database'">
              <el-input v-model="form.input_ip" autosize></el-input>
            </el-form-item>
            <el-form-item label="数据库端口" v-show="form.type == 'input' && form.input_source == 'database'">
              <el-input v-model="form.input_port" autosize></el-input>
            </el-form-item>
            <el-form-item label="数据集" v-show="form.type == 'input' && form.input_source == 'database'">
              <el-input v-model="form.input_db" autosize></el-input>
            </el-form-item>
            <el-form-item label="用户名" v-show="form.type == 'input' && form.input_source == 'database'">
              <el-input v-model="form.input_user" autosize></el-input>
            </el-form-item>
            <el-form-item label="密码" v-show="form.type == 'input' && form.input_source == 'database'">
              <el-input v-model="form.input_password" autosize></el-input>
            </el-form-item>
            <!--         处理层          -->
            <el-form-item label="数据来源" v-show="form.type == 'process'">
              <el-select v-model="form.processor_source" placeholder="请选择类型">
                <el-option label="接口" value="api"></el-option>
                <el-option label="数据库" value="database"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据库类型" v-show="form.type == 'process' && form.processor_source == 'database'">
              <el-select v-model="form.processor_dbType" placeholder="请选择类型">
                <el-option label="MySQL" value="MySQL"></el-option>
                <el-option label="Oracle" value="Oracle"></el-option>
                <el-option label="SQLServer" value="SQLServer"></el-option>
                <el-option label="ElasticSearch" value="ElasticSearch"></el-option>
                <el-option label="Mongo" value="Mongo"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理器代码" v-show="form.type == 'process'">
              <el-input type="textarea" v-model="form.processor_code"></el-input>
            </el-form-item>
            <!--动作层-->
            <el-form-item label="动作层代码" v-show="form.type == 'action'">
              <el-input type="textarea" v-model="form.action_code"></el-input>
            </el-form-item>
            <!--输出层-->
            <el-form-item label="类型" v-show="form.type == 'output' ">
              <el-select v-model="form.output_type" placeholder="请选择类型">
                <el-option label="邮件" value="email"></el-option>
                <el-option label="短信" value="sms"></el-option>
                <el-option label="钉钉" value="dingding"></el-option>
                <el-option label="微信" value="wechat"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="AccessToken"
                          v-show="form.type == 'output' && (form.output_type == 'dingding'||form.output_type == 'wechat') ">
              <el-input v-model="form.output_accessToken"></el-input>
            </el-form-item>
            <el-form-item label="账号" v-show="form.type == 'output'&& form.output_type == 'email'">
              <el-input v-model="form.output_emailCount"></el-input>
            </el-form-item>
            <el-form-item label="密码" v-show="form.type == 'output'&& form.output_type == 'email'">
              <el-input v-model="form.output_emailPass"></el-input>
            </el-form-item>
            <el-form-item label="smtpHost" v-show="form.type == 'output' && form.output_type == 'email'">
              <el-input v-model="form.output_smtpHost"></el-input>
            </el-form-item>
            <el-form-item label="smtpPort" v-show="form.type == 'output' && form.output_type == 'email'">
              <el-input v-model="form.output_smtpPort"></el-input>
            </el-form-item>
            <el-form-item label="smtpSSL" v-show="form.type == 'output' && form.output_type == 'email'">
              <el-switch v-model="form.output_smtpSSL"></el-switch>
            </el-form-item>
            <!-- 提交 -->
            <el-form-item v-show="form.type != undefined">
              <el-button type="primary" @click="formSubmit">立即创建</el-button>
              <!--              <el-button>取消</el-button>-->
            </el-form-item>
          </el-form>
        </div>
        <div v-if="show||update">
          <el-form ref="atomInfoForm" :model="atomInfo" label-width="100px">
            <el-form-item label="ID" v-show="atomInfo._id != undefined">
              <el-input v-model="atomInfo._id" readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="类型" v-show="atomInfo.type != undefined">
              <el-input v-model="atomInfo.type" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="名称" v-show="atomInfo.name != undefined">
              <el-input v-model="atomInfo.name" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="描述" v-show="atomInfo.description != undefined">
              <el-input v-model="atomInfo.description" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="添加时间" v-show="atomInfo.add_time != undefined">
              <el-input v-model="atomInfo.add_time" :readonly="show"></el-input>
            </el-form-item>
            <!-- 输入层 -->
            <el-form-item label="源" v-show="atomInfo.source != undefined">
              <el-input v-model="atomInfo.source" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="请求URL" v-show="atomInfo.apiUrl != undefined">
              <el-input v-model="atomInfo.apiUrl" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="请求方法" v-show="atomInfo.apiMethod != undefined">
              <el-select v-model="atomInfo.apiMethod" :disabled="show" placeholder="请选择类型">
                <el-option label="GET" value="GET"></el-option>
                <el-option label="POST" value="POST"></el-option>
                <el-option label="PUT" value="PUT"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请求参数" v-show="atomInfo.apiParam != undefined">
              <el-input v-model="atomInfo.apiParam" :readonly="show"></el-input>
            </el-form-item>

            <el-form-item label="数据库类型" v-show="atomInfo.dbType != undefined">
              <el-select v-model="atomInfo.dbType"  :disabled="show" placeholder="请选择类型">
                <el-option label="MySQL" value="MySQL"></el-option>
                <el-option label="Oracle" value="Oracle"></el-option>
                <el-option label="SQLServer" value="SQLServer"></el-option>
                <el-option label="ElasticSearch" value="ElasticSearch"></el-option>
                <el-option label="Mongo" value="Mongo"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="IP" v-show="atomInfo.ip != undefined">
              <el-input v-model="atomInfo.ip" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="端口" v-show="atomInfo.port != undefined">
              <el-input v-model="atomInfo.port" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="用户" v-show="atomInfo.user != undefined">
              <el-input v-model="atomInfo.user" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="密码" v-show="atomInfo.password != undefined">
              <el-input v-model="atomInfo.password" :readonly="show"></el-input>
            </el-form-item>
            <!-- 处理层 -->
            <el-form-item label="处理器代码" v-show="atomInfo.code != undefined && atomInfo.type == 'process'">
              <el-input  type="text" v-model="atomInfo.code" :readonly="show"></el-input>
            </el-form-item>
            <!-- 动作层 -->
            <el-form-item label="动作层代码" v-show="atomInfo.code != undefined && atomInfo.type == 'action'">
              <el-input v-model="atomInfo.code" :readonly="show"></el-input>
            </el-form-item>
            <!-- 输出层 -->
            <el-form-item label="输出类型" v-show="atomInfo.to != undefined">
              <el-input v-model="atomInfo.to" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="AccessToken" v-show="atomInfo.accessToken != undefined">
              <el-input v-model="atomInfo.accessToken" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="账户" v-show="atomInfo.account != undefined">
              <el-input v-model="atomInfo.account" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="密码" v-show="atomInfo.password != undefined">
              <el-input v-model="atomInfo.password" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="SMTP主机" v-show="atomInfo.smtpHost != undefined">
              <el-input v-model="atomInfo.smtpHost" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="SMTP端口" v-show="atomInfo.smtpPort != undefined">
              <el-input v-model="atomInfo.smtpPort" :readonly="show"></el-input>
            </el-form-item>
            <el-form-item label="SMTP SSL" v-show="atomInfo.smtpSSL != undefined">
              <el-input v-model="atomInfo.smtpSSL" :readonly="show"></el-input>
            </el-form-item>
          </el-form>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  import {getAtomTree, getAtom, delAtom, updateAtom, addAtom} from '@/api/orchestration'

  export default {
    name: 'index',

    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },

    },
    created() {
      this.getAtomTree()
    },
    data() {
      return {
        atomInfo: undefined,
        create: false,
        show: false,
        update: false,
        form: {
          type: undefined,
          name: undefined,
          description: undefined,
          input_source: undefined,
          input_apiUrl: undefined,
          input_apiMethod: undefined,
          input_apiParam: undefined,
          input_dbType: undefined,
          input_ip: undefined,
          input_port: undefined,
          input_db: undefined,
          input_user: undefined,
          input_password: undefined,
          processor_source: undefined,
          processor_dbType: undefined,
          processor_code: undefined,
          action_code: undefined,
          output_type: undefined,
          output_accessToken: undefined,
          output_emailCount: undefined,
          output_emailPass: undefined,
          output_smtpHost: undefined,
          output_smtpPort: undefined,
          output_smtpSSL: undefined
        },
        rules: {
          name: [{required: true}]
        },

        filterText: '',
        data: undefined,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },

    methods: {
      getAtomTree() {
        getAtomTree().then(res => {
          this.data = res.data
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        this.create = false
        if([1,2,3,4].indexOf(data.id)==-1){
          getAtom(data.id).then(res => {
            if(res.code == 200){
              this.atomInfo = res.data
              this.show = true
            }
          })
        }
      },
      handleCreate() {
        this.create = true
        this.show = false
        this.update = false
      },
      handleModify() {
        this.show = false
        this.update = true
      },
      handleSubmit() {
        updateAtom(this.atomInfo).then(res => {
          if(res.code == 200){
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            this.getAtomTree()
          }else{
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'failure',
              duration: 2000
            })
          }
        })
      },
      formSubmit() {
        addAtom(this.form).then(res => {
          if(res.code == 200){
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            this.getAtomTree()
            this.create = false
          }else{
            this.$notify({
              title: 'Failure',
              message: 'Created Failed',
              type: 'failure',
              duration: 2000
            })
          }
        })
      },
      handleRemove() {
        delAtom(this.atomInfo._id).then(res=>{
          if(res.code == 200){
            this.$notify({
              title: 'Success',
              message: 'Delete Successfully',
              type: 'success',
              duration: 2000
            })
            this.getAtomTree()
            this.show = false
          }else{
            this.$notify({
              title: 'Failure',
              message: 'Delete Failed',
              type: 'failure',
              duration: 2000
            })
          }
        })
      }
    }
  };
</script>

<style>
</style>
