
import path from 'path'

import { fsWriteFile, fsUnlink } from 'helpers/fs'

const { remote } = require('../refactor/electron');

const TMP_FILE = 'tpm-mjml-preview.html'

export function takeScreenshot(html, deviceWidth, workingDirectory) {
  return new Promise(async resolve => {
    const win = new remote.BrowserWindow({
      width: deviceWidth,
      show: false,
    })

    const tmpFileName = path.join(workingDirectory, TMP_FILE)
    await fsWriteFile(tmpFileName, html)

    win.loadURL(`file://${tmpFileName}`)

    win.webContents.on('did-finish-load', () => {
      // Window is not fully loaded after this event, hence setTimeout()...
      win.webContents.executeJavaScript(
        "document.querySelector('body').getBoundingClientRect().height",
        height => {
          win.setSize(deviceWidth, height + 50)
          const takeShot = () => {
            win.webContents.capturePage(img => {
              // eslint-disable-line
              win.close()
              resolve(img.toPng())
            })
          }
          setTimeout(takeShot, 500)
        },
      )
    })
  })
}

export async function cleanUp(workingDirectory) {
  const tmpFileName = path.join(workingDirectory, TMP_FILE)
  await fsUnlink(tmpFileName)
}
