<template>
  <div class="app-container">
<div style="margin-left: 10px">
    <el-form >
      <el-form-item label="接收者" >
        <el-input v-model="to"/>
      </el-form-item>
    <el-form-item label="课程简介">
      <tinymce :height="300" v-model="content"/>
    </el-form-item>
    </el-form>

</div>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'

  export default {
        name: "sendNotification",
        components: { Tinymce },
        data:{
          to:undefined,
          title:'',
          content:''
        }
    }
</script>

<style scoped>

</style>
