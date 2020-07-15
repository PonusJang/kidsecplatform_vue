import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/domain/getList',
    method: 'get',
    params
  })
}
