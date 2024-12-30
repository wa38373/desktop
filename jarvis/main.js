const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec } = require('child_process');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Allow communication between main and renderer
        },
    });

    mainWindow.loadFile('main.html');
    mainWindow.removeMenu(); // Remove the default menu
});

// Handle "start-jarvis" request from renderer process
ipcMain.on('start-jarvis', () => {
    exec('python jarvis_ai.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting Jarvis: ${error.message}`);
            return;
        }
        console.log(`Jarvis Output: ${stdout}`);
    });
});

// Handle "add-app" request from renderer process
ipcMain.handle('select-app', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Executables', extensions: ['exe', 'app'] }],
    });

    if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0]; // Return the selected file path to the renderer process
    }
    return null;
});


