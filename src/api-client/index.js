
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
