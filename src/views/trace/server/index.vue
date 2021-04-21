<template>
  <div class="container" style="margin-top: 20px;margin-left: 0px">

    <el-row :gutter="20">
      <el-col :span="10"><div style="margin-top: 15%">

        <el-form ref="form" :model="form" label-width="200px" style="width: 400px">
          <el-form-item label="选择系统">
            <el-select v-model="form.systemType" placeholder="请选择操作系统类型" @change="systemTypeChange">
              <el-option label="Windows" value="win"></el-option>
              <el-option label="Linux" value="linux"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择版本">
            <el-select v-model="form.systemVersion" placeholder="请选择操作系统类型">
              <el-option
                v-for="item in versionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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

      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-steps direction="vertical" :active="1">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </div></el-col>
    </el-row>

  </div>
</template>

<script>
  import {serverAnalyse} from "@/api/trace";

  export default {
    name: "index",
    data() {
      return {
        form: {
          systemType: '',
          systemVersion: '',
          ipAddr: '',
          username: '',
          password: ''
        },
        versionOptions: undefined
      }
    },
    methods: {
      systemTypeChange() {
        if (this.form.systemType === 'win') {
          this.form.systemVersion = undefined
          this.versionOptions = [{label: 'Window7', value: 'Windows7'}, {label: 'Window10', value: 'Window10'}]
        } else if (this.form.systemType === 'linux') {
          this.form.systemVersion = undefined
          this.versionOptions = [{label: 'CentOS6', value: 'CentOS6'}, {label: 'CentOS7', value: 'CentOS7'}]
        }
      },
      resetForm() {
        this.form.password = ''
        this.form.ipAddr = ''
        this.form.systemType = ''
        this.form.username = ''
        this.form.systemVersion = ''
      },
      submitForm() {
        serverAnalyse(this.form).then(res => {
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
