/*
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
}*/

// const modShell = wrapFunctions(shell, constructSpy('shell'));
// const modClipboard = wrapFunctions(clipboard, constructSpy('clipboard'));
// const modRemote = wrapFunctions(remote, constructSpy('remote'));

module.exports = {
  shell: {
    openExternal: (href) => window.open(href, '_blank')
  },
  clipboard:console.error,
  app:console.error,
  ipcRenderer: {
    on: (...args)=>{
      console.log('ipcRenderer->on')
      console.warn(...args)
    },
    removeListener: (...args)=>{
      console.log('ipcRenderer->removeListener')
      console.warn(...args)
    }
  },
  BrowserWindow:console.error,
  Menu:console.error,
  remote:console.error
};
