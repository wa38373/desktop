const { contextBridge } = require('electron');

// Expose safe APIs for the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    log: (message) => console.log(message), // Example: Log to main console
});
