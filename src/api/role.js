import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/role/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function getRoles() {
  return request({
    url: '/role/getRoles',
    method: 'get'
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

export function del(roleName) {
  return request({
    url: '/role/delete',
    method: 'get',
    params: { roleName }
  })
}

export function findByRole(page, limit, role) {
  return request({
    url: '/role/findByRole',
    method: 'get',
    params: { page, limit, role }
  })
}
