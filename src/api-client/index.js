
export async function saveOnServer(path, fileData) {
  const formData = new FormData();

  formData.append('template', new Blob([fileData]));
  const res = await fetch(`http://localhost:5000/test`, {
     method: "POST",
     body: formData
   });
  return res;
}
