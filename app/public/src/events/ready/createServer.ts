// @ts-nocheck

// @ts-ignore
const express = require('express');
const app = express();
const cors = require("cors");


app.use(cors());
app.use('/thumbnail',require('../../../lib/route/thumbnail'));
app.use('/play',require('../../../lib/route/play'));
app.use("/share",require("../../../lib/route/share"));

app.listen(11101, function () {
    console.log('Example app listening on port 11101!');
});


