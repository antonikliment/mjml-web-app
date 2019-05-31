
module.exports = {
    get: (name) => {
      const str = localStorage.getItem(name)
      return JSON.parse(str);
    },
    set: (name, value) => {
      localStorage.setItem(name, JSON.stringify(value))
    }
}
