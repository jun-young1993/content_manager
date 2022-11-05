
import React from 'react';
window.React = React

import ReactDOM from 'react-dom';
// import './index.css';



import MainContainer from '@views/main/MainContainer';
import ContentDetail from '@views/main/ContentDetail';

// import AppTest from './AppTest2';
import reportWebVitals from './reportWebVitals';
// import './views/css/main.css';
import {ipcRenderer} from "electron";
import UtilsContainer from "@views/main/UtilsContainer";
import {Box} from "@mui/material";
import { HashRouter, Navigation , Routes, Route } from 'react-router-dom';
ipcRenderer.send('auto-update-check','auto-update-check')


ReactDOM.render(
            <Box sx={{height:'90vh'}}>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={
                        (<>
                        <MainContainer />
                        <UtilsContainer />
                        </>
                        )} />
                        <Route path="/content-detail/:id" element={<>hi</>} />
                        <Route path="/admin" element={<>hi</>} />
                    </Routes>
                </HashRouter>
            </Box>,
    document.getElementById('root')
    
);

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     {/*<Tab />*/}
//       <MainContainer />
//     {/*  <MainTabBar />*/}
//     <div id="main" style = {{height:"100vh"}}>
//     </div>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
