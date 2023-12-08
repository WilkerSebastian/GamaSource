const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        autoHideMenuBar: true
    })

    mainWindow.loadFile(path.join(__dirname, "/dist/index.html"))

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.setFullScreen(true);
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {


        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})