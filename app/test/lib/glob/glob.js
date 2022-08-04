const glob = require('glob');
const path = require('path');
console.log(__dirname);
const files = glob.sync(
    '/Users/junyoungkim/Desktop/junyoung/app/source/electron/app/public/src/boots/*.js');
console.log(files);

console.log(path.basename("test"));