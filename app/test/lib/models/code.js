// import {User} from '../../public/models/User'
const {Code} = require('../../../public/models/Code')
const data = new Code();

const {CodeItem} = require('../../../public/models/CodeItem')
const codeItem = new CodeItem();
// console.log(codeItem);
// codeItem.db().find({is_deleted : "N",parent_code : "STORAGE_TYPE", use_yn : "Y"},(err,data) => {
//     console.log(data);
// })
// codeItem.db().remove({_id : "rEhMekfo6NDM9yFo"},(err,data) => {
//     console.log(data);
// });
codeItem.db().remove({_id : "rEhMekfo6NDM9yFo"},(err,data) => {
    console.log(data);
});
//
// data.db().insert({
//     code : ""
// })







