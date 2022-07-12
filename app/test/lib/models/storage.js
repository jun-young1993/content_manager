// import {User} from '../../public/models/User'
const {Code} = require('../../../public/models/Code')
const data = new Code();

require("module-alias/register");
const {Storage} = require("@models/Storage");
const db = new Storage();
// console.log(codeItem);
// codeItem.db().find({is_deleted : "N",parent_code : "STORAGE_TYPE", use_yn : "Y"},(err,data) => {
//     console.log(data);
// })
// field.db().remove({},{multi:true},(err,data) => {
//     console.log(data);
// });
db.db().find({},(err,data) => {
    console.log(err);
    console.log(data);
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







