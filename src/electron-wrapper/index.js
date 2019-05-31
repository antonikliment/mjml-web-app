/*
const { app, BrowserWindow, Menu, shell, clipboard, ipcRenderer, remote  } = require('electron')
*/

// const modShell = wrapFunctions(shell, constructSpy('shell'));
// const modClipboard = wrapFunctions(clipboard, constructSpy('clipboard'));
// const modRemote = wrapFunctions(remote, constructSpy('remote'));

module.exports = {
  shell: {
    openExternal: (href) => window.open(href, '_blank')
  },
  clipboard: console.error,
  app: console.error,
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
  BrowserWindow: console.error,
  Menu: console.error,
  remote: {
    dialog: {
      showOpenDialog: (...args) => {
       console.log('dialog->showOpenDialog')
       console.warn(...args)
     },
     showSaveDialog: (...args) => {
      console.log('dialog->showOpenDialog')
      console.warn(...args)
     }
    }
  }
};
