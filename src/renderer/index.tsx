import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
import { store } from './store';
import { Provider } from 'react-redux';

root.render(
  <Provider store={store}>
    <App data-theme='light'/>
  </Provider>
);

// calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
// });
// window.electron.ipcRenderer.myPing();
