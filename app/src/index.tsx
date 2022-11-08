import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import MainContainer from '@views/main/MainContainer';

// import AppTest from './AppTest2';
import reportWebVitals from './reportWebVitals';
// import './views/css/main.css';
import {ipcRenderer} from "electron";
import UtilsContainer from "@views/main/UtilsContainer";
import {Box} from "@mui/material";
import {HashRouter, Route, Routes} from 'react-router-dom';
import LanShare from "@views/main/LanShare";
import ContentDetail from "@views/main/ContentDetail";

window.React = React

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
                        <Route path="/content-detail" element={<ContentDetail />} />
                        <Route path="/share" element={<LanShare />} />
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
