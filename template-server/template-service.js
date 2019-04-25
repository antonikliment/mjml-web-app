const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

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
module.exports = {
  listProjects,
  listTemplates
};
