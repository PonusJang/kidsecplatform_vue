import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/domain/getList',
    method: 'get',
    params
  })
}

export function update(data) {
  return request({
    url: '/domain/update',
    method: 'post',
    data
  })
}
