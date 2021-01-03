<template>
  <el-row>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <common-form :form="form"></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="float:left">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" @click="init">系统初始化</el-button>
    <el-button type="primary" @click="dialogVisible = true">create</el-button>
    <el-button type="primary">open</el-button>
    <el-button type="primary">read</el-button>
    <el-button type="primary">write</el-button>
    <el-button type="primary">close</el-button>
    <el-button type="primary">delete</el-button>
    <el-button type="primary">mkdir</el-button>
    <el-button type="primary">dir</el-button>
    <el-button type="primary">cd</el-button>
    <el-button type="primary">logout</el-button>
  </el-row>
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
        name: ''
      }
    }
  },
  methods: {
    init() {
      this.$store.commit('init');
    },
    createFile() {

    }
  }
}
</script>

<style lang="scss">
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
