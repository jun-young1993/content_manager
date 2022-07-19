// import {User} from '../../public/models/User'


require("module-alias/register");
const {Workflow} = require("@models/Workflow");
const db = new Workflow();

// console.log(codeItem);
// codeItem.db().find({is_deleted : "N",parent_code : "STORAGE_TYPE", use_yn : "Y"},(err,data) => {
//     console.log(data);
// })
// field.db().remove({},{multi:true},(err,data) => {
//     console.log(data);
// });
const obj = {
    id : '1',
    name : 'child-1',
    children : [
        {
            id : '3',
            name : 'child-3'
        }
    ]
}
db.db().update({_id : 'oZUTCVEUgPfvWREm'},{$set : {'children' : [obj]}});
db.db().findOne({_id:'oZUTCVEUgPfvWREm'},(err,data) => {
    console.log(data.children[0]);
    // console.log(JSON.parse(data.children));
});
// TyF2DdcFnqarRTpV
// JerD0jUVKsJMOYWL
//DjYQDzihjBhv8pHd
// DQYxtOkW0YqQeHhE
// field.db().find({use_yn : 'N'},(err,data) => {
//     console.log(err);
//     console.log(data);
// });

//
// data.db().insert({
//     code : ""
// })







