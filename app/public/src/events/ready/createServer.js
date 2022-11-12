// @ts-nocheck
// @ts-ignore
var express = require('express');
var app = express();
var shareApp = express();
app.use('/thumbnail', require('../../../lib/route/thumbnail'));
app.use('/play', require('../../../lib/route/play'));
app.listen(11101, function () {
    console.log('Example app listening on port 11101!');
});
shareApp.use("/share", require("../../../lib/route/share"));
shareApp.listen(11103, function () {
    console.log('Example app listening on port 11103!');
});
