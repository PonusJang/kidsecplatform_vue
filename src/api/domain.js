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


export function add(data) {
  return request({
    url: '/domain/add',
    method: 'post',
    data
  })
}


export function del(domain) {
  return request({
    url: '/domain/delete',
    method: 'get',
    params: { domain }
  })
}
