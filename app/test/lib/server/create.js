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
var os_1 = require("os");
function getAddresses(){
    var interfaces = (0, os_1.networkInterfaces)();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            if (interfaces[k] !== undefined) {
                var address = interfaces[k][k2];
                // NOTE: Only handling IPv4 at the moment.
                if (address.family === 'IPv4' && !address.internal) {
                    addresses.push(address.address);
                }
            }
        }
    }
    return addresses;
}


// app.use('/thumbnail',require('../../../public/lib/route/thumbnail'));
// app.use('/play',require('../../../public/lib/route/play'));
app.use('/share',require('../../../public/lib/route/share'));
app.listen(11102, function () {
    // console.log('Example app listening on port 11102!');
    getAddresses().forEach(function (address) {
        console.log('Listening on ' + address + ':' + "11102");
    });
});