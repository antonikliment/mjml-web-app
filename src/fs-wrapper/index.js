// import fs from 'fs'


const constants = {'info': 'fake'};

const fakeFS =  {
  constants,
  access: console.error,
  stat: console.error,
  unlink: console.error,
};
console.log(fakeFS)

export default fakeFS;
