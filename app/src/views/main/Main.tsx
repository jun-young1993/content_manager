import Calendar from './Calendar';
import User from './User';
import Storage from './Storage';
import Code from './Code';
import Ingest from './Ingest';
import React from 'react';
function Main(props : any) {

    const modeMap : any  = {
        "calendar" : <Calendar />,
        "user" : <User />,
        "storage" : <Storage />,
        "code" : <Code />,
        "ingest" : <Ingest />
    };
    
    let mode:JSX.Element = modeMap[props.mode];
    if(mode == undefined){
        mode = <>'개발 안됨'</>;
    }
        return (
            mode
            // 
        );
  


}
// class Main extends React.Component {
//   render() {
//         return (
//         <>
//         <h1> 안녕!</h1>
//         <h2>잘 작동하니?!!</h2>
//         </>
//     );
//   }
// }
export default Main;