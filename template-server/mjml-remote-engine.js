const mjml2html = require('mjml')

const BASE_PATH = `${__dirname }/templates/`


module.exports = function(mjmlContent, remoteFolderPath) {
  const options = {
    filePath: BASE_PATH + remoteFolderPath
  }
  try{
    return mjml2html(mjmlContent, options)
  }catch(e){
    console.warn(e)
    return "OPS"
  }
}
// export function migrateToMJML4(content) {
//   console.error("Not implemented")
//   //return migrate(content)
// }
