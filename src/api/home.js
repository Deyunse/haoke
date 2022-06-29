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
