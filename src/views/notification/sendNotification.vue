<template>
  <div class="app-container">
    <div style="margin-left: 10px">
      <el-form
        ref="dataForm"
        :model="temp"
        label-width="80px"
        style="width: 80%; margin-left:50px;"
      >
        <el-form-item label="接收者">
          <el-input v-model="temp.to"/>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item label="消息">
          <tinymce :height="300"
                   v-model="temp.message"
          />
        </el-form-item>
      </el-form>
      <div style="margin-left:130px;">
        <el-button @click="">
          重置
        </el-button>
        <el-button type="primary" @click="submit">
          确认
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'

  export default {
    name: "sendNotification",
    components: { Tinymce },
    data() {
      return {
        temp:{
          to: undefined,
          title: '',
          message: ''
        }
      }
    },
    methods:{
      submit(){
        console.log(this.temp.message)
      }
    }
  }
</script>

<style scoped>

</style>
