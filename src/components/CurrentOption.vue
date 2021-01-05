<template>
<div>
  <el-row>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <common-form :form="form"></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="function (){dialogVisible = false; form.name = '', form.content = ''}" style="float:left">取 消</el-button>
        <el-button type="primary" @click="createFile">确 定</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" @click="init">系统初始化</el-button>
    <el-button type="primary" @click="dialogVisible = true">create</el-button>
    <el-button type="primary">read</el-button>
    <el-button type="primary">write</el-button>
    <el-button type="primary" @click="close">close</el-button>
    <el-button type="primary">delete</el-button>
    <el-button type="primary" @mkdir="dialogVisible = true">mkdir</el-button>
    <!-- <el-button type="primary">dir</el-button> -->
    <el-button type="primary">返回上一级</el-button>
    <el-button type="primary">logout</el-button>
  </el-row>

  <div class="filecontent"> 
   
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文件内容</span>
      </div>
      <div>
        {{ content }}
      </div>
    </el-card>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import CommonForm from '../components/CommonForm'

export default {
  components: {
    CommonForm
  },
  data: function() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        content: '',
        file: '文件',
        type: ['可读', '可写', '是否共享']
      }
      
    }
  },
  computed: {
    content() {
      // this.$store.commit('getFileContent');
      return this.$store.state.currentFileContent;
    }
  },
  methods: {
    close() {
      this.$store.state.currentFile = null;
      this.$store.commit('getFileContent');
    },
    init() {
      this.$store.commit('init');
    },
    createFile() {
      let filecatlog = this.$store.state.currentFilecatlog;

      if(filecatlog.some((item) => {
        if(item.name === this.form.name) return true;
      })) return false;

      this.$store.commit('createFile', this.form);
      this.dialogVisible = false;
    },
  }
}
</script>

<style lang="scss">
.filecontent {
  display: flex;
  align-items:center;
  justify-content:center;

}
.el-row {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
}
.el-card {
  width: 300px;

}
// .el-dialog{
//   display: flex;
//   flex-direction: column;
//   margin:0 !important;
//   position:absolute;
//   top:50%;
//   left:50%;
//   transform:translate(-50%,-50%);
//   /*height:600px;*/
//   max-height:calc(100% - 30px);
//   max-width:calc(100% - 30px);
// }
// .el-dialog .el-dialog__body{
//   flex:1;
//   overflow: auto;
// }
</style>
