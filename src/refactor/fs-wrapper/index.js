// import fs from 'fs'


const constants = {'info': 'fake'};

const fakeFS =  {
  constants,
  access: (...args)=> {
    console.log('fs access', args)
    console.error(...args)
  },
  stat: (...args)=> {
    console.log('fs stat')
    console.error(...args)
  },
  unlink: (...args)=> {
    console.log('fs unlink')
    console.error(...args)
  },
};
console.log(fakeFS)

export default fakeFS;
