<template>
  <div id="file">
    <el-card class="box-card" style="width:100%">
      <div slot="header" class="clearfix">
        <span>当前路径: {{ path }}</span>
      </div>
      <div v-for="item in filelist" :key="item.name" style="margin: 0px 20px 10px 20px; float: left" @click="openFile($event)">
        <i class="el-icon-files"></i>
        <a href="#" class="itemname">{{ item }}</a>
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
      console.log(event.currentTarget.lastChild.innerText);
      let fileName = event.currentTarget.lastChild.innerText;
      this.$store.commit('openFile', fileName);
      this.$store.commit('getFileContent');

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
a.itemname {
  color: #1E90FF;
  font-size: 15px;
  text-decoration: underline;
}
.el-card__header {
  padding: 15px 18px;
}
</style>