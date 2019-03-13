import { app, BrowserWindow, Menu, screen } from 'electron'

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
    global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

let mainWindow

function createWindow() {
    var bounds = screen.getAllDisplays()[0].bounds
    Menu.setApplicationMenu(null)
        /**
         * Initial window options
         */
    mainWindow = new BrowserWindow({
        width: 380,
        height: bounds.height * 0.8,
        x: bounds.width - 480,
        y: 50,
        minWidth: 350,
        minHeight: 800,
        maxWidth: 350,
        maxHeight: 800,
        maximizable: false,
        useContentSize: true,
        webPreferences: {
            webSecurity: false
        }
    })

    mainWindow.loadURL(process.env.APP_URL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})