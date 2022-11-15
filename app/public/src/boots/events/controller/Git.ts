
import {BaseController} from "./BaseController";
import * as request from "request";
const GIT_HUB_API : string = "https://api.github.com";

const credentials = false;
const GIT_HUB_HEADER : {"user-agent" : "node.js" , "Authorization" ?: string } = 
	{
		"user-agent" : "node.js", 
		...(credentials ? {"Authorization" : "Bearer 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"} : {} )
		
	};
const GIT_HUB_OWNNER : string = "jun-young1993";
const GIT_HUB_REPO : string = "content_manager";
class Git {
	static $release(event, args:[string] | []){
		return new Promise((resolve, reject) => {
			const options = {
				'method': 'GET',
				'url': `${GIT_HUB_API}/repos/${GIT_HUB_OWNNER}/${GIT_HUB_REPO}/releases${(args.length === 0) ? "" : `/${args[0]}`}`,
				'headers': GIT_HUB_HEADER
			};
			request(options, function (error, response) {
				if (error){
					reject(error);
				}else{
					resolve(response.body);
				};
				
			});
		})
		
		      
	}
}
new BaseController(Git);