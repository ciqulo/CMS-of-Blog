const MAP = {
  '-1': 'Internal Error',
  0: 'success',
  200: 'success',

  // 登录状态码
  4001: '无登录信息',
  4002: '用户不存在或未注册',
  4003: '密码错误',
  4004: '无加密信息',

  // 登出状态码
  4005: '未登录',
  4006: '登出失败',
  4007: '',
  400: '',

}

module.exports = function getErrorCode(code) {
  return {
    code,
    message: MAP[code]
  }
}
