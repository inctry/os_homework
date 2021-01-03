class dentry {
  constructor(name, address, parent, isFile, path, size) {
    this.name = name;
    this.address = address;
    this.parent = parent;
    this.isFile = isFile;
    this.path = path;
    this.size = size;
  }
}
export default dentry;