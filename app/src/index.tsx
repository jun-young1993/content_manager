
import React from 'react';
window.React = React

import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Tab from './views/menues/Tab';

import MainContainer from '@views/main/MainContainer';
import MainTabBar from '@src/views/main/MainTabBar';
// import AppTest from './AppTest2';
import reportWebVitals from './reportWebVitals';
import './views/css/main.css';

ReactDOM.render(
            <>
                <MainContainer />
                {/*<div id="main" style = {{height:"100vh"}}>*/}
                {/*</div>*/}
            </>,
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
