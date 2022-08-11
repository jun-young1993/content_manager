import {BaseController} from "./BaseController";
import {ContentService} from "../../../../service/ContentService";
import { IngestService } from "../../../../service/IngestService";
const log = require('../../../../lib/Logger')
const contentService = new ContentService();
const ingestService = new IngestService();
class Ingest{
    static _ingest(event, args){
        const {metadata , files} = args[0];
        log.channel('ingest').log(`[_ingest][create content]`)
            contentService.createContent(metadata)
            .then((content:any) => {
                console.log('content',content);
                const contentId : string = content.data._id;
                ingestService.outIngestByContentId(contentId , files[0])
                .then((ingestTask) => {
                    log.channel('ingest').log(`[_ingest][ingestTask] ${ingestTask}`);
                    event.autoReply(ingestTask)
                })
                .catch((ingestTaskError) => {
                    log.channel('ingest').log(`[_ingest][ingestTask][Catch] ${ingestTaskError}`);
                    event.autoReply(ingestTaskError)
                })
                
            })
            .catch((contentInsertError) => {
                log.channel('ingest').log(`[_ingest][create content][Catch] ${contentInsertError}`);
            })
    }
}
new BaseController(Ingest);