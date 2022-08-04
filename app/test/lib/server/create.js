require('module-alias/register');
const express = require('express');
const app = express();

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

// // 이미지 url
// app.get('/:id',(req,res)=>{
//     const {id} = req.params;
//     console.log('id',id);
//     res.sendFile(filepath);
// })
// const files = glob.sync('');

// files.forEach((filePath:string) => {

//     require(filePath);
// })
// app.use('/thumbnail',require('./route/thumbnail'));
// app.listen(11102, function () {
//     console.log('Example app listening on port 11101!');
// });




app.use('/thumbnail',require('../../../public/lib/route/thumbnail'));
app.use('/play',require('../../../public/lib/route/play'));
app.listen(11102, function () {
    console.log('Example app listening on port 11101!');
});