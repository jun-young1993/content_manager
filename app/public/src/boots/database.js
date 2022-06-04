var Datastore = require('nedb');
console.log(__dirname);
var users = new Datastore('/Users/junyoungkim/Desktop/junyoung/app/source/electron/db/users.db');
users.loadDatabase();
