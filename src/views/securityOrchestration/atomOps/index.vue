<template>
  <el-container style="margin-top: 10px;margin-left: 20px">
    <el-aside width="300px">

      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree">
      </el-tree>

    </el-aside>
    <el-container>
      <el-header>
        <el-button type="info" icon="el-icon-plus" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'index',
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },

    data() {
      return {
        filterText: '',
        data: [{
          id: 1,
          label: '输入层',
          children: [{
            id: 4,
            label: '接口',
            children: [{
              id: 9,
              label: '威胁情报接口'
            }, {
              id: 10,
              label: 'Spring漏洞情报接口'
            }]
          },{
            id: 5,
            label: '数据库',
            children: [{
              id: 9,
              label: 'ES入侵检测库'
            }, {
              id: 10,
              label: 'Mongo内网主机信息库'
            }]
          }]
        }, {
          id: 2,
          label: '处理层',
          children: [{
            id: 5,
            label: 'AWVS漏洞扫描'
          }, {
            id: 6,
            label: 'WebShell查杀'
          }, {
            id: 6,
            label: '入侵检出'
          }]
        }, {
          id: 3,
          label: '动作层',
          children: [{
            id: 5,
            label: '一期WAF封堵IP'
          }, {
            id: 6,
            label: '删除WebShell文件'
          },{
            id: 6,
            label: '服务器重启'
          }]
        }, {
          id: 4,
          label: '输出层',
          children: [{
            id: 7,
            label: '钉钉通知'
          }, {
            id: 8,
            label: '微信通知'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>

<style>
</style>
