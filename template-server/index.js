const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const fileUpload = require('express-fileupload');
// const {
//   removeTemplate,
//   renameTemplate
// } = require('./template-service');

const templateRoutes = require('./template-routes');
const projectRoutes = require('./project-routes');
const mjmlEngine = require('./mjml-remote-engine')

const app = express()
app.use(cors())
const port = 5000;

app.use(bodyParser.json());

app.use(fileUpload({ createParentPath: true }));
app.use(express.static(`${__dirname}/templates`));

app.get('/info/mjml-version', (req, res) => {
  res.send({ version: "todo" })
});

app.post('/v2/render', (req, res) => {
  const {
    mjmlContent,
    remoteFolderPath
  } = req.body
  const out = mjmlEngine(mjmlContent, remoteFolderPath);
  res.send(out)
})

projectRoutes(app);
templateRoutes(app);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
