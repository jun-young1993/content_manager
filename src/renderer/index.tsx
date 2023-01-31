/* eslint-disable import/order */
import 'tailwindcss/tailwind.css';
import { createRoot } from 'react-dom/client';
import App from './app';
import './tailwind.css';
import AppStore from '../lib/store/app-store';
import Dispatcher from './dispatcher';

// const body = document.getElementsByTagName('body')[0];
// body.setAttribute('style', 'height:100vh');

const container = document.getElementById('root')!;
// container.setAttribute('style', 'height:100vh');
const root = createRoot(container);

const appStore: AppStore = new AppStore();
const dispatcher = new Dispatcher(appStore);

root.render(<App dispatcher={dispatcher} />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
