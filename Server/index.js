const express = require('express');
const cors = require('cors');
const UserManager = require('./lib/userManager');
const ScriptManager = require('./lib/scriptManager');
const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./lib/graphqlSchema');

const app = express();
app.use(cors({
  origin: ['http://localhost:1235', 'https://s3-ap-northeast-1.amazonaws.com/jcweb.sytes.net'],
  credentials: true
}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('');
});

const userManager = new UserManager();

let initLogin = require('./lib/login');
initLogin(app, userManager);

let scriptManager = new ScriptManager(app, '/script');

app.use('/graphql', express.json());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(80, () => {
  console.log('web server listening on port 80');
});