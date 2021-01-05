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
    currentFilecatlog: [],
    FAT: [],
    currentFile: null,
    currentFileContent: '',
    currentUser: '',
    userList: ['admin', 'user1', 'user2']
    
  },
  mutations: {
    init(state) {
      //create 1024 diskblocks
      for(let i = 0; i < 1024; i++) {
        state.FAT.push(new diskblock(i, -2));
      }
      new dentry();
      new filecatalog()
      state.currentFilecatlog = [];
      // state.currentFile = new dentry('');
    },
    createFile(state, form) {
      //allocate
      let size = form.content.length;
      let last = -2;
      let pointer = 0;
      let firblockid = -1;
      state.FAT.every((item, index) => {
        if(item.nxt === -2) {
          if(last >= 0) state.FAT[last].nxt = index;
          else firblockid = index;
          last = index;
          item.content = form.content.substring(pointer, Math.min(pointer + 16, size));
          pointer = Math.min(pointer + 16, size);
          if(pointer === size) {
            item.nxt = -1;
            return false;
          }
        }
        return true;
      });

      let file = new dentry(form.name, firblockid, state.currentFilecatlog, true, form.content.length, 'admin', form.type);
      state.currentFilecatlog.push(file);
    },
    getFileContent(state) {
      let str = '';
      let file = state.currentFile;
      if(file === null) {
        state.currentFileContent = '目前暂未打开文件';
        return 0;
      }
      let addr = file.address;
      let FAT = state.FAT;
      while(FAT[addr].nxt !== -2) {
        str += FAT[addr].content;
        if(FAT[addr].nxt === -1) break;
        addr = FAT[addr].nxt;
      }
      state.currentFileContent = str;
    },
    openFile(state, name) {
      state.currentFilecatlog.some((item) => {
        if(item.name === name) {
          state.currentFile = item;
          return true;
        }
      });
    }
  },
  actions: {
  },
  modules: {
  }
})
