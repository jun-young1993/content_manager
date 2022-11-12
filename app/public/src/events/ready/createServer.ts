// @ts-nocheck

// @ts-ignore
const express = require('express');
const app = express();
const shareApp = express();



app.use('/thumbnail',require('../../../lib/route/thumbnail'));
app.use('/play',require('../../../lib/route/play'));
app.listen(11101, function () {
    console.log('Example app listening on port 11101!');
});

shareApp.use("/share",require("../../../lib/route/share"));
shareApp.listen(11103, function () {
    console.log('Example app listening on port 11103!');
});