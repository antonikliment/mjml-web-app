const {
  mkdirSync,
  rmdirSync,
  existsSync,
  lstatSync,
  readdirSync,
  unlinkSync
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
  return readdirSync(path).map(name => join(path, name)).filter(isDirectory).map(pathConverter)
}

function listTemplates(path) {
  return readdirSync(path).map(name => join(path, name)).filter(isFile).map(pathConverter)
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

module.exports = {
  createProject,
  listProjects,
  listTemplates,
  removeTemplate,
  removeProject
};
