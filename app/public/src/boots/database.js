"use strict";
exports.__esModule = true;
// const Datastore = require('nedb');
var Datastore = require("nedb");
var users = new Datastore('/Users/junyoungkim/Desktop/junyoung/app/source/electron/db/users.db');
users.loadDatabase();
