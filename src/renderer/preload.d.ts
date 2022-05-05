declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        close(): void;
        minimize(): void;
        maximize(): void;
        restore(): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
