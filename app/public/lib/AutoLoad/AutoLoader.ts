


import * as glob from "glob";
import * as path from "path";
export class AutoLoader {
    readonly path : string;

    constructor(path : string) {
        this.path = path;
    }

    public loader(){
        const files = glob.sync(this.path);

        files.forEach((filePath:string) => {

            require(filePath);
        })
    }
}