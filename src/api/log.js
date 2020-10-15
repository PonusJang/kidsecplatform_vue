import request from '@/utils/request'

export function getList() {
  return request({
    url: '/log/getLogList',
    method: 'get'
    // params: {}
  })
}

export function getLast50(logFile) {
  return request({
    url: '/log/getLast50',
    method: 'get',
    params: { logFile }
  })
}
