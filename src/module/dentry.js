class dentry {
  constructor(name, address, parent, isFile, size, creator, authorize) {
    this.name = name;
    this.address = address;
    this.parent = parent;
    this.isFile = isFile;
    // this.path = path;
    this.size = size;
    this.creator = creator
    this.authorize = authorize;
  }
}
export default dentry;