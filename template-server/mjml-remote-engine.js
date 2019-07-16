const mjml2html = require('mjml')

const BASE_PATH = `${__dirname }/templates/`


module.exports = function(mjmlContent, remoteFolderPath) {
  if (mjmlContent.length < 3) {
    return {}
  }
  const options = {
    filePath: BASE_PATH + remoteFolderPath
  }
  try{
    return mjml2html(mjmlContent, options)
  }catch(e){
    return {
      html: ['<h1>Failed</h1>'],
      errors: [e]
    }
  }
}
