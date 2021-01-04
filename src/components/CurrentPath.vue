<template>
  <div id="pathth">
      <!-- 当前目录：{{ path }} -->
      <current-file></current-file>
  </div>
</template>

<script>
import CurrentFile from './CurrentFile'
export default {
  components: {
    CurrentFile
  },
  data() {
    return {

    }
  },
  computed: {
    path() {
      let path = this.$store.state.currentpath;
      let finalpath = '/';
      path.forEach((item) => {
        finalpath += `${item}/`;
      })
      return finalpath;
    }
  }
}
</script>

<style lang="scss">
#pathth {
  font-family: "Helvetica Neue";
  font-size: 20px;
}
</style>