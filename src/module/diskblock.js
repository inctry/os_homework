class diskblock {
  constructor(id, nxt, content) {
    this.id = id;
    this.nxt = nxt;
    this.content = content;
  }
}
// state > 0  means next block id
// state == -1 means the last block of file
// state == -2 means free block
export default diskblock;