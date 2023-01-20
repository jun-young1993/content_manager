import 'tailwindcss/tailwind.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import './tailwind.css';

// const body = document.getElementsByTagName('body')[0];
// body.setAttribute('style', 'height:100vh');

const container = document.getElementById('root')!;
// container.setAttribute('style', 'height:100vh');
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
