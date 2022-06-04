var normalizedPath = require("path").join(__dirname);
require("fs").readdirSync(normalizedPath).forEach(function (file) {
    if (file != 'settings') {
        console.log('file', file);
        // require("./boots/" + file);
    }
});
