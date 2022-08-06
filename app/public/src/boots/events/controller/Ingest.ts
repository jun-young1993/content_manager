import {BaseController} from "./BaseController";
import {ContentService} from "../../../../service/ContentService";
const contentService = new ContentService();
class Ingest{
    static _ingest(event, args){
        const {metadata , files} = args;

            contentService.createContent(metadata)
            .then((content) => {
                console.log('content',content);
                event.autoReplay(content)
            })
            .catch((contentInsertError) => {
                console.log('contentInsertError',contentInsertError)
            })
    }
}
new BaseController(Ingest);