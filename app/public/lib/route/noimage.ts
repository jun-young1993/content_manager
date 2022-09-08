import * as fs from "fs";
// import * as fs from "fs";
// const fs = require("fs");
import * as stream from "stream";
// const stream = require('stream');
import * as path from "path";
// const path = require("path");

const router = require('express').Router();
const log = require('../Logger');
const {MediaService} = require('../../service/MediaService')
const mediaSv = new MediaService();


router.get('/:filename/:extention', (req:any, res:any) => {

	const {extention,filename} = req.params;
	
	const thumbnailPath = path.resolve(__dirname,`../../logo192.${extention}`);
	const read = fs.createReadStream(thumbnailPath);
	const pass = new stream.PassThrough();
	stream.pipeline(
		read,
		pass,
		(err) => {
			if(err){
				console.log('thumbnail err',err)
				return res.sendStatus(400);
			}
		}
	)
	pass.pipe(res);
  
});

module.exports = router;
 