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
          <el-select multiple
                     v-model="temp.to"
                     placeholder="Receiver"
                     clearable
                     class="filter-item"
                     style="width: 100%"
                     @change='changeSelect'
                     @remove-tag='removeTag'
          >
            <el-option label='全选' value='全选' @click.native='selectAll'></el-option>
            <el-option
              v-for="item in receive"
              :key="item._id"
              :label="item.username"
              :value="item._id"
            />
          </el-select>
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
  import {getReceive, sendNotice} from '@/api/notification'
  import Tinymce from '@/components/Tinymce'

  export default {
    name: "sendNotification",
    components: {Tinymce},
    data() {
      return {
        receive: undefined,
        temp: {
          to: [],
          title: '',
          message: ''
        }
      }
    },
    created() {
      this.getReceive()
    },
    methods: {
      resetTemp() {
        this.temp.title = undefined
        this.temp.message = undefined
        this.temp.to = undefined
      },
      submit() {
        sendNotice(this.temp).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Send Successfully',
              type: 'success',
              duration: 2000
            })
            this.resetTemp()
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Send Failed',
              type: 'failure',
              duration: 2000
            })
          }
        })
      },
      getReceive() {
        getReceive().then(res => {
          this.receive = res.data.data
        })
      },
      selectAll() {
        if (this.temp.to.length < this.receive.length) {
          this.temp.to = []
          this.receive.map((item) => {
            this.temp.to.push(item.name)
          })
          this.temp.to.unshift('全选')
        } else {
          this.temp.to = []
        }
      },
      changeSelect(val) {
        if (!val.includes('全选') && val.length === this.receive.length) {
          this.temp.to.unshift('全选')
        } else if (val.includes('全选') && (val.length - 1) < this.receive.length) {
          this.temp.to = this.temp.to.filter((item) => {
            return item !== '全选'
          })
        }
      },
      removeTag(val) {
        if (val === '全选') {
          this.temp.to = []
        }
      }
    }
  }
</script>

<style scoped>

</style>
