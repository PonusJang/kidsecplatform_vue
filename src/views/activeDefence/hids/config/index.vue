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
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 120px" icon="el-icon-circle-plus-outline">
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
                          @click="handleDelete(row,$index)"
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 100px"
                    icon="el-icon-circle-plus-outline"
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
                          @click="handleDelete(row,$index)"
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    style="position: relative;left: 110px"
                    icon="el-icon-circle-plus-outline"
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
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 100px" icon="el-icon-circle-plus-outline">
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
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 100px" icon="el-icon-circle-plus-outline">
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
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 110px" icon="el-icon-circle-plus-outline">
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
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 120px" icon="el-icon-circle-plus-outline">
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
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 120px" icon="el-icon-circle-plus-outline">
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
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 120px" icon="el-icon-circle-plus-outline">
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
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 100px" icon="el-icon-circle-plus-outline">
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
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 110px" icon="el-icon-circle-plus-outline">
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
                        <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(row,$index)">
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
                    @current-change="handleCurrentChange"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="position: relative;left: 90px" icon="el-icon-circle-plus-outline">
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
  getBlackListConfig,
  getClientConfig,
  getFilterConfig,
  getIntelligenceConfig,
  getNoticeConfig,
  getServerConfig,
  getWhiteListConfig
} from '@/api/hids'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'ConfigList',
  components: {},
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
        fileCurPage: 1,
        filePageSize: 10,
        ipCurPage: 1,
        ipPageSize: 10,
        processCurPage: 1,
        processPageSize: 10,
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
