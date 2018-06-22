const object = {
  deepGet: (object, path, defaultValue) => {
    let data = (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
    data = data.reduce((o, k) => (o || {})[k], object)
    return defaultValue || data
  }
}

export default object
