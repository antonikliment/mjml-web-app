const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const fileUpload = require('express-fileupload');
const {
  removeProject,
  createProject,
  listProjects,
  listTemplates,
  removeTemplate,
  renameTemplate
} = require('./template-service');

const mjmlEngine = require('./mjml-remote-engine')

const app = express()
app.use(cors())
const port = 5000;

app.use(bodyParser.json());

app.use(fileUpload({ createParentPath: true }));
app.use(express.static(`${__dirname}/templates`));

app.post('/remote', (req, res) => {
  const {
    mjmlContent,
    remoteFolderPath
  } = req.body
  const out = mjmlEngine(mjmlContent, remoteFolderPath);
  res.send(out)
})

app.get('/', (req, res) => {
  const projects = listProjects(`${__dirname}/templates`);
  res.send({ projects });
});

app.delete('/:projectName', (req, res) => {
  const { projectName } = req.params;
  removeProject(projectName);
  res.send(`${projectName} was deleted`)
});
app.post('/:projectName', (req, res) => {
  const { projectName } = req.params
  const files = createProject(projectName);
  res.send(files);
})
app.get('/:projectName/:subfolder', (req, res) => {
  const { projectName, subfolder } = req.params
  const files = listTemplates(`${__dirname}/templates/${projectName}/${subfolder}`);
  res.send(files);
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

app.patch('/:projectName/:templateName', (req, res) => {
  const { projectName, templateName } = req.params;
  const { newTemplateName } = req.body;
  const originalPath  = `${__dirname}/templates/${projectName}/${templateName}`;
  const newPath  = `${__dirname}/templates/${projectName}/${newTemplateName}`;

  renameTemplate(originalPath, newPath)

  res.send(`${originalPath} was renamed ${newPath}`)
})

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

    res.send(`File uploaded to ${uploadPath}`);
  })
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
