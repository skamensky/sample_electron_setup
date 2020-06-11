const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
const electron = require("electron");

//this enables notifications as per https://www.electronjs.org/docs/tutorial/notifications
app.setAppUserModelId(process.execPath);

// Enable live reload for Electron
require("electron-reload")(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
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

  // Create the browser window.
  const win = new BrowserWindow({
    x: leftDisplay.workArea.x,
    y: leftDisplay.workArea.y,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  // and load the index.html of the app.
  win.loadFile("renderer/index.html");
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

const template = [
  {
    label: "File",

    submenu: [{ role: "quit", accelerator: "CmdOrCtrl+Q" }],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "delete" },
      { type: "separator" },
      { role: "selectAll" },
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "toggledevtools", accelerator: "F12" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [{ role: "minimize" }],
  },
];
Menu.setApplicationMenu(Menu.buildFromTemplate(template));
