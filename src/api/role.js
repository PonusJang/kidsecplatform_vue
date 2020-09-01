import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/role/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function update(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

export function del(role) {
  return request({
    url: '/role/delete',
    method: 'get',
    params: { role }
  })
}

export function findByRole(page, limit, role) {
  return request({
    url: '/role/findByRole',
    method: 'get',
    params: { page, limit, role }
  })
}
