const { app, BrowserWindow, Menu, shell, clipboard, ipcRenderer, remote  } = require('electron')


function wrapFunctions(obj, fnWrapper) {
  const keys = Object.keys(obj);
  keys.forEach(key=>{
    const target = obj[key];
    if (typeof target === 'function') {
      const originalMethod =  obj[key]
      obj[key] = (...args) => {
        fnWrapper(...args);
        return originalMethod(...args)
      }
    }
  })

  return obj;
}

const constructSpy = (name) => (...args) => {
  console.log(`Intercepted call to ${name}`);
  console.log(args);
}

// const modShell = wrapFunctions(shell, constructSpy('shell'));
// const modClipboard = wrapFunctions(clipboard, constructSpy('clipboard'));
// const modRemote = wrapFunctions(remote, constructSpy('remote'));

module.exports = {
  shell,
  clipboard,
  app,
  ipcRenderer,
  BrowserWindow,
  Menu,
  remote
};
