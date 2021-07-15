import request from '@/utils/request'


export function getList(page, limit) {
  return request({
    url: '/dataSecurity/proxy/getList',
    method: 'get',
    params: {page, limit}
  })
}

export function del(id) {
  return request({
    url: '/dataSecurity/proxy/del',
    method: 'get',
    params: {id}
  })
}

export function add(data) {
  return request({
    url: '/dataSecurity/proxy/update',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/dataSecurity/proxy/update',
    method: 'post',
    data
  })
}

export function findBySIP(page, limit, sip) {
  return request({
    url: '/dataSecurity/proxy/findByServer',
    method: 'get',
    params: {page, limit, sip}
  })
}

export function findByName(page, limit, name) {
  return request({
    url: '/dataSecurity/proxy/findByName',
    method: 'get',
    params: {page, limit, name}
  })
}

export function check(id) {
  return request({
    url: '/dataSecurity/proxy/check',
    method: 'get',
    params: {id}
  })
}

export function stop(id) {
  return request({
    url: '/dataSecurity/proxy/stop',
    method: 'get',
    params: {id}
  })
}

export function restart(id) {
  return request({
    url: '/dataSecurity/proxy/restart',
    method: 'get',
    params: {id}
  })
}

export function getProxyList() {
  return request({
    url: '/dataSecurity/proxy/getProxyList',
    method: 'get'
  })
}

