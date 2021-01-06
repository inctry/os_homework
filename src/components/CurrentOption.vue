<template>
<div>
  <el-row>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <common-form :form="form"></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="function (){dialogVisible = false; form.name = '', form.content = ''}" style="float:left">取 消</el-button>
        <el-button type="primary" @click="edit" v-if="statu === '编辑'">编 辑</el-button>
        <el-button type="primary" @click="createFile" v-if="statu === '创建'">创 建</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" @click="init">系统初始化</el-button>
    <el-button type="primary" >登录</el-button>
    <el-button type="primary" @click="function(){dialogVisible = true, statu = '创建';}">创建文件</el-button>
    <el-button type="primary" @click="function(){dialogVisible = true, statu = '创建';}">创建文件夹</el-button>
    <el-button type="primary" @click="function(){dialogVisible = true, statu = '编辑';}">编 辑</el-button>
    <el-button type="primary" @click="close">关 闭</el-button>
    <!-- <el-button type="primary">dir</el-button> -->
    <el-button type="primary" @click="returnLast">返回上一级</el-button>
    <el-button type="primary">登出</el-button>
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
      },
      statu: ''
      
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
      this.$message({
          message: '成功初始化',
          type: 'success',
          duration: 1000
      });
      this.$store.commit('init');
    },
    createFile() {
      let filecatlog = this.$store.state.currentFileCatlog.catlog;
      this.statu = '创建';
      if(filecatlog.some((item) => {
        if(item.name === this.form.name) return true;
      })) {
        this.$message.error({
          message: '有同名文件请更换名字',
          // type: 'failure',
          duration: 1000
        })
        return;
      }

      this.$store.commit('createFile', this.form);
      this.dialogVisible = false;
      this.statu = '';
    },
    edit() {
      this.statu = '编辑';
      let filecatlog = this.$store.state.currentFileCatlog.catlog;

      if(!filecatlog.some((item) => {
        if(item.name === this.form.name) {
          console.log(item);
          this.$store.commit('editFile', this.form, item);
          return true;
        }
      })) {
        this.$message.error({
          message: '未找到对应文件名请重试',
          duration: 1000
        });
      }
      this.statu = '';
      this.dialogVisible = false;
    },
    returnLast() {
      this.$store.commit('returnLast');
    }
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
