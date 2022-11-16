


import * as glob from "glob";
import * as path from "path";

export interface AutoLoaderOptionInterface {
    allDone ?: () => void
}
export class AutoLoader {
    readonly path : string;
    readonly options : AutoLoaderOptionInterface;
    constructor(path : string,options ?: AutoLoaderOptionInterface) {
        this.options = options || {};
        this.path = path;
    }

    public loader(options?:glob.IOptions){
        const _this = this;
        const files = glob.sync(this.path,options || {});

        let requireProcessed:number = 0;
        files.forEach((filePath:string,index:number) => {
            // console.log('filePath',path.basename(filePath));
            requireProcessed++;
            require(filePath);

            if(files.length === requireProcessed){
                if(_this.options.allDone){
                    _this.options.allDone();
                }
            }
        })
    }
}