// import {User} from '../../public/models/User'
const {Media} = require('../../../public/models/Media')
const media = new Media();
const path = require("path");
const {Content} = require('../../../public/models/Content')
const content = new Content();
// import {uniqueId} from "lodash";
const {uniqueId} =require("lodash");

media.db().findOne({content_id : 'qVci79SkN042Wqrn', type : 'out'},(err,data)=>{
    console.log(data);
})


// media.db().remove({}, { multi: true });
// content.db().remove({}, { multi: true });

// content.db().insert({title : "title"});


// content.db().find({},(err,data) => {
//     console.log(data);
// });
// console.log(codeItem);
// codeItem.db().find({is_deleted : "N",parent_code : "STORAGE_TYPE", use_yn : "Y"},(err,data) => {
//     console.log(data);
// })
// codeItem.db().remove({_id : "rEhMekfo6NDM9yFo"},(err,data) => {
//     console.log(data);
// });
// codeItem.db().remove({_id : "rEhMekfo6NDM9yFo"},(err,data) => {
//     console.log(data);
// });
//
// const insert  = data.db().insert({
//     code : "tes2"
// },(err,data) => {
//     console.log(data);
// })
// console.log(insert);







