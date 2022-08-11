import * as fs from "fs";
import * as stream from "stream";
import * as path from "path";
const log = require('../Logger');

const router = require('express').Router();

import {MediaService} from '../../service/MediaService'

router.get('/proxy/:contentId', (req:any, res:any) => {
	const {contentId} = req.params;
	log.channel('play').info(`[play][proxy] content_id ${contentId}`);
	new MediaService().findProxyByContentId(contentId).then((media:any)=>{
		
		if(media.success){
			
			if(media.data){
				if(media.data.full_path){
					log.channel('play').info(`[play][proxy] path ${media.data.full_path}`);
					
					const proxyPath = path.resolve(media.data.full_path);
					const read = fs.createReadStream(proxyPath);
					// const pass = new stream.PassThrough();
					// stream.pipeline(
					// 	read,
					// 	pass,
					// 	(err) => {
					// 		if(err){
					// 			console.log('thumbnail err',err)
					// 			return res.sendStatus(400);
					// 		}
					// 	}
					// )
					
					// res.contentType('video/mp4');
					// pass.pipe(res);
					
					const fileSize = fs.statSync(media.data.full_path).size;
					log.channel('play').info({
						'Content-Length': fileSize, 
						'Content-Type': 'video/mp4',
						'Content-Range' : `bytes 0-${fileSize-1}/${fileSize}`
					})
					res.writeHead(206, {
						'Content-Length': fileSize, 
						'Content-Type': 'video/mp4',
						'Content-Range' : `bytes 0-${fileSize-1}/${fileSize}`
					});
					read.on('error',(error) => {
						console.log('read error',error)
					})
					res.on('error',(error) => {
						console.log('res error',error)
					})
					read.pipe(res);
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
  
});

module.exports = router;
 