const electron = require('electron');
const {app, BrowserWindow} = require('electron');

let win;


setScreen = ()=>{
    let displays = electron.screen.getAllDisplays();
    let externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
    });

    if (externalDisplay) {
        win = new BrowserWindow({
            x: externalDisplay.bounds.x + 50,
            y: externalDisplay.bounds.y + 50
        });
    }
};