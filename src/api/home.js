import request from '@/utils/request'
export const getSwiper = () => {
  return request({
    url: '/home/swiper'
  })
}
