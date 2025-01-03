const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Allow communication between main and renderer
            preload: path.join(__dirname, 'preload.js'), // Preload script
        },
    });

    mainWindow.loadFile('main.html'); // Load the initial HTML file
    mainWindow.removeMenu(); // Remove the default menu
});

// Handle "start-jarvis" request from renderer process
ipcMain.on('start-jarvis', () => {
    // Get the full path to jarvis.py
    const scriptPath = path.join(__dirname, 'jarvis.py'); // Correct path to your Python script

    // Execute the Python script
    exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting Jarvis: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
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

// Close the app when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
