var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

// XXX: This should be a database of users :).
var users = [{
  id: 1,
  username: 'admin',
  password: '123456',
  address: '0x4b7dafb95151f8ec334ba610bc74bb33ba7298c3',
  privateKey: 'd1595fa85be6fa4bdd249246ba8090de917351a170cdd1746b4ea5998a76c9bc'
},
{
  id: 2,
  username: 'user',
  password: '123456',
  address: '0x387908fd4f030c94f7f28ad61b1386d56c12f162',
  privateKey: '4a4163a7f753004ee6cb8c9c6d80329d6636f2471067a26a9c0b1734e285efe6'
}
];

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

app.post('/users', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }
  if (_.find(users, {username: req.body.username})) {
   return res.status(400).send("A user with that username already exists");
  }

  var profile = _.pick(req.body, 'username', 'password', 'extra', 'address', 'privateKey');
  profile.id = _.max(users, 'id').id + 1;

  users.push(profile);

  res.status(201).send({
    id_token: createToken(profile),
    address: profile.address
  });
});

app.post('/sessions/create', function(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user = _.find(users, {username: req.body.username});
  if (!user) {
    return res.status(401).send("The username or password don't match");
  }

  if (!(user.password === req.body.password)) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});
