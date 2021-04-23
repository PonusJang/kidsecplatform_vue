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
                    @change="handleClientCycleChange"
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
                    @change="handleClientLanChange"
                  />
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">监控目录</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 90px">
                  <el-table
                    :data="client.monitorPath.slice((client.curPage-1)*client.pageSize,client.curPage*client.pageSize)"
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
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteMonitorPath(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="client.curPage"
                    :page-size="client.pageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="client.monitorPath.length"
                  />
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 120px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddMonitorPath"
                  >
                    添加
                  </el-button>
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
                    @change="handleClientUdpChange"
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
                    @change="handleServerLearnChange"
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
                    @change="handleServerOfflinecheckChange"
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
                    :disabled="intelligence.fileApiisDisabled"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    v-show="intelligence.fileApiisDisabled"
                    style="position: relative;left: 25px"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleIntelligenceFileApiChange"
                  />
                  <el-button
                    v-show="!intelligence.fileApiisDisabled"
                    style="position: relative;left: 25px"
                    type="success"
                    icon="el-icon-check"
                    @click="handleIntelligenceFileApiSave"
                  />
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
                    :disabled="intelligence.ipApiisDisabled"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    v-show="intelligence.ipApiisDisabled"
                    style="position: relative;left: 40px"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleIntelligenceIpApiChange"
                  />
                  <el-button
                    v-show="!intelligence.ipApiisDisabled"
                    style="position: relative;left: 40px"
                    type="success"
                    icon="el-icon-check"
                    @click="handleIntelligenceIpApiSave"
                  />
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
                    :disabled="intelligence.regexisDisabled"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    v-show="intelligence.regexisDisabled"
                    style="position: relative;left: 55px"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleIntelligenceRegexChange"
                  />
                  <el-button
                    v-show="!intelligence.regexisDisabled"
                    style="position: relative;left: 55px"
                    type="success"
                    icon="el-icon-check"
                    @click="handleIntelligenceRegexSave"
                  />
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
                    @change="handleIntelligenceSwitchChange"
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
                    :disabled="notice.apiisDisabled"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    v-show="notice.apiisDisabled"
                    style="position: relative;left: 40px"
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleNoticeApiChange"
                  />
                  <el-button
                    v-show="!notice.apiisDisabled"
                    style="position: relative;left: 40px"
                    type="success"
                    icon="el-icon-check"
                    @click="handleNoticeApiSave"
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
                    @change="handleNoticeOnlyhighChange"
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
                    @change="handleNoticeSwitchChange"
                  />
                </el-form-item>
              </el-form>
            </div>
          </tab-pane>
        </keep-alive>
        <keep-alive>
          <tab-pane v-if="activeName=='whitelist'" :type="item.key" @create="showCreatedTimes">
            <div>

              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">文件</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 90px">
                  <el-table
                    :data="whiteList.file.slice((whiteList.fileCurPage-1)*whiteList.filePageSize,whiteList.fileCurPage*whiteList.filePageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="文件" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteWhiteListFile(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="whiteList.fileCurPage"
                    :page-size="whiteList.filePageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="whiteList.file.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 100px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddWhiteListFile"
                  >添加
                  </el-button>
                </el-form-item>
              </el-form>

              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">IP</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 100px">
                  <el-table
                    :data="whiteList.ip.slice((whiteList.ipCurPage-1)*whiteList.ipPageSize,whiteList.ipCurPage*client.ipPageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="IP" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteWhiteListIP(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="whiteList.ipCurPage"
                    :page-size="whiteList.ipPageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="whiteList.ip.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 110px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddWhiteListIP"
                  >添加
                  </el-button>
                </el-form-item>
              </el-form>

              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">进程</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 80px">
                  <el-table
                    :data="whiteList.process.slice((whiteList.processCurPage-1)*whiteList.processPageSize,whiteList.processCurPage*whiteList.processPageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="Process" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteWhiteListProcess(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="whiteList.processCurPage"
                    :page-size="whiteList.processPageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="whiteList.process.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 100px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddWhiteListProcess"
                  >
                    添加
                  </el-button>
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">其他</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 80px">
                  <el-table
                    :data="whiteList.other.slice((whiteList.otherCurPage-1)*whiteList.otherPageSize,whiteList.otherCurPage*whiteList.otherPageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="其他" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteWhiteListOther(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="whiteList.otherCurPage"
                    :page-size="whiteList.otherPageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="whiteList.other.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 100px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddWhiteListOther"
                  >
                    添加
                  </el-button>
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
                <el-form-item style="position: relative;left: 90px">
                  <el-table
                    :data="blackList.file.slice((blackList.fileCurPage-1)*blackList.filePageSize,blackList.fileCurPage*blackList.filePageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="文件" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteBlackListFile(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="blackList.curPage"
                    :page-size="blackList.pageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="blackList.file.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 110px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddBlackListFile"
                  >
                    添加
                  </el-button>
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">IP</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 100px">
                  <el-table
                    :data="blackList.ip.slice((blackList.ipCurPage-1)*blackList.ipPageSize,blackList.ipCurPage*blackList.ipPageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="IP" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteBlackListIP(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="blackList.ipCurPage"
                    :page-size="blackList.ipPageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="blackList.ip.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 120px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddBlackListIP"
                  >
                    添加
                  </el-button>
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">进程</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 80px">
                  <el-table
                    :data="blackList.process.slice((blackList.processCurPage-1)*blackList.processPageSize,blackList.processCurPage*blackList.processPageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="Process" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteBlackListProcess(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="blackList.processCurPage"
                    :page-size="blackList.processPageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="blackList.process.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 120px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddBlackListProcess"
                  >
                    添加
                  </el-button>
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">其他</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 90px">
                  <el-table
                    :data="blackList.other.slice((blackList.otherCurPage-1)*blackList.otherPageSize,blackList.otherCurPage*blackList.otherPageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="其他" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteBlackListOther(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="blackList.otherCurPage"
                    :page-size="blackList.otherPageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="blackList.other.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 120px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddBlackListOther"
                  >
                    添加
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </tab-pane>
        </keep-alive>
        <keep-alive>
          <tab-pane v-if="activeName=='filter'" :type="item.key" @create="showCreatedTimes">
            <div>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">文件</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 90px">
                  <el-table
                    :data="filter.file.slice((filter.fileCurPage-1)*filter.filePageSize,filter.fileCurPage*filter.filePageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="文件" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteFilterFile(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="blackList.curPage"
                    :page-size="blackList.pageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="blackList.file.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 100px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddFilterFile"
                  >
                    添加
                  </el-button>
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">IP</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 100px">
                  <el-table
                    :data="filter.ip.slice((filter.ipCurPage-1)*filter.ipPageSize,filter.ipCurPage*filter.ipPageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="IP" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteFilterIP(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="filter.ipCurPage"
                    :page-size="filter.ipPageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="filter.ip.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 110px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddFilterIP"
                  >
                    添加
                  </el-button>
                </el-form-item>
              </el-form>
              <el-form :inline="true">
                <el-form-item>
                  <span style="display: inline-block">进程</span>
                </el-form-item>
                <el-form-item style="position: relative;left: 80px">
                  <el-table
                    :data="filter.process.slice((filter.processCurPage-1)*filter.processPageSize,filter.processCurPage*filter.processPageSize)"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="Process" align="center" width="250">
                      <template slot-scope="scope">
                        <span class="link-type">{{ scope.row }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
                      <template slot-scope="{row,$index}">
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          type="danger"
                          @click="handleDeleteFilterProcess(row,$index)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    :current-page.sync="filter.processCurPage"
                    :page-size="filter.processPageSize"
                    layout="total,prev,pager,next,jumper"
                    :total="filter.process.length"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 90px"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAddFilterProcess"
                  >
                    添加
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </tab-pane>
        </keep-alive>
        <keep-alive>
          <tab-pane v-if="activeName=='update'" :type="item.key" @create="showCreatedTimes">
            <div>
              <el-form/>
            </div>
          </tab-pane>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <!--  Dialog -->
    <el-dialog title="添加监控目录" :visible.sync="this.client.dialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="目录" prop="title">
          <el-input v-model="temp.monitorPath"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" client.dialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addMonitorPath">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="【白名单】添加文件" :visible.sync="this.whiteList.fileDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="文件" prop="title">
          <el-input v-model="temp.whiteList.file"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" whiteList.fileDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addWhiteListFile">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="【白名单】" :visible.sync="this.whiteList.ipDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="IP" prop="title">
          <el-input v-model="temp.whiteList.ip"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" whiteList.ipDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addWhiteListIP">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="【白名单】" :visible.sync="this.whiteList.processDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="进程" prop="title">
          <el-input v-model="temp.whiteList.process"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" whiteList.processDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addWhiteListProcess">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="【白名单】" :visible.sync="this.whiteList.otherDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="其他" prop="title">
          <el-input v-model="temp.whiteList.other"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" whiteList.otherDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addWhiteListOther">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="【黑名单】添加文件" :visible.sync="this.blackList.fileDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="文件" prop="title">
          <el-input v-model="temp.blackList.file"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" blackList.fileDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addBlackListFile">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="【黑名单】" :visible.sync="this.blackList.ipDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="IP" prop="title">
          <el-input v-model="temp.blackList.ip"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" blackList.ipDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addBlackListIP">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="【黑名单】" :visible.sync="this.blackList.processDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="进程" prop="title">
          <el-input v-model="temp.blackList.process"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" blackList.processDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addBlackListProcess">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="【黑名单】" :visible.sync="this.blackList.otherDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="其他" prop="title">
          <el-input v-model="temp.blackList.other"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" blackList.otherDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addBlackListOther">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="【过滤】" :visible.sync="this.filter.fileDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="文件" prop="title">
          <el-input v-model="temp.filter.file"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" filter.fileDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addFilterFile">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="【过滤】" :visible.sync="this.filter.ipDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="IP" prop="title">
          <el-input v-model="temp.filter.ip"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" filter.ipDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addFilterIP">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="【过滤】" :visible.sync="this.filter.processDialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="进程" prop="title">
          <el-input v-model="temp.filter.process"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" filter.processDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="addFilterProcess">
          确认
        </el-button>
      </div>
    </el-dialog>

    <!--  Dialog -->

  </div>
</template>

<script>
  import {
    getBlackListConfig,
    getClientConfig,
    getFilterConfig,
    getIntelligenceConfig,
    getNoticeConfig,
    getServerConfig,
    getWhiteListConfig, setBlackListConfig,
    setClientConfig, setFilterConfig,
    setIntelligenceConfig,
    setNoticeConfig,
    setServerConfig, setWhiteListConfig
  } from '@/api/hids'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive

  export default {
    name: 'ConfigList',
    components: {},
    directives: {waves},
    filters: {
      parseTime: parseTime
    },
    data() {
      return {
        tabMapOptions: [
          {label: '客户端', key: 'client'},
          {label: '服务端', key: 'server'},
          {label: '威胁情报', key: 'intelligence'},
          {label: '告警', key: 'notice'},
          {label: '白名单', key: 'whitelist'},
          {label: '黑名单', key: 'blacklist'},
          {label: '过滤', key: 'filter'},
          {label: '更新', key: 'update'}
        ],
        activeName: 'client',
        createdTimes: 0,
        temp: {
          monitorPath: '',
          whiteList: {
            file: '',
            ip: '',
            process: '',
            other: ''
          },
          blackList: {
            file: '',
            ip: '',
            process: '',
            other: ''
          },
          filter: {
            file: '',
            ip: '',
            process: '',
            other: ''
          }
        },

        client: {
          dialog: false,
          curPage: 1,
          pageSize: 10,
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
          fileApiisDisabled: true,
          ipApiisDisabled: true,
          regexisDisabled: true,
          switch: undefined,
          ipapi: undefined,
          fileapi: undefined,
          regex: undefined
        },
        notice: {
          apiisDisabled: true,
          switch: undefined,
          onlyhigh: undefined,
          api: undefined
        },
        whiteList: {
          fileDialog: false,
          ipDialog: false,
          processDialog: false,
          otherDialog: false,
          fileCurPage: 1,
          filePageSize: 10,
          ipCurPage: 1,
          ipPageSize: 10,
          processCurPage: 1,
          processPageSize: 10,
          otherCurPage: 1,
          otherPageSize: 10,
          file: undefined,
          ip: undefined,
          process: undefined,
          other: undefined
        },
        blackList: {
          fileDialog: false,
          ipDialog: false,
          processDialog: false,
          otherDialog: false,
          fileCurPage: 1,
          filePageSize: 10,
          ipCurPage: 1,
          ipPageSize: 10,
          processCurPage: 1,
          processPageSize: 10,
          otherCurPage: 1,
          otherPageSize: 10,
          file: undefined,
          ip: undefined,
          process: undefined,
          other: undefined
        },
        filter: {
          fileDialog: false,
          ipDialog: false,
          processDialog: false,
          otherDialog: false,
          fileCurPage: 1,
          filePageSize: 10,
          ipCurPage: 1,
          ipPageSize: 10,
          processCurPage: 1,
          processPageSize: 10,
          file: undefined,
          ip: undefined,
          process: undefined,
          other: undefined
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
          this.client.cycle = res.data.dic.cycle
          this.client.udp = res.data.dic.udp
          this.client.monitorPath = res.data.dic.monitorPath
          this.client.lan = res.data.dic.lan
        })
        getBlackListConfig().then(res => {
          this.blackList.ip = res.data.dic.ip
          this.blackList.file = res.data.dic.file
          this.blackList.process = res.data.dic.process
          this.blackList.other = res.data.dic.other
        })
        getFilterConfig().then(res => {
          this.filter.ip = res.data.dic.ip
          this.filter.file = res.data.dic.file
          this.filter.process = res.data.dic.process
          this.filter.other = res.data.dic.other
        })
        getServerConfig().then(res => {
          this.server.learn = res.data.dic.learn
          this.server.offlinecheck = res.data.dic.offlinecheck
          this.server.cert = res.data.dic.cert
          this.server.privatekey = res.data.dic.privatekey
          this.server.publickey = res.data.dic.publickey
        })
        getWhiteListConfig().then(res => {
          this.whiteList.ip = res.data.dic.ip
          this.whiteList.file = res.data.dic.file
          this.whiteList.process = res.data.dic.process
          this.whiteList.other = res.data.dic.other
        })
        getIntelligenceConfig().then(res => {
          this.intelligence.switch = res.data.dic.switch
          this.intelligence.fileapi = res.data.dic.fileapi
          this.intelligence.ipapi = res.data.dic.ipapi
          this.intelligence.regex = res.data.dic.regex
        })
        getNoticeConfig().then(res => {
          this.notice.switch = res.data.dic.switch
          this.notice.onlyhigh = res.data.dic.onlyhigh
          this.notice.api = res.data.dic.api
        })
      },

      // client
      handleClientCycleChange(value) {
        setClientConfig({key: 'cycle', value: value}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleClientUdpChange(value) {
        setClientConfig({key: 'udp', value: value}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleClientLanChange(value) {
        setClientConfig({key: 'lan', value: value}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDeleteMonitorPath(row, index) {
        setClientConfig({key: 'monitorPath', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddMonitorPath() {
        this.client.dialog = true
      },
      addMonitorPath() {
        setClientConfig({key: 'monitorPath', value: this.temp.monitorPath, action: 'add'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.client.dialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },

      // server
      handleServerLearnChange(value) {
        setServerConfig({key: 'learn', value: value}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleServerOfflinecheckChange(value) {
        setServerConfig({key: 'offlinecheck', value: value}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      // whiteList
      handleDeleteWhiteListFile(row, index) {
        setWhiteListConfig({key: 'file', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddWhiteListFile() {
        this.whiteList.fileDialog = true
      },
      addWhiteListFile() {
        setWhiteListConfig({key: 'file', value: this.temp.whiteList.file, action: 'add'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.client.dialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDeleteWhiteListIP(row, index) {
        setWhiteListConfig({key: 'ip', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddWhiteListIP() {
        this.whiteList.ipDialog = true
      },
      addWhiteListIP() {
        setWhiteListConfig({key: 'ip', value: this.temp.whiteList.ip, action: 'add'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.whiteList.ipDialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDeleteWhiteListProcess(row, index) {
        setWhiteListConfig({key: 'process', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddWhiteListProcess() {
        this.whiteList.processDialog = true
      },
      addWhiteListProcess() {
        setWhiteListConfig({key: 'process', value: this.temp.whiteList.process, action: 'add'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.whiteList.processDialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDeleteWhiteListOther(row, index) {
        setWhiteListConfig({key: 'other', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddWhiteListOther() {
        this.whiteList.otherDialog = true
      },
      addWhiteListOther() {
        setWhiteListConfig({key: 'other', value: this.temp.whiteList.other, action: 'add'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.whiteList.otherDialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },

      // backList
      handleDeleteBlackListFile(row, index) {
        setBlackListConfig({key: 'file', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddBlackListFile() {
        this.blackList.fileDialog = true
      },
      addBlackListFile() {
        setBlackListConfig({key: 'file', value: this.temp.blackList.file, action: 'add'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.client.dialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDeleteBlackListIP(row, index) {
        setBlackListConfig({key: 'ip', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddBlackListIP() {
        this.blackList.ipDialog = true
      },
      addBlackListIP() {
        setBlackListConfig({key: 'ip', value: this.temp.blackList.ip, action: 'add'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.blackList.ipDialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDeleteBlackListProcess(row, index) {
        setBlackListConfig({key: 'process', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddBlackListProcess() {
        this.blackList.processDialog = true
      },
      addBlackListProcess() {
        this.getList()
        setBlackListConfig({key: 'process', value: this.temp.blackList.process, action: 'add'}).then(res => {
          if (res.code === 200) {
            this.blackList.processDialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDeleteBlackListOther(row, index) {
        setBlackListConfig({key: 'other', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddBlackListOther() {
        this.blackList.otherDialog = true
      },
      addBlackListOther() {
        setBlackListConfig({key: 'other', value: this.temp.blackList.other, action: 'add'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.blackList.otherDialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },

      // filter
      handleDeleteFilterFile(row, index) {
        setFilterConfig({key: 'file', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddFilterFile() {
        this.filter.fileDialog = true
      },
      addFilterFile() {
        setFilterConfig({key: 'file', value: this.temp.filter.file, action: 'add'}).then(res => {
          if (res.code === 200) {
            this.filter.dialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDeleteFilterIP(row, index) {
        setFilterConfig({key: 'ip', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddFilterIP() {
        this.filter.ipDialog = true
      },
      addFilterIP() {
        setFilterConfig({key: 'ip', value: this.temp.blackList.ip, action: 'add'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.filter.ipDialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleDeleteFilterProcess(row, index) {
        setFilterConfig({key: 'process', value: row, action: 'delete'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleAddFilterProcess() {
        this.filter.processDialog = true
      },
      addFilterProcess() {
        setFilterConfig({key: 'process', value: this.temp.filter.process, action: 'add'}).then(res => {
          this.getList()
          if (res.code === 200) {
            this.filter.processDialog = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },

      // notice
      handleNoticeApiChange() {
        this.notice.apiisDisabled = false
      },
      handleNoticeApiSave() {
        setNoticeConfig({key: 'switch', value: this.notice.api}).then(res => {
          this.notice.apiisDisabled = true
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleNoticeOnlyhighChange(value) {
        setNoticeConfig({key: 'switch', value: value}).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleNoticeSwitchChange(value) {
        setNoticeConfig({key: 'switch', value: value}).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      // intelligence
      handleIntelligenceSwitchChange(value) {
        setIntelligenceConfig({key: 'switch', value: value}).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleIntelligenceRegexChange() {
        this.intelligence.regexisDisabled = false
      },
      handleIntelligenceRegexSave() {
        setIntelligenceConfig({key: 'intelligence', value: this.intelligence.regex}).then(res => {
          if (res.code === 200) {
            this.intelligence.regexisDisabled = true
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleIntelligenceIpApiChange() {
        this.intelligence.ipApiisDisabled = false
      },
      handleIntelligenceIpApiSave() {
        setIntelligenceConfig({key: 'intelligence', value: this.intelligence.ipapi}).then(res => {
          if (res.code === 200) {
            this.intelligence.ipApiisDisabled = true
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleIntelligenceFileApiChange() {
        this.intelligence.fileApiisDisabled = false
      },
      handleIntelligenceFileApiSave() {
        setIntelligenceConfig({key: 'intelligence', value: this.intelligence.fileapi}).then(res => {
          if (res.code === 200) {
            this.intelligence.fileApiisDisabled = true
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Failure',
              message: 'Update Failed',
              type: 'success',
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
