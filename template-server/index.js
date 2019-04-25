const express = require('express');
const fileUpload = require('express-fileupload');

const app = express()
const port = 5000
app.use(fileUpload())
app.use(express.static('templates'))
app.post('/:path', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.')
    return
  }
  const sampleFile = req.files.template;
  const uploadPath  = `${__dirname  }/templates/test.mjml`

  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.send(`File uploaded to ${  uploadPath}`);
  })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
