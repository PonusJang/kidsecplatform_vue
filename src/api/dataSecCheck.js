import request from '@/utils/request'


export function getList(page, limit) {
  return request({
    url: '/dataSecurity/check/getList',
    method: 'get',
    params: {page, limit}
  })
}

export function del(id) {
  return request({
    url: '/dataSecurity/check/del',
    method: 'get',
    params: {id}
  })
}

export function add(data) {
  return request({
    url: '/dataSecurity/check/add',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/dataSecurity/check/update',
    method: 'post',
    data
  })
}

export function findByIP(page, limit, ip) {
  return request({
    url: '/dataSecurity/check/findByIP',
    method: 'get',
    params: {page, limit, ip}
  })
}

export function findByName(page, limit, name) {
  return request({
    url: '/dataSecurity/check/findByName',
    method: 'get',
    params: {page, limit, name}
  })
}

export function getDetail(id) {
  return request({
    url: '/dataSecurity/check/getDetail',
    method: 'get',
    params: {id}
  })
}

export function check(id) {
  return request({
    url: '/dataSecurity/check/doWork',
    method: 'get',
    params: {id}
  })
}

export function push(id) {
  return request({
    url: '/dataSecurity/check/push',
    method: 'get',
    params: {id}
  })
}

