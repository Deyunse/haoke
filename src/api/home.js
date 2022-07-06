import request from '@/utils/request'
export const getSwiper = () => {
  return request({
    url: '/home/swiper'
  })
}
export const getGroups = () => {
  return request({
    url: '/home/groups'
  })
}
// 获取城市数据列表
export const getCity = (num) => {
  return request({
    url: `/area/city?level=${num}`
  })
}
// 获取热门城市
export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}
