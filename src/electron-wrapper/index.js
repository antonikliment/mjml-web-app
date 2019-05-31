/*
const { app, BrowserWindow, Menu, shell, clipboard, ipcRenderer, remote  } = require('electron')
*/

// const modShell = wrapFunctions(shell, constructSpy('shell'));
// const modClipboard = wrapFunctions(clipboard, constructSpy('clipboard'));
// const modRemote = wrapFunctions(remote, constructSpy('remote'));

const webContents = {
  send: (event)=>{
    const evt = new Event(event)
    window.dispatchEvent(evt);
  },
  on: (event, cb) => {
    console.log('add event listener', event )
    window.addEventListener(event, cb)
  }

}
class BrowserWindow {
  constructor() {
   this.webContents = webContents
  }
}
module.exports = {
  shell: {
    openExternal: (href) => window.open(href, '_blank')
  },
  clipboard: console.error,
  app: console.error,
  ipcRenderer: {
    on: (event, cb) => {
      console.log('ipcRenderer->on')
      // console.warn(...args)
      window.addEventListener(event, cb)
    },
    removeListener: (event, cb) => {
      console.log('ipcRenderer->removeListener')
      window.removeEventListener(event, cb)
    }
  },
  BrowserWindow,
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
