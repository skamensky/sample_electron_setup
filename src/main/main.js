const { ipcMain, app, Menu, globalShortcut } = require("electron");

const { template } = require("./menuTemplate");
const { dragToOSHandler } = require("./fileHandler");
const { createWindow } = require("./browserWindow");

// Enable live reload for Electron
require("electron-reload")(__dirname, {
  electron: require(`../../node_modules/electron`),
});

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
