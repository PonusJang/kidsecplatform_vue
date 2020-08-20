import request from '@/utils/request'

export function getList() {
  return request({
    url: '/ip/getList',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/ip/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/ip/add',
    method: 'post',
    data
  })
}

export function del(ip) {
  return request({
    url: '/ip/delete',
    method: 'get',
    params: { ip }
  })
}
