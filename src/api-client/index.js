
function pathConverter(path) {
  const pathBlock = path.split("/")
  const fileName = pathBlock.pop()
  const projectName = pathBlock.pop()
  return {
    projectName,
    fileName
  }
}

export async function readFromServer(path) {
  const { projectName, fileName } = pathConverter(path);
   const res = await fetch(`http://localhost:5000/${projectName}/${fileName}`, {
     method: "GET"
   });
   const template = await res.text();
   return template;
}

export async function createProject(path) {
  const pathBlock = path.split("/")
  const projectName = pathBlock.pop()
  const res = await fetch(`http://localhost:5000/${projectName}`, {
     method: "POST"
   });
  return res;
}

export async function renameTemplate(oldPath, newPath) {
  const { projectName, fileName } = pathConverter(oldPath);
  const pathBlock = newPath.split("/");
  const newTemplateName = pathBlock.pop();
  const body = { newTemplateName };

  const res = await fetch(`http://localhost:5000/${projectName}/${fileName}`, {
     method: "PATCH",
     headers: {
        'Content-Type': 'application/json'
     },
     body: JSON.stringify(body)
  });
  return res;
}

export async function mjmlRemote(mjmlContent, remoteFolderPath) {
  const res =  await fetch('http://localhost:5000/remote', {
     method: "POST",
     headers: {
        'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       mjmlContent,
       remoteFolderPath
     })
   });
   return res.json();
}

export async function saveOnServer(path, fileData) {
  const formData = new FormData();
  const { projectName, fileName } = pathConverter(path);
  formData.append('template', new Blob([fileData]));
  const res = await fetch(`http://localhost:5000/${projectName}/${fileName}`, {
     method: "POST",
     body: formData
   });
  return res;
}
export async function listProjects() {
  const res = await fetch(`http://localhost:5000`, {
     method: "GET"
  });
  return res.json();
}
export async function deleteTemplateFromServer(path) {
  const { projectName, fileName } = pathConverter(path);
  const res = await fetch(`http://localhost:5000/${projectName}/${fileName}`, {
     method: "DELETE"
  });
  return res;
}

export async function deleteProjectFromServer(path) {
  const pathBlock = path.split("/")
  const projectName = pathBlock.pop()
  const res = await fetch(`http://localhost:5000/${projectName}`, {
     method: "DELETE"
  });
  return res;
}

/*
  {
  name: "",
  path: path,
  isFolder: false
}
*/
export async function getProjectFromServer(path) {
  const pathBlock = path.split("/")
  const projectName = pathBlock.pop()
  const res = await fetch(`http://localhost:5000/${projectName}`, {
    method: "GET"
  });
  return res.json();
}
export async function getFilesFromServer(path) {
    const pathBlock = path.split("/")
    const projectName = pathBlock.pop()
    const res = await fetch(`http://localhost:5000/${projectName}`, {
      method: "GET"
    });
    const list = await res.json();
    return list;
}
