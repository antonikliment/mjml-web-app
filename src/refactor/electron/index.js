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
   this.loadURL = (...args) => {
      console.log(args);
   }
   this.webContents = webContents
  }
}
module.exports = {
  clipboard: navigator.clipboard,
  remote: {
    BrowserWindow,
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
