<template>
  <div id="file">
    <el-card class="box-card" style="width:100%">
      <div slot="header" class="clearfix">
        <span>当前路径: {{ path }}</span>
      </div>
      <div v-for="item in filelist" :key="item.name" style="margin: 20px; float: left" @click="openFile($event)">
        <i class="el-icon-files"></i>
        <span>{{ item }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      
    }
  },
  computed: {
    filelist() {
      let currentFilecatlog = this.$store.state.currentFilecatlog;
      let filelist = [];
      currentFilecatlog.forEach((item) => {
        filelist.push(item.name);
      });
      return filelist;
    },
    path() {
      let path = this.$store.state.currentpath;
      let finalpath = '/';
      path.forEach((item) => {
        finalpath += `${item}/`;
      })
      return finalpath;
    } 
  },
  methods: {
    openFile(event) {
      console.log(event.currentTarget);
    }
  }
}
</script>

<style lang="scss" scope>
#file {
  padding-top: 10px;
  font-size: 18px;
}
.el-card__body {
  padding: 10px !important;
}
.el-card__header {
  padding: 15px 18px;
}
</style>