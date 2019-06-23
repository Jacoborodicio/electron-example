const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Shell = electron.shell;
const Notification = electron.Notification;
const ipcMain = electron.ipcMain;
const path = require("path");
const isDev = require("electron-is-dev");
const storage = require('electron-json-storage');


let mainWindow;
let popUpWindow;

function createWindow() {
  mainWindow = new BrowserWindow(
    { 
      width: 900, 
      height: 680, 
      webPreferences: {
        nodeIntegration: true
      }
    });
    popUpWindow = new BrowserWindow(
      { 
        width: 600, 
        height: 480, 
        parent: mainWindow,
        webPreferences: {
          nodeIntegration: true
        },
        show: false
      });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  popUpWindow.loadURL(
    isDev
      ? "http://localhost:3000/popUp"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
  popUpWindow.on('close', (e) => {
    e.preventDefault();
    popUpWindow.hide();
  });
  let buildMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(buildMenu);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

let menu = [
  {
    label: 'Menú',
    submenu: [
      {
        label: 'Create a note'
      },
      {label: 'Replace'},
      {label: 'Find'}
    ]
  },
  {
    label: 'Info',
    submenu: [
      {
        label: 'See repo on GitHub',
        click() {
          Shell.openExternal('https://github.com/Jacoborodicio/electron-example')
        },
        accelerator: 'Ctrl+O'
     },
     {label: 'Details of the version'}
    ]
  }
];

if(process.env.NODE_ENV !== 'production') {
  menu.push({
    label: 'Open devTools',
    submenu: [
      {
        label: 'Show/Hide devTools',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  })
}

function sendNotification(title, body) {
  new notification({
    title,
    body
  }).show();
}

ipcMain.on('toggle-popup', (event, arg) => {
  popUpWindow.show();

  // Vemos como podemos enviar también datos con ipc
  popUpWindow.webContents.send('send-text', arg);
})

ipcMain.on('notification', (event, arg) => {
  let myNotification = new Notification({
    title: arg.title,
    body: arg.body
}).show();

  // if(myNotification)
  // myNotification.onClik = () => {
  //   console.log("Notification clicked!")
  // };
})

// Storage actions
ipcMain.on('fetch-note-from-storage', () => {
  storage.get('aplication', function(error, data){
    if(error) {
      mainWindow.send('handle-fetch-note-storage', {
        success: false,
        message: 'Impossible to fetch note',
        text: ''
      });      
    }
    let {savedText} = data;
    if(!savedText)
      savedText = '';
  
    mainWindow.send('handle-fetch-note-storage', {
      success: true,
      message: 'Note fetched successfully',
      text: savedText
    });
  })
});

ipcMain.on('save-note-to-storage', (event, arg) => {

  storage.set('aplication',{savedText: arg}, function (error) {
    if(error) {
      mainWindow.send('handle-fetch-note-storage', {
        success: false,
        message: 'Impossible to save note',
        text: ''
      });      
    }
    
      mainWindow.send('handle-save-note-storage', {
        success: true,
        message: 'Note saved successfully',
        text: arg
      });
  })
});

