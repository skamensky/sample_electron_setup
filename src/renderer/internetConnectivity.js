const Toastify = require("toastify-js");
const {
  deleteGlobalState,
  setGlobalState,
  getGlobalState,
} = require("./state");
//detect online/offline status changes
/*The strategy of using online/offline events or navigator.onLine doesn't detect actual network connectivity.
even though I'm neither connected to a VPN nor running in a VM box navigator.onLine always returns true.
Instead overwrite fetch and dispatch my own events
*/
const notifyOnlineStatus = (connected) => {
  if (connected) {
    Toastify({
      text: "😃 You're online 🌐!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      backgroundColor: "linear-gradient(to right, #2c6b2c, #78c242)",
      stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
  } else {
    Toastify({
      text: "😶 You're offline ⛔!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      backgroundColor: "linear-gradient(to right, #333333, #dd1818)",
      stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
  }
};

const testInternetConnectivity = () => {
  deleteGlobalState("connected");
  //test internet connectivity
  const toast = Toastify({
    text: "Test Started. Waiting to connect...",
    duration: -1,
    newWindow: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    backgroundColor: "linear-gradient(to right, #598e8d, #5fecea)",
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();

  fetch("https://google.com")
    .catch((e) => {})
    .finally(() => {
      toast.hideToast();
    });
};

const newFetch = async (...args) => {
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

module.exports = { testInternetConnectivity, notifyOnlineStatus, newFetch };
