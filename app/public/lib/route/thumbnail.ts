import * as fs from "fs";
import * as stream from "stream";
import * as path from "path";

const router = require('express').Router();

const {MediaService} = require('../../service/MediaService')
const mediaSv = new MediaService();
router.get('/:contentId', (req:any, res:any) => {
	const {contentId} = req.params;
	
	mediaSv.findOutByContentId(contentId).then((media:any)=>{
		if(media.success){
			if(media.data){
				if(media.data.path){
					const read = fs.createReadStream(path.resolve(media.data.path));
					const pass = new stream.PassThrough();
					stream.pipeline(
						read,
						pass,
						(err) => {
							if(err){
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
 