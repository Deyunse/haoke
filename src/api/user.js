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
export const getUser = (token) => {
  return request({
    url: '/user',
    headers: {
      authorization: token
    }
  })
}
