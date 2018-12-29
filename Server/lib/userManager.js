const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const PROPERTY = "users";
class UserManager {
  constructor() {
    const adapter = new FileSync('data/users.json');
    this.db = low(adapter);
    this.db.defaults({ users: [], lastId: -1 }).write();
    this.collection = this.db.get(PROPERTY);
  }

  add(value) {
    if( this.find(value.username) ) {
      throw Error(`${value.username} already exists`);
    }
    let lastId = this.db.get('lastId').value() + 1;
    let x = { id: lastId, ...value };
    this.collection.push({ id: lastId, ...value }).write();
    this.db.get('lastId').assign(lastId).write();
  }

  find(username) {
    return this.collection.find({ username: username }).value();
  }

  findById(id) {
    return this.collection.find({ id: id }).value();
  }
}

module.exports = UserManager;