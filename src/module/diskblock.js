class diskblock {
  constructor(id, state) {
    this.id = id;
    this.state = state;
  }
}
// state > 0  means next block id
// state == -1 means the last block of file
// state == -2 means free block
export default diskblock;