const {
  ipcMain,
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
} = require("electron");

const electron = require("electron");
const { template } = require("./menuTemplate");
const { folderSelectDialog, dragToOSHandler } = require("./fileHandler");

//this enables notifications as per https://www.electronjs.org/docs/tutorial/notifications
app.setAppUserModelId(process.execPath);

// Enable live reload for Electron
require("electron-reload")(__dirname, {
  electron: require(`../../node_modules/electron`),
});

function createWindow() {
  let min = Number.MAX_VALUE;
  let leftDisplay;
  electron.screen.getAllDisplays().forEach((display) => {
    if (display.workArea.x < min) {
      leftDisplay = display;
      min = display.workArea.x;
    }
  });

  const win = new BrowserWindow({
    x: leftDisplay.workArea.x,
    y: leftDisplay.workArea.y,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  win.loadFile("src/renderer/index.html");

  ipcMain.on("select-dirs", (event, arg) => {
    folderSelectDialog(event, arg, win);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

//global shortcuts work even when the application isn't focused!
app.whenReady().then(() => {
  globalShortcut.register("Ctrl+1+2+3", () => {
    console.log(
      "Secret message received. Initiating self destruct in 5...4...3..2...1"
    );
    setTimeout(() => {
      console.log("Just kidding");
    }, 2000);
  });
});

ipcMain.on("ondragstart", dragToOSHandler);

Menu.setApplicationMenu(Menu.buildFromTemplate(template));
