export enum QueryMap {
        "get" = "find",
        "insert" = "insert",
        "find" = "findOne",
        "update" = "update"
}
export class Custom {
        "update"= (query:object = {},nedb) => {

                // @ts-ignore
                // if (query.type == 'set') {
                //         const query.id =
                // }
        }
}
