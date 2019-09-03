const express = require("express");
const uuid = require("uuid");
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session ({
  genid: req => {
    console.log("session middleware --> genid");
    console.log(req.sessionID);
    return uuid();
  },
  store: new FileStore(),
  secret: "turing test",
  resave: false,
  saveUninitailized: true
}));

app.get("/", (req, res) => {
  console.log("app.get /");
  res.send(` homePage req.sessionID :) ${req.sessionID} `);
});

app.get('/login', (req, res) => {
    console.log('Inside GET /login callback function')
    console.log(req.sessionID)
    res.send(`You got the login page!\n`)
  })
  
  app.post('/login', (req, res) => {
    console.log('Inside POST /login callback function')
    console.log(req.body)
    res.send(`You posted to the login page!\n`)
  })

app.listen(3000, () => {
  console.log(`Listening on port - loacalhost:3000 --`);
});
