// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const GK = require('global-keypress');
const gk = new GK();
gk.start();

var word = '';
var regx = new RegExp("\\W");

gk.on('press', (data)=> {
  //console.log(data)
  key = data['data']
  if( key.match(regx) == null){
    word = word + key.toLowerCase();

  }
});

gk.on('error', error => {
  console.error(error);
});


// process closed
gk.on('close', () => {
  console.log('closed');
  gk.stop()
  console.log('Stopped Keypressing');
});


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  //mainWindow.loadURL('https://Facebook.com')
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.allowRendererProcessReuse = false;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //if (process.platform !== 'darwin') 
  app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('app_loaded', (event, arg) => {
  console.log('got the app_loaded', arg, word.replace(" ",'').substring(word.length - +arg, word.length));
  event.reply('app_loaded_reply',JSON.stringify( word.replace(" ",'').substring(word.length - +arg, word.length) ))
});