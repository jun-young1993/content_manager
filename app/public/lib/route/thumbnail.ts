const fs = require("fs");
const stream = require("stream");
const path = require("path");

const router = require('express').Router();

const {MediaService} = require('@service/MediaService');
const mediaSv = new MediaService();
router.get('/:contentId', (req, res) => {
	const {contentId} = req.params;
	
	mediaSv.findOutByContentId(contentId).then((media)=>{
		if(media.success){
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
		}
	
		
	})
  
});

module.exports = router;
 