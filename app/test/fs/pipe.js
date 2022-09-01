const fs = require('fs');

console.log(parseInt(4.123123));

const sourcePath = 'D:\\100M_0.MXF';
const targetPath = 'D:\\111.mxf';
const sourceState = fs.statSync(sourcePath);
const sourceSize = sourceState.size;

let readed = 0;
fs.createReadStream(sourcePath)
.on('error',(error)=>{
	
	console.log(error);
})
.on('data',(data) => {
	readed += data.length;
	console.log((readed/sourceSize * 100).toFixed(2))
})
.pipe(fs.createWriteStream(targetPath))
.on('error',(error)=>{
	
	console.log(error);
})
.on('finish',() => {
	console.log('finish');
})
