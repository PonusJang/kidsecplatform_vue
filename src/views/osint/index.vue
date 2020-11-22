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
    <div v-if="show">

      <el-tabs tab-position="left" style="height: 90%;">
        <!-- general -->
        <el-tab-pane v-model="generalData" label="基本信息">
          <div v-if="generalData.type == 'IPv4'">
            经度:{{ generalData.longitude }}
            纬度:{{ generalData.latitude }}
            whois:{{ generalData.whois }}
            国家:{{ generalData.country_name }}
            地区：{{ generalData.city }},{{ generalData.region }}
            国旗地址:https://otx.alienvault.com{{ generalData.flag_url }}
            ASN:{{ generalData.asn }}
            信誉值:{{ generalData.reputation }}
            <div v-if="reputation" v-model="reputationData"> {{ reputationData }}</div>
          </div>

          <div v-if="generalData.type == 'domain'">
            Alexa:{{ generalData.alexa }}
            whois:{{ generalData.whois }}
          </div>

          <div v-if="whois">
            <el-table
              v-el-table-infinite-scroll="load"
              height="500px"
              :data="whoisData.list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
            >
              <el-table-column align="center" label="ID" width="70">
                <template slot-scope="scope">
                  {{ scope.$index }}
                </template>
              </el-table-column>
              <el-table-column label="RECODE" align="name">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="VALUE" align="name">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.value }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div v-if="generalData.type == 'CVE'">

            description:{{ generalData.description }}
            mitre_url:{{ generalData.mitre_url }}
            nvd_url:{{ generalData.nvd_url }}
            products:{{ generalData.products }}
            cwe:{{ generalData.cwe }}
            cvss:{{ generalData.cvss }}
            cvssv2:{{ generalData.cvssv2 }}
            cvssv3:{{ generalData.cvssv3 }}
            date_created:{{ generalData.date_created }}
            date_modified:{{ generalData.date_modified }}
          </div>
        </el-tab-pane>
        <!-- general -->

        <!-- pulse_info -->
        <el-tab-pane v-if="pulse_info" label="事件情报">
          <div>
            <el-table
              v-el-table-infinite-scroll="load"
              height="550px"
              :data="pulse_info_data.list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
            >
              <el-table-column label="ID" align="center">
                <template slot-scope="scope">
                  <span class="link-type"> {{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="TLP" align="center">
                <template slot-scope="scope">
                  <span class="link-type"> {{ scope.row.TLP }}</span>
                </template>
              </el-table-column>
              <el-table-column label="标题" align="name">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间" align="created">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.created }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                  <el-button type="primary" size="mini" @click="handleRead(row, $index)">
                    查看
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <!-- pulse_info -->

        <!--  -->
        <el-tab-pane v-if="false" label="威胁发现">威胁发现</el-tab-pane>
        <!--  -->

        <!-- passive_dns -->
        <el-tab-pane v-if="passive_dns" label="反向解析">
          <el-table
            v-el-table-infinite-scroll="load"
            height="550px"
            :data="passiveDnsData.list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="ID" width="70">
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="address" align="center">
              <template slot-scope="scope">
                <span class="link-type"> {{ scope.row.address }}</span>
              </template>
            </el-table-column>
            <el-table-column label="hostname" align="center">
              <template slot-scope="scope">
                <span class="link-type"> {{ scope.row.hostname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="asset_type" align="center">
              <template slot-scope="scope">
                <span class="link-type"> {{ scope.row.asset_type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="record_type" align="name">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.record_type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="first" align="created">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.first }}</span>
              </template>
            </el-table-column>
            <el-table-column label="last" align="created">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.last }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- passive_dns -->

        <!-- url_list -->
        <el-tab-pane v-if="related_urls" label="相关URL">
          <el-table
            v-el-table-infinite-scroll="load"
            height="550px"
            :data="reladtedUrlData.list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="ID" width="70">
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="domain" align="center">
              <template slot-scope="scope">
                <span class="link-type"> {{ scope.row.domain }}</span>
              </template>
            </el-table-column>
            <el-table-column label="hostname" align="center">
              <template slot-scope="scope">
                <span class="link-type"> {{ scope.row.hostname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="httpcode" align="center">
              <template slot-scope="scope">
                <span class="link-type"> {{ scope.row.httpcode }}</span>
              </template>
            </el-table-column>
            <el-table-column label="url" align="name">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.url }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" align="created">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <!-- url_list -->

        <!-- malware -->
        <el-tab-pane v-if="malware" label="恶意软件">
          <div>
            <el-table
              :data="malwareData.list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
            >
              <el-table-column align="center" label="ID" width="70">
                <template slot-scope="scope">
                  {{ scope.$index }}
                </template>
              </el-table-column>
              <el-table-column label="avast" align="center">
                <template slot-scope="scope">
                  <span class="link-type"> {{ scope.row.detections.avast }}</span>
                </template>
              </el-table-column>
              <el-table-column label="TLP" align="center">
                <template slot-scope="scope">
                  <span class="link-type"> {{ scope.row.detections.avg }}</span>
                </template>
              </el-table-column>
              <el-table-column label="clamav" align="center">
                <template slot-scope="scope">
                  <span class="link-type"> {{ scope.row.detections.clamav }}</span>
                </template>
              </el-table-column>
              <el-table-column label="msdefender" align="center">
                <template slot-scope="scope">
                  <span class="link-type"> {{ scope.row.detections.msdefender }}</span>
                </template>
              </el-table-column>
              <el-table-column label="hash" align="name">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.hash }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间" align="created">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.datetime_int }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <!-- malware -->

        <!-- file -->
        <el-tab-pane v-if="related_files" label="相关文件">相关文件</el-tab-pane>
        <!-- file -->

        <!-- http_scans -->
        <el-tab-pane v-if="http_scans" label="HTTP扫描">
          <el-table
            :data="httpScansData.list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="ID" width="70">
              <template slot-scope="scope">
                {{ scope.$index }}
              </template>
            </el-table-column>
            <el-table-column label="RECODE" align="name">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="VALUE" align="name">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.value }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- http_scans -->
      </el-tabs>

    </div>
    <!--Data Show-->
  </div>
</template>

<script>
  import { getIndicators } from '@/api/ioc'
  import { parseTime } from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import elTableInfiniteScroll from 'el-table-infinite-scroll'

  export default {
    name: 'OsintIndex',
    directives: { waves, 'el-table-infinite-scroll': elTableInfiniteScroll },
    data() {
      return {
        show: false,
        passive_dns: false,
        pulse_info: false,
        related_urls: false,
        http_scans: false,
        related_files: false,
        malware: false,
        reputation: false,
        whois: false,

        query: '',
        generalData: undefined,
        malwareData: {
          list: undefined,
          count: undefined
        },
        reladtedUrlData: {
          list: undefined,
          count: undefined
        },
        reputationData: undefined,
        passiveDnsData: {
          list: undefined,
          count: undefined
        },
        httpScansData: {
          list: undefined,
          count: undefined
        },
        nidsListData: undefined,
        whoisData: {
          list: undefined,
          count: undefined
        },
        screenshotData: undefined,
        pulse_info_data: {
          list: undefined,
          count: undefined
        }

      }
    },
    methods: {
      formatJson(filterVal) {
        return this.list.map(v => filterVal.map(j => {
          if (j === 'add_time') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      reset() {
        this.show = false,
          this.passive_dns = false,
          this.pulse_info = false,
          this.related_urls = false,
          this.http_scans = false,
          this.related_files = false,
          this.malware = false,
          this.reputation = false,

          this.generalData = undefined,
          this.malwareData.list = undefined,

          this.reladtedUrlData.list = undefined,
          this.reladtedUrlData.count = undefined

        this.reputationData = undefined,
          this.passiveDnsData.list = undefined,
          this.count = undefined,

          this.httpScansData.list = undefined,
          this.httpScansData.count = undefined,

          this.nidsListData = undefined,
          this.whoisData.list = undefined,
          this.whoisData.count = undefined,
          this.screenshotData = undefined,
          this.pulse_info_data.list = undefined,
          this.pulse_info_data.count = undefined
      },
      handleQuery() {
        this.reset()
        getIndicators(this.query, undefined).then(res => {
          this.show = true
          this.generalData = res.data

          if (res.data.pulse_info !== undefined) {
            if (res.data.pulse_info.count) {
              console.log(res.data.pulse_info.pulses)
              this.pulse_info = true
              this.pulse_info_data.list = res.data.pulse_info.pulses
              this.pulse_info_data.count = res.data.count
            }
          }

          if (res.data.sections.indexOf('malware') !== -1) {
            getIndicators(this.query, 'malware').then(res => {
              if (res.data.count) {
                this.malware = true
                this.malwareData.count = res.data.count
                this.malwareData.list = res.data.data
              }
            })
          }
          if (res.data.sections.indexOf('reputation') !== -1) {
            getIndicators(this.query, 'reputation').then(res => {
              this.reputationData = res.data
            })
          }
          if (res.data.sections.indexOf('url_list') !== -1) {
            getIndicators(this.query, 'url_list').then(res => {
              if (res.data.actual_size) {
                this.related_urls = true
                this.reladtedUrlData.count = res.data.actual_size
                this.reladtedUrlData.list = res.data.url_list
              }
            })
          }
          if (res.data.sections.indexOf('passive_dns') !== -1) {
            getIndicators(this.query, 'passive_dns').then(res => {
              if (res.data.count) {
                this.passive_dns = true
                this.passiveDnsData.count = res.data.count
                this.passiveDnsData.list = res.data.passive_dns
              }
            })
          }
          if (res.data.sections.indexOf('http_scans') !== -1) {
            getIndicators(this.query, 'http_scans').then(res => {
              if (res.data.count) {
                this.http_scans = true
                this.httpScansData.count = res.data.count
                this.httpScansData.list = res.data.data
              }
            })
          }
          if (res.data.sections.indexOf('nids_list') !== -1) {
            getIndicators(this.query, 'nids_list').then(res => {
              this.nidsListData = res.data
            })
          }
          if (res.data.sections.indexOf('whois') !== -1) {
            getIndicators(this.query, 'whois').then(res => {
              if (res.data.count) {
                this.whois = true
                this.whoisData.list = res.data.data
                this.whoisData.count = res.data.count
              }
            })
          }
          if (res.data.sections.indexOf('screenshot') !== -1) {
            getIndicators(this.query, 'screenshot').then(res => {
              this.screenshotData = res.data
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
