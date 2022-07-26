// import {User} from '../../public/models/User'


require("module-alias/register");
const path = require('path');
const {Workflow} = require("@models/Workflow");
const db = new Workflow();
const {WorkflowRule} = require("@models/WorkflowRule");
const wdb = new WorkflowRule();
const {Task} = require("@models/Task");
const tdb = new Task();
const {Module} = require("@models/Module");
const mdb = new Module();
const {Media} = require("@models/Media");
const mediaDb = new Media();
const { createTreeHierarchy } = require('hierarchy-js');
const { join } = require("path");
const logging = require('../../../public/config/logging');
console.log(logging);
return;
mediaDb.db().findOne({content_id : '3foJzOqBvOY9en7J', type : 'thumbnail'},(err,data) => {
    console.log(data);
    return;
    const thumbnailPath = path.resolve(data.full_path);
    console.log(thumbnailPath+'.png');
})
// tdb.db().findOne({_id : 'sW5himP0mmlefe6a'},(err,data) => {
    
//     tdb.db().update({_id : data._id},{$set:{status : 'complete'}},(err,data) => {
//         console.log('err',err);
//         console.log('update data',data);
//         tdb.db().find({status : 'complete'},(err,data)=>{
//             console.log(data)
//         })
//     })
// });
return;
// wdb.db().find({workflow_id : 'CEFm95JwruHbRIyN'},(err,data) => {
//     data.map((child) => {
//         child.id = child._id;
//         child.name = child.module_name
//         child.parentId = child.parent_id;
//         return child;
//     });
//     console.log(data);
// })
// const {Module} = require("@models/Module");
// const dbm = new Module();
// tdb.db().findOne({_id : '995VAwrwpcFtyNrL'},(err,data)=>{
//     console.log(data);
// })
// tdb.db().find({status : 'queue'}).sort({priority : -1}).limit(1).exec((err,data)=>{
//     console.log(data);
//
// })
// tdb.db().findOne({_id : 'dtSbRILvxV3t3LFb'},(err,taskData) => {
//         const ruleId = taskData.rule_id;
//         const workflowId = taskData.workflow_id;
//         console.log('taskData',taskData);
//     wdb.db().find({parent_id : ruleId},(err,workflowDatas) => {
//             console.log(workflowDatas);
//     })
// })
//
// return;
// db.db().findOne({_id : 'I2Pn8lsiKU5LCS4o'},(err, data) => {
// mediaDb.db().find({content_id : 'XCWY4fX064W8FVwQ'},(err, data) =>{
//     console.log(data);
// })
return;
wdb.db().findOne({workflow_id : 'SdM0se6fbDAizR9V', parent_id : null},(err,data)=>{
        if(data){
            const rootId = data._id;
            
            wdb.db().find({parent_id : rootId}, (err,data) => {
                console.log(data)
            })
            // wdb.db().find({parent_id : rootId},(err,data)=>{
            //     const moduleId = data[0].module_id;
            //     mdb.db().findOne({_id : moduleId},(err,data)=>{
            //         console.log(data);
            //     })
            // })
        }
        // data.map((child) => {
        //     child.id = child._id;
        //     child.name = child.module_name
        //     child.parentId = child.parent_id;
        //     return child;
        // });
        // console.log(data);
        // console.log('=================================')
        // console.log(createTreeHierarchy(data))
        
    })
// });

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







