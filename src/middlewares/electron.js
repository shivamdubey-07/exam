const { app, BrowserWindow, globalShortcut, session } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false
        },
        autoHideMenuBar: true
    });

    // Load your React application URL
    mainWindow.loadURL('http://localhost:3000/paper'); // Replace with your React application's URL

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    globalShortcut.register('CommandOrControl+C', () => {
        // Do nothing or show a warning message
    });

    globalShortcut.register('CommandOrControl+R', () => {
        // Do nothing or show a warning message
    });

    globalShortcut.register('CommandOrControl+P', () => {
        // Do nothing or show a warning message
    });

    globalShortcut.register('CommandOrControl+A', () => {
        // Do nothing or show a warning message
    });

    globalShortcut.register('CommandOrControl+F', () => {
        // Do nothing or show a warning message
    });

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        // Do nothing or show a warning message
    });

    globalShortcut.register('CommandOrControl+L', () => {
        // Do nothing or show a warning message
    });

    globalShortcut.register('CommandOrControl+M', () => {
        // Do nothing or show a warning message
    });

    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key === "Escape") {
            event.preventDefault();
        }
        if (input.key === 'PrintScreen') {
            event.preventDefault();
        }
        if (input.key === 'F1' || input.key === 'F3' || input.key === 'F4' || input.key === 'F5' || input.key === 'F10') {
            event.preventDefault();
        }
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (url !== 'http://localhost:3000') { // Replace with your React application's URL
            event.preventDefault();
        }
    });

    session.defaultSession.on('will-download', (event) => {
        event.preventDefault();
    });

    mainWindow.setFullScreen(true);

    mainWindow.on('blur', () => {
        // Terminate the application when the window loses focus
        mainWindow.webContents.executeJavaScript(`
      const closeButton = document.getElementById('closeButton');
      if (closeButton) {
        closeButton.click();
      }
    `);
    });

}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});