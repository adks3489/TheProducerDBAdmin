const express = require('express');
const cors = require('cors');
const ScriptManager = require('./lib/scriptManager');

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('');
});

let scriptManager = new ScriptManager(app, '/script');

app.listen(80, () => {
  console.log('web server listening on port 80');
});