const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Shell = electron.shell;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow(
    { 
      width: 900, 
      height: 680, 
      webPreferences: {
        nodeIntegration: true
      }
    });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
  let menu = Menu.buildFromTemplate([
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
  ]);
  
  Menu.setApplicationMenu(menu);
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
