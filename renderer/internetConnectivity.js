const Toastify = require("toastify-js");

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

module.exports = { testInternetConnectivity, notifyOnlineStatus };
