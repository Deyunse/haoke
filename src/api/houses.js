import request from '@/utils/request'
// 获取房屋信息
export const getHouses = () => {
  return request({
    url: '/houses?cityId=AREA|a6649a11-be98-b150'
  })
}
// 获取查询地区
export const getCondition = (id) => {
  return request({ url: `/houses/condition?id=${id} ` })
}
// // 获取房屋查询 条件
// export const getCondition = () => {

// }
export const getParams = () => {
  return request({
    url: '/houses/params'
  })
}
// 搜索房屋
export const getCommunity = (name, id) => {
  return request({ url: `/area/community?name=${name}&id=${id}` })
}
// 发布房源
export const releaseHouse = (data) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data
  })
}
// 房屋图像上传
export const getImg = (data) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    data,
    Headers: {
      'Content-Types': 'multipart/form-data'
    }
  })
}
