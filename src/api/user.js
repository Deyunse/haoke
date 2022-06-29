import request from '@/utils/request'
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: {
      username, password
    }
  })
}

// 获取用户资料
export const getUser = () => {
  return request({
    url: '/user'

  })
}
// 获取用户收藏
export const getFavoItes = () => {
  return request({
    url: '/user/favorites'
  })
}
/**
 * 查看已发布房源
 * @returns
 */
export const getPubLished = () => {
  return request({
    url: '/user/houses'
  })
}
