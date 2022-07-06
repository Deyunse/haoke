export const formatregion = function (source) {
  source.forEach(item => {
    item.children ? this.formatregion(item.children) : (item.children = [{ text: '' }])
  })
}
// 替换字符
export const formathandl = function (obj) {
  const reg = /label/gi

  const formatStr = JSON.stringify(obj).replace(reg, 'text')
  return JSON.parse(formatStr)
}
