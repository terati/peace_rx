import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    close() {
      ipcRenderer.send('close-window');
    },
    minimize() {
      // ipcRenderer.send('ipc-example', 'ping');
      ipcRenderer.send('minimize-window');
    },
    maximize() {
      ipcRenderer.send('maximize-window');
    },
    force_maximize() {
      ipcRenderer.send('force-maximize-window');
    },
    restore() {
      ipcRenderer.send('restore-window');
    },
    redirect_login_to_home() {
      ipcRenderer.send('redirect_login_to_home');
    }, 
    on(channel: string, func: (...args: unknown[]) => void) { 
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
          func(...args);
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
});

