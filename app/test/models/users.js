// import {User} from '../../public/models/User'
const {User} = require('../../public/models/User')
const data = new User();

// const {QueryMap} = require('../../public/models/stores/config/NedbConfig');
// // console.log(QueryMap);
// for(let method in QueryMap){
//     console.log(method);
//     console.log(QueryMap[method])
//     // console.log(NedbQueryMap);
// }
// return;

data.get().then(resolve => {
    console.log('rsolve',resolve);
});

// data.insert({test : 'test2'}).then(resolve => {
//     console.log('resolve',resolve);
// }).catch(reject => {
//     console.log('insert reject',reject)
// })





