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
let loginWindow;

function createWindow() {
  mainWindow = new BrowserWindow(
    { 
      width: 900, 
      height: 680, 
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        allowRunningInsecureContent: true
      }
    });
    popUpWindow = new BrowserWindow(
      { 
        width: 600, 
        height: 480, 
        parent: mainWindow,
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false,
          allowRunningInsecureContent: true
        },
        show: false
      });
    loginWindow = new BrowserWindow(
      {
        width: 400,
        height: 380,
        // parent: mainWindow,
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false,
          allowRunningInsecureContent: true
        },
        show: false
      });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  /** In different windows right now we're not taking care of build moment, we should also mapping that */
  popUpWindow.loadURL(
    isDev
      ? "http://localhost:3000/popUp"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  loginWindow.loadURL(
    isDev
      ? "http://localhost:3000/login"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));

  popUpWindow.on('close', (e) => {
    e.preventDefault();
    popUpWindow.hide();
  });

  loginWindow.on('close', (e) => {
    e.preventDefault();
    loginWindow.hide();
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
      {type: 'separator'},
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]},
  {
    label: 'Info',
    submenu: [
      {
        label: 'See repo on GitHub',
        click() {
          Shell.openExternal('https://github.com/Jacoborodicio/electron-example')
        },
        accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+O'
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
        },
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
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
      mainWindow.webContents.send('handle-fetch-note-storage', {
        success: false,
        message: 'Impossible to fetch note',
        text: ''
      });      
    }
    let {savedText} = data;
    if(!savedText)
      savedText = '';
  
    mainWindow.webContents.send('handle-fetch-note-storage', {
      success: true,
      message: 'Note fetched successfully',
      text: savedText
    });
  })
});

ipcMain.on('save-note-to-storage', (event, arg) => {

  storage.set('aplication',{savedText: arg}, function (error) {
    if(error) {
      mainWindow.webContents.send('handle-fetch-note-storage', {
        success: false,
        message: 'Impossible to save note',
        text: ''
      });      
    }
    
      mainWindow.webContents.send('handle-save-note-storage', {
        success: true,
        message: 'Note saved successfully',
        text: arg
      });
  })
});

ipcMain.on('login-component', () => {
  console.log('llamada a login-component que en realidad es cerrar....')
  loginWindow.show()}
  );


ipcMain.on('close-login', () => {
  console.log('Event of closing received in electron.js');
  loginWindow.close();
});

// Not in production
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  console.log('entramos en el certi-err')
  if (url === 'https://localhost:8443/claimreport/home/api/forecasts') {
    // Lógica de verificación.
    event.preventDefault();
    callback(true)
  } else {
    callback(false)
  }
})

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault();
  loginWindow.show();
  ipcMain.on('getLogin', (event, credentials) => {  
    callback(credentials.username, credentials.password);
    loginWindow.hide();  
  });
});