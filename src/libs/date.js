const sTohms = (seconds) => {
  const h = parseInt(seconds / 60 / 60)
  const m = parseInt((seconds - h * 3600) / 60)
  const s = (seconds - h * 3600 - m * 60)
  return {
    h,
    m,
    s
  }
}

export {
  sTohms
}
