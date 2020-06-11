const { notifyOnlineStatus } = require("./internetConnectivity.js");
const { bind: bindKeyboardShortucts } = require("./keybindings");

//global state with custom namespace
window.globalState = {
  originalFetch: fetch,
  connected: undefined,
};

window.deleteGlobalState = (key) => {
  return delete window.globalState[key];
};

window.setGlobalState = (key, val) => {
  window.globalState[key] = val;
};
window.getGlobalState = (key) => {
  return window.globalState[key];
};

/*global overwrites*/
window.fetch = async (...args) => {
  const prevConectivity = getGlobalState("connected");
  const initialRequest = prevConectivity === undefined;

  try {
    const originalFetch = getGlobalState("originalFetch");
    await originalFetch("https://8.8.8.8");
    if (initialRequest || prevConectivity === false) {
      setGlobalState("connected", true);
      dispatchEvent(new Event("internetConnected"));
    }

    return originalFetch(...args);
  } catch (err) {
    //request to google failed. Either google is down/inaccessible or we aren't connected to the internet
    if (initialRequest || prevConectivity === true) {
      setGlobalState("connected", false);
      dispatchEvent(new Event("internetDisconnected"));
    }
    throw new Error("cannot connect to the internet");
  }
};

/*event listeners*/
window.addEventListener("internetConnected", () => {
  notifyOnlineStatus(true);
});

window.addEventListener("internetDisconnected", () => {
  notifyOnlineStatus(false);
});

bindKeyboardShortucts();
