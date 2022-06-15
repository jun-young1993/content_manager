const DataStore = require("nedb");
const path = '/Users/junyoungkim/Desktop/junyoung/app/source/electron/db/users.db';
const db = new DataStore(path);

db.loadDatabase();
db.insert({test:'test'},(err,data) => {
    console.log(data);
})
db.find({},(err,data) => {
    console.log('err',err)
    console.log(data);
})