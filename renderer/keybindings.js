const Mousetrap = require("mousetrap");
const Toastify = require("toastify-js");

//render process keyboard shortcuts, local only to specific webview

const bind = () => {
  Mousetrap.bind("ctrl+shift+k", function () {
    Toastify({
      text: "🕵🏿 You've found the secret keyboard shortcut 🔓!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      backgroundColor: "linear-gradient(to right, #ffa17f, #154369)",
      stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
  });
};

module.exports = { bind };
