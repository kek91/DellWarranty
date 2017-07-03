'use strict';

const electron = require('electron');
const app = electron.app;
const windowStateKeeper = require('electron-window-state');

let mainWindow;

app.on('ready', function () {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 285,
        defaultHeight: 320
    });
 
    mainWindow = new electron.BrowserWindow({
        'x': mainWindowState.x,
        'y': mainWindowState.y,
        'width': mainWindowState.width,
        'height': mainWindowState.height,
        title: "DellWarranty",
        icon: __dirname + '/Dell.png',
        alwaysOnTop: true
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
 
    mainWindowState.manage(mainWindow);
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});