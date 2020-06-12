const { ipcMain, screen, app, BrowserWindow } = require("electron");

const { folderSelectDialog } = require("./fileHandler");

const createWindow = () => {
  let min = Number.MAX_VALUE;
  let leftDisplay;
  screen.getAllDisplays().forEach((display) => {
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
};

module.exports = {
  createWindow,
};
