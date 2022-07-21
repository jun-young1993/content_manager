// import {User} from '../../public/models/User'


require("module-alias/register");
const {Workflow} = require("@models/Workflow");
const db = new Workflow();
const {WorkflowRule} = require("@models/WorkflowRule");
const wdb = new WorkflowRule();
const { createTreeHierarchy } = require('hierarchy-js');
// const {Module} = require("@models/Module");
// const dbm = new Module();


db.db().findOne({_id : 'I2Pn8lsiKU5LCS4o'},(err, data) => {
    
    wdb.db().find({workflow_id : data._id},(err,data)=>{
        data.map((child) => {
            child.id = child._id;
            child.name = child.module_name
            child.parentId = child.parent_id;
            return child;
        });
        console.log(data);
        console.log('=================================')
        console.log(createTreeHierarchy(data))
        
    })
});

// console.log(codeItem);
// codeItem.db().find({is_deleted : "N",parent_code : "STORAGE_TYPE", use_yn : "Y"},(err,data) => {
//     console.log(data);
// })
// field.db().remove({},{multi:true},(err,data) => {
//     console.log(data);
// });

// db.db().update({_id : 'oZUTCVEUgPfvWREm'},{$set : {'children' : [obj]}});
// dbm.db().find({_id : 'wclq3LLKdqIVV1ew'},(err,data)=>{
//     console.log(data);
// })
// db.db().findOne({_id : 'GYPVWdzSkCFp5e5P'},(err,data) => {
//     console.log(data);
//     // console.log(JSON.parse(data.children));
// });
// db.db().update({_id : 'ky4co3zIHCKMa29Z'},{$set:{'children' : {id : 'test', name : 'name', children : [{id : '2', name : '3'}]}}});
// db.db().findOne({_id : 'EjP6hRG1lIDmvdbI'},(err,data) => {
//     console.log(data);
// })


    
// db.db().insert(args,(err,data) => {
//     console.log(data);
// })
// _id:"wclq3LLKdqIVV1ew"
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







