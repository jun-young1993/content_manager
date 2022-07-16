const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

// 이미지 url
// app.get('/:id',(req,res)=>{
//     res.sendFile(filepath);
// })

app.listen(11101, function () {
    console.log('Example app listening on port 11101!');
});