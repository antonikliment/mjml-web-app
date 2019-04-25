const express = require('express');
const fileUpload = require('express-fileupload');
const {
  removeProject,
  listProjects,
  listTemplates,
  removeTemplate
} = require('./template-service');

const app = express()
const port = 5000;

app.use(fileUpload({ createParentPath: true }))
app.use(express.static(`${__dirname}/templates`));

app.get('/', (req, res) => {
  const projects = listProjects(`${__dirname}/templates`);
  res.send({ projects });
});

app.delete('/:projectName', (req, res) => {
  const { projectName } = req.params;
  removeProject(projectName);
  res.send(`${projectName} was deleted`)
});

app.get('/:projectName', (req, res) => {
  const { projectName } = req.params
  const files = listTemplates(`${__dirname}/templates/${projectName}`);
  res.send(files);
});

app.delete('/:projectName/:templateName', (req, res) => {
  const { projectName, templateName } = req.params;
  removeTemplate(projectName, templateName);
  res.send(`${templateName} was deleted`)
});
app.post('/:projectName/:templateName', (req, res) => {
  const { projectName, templateName } = req.params;
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.')
    return
  }
  const sampleFile = req.files.template;
  const uploadPath  = `${__dirname}/templates/${projectName}/${templateName}`

  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err)
    }

    res.send(`File uploaded to ${  uploadPath}`);
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
