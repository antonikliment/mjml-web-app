const {
  removeProject,
  createProject,
  listProjects,
  listTemplates
} = require('./template-service');

const projectRoutes = app => {

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
}

module.exports = projectRoutes;
