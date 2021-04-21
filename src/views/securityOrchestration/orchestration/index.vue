<template>
  <div class="containers">
    <div class="toolbar">
      <el-button type="primary" round>保存</el-button>
    </div>
    <div class="canvas" ref="canvas"></div>
    <panel ref="panel" :element="element" :businessObject="businessObject" :moddle="moddle" :modeling="modeling"/>
  </div>
</template>

<script>
  import CustomModeler from './component/customModeler'
  import panel from './component/panel'

  import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
  import { xmlStr } from './component/xmlStr'

  export default {
    name: "index",
    components:{panel},
    data() {
      return {
        businessObject:null,
        element:null,
        moddle:null,
        modeling:null,

        // bpmn建模器
        bpmnModeler: null,
        container: null,
        canvas: null,
        defaultXmlStr: xmlStr
      }
    },
    created() {
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const canvas = this.$refs.canvas
        // 建模
        this.bpmnModeler = new CustomModeler({
          container: canvas,
          //添加控制板
          // propertiesPanel: {
          //   parent: '#js-properties-panel'
          // },
          additionalModules: [],

        }),
          this.createNewDiagram()
      },
      createNewDiagram () {
        // 将字符串转换成图显示出来
        let _this = this
        this.bpmnModeler.importXML(xmlStr, (err) => {
          if (err) {
            // console.error(err)
          }
          else {
            _this.moddle = _this.bpmnModeler.get('moddle')
            _this.modeling = _this.bpmnModeler.get('modeling')
            // 这里是成功之后的回调, 可以在这里做一系列事情

            this.bpmnModeler.on('element.click',(event)=>{
              console.log('点击了',event)
              event.originalEvent.preventDefault();
              event.originalEvent.stopPropagation();
              _this.element = event.element
              _this.businessObject = getBusinessObject(_this.element);
              console.log('businessObject',_this.businessObject)
              _this.$nextTick(()=>{
                _this.$refs.panel.init()
              })
            })


            this.success()
          }
        })
      },
      success() {
        // console.log('创建成功!')
      }
    }
  }

</script>

<style scoped>
  .containers{
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }
  .canvas{
    width: 100%;
    height: 100%;
  }
  .panel{
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
  }
  .toolbar{
    position: absolute;
    top: 5%;
    left: 90%;
  }

</style>
