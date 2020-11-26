<template>
  <div class="container">
    <el-collapse accordion style="margin-left: 30px;margin-top: 30px;font-size: 300px">
<!--      <el-collapse-item>-->
<!--        <template slot="title">-->
<!--          通知<i class="header-icon el-icon-info"></i>-->
<!--        </template>-->
<!--        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>-->
<!--        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>-->
<!--      </el-collapse-item>-->
      <el-collapse-item>
        <template slot="title">
          资产管理<i class="header-icon el-icon-info"></i>
        </template>
        <div>互联网资产管理：</div>
        <div>内网资产管理：</div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          主动防御<i class="header-icon el-icon-info"></i>
        </template>
        <div>主机入侵检测HIDS：</div>
        <div>蜜罐系统：</div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          溯源取证<i class="header-icon el-icon-info"></i>
        </template>
        <div>todo</div>

      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          数据安全<i class="header-icon el-icon-info"></i>
        </template>
        <div> todo </div>

      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          安全检测<i class="header-icon el-icon-info"></i>
        </template>

        <div>Web漏扫：</div>
        <div>主机漏扫：</div>
        <div>安全合规：</div>
      </el-collapse-item>

      <el-collapse-item>
        <template slot="title">
          开源情报<i class="header-icon el-icon-info"></i>
        </template>
        <div>情报查询</div>

      </el-collapse-item>

      <el-collapse-item>
        <template slot="title">
          用户管理<i class="header-icon el-icon-info"></i>
        </template>
        <div>用户管理：</div>
        <div>角色管理：</div>
        <div>部门管理：</div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          系统管理<i class="header-icon el-icon-info"></i>
        </template>
        <div>系统日志</div>
        <div>服务管理</div>
        <div>系统参数</div>
        <div>菜单管理</div>
        <div>接口管理</div>
        <div>访问记录</div>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>

</style>
