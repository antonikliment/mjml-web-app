const {
  removeTemplate,
  renameTemplate
} = require('./template-service');

const templateRoutes = app => {
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

      res.send(`File uploaded to ${uploadPath}`);
    })
  });
}
module.exports = templateRoutes;
