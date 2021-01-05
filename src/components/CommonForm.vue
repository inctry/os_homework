<template>
  <el-form ref="form" :model="form" label-width="40px">
    <el-form-item label="名字">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="权限">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="可读" name="read"></el-checkbox>
        <el-checkbox label="可写" name="write"></el-checkbox>
        <el-checkbox label="是否共享" name="isShared"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="内容">
      <el-input type="textarea" v-model="form.content"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    form: Object
  },
  data() {
      return {
        
      }
    },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style lang="scss" scope>
  .el-dialog__body {
    padding: 10px 20px;
  }
  .el-textarea__inner {
    height: 200px;
  }
</style>