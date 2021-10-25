var pg = require("pg");
// const dbConfig = require("./db.config");
const dbConfig = require("../config/db.config")

var conString = dbConfig.URL;
var client = new pg.Client(conString);
client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
});
module.exports = client;
