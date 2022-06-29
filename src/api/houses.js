import request from '@/utils/request'
// 获取房屋信息
export const getHouses = (id) => {
  return request({
    url: `/houses?${id}`
  })
}
// 获取查询地区
export const getCondition = () => {
  return request({
    url: '/houses/condition'
  })
}
