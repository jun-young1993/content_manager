// import {User} from '../../public/models/User'
const {User} = require('../../../public/models/User')
const data = new User();

// const {QueryMap} = require('../../public/models/stores/config/NedbConfig');
// // console.log(QueryMap);
// for(let method in QueryMap){
//     console.log(method);
//     console.log(QueryMap[method])
//     // console.log(NedbQueryMap);
// }
// return;

// data.get().then(resolve => {
//     console.log('rsolve',resolve);
// });
let data2 = {
    'test' : 'test'
}
console.log(Object.assign(data2,{
    'is_deleted' : "N",
    'created_at' : new Date('YmdHis'),
    'updated_at' : new Date('YmdHis'),
    'deleted_at' : null,
}));
console.log(data2);

return;
data.db().find({is_deleted : 'N'},(err,data) => {
    console.log(err);
    console.log(data);
})
//
// data.db().insert({
//     'user_name': 'test',
//         'phone_number' : 'test'
// },(err, data) => {
//     console.log('err',err);
//     console.log('data',data);
// });

// data.insert({test : 'test2'}).then(resolve => {
//     console.log('resolve',resolve);
// }).catch(reject => {
//     console.log('insert reject',reject)
// })





