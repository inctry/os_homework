<template>
  <el-form ref="form" :model="form" label-width="40px">
    <el-form-item label="名字">
      <el-input v-model="form.name"></el-input>
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
    padding: 15px 20px;
  }
</style>