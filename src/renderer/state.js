//global state with custom namespace
const initState = () => {
  window.globalState = {
    originalFetch: fetch,
    connected: undefined,
  };
};

const deleteGlobalState = (key) => {
  return delete window.globalState[key];
};

const setGlobalState = (key, val) => {
  window.globalState[key] = val;
};
const getGlobalState = (key) => {
  return window.globalState[key];
};

module.exports = {
  initState,
  deleteGlobalState,
  setGlobalState,
  getGlobalState,
};
