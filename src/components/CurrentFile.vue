<template>
  <div id="file">
    <el-card class="box-card" style="width:100%">
      <div slot="header" class="clearfix">
        <span style="margin-right: 20px;">当前用户: {{user}}  </span>
        <span>当前路径: {{ path }}</span>
      </div>
      <div v-for="item in filelist" :key="item.name" style="margin: 0px 20px 10px 20px; float: left" @click="openFile($event)">
        <i class="el-icon-files"></i>
        <a href="#" class="itemname" >{{ item }}</a>
        <i class="el-icon-close" @click.stop="deleteFile($event)"></i>
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
      let currentFilecatlog = this.$store.state.currentFileCatlog.catlog;
      // console.log(this.$store.state.currentFileCatlog.catlog);
      let filelist = [];
      currentFilecatlog.forEach((item) => {
        if(this.$store.state.currentUser === 'admin' || item.creator === this.$store.state.currentUser 
        || (((item.authorize.find((item => item === '是否共享'))))))
        filelist.push(item.name);
      });
      // console.log(filelist);
      return filelist;
    },
    path() {
      let path = this.$store.state.currentpath;
      let finalpath = '/';
      path.forEach((item) => {
        finalpath += `${item}/`;
      })
      return finalpath;
    },
    user() {
      return this.$store.state.currentUser; 
    }
  },
  methods: {
    openFile(event) {
      console.log(event.currentTarget.childNodes[1].innerText);
      let fileName = event.currentTarget.childNodes[1].innerText;
      this.$store.commit('openFile', fileName);
      this.$store.commit('getFileContent');

    },
    deleteFile(event) {
      let fileName = event.currentTarget.parentNode.childNodes[1].innerText;
      console.log(fileName);
      this.$store.commit('deleteFile', fileName);
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