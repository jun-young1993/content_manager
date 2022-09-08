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

router.get('/:contentId', (req:any, res:any) => {

	const {contentId} = req.params;
	console.log('[request thumbnail] 0 ',contentId);
	mediaSv.findThumbnailByContentId(contentId)
	.then((media:any)=>{
		console.log('thumbnail contentId 1',contentId)
		if(media.success){
			console.log('thumbnail media 2')
			if(media.data){
				if(media.data.full_path){
					console.log('thumbnail media full path 3',media.data.full_path);
					const thumbnailPath = path.resolve(media.data.full_path);
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
				}else{
					return res.sendStatus(400);
				}
			
			}else{
				return res.sendStatus(400);
			}
	
		}else{
			return res.sendStatus(400);
		}
	
		
	})
	.catch((reject:any) => {
		log.channel('api_get_thumbnail').error('[Exception Get Thumbnail]',reject);
		return res.sendStatus(400);
	})
  
});

router.get('/noimage/:filename/:extention', (req:any, res:any) => {

	const {extention,filename} = req.params;
	
	const thumbnailPath = path.resolve(__dirname,`../logo192.${extention}`);
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
 