export enum QueryMap {
        "get" = "find",
        "insert" = "insert",
        "find" = "findOne",
        "update" = "update"
}
export class Custom {
        "update"= (query:object = {},nedb:any) => {

                // @ts-ignore
                // if (query.type == 'set') {
                //         const query.id =
                // }
        }
}
