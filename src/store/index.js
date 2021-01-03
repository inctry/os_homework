import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// suppose every block can consist 16 characters
import dentry from '../module/dentry.js'
import diskblock from '../module/diskblock.js'
import filecatalog from '../module/filecatalog.js'
export default new Vuex.Store({
  state: {
    currentpath: [],
    currentfilecatlog: [],
    FAT: []
    
  },
  mutations: {
    init(state) {
      //create 1024 diskblocks
      for(let i = 0; i < 1024; i++) {
        state.FAT.push(new diskblock(i, -2));
      }
      new dentry();
      state.currentFilecatlog = new filecatalog([]);
    }
  },
  actions: {
  },
  modules: {
  }
})
