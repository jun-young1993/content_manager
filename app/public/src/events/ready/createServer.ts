const express = require('express');
const app = express();



app.use('/thumbnail',require('@route/thumbnail'));
app.listen(11101, function () {
    console.log('Example app listening on port 11101!');
});