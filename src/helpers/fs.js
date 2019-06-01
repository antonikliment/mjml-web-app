import fs from 'refactor/fs-wrapper'
// import { ncp } from 'ncp'
import path from 'path'
import { promisify } from 'es6-promisify'

const { remote } = require('../refactor/electron');

import {
  createProject,
  renameTemplate,
  getProjectFromServer,
  getFilesFromServer,
  saveOnServer,
  readFromServer,
  deleteTemplateFromServer
} from 'api-client';

const { dialog } = remote
export const deleteFile = deleteTemplateFromServer;
export const fsReadDir = getProjectFromServer;
export const fsRename = renameTemplate
// const fsReadFileFromDisk = promisify(fs.readFile)
// const fsWriteFileToDisk = promisify(fs.writeFile)
export const fsAccess = promisify(fs.access)
export const fsStat = promisify(fs.stat)
export const fsMkdir = createProject
export const fsUnlink = promisify(fs.unlink)
export const recursiveCopy = console.error

export async function fsReadFile(...args) {
  console.log('fsReadFile');
  return readFromServer(...args);
  // await fsReadFileFromDisk(...args)
}
export async function fsWriteFile(...args) {
  console.log('fsWriteFile');
  return saveOnServer(...args)
  // await fsWriteFileToDisk(...args)
}
export async function readFile(path, options, cb) {
  try {
    const res  = await fsReadFile(path, options)
    cb(null, res);
  }catch(e) {
    cb(e, null);
  }
}
export async function writeFile(path, defaultMJML, cb) {
  try {
    const res  = await fsWriteFile(path, defaultMJML)
    cb(null, res);
  }catch(e) {
    cb(e);
  }
}

export function getFileInfoFactory(p) {
  return async name => {
    const fullPath = path.resolve(p, name)
    try {
      const stats = await fsStat(fullPath)
      return {
        name,
        path: fullPath,
        isFolder: stats.isDirectory(),
      }
    } catch (err) {
      return {
        name,
        path: fullPath,
        isFolder: false,
      }
    }
  }
}

export function sortFiles(files) {
  files.sort((a, b) => {
    if (a.isFolder && !b.isFolder) {
      return -1
    }
    if (!a.isFolder && b.isFolder) {
      return 1
    }
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName < bName) {
      return -1
    }
    if (aName > bName) {
      return 1
    }
    return 0
  })
}

export async function readDir(p) {
  const files = await getFilesFromServer(p);
  return files;
  /*
  const filesList = await fsReadDir(p)

  const filtered = filesList.filter(f => !f.startsWith('.'))
  const getFileInfo = getFileInfoFactory(p)
  const enriched = await Promise.all(filtered.map(getFileInfo))
  return enriched
  */
}

export function fileDialog(options) {
  const res = dialog.showOpenDialog(options)
  if (!res || !res.length) {
    return null
  }
  const p = res[0]
  return p || null
}

export function saveDialog(options) {
  const res = dialog.showSaveDialog(options)
  return res
}

export async function isValidDir(path) {
  // try {
  //   await fsAccess(path, fs.constants.R_OK | fs.constants.W_OK)
  // } catch (e) {
  //   return false
  // }
  // const stats = await fsStat(path)
  return true // stats.isDirectory()
}

export async function alreadyExists(location) {
  // try {
  //   await fsAccess(location, fs.constants.R_OK | fs.constants.W_OK)
  // } catch (err) {
  //   if (err.code === 'ENOENT') {
  //     return false
  //   }
  //   return true
  // }
  return false
}

export async function isEmptyOrDontExist(location) {
  const filesList = await fsReadDir(location)
  return filesList.length === 0
}

export async function createOrEmpty(location) {
  console.log('createOrEmpty')
  await fsMkdir(location)
  /*
  try {
    await fsAccess(location, fs.constants.R_OK | fs.constants.W_OK)
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fsMkdir(location)
    }
  }
  */
  const filesList = await fsReadDir(location)
  if (filesList.length > 0) {
    throw new Error('Directory not empty')
  }
}

export function exec(cmd, opts = {}) {
  return new Promise(resolve => {
    try {
      x(cmd, opts, (err, stdout, stderr) => {
        resolve({
          err,
          stdout,
          stderr,
        })
      })
    } catch (err) {
      resolve({ err })
    }
  })
}

export function execFile(cmd, args, opts = {}, stdinStream) {
  return new Promise(resolve => {
    try {
      throw Error("todo")
      // const child = xFile(cmd, args, opts, (err, stdout, stderr) => {
      //   resolve({
      //     err,
      //     stdout,
      //     stderr,
      //   })
      // })
      // stdinStream.pipe(child.stdin)
    } catch (err) {
      resolve({ err })
    }
  })
}

export async function fileExists(p) {
  console.log('fileExists')
  return false;/*
  try {
    await fsAccess(p, fs.constants.F_OK)
    return true
  } catch (err) {
    // eslint-disable-line
    return false
  }*/
}
