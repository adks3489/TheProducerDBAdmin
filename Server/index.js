const express = require('express');
const cors = require('cors');
const UserManager = require('./lib/userManager');
const ScriptManager = require('./lib/scriptManager');

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('');
});

const userManager = new UserManager();

let initLogin = require('./lib/login');
initLogin(app, userManager);

let scriptManager = new ScriptManager(app, '/script');

app.listen(80, () => {
  console.log('web server listening on port 80');
});