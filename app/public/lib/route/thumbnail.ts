import * as fs from "fs";
import * as stream from "stream";
import * as path from "path";

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

module.exports = router;
 