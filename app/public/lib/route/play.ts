import * as fs from "fs";
import * as path from "path";
import {MediaService} from '../../service/MediaService'

const log = require('../Logger');

const router = require('express').Router();

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
					res.on('error',(error:any) => {
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

router.get('/original/:contentId',(req:any, res:any) => {
	const {contentId} = req.params;
	new MediaService().findOriginalByContentId(contentId).then((media:any)=>{

		if(media.success){

			if(media.data){
				if(media.data.full_path){
					log.channel('play').info(`[play][original] path ${media.data.full_path}`);

					const proxyPath = path.resolve(media.data.full_path);
					const read = fs.createReadStream(proxyPath);

					const fileSize = fs.statSync(media.data.full_path).size;
					log.channel('play').info({
						'Content-Length': fileSize,
						'Content-Type': 'audio/mp3',
						'Content-Range' : `bytes 0-${fileSize-1}/${fileSize}`
					})
					res.writeHead(206, {
						'Content-Length': fileSize,
						'Content-Type': 'audio/mp3',
						'Content-Range' : `bytes 0-${fileSize-1}/${fileSize}`
					});
					read.on('error',(error) => {
						console.log('read error',error)
					})
					res.on('error',(error:any) => {
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
})

module.exports = router;
 