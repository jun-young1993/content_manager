
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";
export class MetadataService extends BaseService{
    constructor(){
        super({
            models : [
                'Metadata'
            ]
        });
    }


}