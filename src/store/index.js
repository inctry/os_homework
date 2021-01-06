import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// suppose every block can consist 16 characters
import dentry from '../module/dentry.js'
import diskblock from '../module/diskblock.js'
import fileCatlog from '../module/fileCatlog.js'
import {  Message } from 'element-ui'
export default new Vuex.Store({
  state: {
    currentpath: [],
    currentFileCatlog: {parent: null, catlog: []},
    FAT: [],
    currentFile: null,
    currentFileContent: '',
    currentUser: 'admin',
    userList: ['admin', 'user1', 'user2']
    
  },
  mutations: {
    init(state) {
      //create 1024 diskblocks
      for(let i = 0; i < 1024; i++) {
        state.FAT.push(new diskblock(i, -2));
      }
      new dentry();
      state.currentFileCatlog = new fileCatlog(null, []); 
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
      let file = null;
      if(form.file === '文件')
        file = new dentry(form.name, firblockid, state.currentFileCatlog, form.file === '文件', 
        form.content.length, state.currentUser, form.type);
      else {
        file = new dentry(form.name, firblockid, state.currentFileCatlog, new fileCatlog(state.currentFileCatlog, []),
        form.content.length, state.currentUser, form.type);

      }

      state.currentFileCatlog.catlog.push(file);
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
      console.log(name);
      state.currentFileCatlog.catlog.some((item) => {
        if(item.name === name) {
          if(state.currentUser === 'admin' 
          || item.creator === state.currentUser
          || item.authorize.find(v => v === '可读')) {


            if(item.isFile === true) {
              state.currentFile = item;
              return true;
            } else {
              //open folder
              state.currentFile = null;
              state.currentFileContent = '目前暂未打开文件';
              state.currentpath.push(item.name);
              state.currentFileCatlog = item.isFile;
            }
          } else {
            Message({
              message: '您没有权限读取',
              type: 'error'
            });
          }
        }
      });
    },
    returnLast(state) {
      state.currentFile = null;
      state.currentFileContent = '目前暂未打开文件';
      state.currentpath.splice(state.currentpath.length - 1, 1);
      if(state.currentFileCatlog.parent !== null)
      state.currentFileCatlog = state.currentFileCatlog.parent;
    },
    deleteFile(state, name) {
      let ind = -1;
      state.currentFileCatlog.catlog.some((item, index) => {
        if(item.name === name) {
          ind = index;
          if(item === state.currentFile) {
            state.currentFile = null;
            state.currentFileContent = '目前暂未打开文件';
          }
          let now = item.address;
          console.log(now);
          while(state.FAT[now].nxt != -2) {
            let nxt = state.FAT[now].nxt;
            if(nxt == -1) {
              state.FAT[now].nxt = -2;
              break;
            }
            state.FAT[now].nxt = -2;
            now = nxt;
          }
        }
      });
      state.currentFileCatlog.catlog.splice(ind, 1);
    },
    editFile(state, data) {
      // console.log(file);
      // console.log(form);
      // console.log(item);
      let form = data.form;
      let file = data.item;
      // console.log(data);
      // return;
      if(state.currentUser === 'admin'
      || file.creator === state.currentUser
      || (file.authorize.find(v => v === '可读') && file.authorize.find(v => v === '可写'))) {


        let now = file.address;

        console.log(now);
        while(state.FAT[now].nxt != -2) {
          let nxt = state.FAT[now].nxt;
          if(nxt == -1) {
            state.FAT[now].nxt = -2;
            break;
          }
          state.FAT[now].nxt = -2;
          now = nxt;
        }
        let size = form.content.length;
        let last = -2;
        let pointer = 0;
        let firblockid = -1;
        firblockid;
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
      } else {
        Message({
          message: '您没有权限编辑',
          type: 'error'
        });
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
