console.log('migration start');
return;
const {db} = require('../../../config/migration');
const {isEmpty} = require('lodash');

if(db){
    const migration = db;

     for(let migrationIndex=0; migrationIndex<migration.length; migrationIndex++){
         const current = migration[migrationIndex];
         const model = current.model;



         const defaultData = current.default;
         const items = current.items;

         const database = new model();
         const migrationDb = database.db();


            for(let itemIndex=0; itemIndex<items.length; itemIndex++){
                const itemData = items[itemIndex];
                const insertData = Object.assign(defaultData,itemData);

                migrationDb.findOne({_id : insertData._id},(err,data) => {
                    console.log('migration data',data);
                    if(isEmpty(data)){
                        console.log('find migration');
                        migrationDb.insert(insertData,(insertError,insertData) => {
                            console.log('[insert]',insertData);
                        });
                    }else{
                        console.log('not find migration');
                        migrationDb.remove({_id : insertData._id},(removeError, removeData) =>{
                            console.log('[remove]',removeData);
                            if(removeData){
                                migrationDb.insert(insertData,(insertError,insertData) => {
                                    console.log('[insert]',insertData);
                                });
                            }
                        })
                    }
                })


            }
     }
}