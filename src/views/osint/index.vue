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
        <el-tab-pane label="基本信息" v-model="generalData">
          <!-- IPv4 BaseInformation-->
          <div v-if="generalData.type == 'IPv4'">

            <el-row :gutter="20">
              <el-col :span="6"><div>
                <span class="el-icon-paperclip"
                      style="padding-top: 5px;position: relative;left: 20px; font-size: 25px;font-family: Arial, Microsoft Yahei, 微软雅黑;font-weight:bold;">{{' '+generalData.indicator}}</span>
              </div></el-col>
              <el-col :span="6" :offset="10"><div>
                <span><img src="#"  style="padding-right: 5px;padding-top: 5px" href="#" alt="VirusTotal"></span>
                <span><img src="#" style="padding-right: 5px;padding-top: 5px" :href="generalData.whois" alt="whois" ></span>
              </div></el-col>
            </el-row>
            <el-divider>Base Information</el-divider>
            <span style="display: inline-flex">
              <span style="padding-left: 10px;margin-top: 3px"><el-image :src="'https://otx.alienvault.com'+geoData.flag_url"></el-image></span>
              <span style="padding-left: 10px">{{generalData.country_name}} {{generalData.city}} {{generalData.region}}</span>
              <span style="padding-left: 50px">{{generalData.asn}}</span>
              <span style="padding-left: 50px">经度:{{generalData.longitude}}</span>
              <span style="padding-left: 10px">纬度:{{generalData.latitude}}</span>
              <span style="padding-left: 50px">信誉值:{{generalData.reputation}}</span>
            </span>
            <div v-if="reputation" v-model="reputationData"> {{reputationData}}</div>
          </div>
          <!-- IPv4 BaseInformation-->
          <!-- Domain BaseInformation-->
          <div v-if="generalData.type == 'domain'">
            <el-row :gutter="20">
              <el-col :span="6"><div>
                <span class="el-icon-paperclip"
                      style="padding-top: 5px;position: relative;left: 20px; font-size: 25px;font-family: Arial, Microsoft Yahei, 微软雅黑;font-weight:bold;">{{' '+generalData.indicator}}</span>
              </div></el-col>
              <el-col :span="6" :offset="10"><div>
                <span><img src="#"  style="padding-right: 5px;padding-top: 5px" :href="generalData.alexa" alt="Alexa"></span>
                <span><img src="#"  style="padding-right: 5px;padding-top: 5px" :href="generalData.whois" alt="whois"></span>
              </div></el-col>
            </el-row>
            <el-divider v-if="geo">Geo</el-divider>
            <span v-if="geo" style="display: inline-flex">
              <span style="padding-left: 10px;margin-top: 3px"><el-image :src="'https://otx.alienvault.com'+geoData.flag_url"></el-image></span>
              <span style="padding-left: 10px">{{geoData.flag_title}}</span>
              <span style="padding-left: 50px">{{geoData.asn}}</span>
              <span style="padding-left: 50px">经度:{{geoData.longitude}}</span>
              <span style="padding-left: 10px">纬度:{{geoData.latitude}}</span>
            </span>
            <el-divider v-if="whois">Whois</el-divider>
            <el-table
              v-el-table-infinite-scroll="load"
              v-if="whois"
              :data="whoisData.list"
              element-loading-text="Loading"
              border
              fit
              highlight-current-row
            >
              <el-table-column label="Name" align="name">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Value" align="name">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.value }}</span>
                </template>
              </el-table-column>

            </el-table>
          </div>
          <!-- Domain BaseInformation-->
            <!-- CVE BaseInformation-->
          <div v-if="generalData.type_title == 'CVE'">
            <el-row :gutter="20">
              <el-col :span="6"><div>
                <span class="el-icon-paperclip"
                      style="padding-top: 5px;position: relative;left: 20px; font-size: 25px;font-family: Arial, Microsoft Yahei, 微软雅黑;font-weight:bold;">{{' '+generalData.cve}}</span>
              </div></el-col>
              <el-col :span="6" :offset="10"><div>
                <span><img src="#"  style="padding-right: 5px;padding-top: 5px" :href="generalData.nvd_url" alt="NVD"></span>
                <span><img src="#"  style="padding-left: 5px;padding-top: 5px" :href="generalData.mitre_url" alt="MITRE"></span>
              </div></el-col>
            </el-row>
            <el-divider>Description</el-divider>
            <span>{{generalData.description}}</span>
            <el-divider>Infomation</el-divider>
            <el-row :gutter="40">
              <el-col :span="12">
                <div class="">
                  <el-row :gutter="20">
                    <el-col>
                       <span class="el-icon-paperclip"
                             style="font-size: 20px;font-family: Arial, Microsoft Yahei, 微软雅黑;font-weight:bold;">基本信息</span>
                    </el-col>
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      cwe
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{ generalData.cwe}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      <span>products</span>
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.products[0]}}
                    </el-col>
                  </el-row>
                  <!--                  <el-row :gutter="20">-->
                  <!--                    <el-col :span="4" align="left">-->
                  <!--                      mitre_url-->
                  <!--                    </el-col>-->
                  <!--                    <el-col :span="16" align="right">-->
                  <!--                      {{generalData.mitre_url}}-->
                  <!--                    </el-col>-->
                  <!--                  </el-row>-->
                  <!--                  <el-row :gutter="20">-->
                  <!--                    <el-col :span="4" align="left">-->
                  <!--                      nvd_url-->
                  <!--                    </el-col>-->
                  <!--                    <el-col :span="16" align="right">-->
                  <!--                      {{generalData.nvd_url}}-->
                  <!--                    </el-col>-->
                  <!--                  </el-row>-->
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      date_created
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.date_created}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      date_modified
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.date_modified}}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="">
                  <el-row :gutter="20">
                    <el-col>
                       <span class="el-icon-paperclip"
                             style="font-size: 20px;font-family: Arial, Microsoft Yahei, 微软雅黑;font-weight:bold;">CVSS</span>
                    </el-col>
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      vectorString
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvss.vectorString}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      Availability-Impact
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvss["Availability-Impact"]}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      Integrity-Impact
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvss["Integrity-Impact"]}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      Access-Complexity
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvss["Access-Complexity"]}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      Score
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvss.Score}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      Authentication
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvss.Authentication}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      Access-Vector
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvss["Access-Vector"]}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      Confidentiality-Impact
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvss["Confidentiality-Impact"]}}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="12">
                <div class="">
                  <el-row :gutter="20">
                    <el-col>
                       <span class="el-icon-paperclip"
                             style="font-size: 20px;font-family: Arial, Microsoft Yahei, 微软雅黑;font-weight:bold;">CVSS V2</span>
                    </el-col>
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      vectorString
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.cvssV2.vectorString}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      baseScore
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.cvssV2.baseScore}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      availabilityImpact
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.cvssV2.availabilityImpact}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      authentication
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.cvssV2.authentication}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      version
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.cvssV2.version}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      accessComplexity
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.cvssV2.accessComplexity}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      integrityImpact
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.cvssV2.integrityImpact}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      confidentialityImpact
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.cvssV2.confidentialityImpact}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      accessVector
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.cvssV2.accessVector}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      userInteractionRequired
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.userInteractionRequired}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      severity
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.severity}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      obtainUserPrivilege
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.obtainUserPrivilege}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      obtainAllPrivilege
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.obtainAllPrivilege}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      impactScore
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.impactScore}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      exploitabilityScore
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.exploitabilityScore}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      obtainOtherPrivilege
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv2.obtainOtherPrivilege}}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="">
                  <el-row :gutter="20">
                    <el-col>
                       <span class="el-icon-paperclip"
                             style="font-size: 20px;font-family: Arial, Microsoft Yahei, 微软雅黑;font-weight:bold;">CVSS V3</span>
                    </el-col>
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      version
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.version}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      attackComplexity
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.attackComplexity}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      attackVector
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.attackVector}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      availabilityImpact
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.availabilityImpact}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      baseScore
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.baseScore}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      baseSeverity
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.baseSeverity}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      confidentialityImpact
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.confidentialityImpact}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      integrityImpact
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.integrityImpact}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      privilegesRequired
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.privilegesRequired}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      scope
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.scope}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      userInteraction
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.userInteraction}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      vectorString
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.vectorString}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      vectorString
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.cvssV3.vectorString}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      exploitabilityScore
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.exploitabilityScore}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" align="left" class="grid-content bg-purple">
                      impactScore
                    </el-col>
                    <el-col :span="16" align="right" class="grid-content bg-purple">
                      {{generalData.cvssv3.impactScore}}
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <el-divider>Exploits</el-divider>
            <div>
              <el-table
                :data="generalData.exploits"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
              >
                <el-table-column label="Name" align="center" width="600px">
                  <template slot-scope="scope">
                    <el-link :href="scope.row.url"><span class="link-type"> {{ scope.row.name }}</span></el-link>
                  </template>
                </el-table-column>
                <el-table-column label="author" align="center">
                  <template slot-scope="scope">
                    <span class="link-type"> {{ scope.row.author }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="platform" align="center">
                  <template slot-scope="scope">
                    <span class="link-type">{{ scope.row.platform }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="type" align="center">
                  <template slot-scope="scope">
                    <span class="link-type">{{ scope.row.type   }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="port" align="center">
                  <template slot-scope="scope">
                    <span class="link-type">{{ scope.row.port   }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- CVE BaseInformation-->
          <!-- URL BaseInformation-->
          <div v-if="generalData.type == 'url'">
            <el-row :gutter="20">
              <el-col :span="6"><div>
                <span class="el-icon-paperclip"
                      style="padding-top: 5px;position: relative;left: 20px; font-size: 25px;font-family: Arial, Microsoft Yahei, 微软雅黑;font-weight:bold;">{{' '+generalData.indicator}}</span>
              </div></el-col>
              <el-col :span="6" :offset="10"><div>
                <span><img src="#" style="padding-right: 5px;padding-top: 5px" :href="generalData.whois" alt="whois" ></span>
                <span><img src="#"  style="padding-right: 5px;padding-top: 5px" :href="generalData.alexa" alt="Alexa"></span>
              </div></el-col>
            </el-row>
            <el-divider>Base Information</el-divider>
            <span style="display: inline-flex">
              <span style="padding-left: 10px;margin-top: 3px"><el-image :src="'https://otx.alienvault.com'+urlData.flag_url"></el-image></span>
              <span style="padding-left: 10px">{{urlData.country_name}} {{urlData.city}} {{urlData.region}}</span>
              <span style="padding-left: 50px">{{urlData.asn}}</span>
              <span style="padding-left: 50px">经度:{{urlData.longitude}}</span>
              <span style="padding-left: 10px">纬度:{{urlData.latitude}}</span>
              <span style="padding-left: 50px">net_loc:{{urlData.net_loc}}</span>
              <span style="padding-left: 50px">dma_code:{{urlData.dma_code}}</span>
            </span>
            <el-divider if="urlData.url_list">URL</el-divider>
            <div>
              <el-table
                :data="urlData.url_list"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
              >
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-table
                      class="demo-table-expand"
                      :data="scope.row.result"
                      border
                      style="width: 100%"
                    >
                      <el-table-column label="url" align="center">
                        <template slot-scope="scope">
                          <span class="link-type">{{ scope.row}}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column label="url" align="center">
                  <template slot-scope="scope">
                    <span class="link-type">{{ scope.row.url }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="date" align="center">
                  <template slot-scope="scope">
                    <span class="link-type">{{ scope.row.date  }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- URL BaseInformation-->

        </el-tab-pane>
        <!-- general -->

        <!-- pulse_info -->
        <el-tab-pane v-if="pulse_info" label="事件情报">
          <div>
            <el-table
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
              <el-table-column label="标题" align="center">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间" align="center">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.created  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                  <el-button type="primary" size="mini" @click="handleOpenUrl(row.references)">
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
            <el-table-column label="record_type" align="center">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.record_type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="first" align="center">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.first   }}</span>
              </template>
            </el-table-column>
            <el-table-column label="last" align="center">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.last  }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- passive_dns -->

        <!-- url_list -->
        <el-tab-pane v-if="related_urls" label="相关URL">
          <el-table
            v-el-table-infinite-scroll="load"
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
            <el-table-column label="url" align="center">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.url }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" align="center">
              <template slot-scope="scope">
                <span class="link-type">{{ scope.row.date  }}</span>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <!-- url_list -->

        <!-- malware -->
        <el-tab-pane v-if="malware" label="恶意软件">
          <div>
            <el-table
              v-el-table-infinite-scroll="load"
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
              <el-table-column label="hash" align="center">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.hash }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间" align="center">
                <template slot-scope="scope">
                  <span class="link-type">{{ scope.row.datetime_int   }}</span>
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
  import {getIndicators} from '@/api/ioc'
  import {parseTime} from '@/utils'
  import waves from '@/directive/waves' // waves directive
  import elTableInfiniteScroll from 'el-table-infinite-scroll';

  export default {
    name: 'OsintIndex',
    directives: {waves, 'el-table-infinite-scroll': elTableInfiniteScroll},
    data() {
      return {
        show: false,
        passive_dns: false,
        pulse_info: false,
        related_urls: false,
        urlShow : false,
        http_scans: false,
        related_files: false,
        malware: false,
        reputation: false,
        geo : false,
        whois:false,
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
        whoisData: {list:undefined,count:undefined},
        screenshotData: undefined,
        pulse_info_data: {
          list: undefined,
          count: undefined
        },
        geoData : undefined,
        urlData : undefined
      }
    },
    methods: {
      handleOpenUrl(references){
        if(references!==undefined){
          let url = references[0]
          if(url !==undefined){
            window.open(url, '_blank')
          }
        }
      },
      reset(){
        this.show= false,
          this.passive_dns= false,
          this.pulse_info= false,
          this.related_urls= false,
          this.urlShow= false,
          this.http_scans= false,
          this.related_files= false,
          this.malware= false,
          this.reputation= false,
          this.geo = false,
          this.whois= false,

          this.generalData=undefined,
          this.malwareData.list=undefined,
          this.malwareData.count=undefined,
          this.urlData = undefined,
          this.reladtedUrlData.list=undefined,
          this.reladtedUrlData.count=undefined,
          this.reputationData=undefined,
          this.passiveDnsData.list=undefined,
          this.passiveDnsData.count=undefined,
          this.httpScansData.list=undefined,
          this.httpScansData.count=undefined,
          this.nidsListData=undefined,
          this.whoisData.list=undefined,
          this.whoisData.count=undefined,
          this.screenshotData=undefined
         // this.pulse_info_data.list=[],
         // this.pulse_info_data.count=undefined,
         // this.geoData.data=undefined,
         // this.geoData.count=undefined
      },
      formatJson(filterVal) {
        return this.list.map(v => filterVal.map(j => {
          if (j === 'add_time') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      handleQuery() {
        this.reset()
        getIndicators(this.query, undefined).then(res => {
          this.show = true
          this.generalData = res.data

          if (res.data.pulse_info !== undefined) {
            if (res.data.pulse_info.count) {
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

          if (res.data.sections.indexOf('geo') !== -1) {
            getIndicators(this.query, 'geo').then(res => {
              if (res.data.city_data) {
                this.geo = true
                this.geoData = res.data
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
              if(res.data.net_loc){
                this.urlShow = true
                this.urlData = res.data
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
              this.http_scans = res.data
              if (res.data.http_scans.count) {
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
              if(res.data.count){
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

<style>
  .el-row {
    margin-bottom: 15px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 8px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
