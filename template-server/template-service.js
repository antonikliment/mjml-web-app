const {
  mkdirSync,
  rmdirSync,
  existsSync,
  lstatSync,
  readdirSync,
  unlinkSync,
  renameSync
 } = require('fs');
const { join } = require('path');

function deleteFolderRecursive(path) {
  if (existsSync(path)) {
    readdirSync(path).forEach((file) => {
      const curPath = `${path}/${file}`;
      if (lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        unlinkSync(curPath);
      }
    });
    rmdirSync(path);
  }
};
const isDirectory = source => lstatSync(source).isDirectory();
const isFile = source => lstatSync(source).isFile();

function pathConverter(path) {
  const pathBlock = path.split("/")
  return pathBlock.pop();
}

function listProjects(path) {
  let projects;
  try {
    projects= readdirSync(path)
  } catch(e) {
    projects = []
  }
  return projects.map(name => join(path, name)).filter(isDirectory).map(pathConverter)
}

function listTemplates(path) {
  let files;
  try {
    files= readdirSync(path)
  } catch(e) {
    files = []
  }
  return files.map(name => join(path, name)).filter(isFile).map(pathConverter)
}
function listTemplates2(path) {
  let files;
  try {
    files= readdirSync(path)
  } catch(e) {
    files = []
  }
  return files.map(name => join(path, name)).map(path => {
    return {
      name: pathConverter(path),
      isFolder: !isFile(path)
    }
  });
}


function removeTemplate(projectName, templateName) {
  return unlinkSync(`${__dirname}/templates/${projectName}/${templateName}`);
}

function removeProject(projectName) {
  return deleteFolderRecursive(`${__dirname}/templates/${projectName}`);
}
function createProject(projectName) {
  const path = `${__dirname}/templates/${projectName}`
  return mkdirSync(path);
}
function renameTemplate(oldPath, newPath) {
  return renameSync(oldPath, newPath);
}
module.exports = {
  createProject,
  renameTemplate,
  listProjects,
  listTemplates,
  listTemplates2,
  removeTemplate,
  removeProject
};
