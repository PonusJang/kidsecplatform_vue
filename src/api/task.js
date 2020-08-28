import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/task/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function del(name) {
  return request({
    url: '/task/delete',
    method: 'get',
    params: { name }
  })
}

export function findByName(page, limit, name) {
  return request({
    url: '/task/findByIp',
    method: 'get',
    params: { page, limit, name }
  })
}

export function findByService(page, limit, service) {
  return request({
    url: '/task/findByService',
    method: 'get',
    params: { page, limit, service }
  })
}

export function add(data) {
  return request({
    url: '/task/add',
    method: 'post',
    data
  })
}
