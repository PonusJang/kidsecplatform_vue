<template>
  <div class="container" style="margin-top: 20px;margin-left: 0px">
    <el-form ref="form" :model="form" label-width="200px" style="width: 400px">
      <el-form-item label="选择Web语言">
        <el-select v-model="form.codeType" placeholder="请选择Web语言">
          <el-option label="Php" value="php"></el-option>
          <el-option label="Java" value="java"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Web项目路径">
        <el-input type="text" v-model="form.projPath"></el-input>
      </el-form-item>
      <el-form-item label="Web日志目录路径">
        <el-input type="text" v-model="form.logPath"></el-input>
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input type="text" v-model="form.ipAddr"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input type="text" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="display:flex;margin-left: 200px">
      <el-button @click="resetForm">
        重置
      </el-button>
      <el-button type="primary" @click="submitForm">
        确认
      </el-button>
    </div>
  </div>
</template>

<script>
  import {webAnalyse} from "@/api/trace";

  export default {
    name: "index",
    data() {
      return {
        form: {
          systemType: '',
          systemVersion: '',
          ipAddr: '',
          username: '',
          password: '',
          codeType:'',
          projPath:'',
          logPath:''
        },
        versionOptions: undefined
      }
    },
    methods: {

      resetForm() {
        this.form.password = ''
        this.form.ipAddr = ''
        this.form.codeType =''
        this.form.username = ''

      },
      submitForm() {
        webAnalyse(this.form).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Submit Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Submit Failed',
              type: 'failure',
              duration: 2000
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
