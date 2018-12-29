const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(80, () => {
  console.log('web server listening on port 80');
});