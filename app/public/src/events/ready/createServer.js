// @ts-nocheck
// @ts-ignore
var express = require('express');
var app = express();
app.use('/thumbnail', require('../../../lib/route/thumbnail'));
app.use('/play', require('../../../lib/route/play'));
app.listen(11101, function () {
    console.log('Example app listening on port 11101!');
});
