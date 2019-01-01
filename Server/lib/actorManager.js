const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data/actors.json');
let db = low(adapter);
db.defaults({ actors: [], lastKey: -1 }).write();

exports.schema = fs.readFileSync(path.join(__dirname, './types/actor.graphql'), {encoding: 'utf8'});

exports.rootValue = {
  actors: () => db.get('actors').value(),
  actor: ({ key }) => {
    return db.get('actors').find({"key": key}).value();
  },
  updateActor: ({ key, val }) => {
    db.get('actors').find({"key": key}).assign(val).write();
    return db.get('actors').find({"key": key}).value();
  },
};