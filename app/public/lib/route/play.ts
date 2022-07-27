import * as fs from "fs";
import * as stream from "stream";
import * as path from "path";

const router = require('express').Router();

const {MediaService} = require('../../service/MediaService')

router.get('/original/:contentId', (req:any, res:any) => {
	const {contentId} = req.params;
	
	new MediaService().findOriginalByContentId(contentId).then((media:any)=>{
		
		if(media.success){
			
			if(media.data){
				if(media.data.full_path){
					
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
  
});

module.exports = router;
 