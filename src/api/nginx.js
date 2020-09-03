import request from '@/utils/request'

export function getList(page, limit) {
  return request({
    url: '/nginx/getList',
    method: 'get',
    params: { page, limit }
  })
}

export function update(data) {
  return request({
    url: '/nginx/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/nginx/add',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/nginx/delete',
    method: 'get',
    params: { id }
  })
}

export function findByOwner(page, limit, owner) {
  return request({
    url: '/nginx/findByOwner',
    method: 'get',
    params: { page, limit, owner }
  })
}

export function findByDomain(page, limit, domain) {
  return request({
    url: '/nginx/findByDomain',
    method: 'get',
    params: { page, limit, domain }
  })
}

export function uploadNginxConf(data) {
  return request({
    url: '/nginx/uploadNginxConf',
    method: 'post',
    data
  })
}
