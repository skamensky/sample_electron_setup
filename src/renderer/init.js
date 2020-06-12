const { initState } = require("./state");
const { notifyOnlineStatus, newFetch } = require("./internetConnectivity.js");
const { bind: bindKeyboardShortucts } = require("./keybindings");
const {
  handleDropEvent,
  handleDragover,
  handleDragEnter,
  handleDragLeave,
  listFiles,
  dragFilePathHandler,
} = require("./fileHandler.js");

initState();
/*global overwrites*/
window.fetch = newFetch;

/*event listeners*/
window.addEventListener("internetConnected", () => {
  notifyOnlineStatus(true);
});

window.addEventListener("internetDisconnected", () => {
  notifyOnlineStatus(false);
});

document.addEventListener("drop", handleDropEvent);
document.addEventListener("dragover", handleDragover);
document.addEventListener("dragenter", handleDragEnter);
document.addEventListener("dragleave", handleDragLeave);
document.getElementById("chooseFolder").addEventListener("click", listFiles);

bindKeyboardShortucts();
