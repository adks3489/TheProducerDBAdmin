const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const PROPERTY = "scripts";
class ScriptManager {
  /**
   * Constructor
   * @param {express} express
   * @param {string} path
   */
  constructor(app, path) {
    const adapter = new FileSync('data/articles.json');
    this.db = low(adapter);
    this.db.defaults({ scripts: [], lastKey: -1 }).write();
    this.collection = this.db.get(PROPERTY);

    app.get(`${path}`, this.list.bind(this));
    app.get(`${path}/:id`, (req, res) => {
      res.send(this.query(req.params.id));
    });
    app.use(`${path}/:id`, express.json());
    app.put(`${path}/:id`, (req, res) => {
      if(!req.isAuthenticated()) {
        res.redirect('http://localhost:1235/login');
        return;
      }
      this.update(req.params.id, req.body);
      res.send('OK');
    });
  }

  /**
   * @param {express.Request} req
   * @param {express.Response} res
   */
  list(req, res) {
    res.send(this.collection.value());
  }

  query(key) {
    return this.collection.find({key: key}).value();
  }

  add(value) {
    let lastKey = this.db.get('lastKey').value() + 1;
    this.collection.push({key: lastKey, ...value}).write();
    this.db.get('lastKey').assign(lastKey).write();
  }

  update(key, value) {
    this.collection.find({key: key}).assign(value).write();
  }

  delete(key) {
    this.collection.remove({key: key}).write();
  }
}

module.exports = ScriptManager;