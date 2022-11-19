import {CodeItemService} from "../../../../service/CodeItemService";
import {BaseController} from "./BaseController";
import {ContentService} from "../../../../service/ContentService";

const codeItemService = new CodeItemService();
const contentService = new ContentService();
class Statistics {
    static $content(event, args){
        console.log("=>(Statistics.ts:8) statistics content");
        return new Promise((resolve, reject) => {
            codeItemService.findByParentCode("content_type")
                .then((contentTypes:{data : [{code : string, name : string}]}) => {


                    const contentCountByContentTypePromise = [];
                    contentTypes.data.map((contentType) => {

                        contentCountByContentTypePromise.push(
                            new Promise((resolve, reject) => {
                                contentService.getCount({content_type : contentType.code})
                                    .then((contentCount: {data : number}) => {
                                        resolve({
                                            content_type : contentType.code,
                                            content_type_nm : contentType.name,
                                            count : contentCount.data
                                        })
                                    })
                            })

                        )
                    })
                    Promise.all(contentCountByContentTypePromise)
                        .then((result) => {
                            console.log("=>(Statistics.ts:23) result", result);
                            resolve(result);
                        })
                });
        })

    }
}
new BaseController(Statistics);