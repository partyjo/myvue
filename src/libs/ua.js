const isApple = () => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

export {
  isApple
}
