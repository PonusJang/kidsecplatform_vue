<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="query"
        placeholder="Input: IPv4 / IPv6 / URL / Domain / FileHash / HostName      eg: 69.73.130.198 | mhscommercials.com | http://tacapxaa.com/f.exe"
        style="width: 90%;"
        class="filter-item"
        @keyup.enter.native="handleQuery"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleQuery">
        搜索
      </el-button>
    </div>
    <br>
    <!--Data Show-->
    <div v-if="show" v-model="generalData">

      <el-tabs tab-position="left" style="height: 90%;">
        <!-- general -->
        <el-tab-pane    label="基本信息">
          <div v-if="generalData.base_indicator.type == 'IPv4'">
            经度:{{generalData.longitude}}
            纬度:{{generalData.latitude}}
            whois:{{generalData.whois}}
            国家:{{generalData.country_name}}
            地区：{{generalData.city}},{{generalData.region}}
            国旗地址:{{generalData.flag_url}}
            ASN:{{generalData.asn}}
            信誉值:{{generalData.reputation}}
          </div>
        </el-tab-pane>
        <!-- general -->
        <!-- general -->
        <el-tab-pane label="事件情报">事件情报</el-tab-pane>
        <el-tab-pane label="威胁发现">威胁发现</el-tab-pane>
        <!-- passive_dns -->
        <el-tab-pane  label="反向解析">
          <el-table>

          </el-table>
        </el-tab-pane>
        <!-- passive_dns -->
        <!-- url_list -->
        <el-tab-pane label="相关URL">相关URL</el-tab-pane>
        <!-- url_list -->
        <!-- malware -->
        <el-tab-pane label="恶意软件">malware</el-tab-pane>
        <!-- malware -->
        <el-tab-pane label="相关文件">相关文件</el-tab-pane>
        <!-- http_scans -->
        <el-tab-pane label="HTTP扫描">HTTP扫描</el-tab-pane>
        <!-- http_scans -->
      </el-tabs>

    </div>
    <!--Data Show-->
  </div>
</template>

<script>
import { getIndicators } from '@/api/ioc'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'OsintIndex',
  directives: { waves },
  data() {
    return {
      show: false,
      passive_dns: false,
      related_urls:false,
      http_scans:false,
      related_files:false,
      malware:false,
      query: '',
      generalData: undefined,
      malwareData :undefined,
      reladtedUrlData : undefined
    }
  },
  methods: {
    handleQuery() {
      getIndicators(this.query,undefined).then(res => {
        this.show = true
        this.generalData = res.data

        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
        if(res.data.sections.indexOf('malware') !== -1){
          getIndicators(this.query,'malware').then(res=>{
            this.malwareData = res.data
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
