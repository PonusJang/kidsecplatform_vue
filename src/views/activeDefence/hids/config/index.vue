<template>
  <div class="tab-container">

    <el-tabs v-model="activeName" style="margin-top:10px;position: relative; left: 10px;" type="border-card">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        style="margin: 25px;position: relative;left: 10px"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane v-if="activeName=='client'" :type="item.key" @create="showCreatedTimes">
            <div>
              <el-form :inline="true">
                <el-form-item>
                  间隔
                </el-form-item>
                <el-form-item>
                  <el-input-number
                    v-model="client.cycle"
                    style="display: inline-block;position: relative;left:120px"
                    :min="1"
                    :max="10"
                    label="描述文字"
                    @change="handleChange"
                  />
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  内网连接
                </el-form-item>
                <el-form-item>
                  <el-switch
                    v-model="client.lan"
                    style="display: inline-block;position: relative;left:90px"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">监控目录</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 90px">
                  <el-table
                    :data="client.monitorPath.slice((curPage-1)*pageSize,curPage*pageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="监控目录" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="curPage"
                    :page-size="pageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="client.monitorPath.length"
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 120px" icon="el-icon-circle-plus-outline">添加</el-button>
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  记录UDP
                </el-form-item>
                <el-form-item>
                  <el-switch
                    v-model="client.udp"
                    style="display: inline-block;position: relative;left:90px"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </el-form-item>
              </el-form>
            </div>
          </tab-pane>
        </keep-alive>
        <keep-alive>
          <tab-pane v-if="activeName=='server'" :type="item.key" @create="showCreatedTimes">
            <div>
              <el-form :inline="true">
                <el-form-item>
                  观察模式
                </el-form-item>
                <el-form-item>
                  <el-switch
                    v-model="server.learn"
                    style="display: inline-block;position: relative;left:30px"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  离线告警
                </el-form-item>
                <el-form-item>
                  <el-switch
                    v-model="server.offlinecheck"
                    style="display: inline-block;position: relative;left:30px"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">证书</span>
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="server.cert"
                    style="width: 300px;position: relative;left: 55px"
                    placeholder="请输入内容"
                    :disabled="true"
                  />
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">私钥</span>

                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="server.privatekey"
                    style="width: 300px;position: relative;left: 55px"
                    placeholder="请输入内容"
                    :disabled="true"
                  />
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">公钥</span>

                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="server.publickey"
                    style="width: 300px;position: relative;left: 55px"
                    placeholder="请输入内容"
                    :disabled="true"
                  />
                </el-form-item>
              </el-form>
            </div>
          </tab-pane>
        </keep-alive>
        <keep-alive>
          <tab-pane v-if="activeName=='intelligence'" :type="item.key" @create="showCreatedTimes">
            <div>
              <el-form :inline="true">
                <el-form-item>
                  文件检测接口
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="intelligence.fileapi"
                    style="width: 300px;position: relative;left: 25px"
                    placeholder="请输入内容"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button style="position: relative;left: 25px" type="primary" icon="el-icon-edit" />
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  IP检测接口
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="intelligence.ipapi"
                    style="width: 300px;position: relative;left: 40px"
                    placeholder="请输入内容"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button style="position: relative;left: 40px" type="primary" icon="el-icon-edit" />
                </el-form-item>
              </el-form>

              <el-form :inline="true">
                <el-form-item>
                  正则匹配
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="intelligence.regex"
                    style="width: 300px;position: relative;left: 55px"
                    placeholder="请输入内容"
                    :disabled="true"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button style="position: relative;left: 55px" type="primary" icon="el-icon-edit" />
                </el-form-item>
              </el-form>

              <el-form :inline="true">
                <el-form-item>
                  开关
                </el-form-item>
                <el-form-item>
                  <el-switch
                    v-model="intelligence.switch"
                    style="display: inline-block;position: relative;left:80px"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </el-form-item>
              </el-form>

            </div>
          </tab-pane>
        </keep-alive>
        <keep-alive>
          <tab-pane v-if="activeName=='notice'" :type="item.key" @create="showCreatedTimes">
            <div>
              <el-form :inline="true">
                <el-form-item>
                  通知接口
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="notice.api"
                    style="width: 300px;position: relative;left: 40px"
                    placeholder="请输入内容"
                    :disabled="true"
                  />
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  仅危险告警
                </el-form-item>
                <el-form-item>
                  <el-switch
                    v-model="notice.onlyhigh"
                    style="display: inline-block;position: relative;left:100px"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  开关
                </el-form-item>
                <el-form-item>
                  <el-switch
                    v-model="notice.switch"
                    style="display: inline-block;position: relative;left:140px"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </el-form-item>
              </el-form>
            </div>
          </tab-pane>
        </keep-alive>
        <keep-alive>
          <tab-pane v-if="activeName=='whitelist'" :type="item.key" @create="showCreatedTimes">
            <div>
              <el-form>
                <el-form-item>
                  <span style="display: inline-block">文件</span>

                </el-form-item>
              </el-form>
              <el-form>
                <el-form-item>
                  <span style="display: inline-block">IP</span>

                </el-form-item>
              </el-form>

              <el-form>
                <el-form-item>
                  <span style="display: inline-block">进程</span>

                </el-form-item>
              </el-form>
              <el-form>
                <el-form-item>
                  <span style="display: inline-block">其他</span>

                </el-form-item>
              </el-form>
            </div>
          </tab-pane>
        </keep-alive>
        <keep-alive>
          <tab-pane v-if="activeName=='blacklist'" :type="item.key" @create="showCreatedTimes">
            <div>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">文件</span>

                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">IP</span>

                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">进程</span>

                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">其他</span>

                </el-form-item>
              </el-form>
            </div>
          </tab-pane>
        </keep-alive>
        <keep-alive>
          <tab-pane v-if="activeName=='filter'" :type="item.key" @create="showCreatedTimes">
            <div>
              <el-form>
                <el-form-item>
                  <span style="display: inline-block">文件</span>

                </el-form-item>
              </el-form>
              <el-form>
                <el-form-item>
                  <span style="display: inline-block">IP</span>

                </el-form-item>
              </el-form>
              <el-form>
                <el-form-item>
                  <span style="display: inline-block">进程</span>

                </el-form-item>
              </el-form>
            </div>
          </tab-pane>
        </keep-alive>
        <keep-alive>
          <tab-pane v-if="activeName=='update'" :type="item.key" @create="showCreatedTimes">
            <div>
              <el-form />
            </div>
          </tab-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getClientConfig,
  getBlackListConfig,
  getFilterConfig,
  getServerConfig,
  getWhiteListConfig,
  getIntelligenceConfig,
  getNoticeConfig
} from '@/api/hids'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'ConfigList',
  components: { },
  directives: { waves },
  filters: {
    parseTime: parseTime
  },
  data() {
    return {
      tabMapOptions: [
        { label: '客户端', key: 'client' },
        { label: '服务端', key: 'server' },
        { label: '威胁情报', key: 'intelligence' },
        { label: '告警', key: 'notice' },
        { label: '白名单', key: 'whitelist' },
        { label: '黑名单', key: 'blacklist' },
        { label: '过滤', key: 'filter' },
        { label: '更新', key: 'update' }
      ],
      activeName: 'client',
      createdTimes: 0,

      client: {
        cycle: undefined,
        udp: undefined,
        lan: undefined,
        monitorPath: undefined
      },
      server: {
        learn: undefined,
        offlinecheck: undefined,
        publickey: undefined,
        privatekey: undefined,
        cert: undefined
      },
      intelligence: {
        switch: undefined,
        ipapi: undefined,
        fileapi: undefined,
        regex: undefined
      },
      notice: {
        switch: undefined,
        onlyhigh: undefined,
        api: undefined
      },
      whiteList: {
        file: undefined,
        ip: undefined,
        process: undefined,
        other: undefined
      },
      blackList: {
        file: undefined,
        ip: undefined,
        process: undefined,
        other: undefined
      },
      filter: {
        file: undefined,
        ip: undefined,
        process: undefined
      }
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    this.getList()
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  inject: ['reload'],
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },
    fresh() {
      this.reload()
    },
    handleChange(value) {
      console.log(value)
    },
    getList() {
      getClientConfig().then(res => {
        console.log(res.data[0].dic[0].cycle)
        this.client.cycle = res.data[0].dic[0].cycle
        this.client.udp = res.data[0].dic[0].udp
        this.client.monitorPath = res.data[0].dic[0].monitorPath
        this.client.lan = res.data[0].dic[0].lan
      })
      getBlackListConfig().then(res => {
        this.blackList.ip = res.data[0].dic[0].ip
        this.blackList.file = res.data[0].dic[0].file
        this.blackList.process = res.data[0].dic[0].process
        this.blackList.other = res.data[0].dic[0].other
      })
      getFilterConfig().then(res => {
        this.filter.ip = res.data[0].dic[0].ip
        this.filter.file = res.data[0].dic[0].file
        this.filter.process = res.data[0].dic[0].process
      })
      getServerConfig().then(res => {
        this.server.learn = res.data[0].dic[0].learn
        this.server.offlinecheck = res.data[0].dic[0].offlinecheck
        this.server.cert = res.data[0].dic[0].cert
        this.server.privatekey = res.data[0].dic[0].privatekey
        this.server.publickey = res.data[0].dic[0].publickey
      })
      getWhiteListConfig().then(res => {
        this.whiteList.ip = res.data[0].dic[0].ip
        this.whiteList.file = res.data[0].dic[0].file
        this.whiteList.process = res.data[0].dic[0].process
        this.whiteList.other = res.data[0].dic[0].other
      })
      getIntelligenceConfig().then(res => {
        this.intelligence.switch = res.data[0].dic[0].switch
        this.intelligence.fileapi = res.data[0].dic[0].fileapi
        this.intelligence.ipapi = res.data[0].dic[0].ipapi
        this.intelligence.regex = res.data[0].dic[0].regex
      })
      getNoticeConfig().then(res => {
        this.notice.switch = res.data[0].dic[0].switch
        this.notice.onlyhigh = res.data[0].dic[0].onlyhigh
        this.notice.api = res.data[0].dic[0].api
      })
    },

    removeMonitorPath(row) {

    },
    addMonitorPath() {

    }

  }
}
</script>

<style scoped>

</style>
