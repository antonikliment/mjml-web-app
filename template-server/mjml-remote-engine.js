const mjml2html = require('mjml')


// const { execFile, exec } = require('helpers/fs')


module.exports = function (mjmlContent) {
  return mjml2html(mjmlContent)
}

// export function migrateToMJML4(content) {
//   console.error("Not implemented")
//   //return migrate(content)
// }
