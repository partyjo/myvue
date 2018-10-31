const cache = {
  get (key) {
    let value = null
    try {
      value = JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
      throw new Error('本地存储出错')
    }
    return value
  },
  set (key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      throw new Error('本地存储出错')
    }
  },
  remove (key) {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      throw new Error('本地存储出错')
    }
  }
}

export default cache
